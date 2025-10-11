import CodeEditorTranslation from '../configs/translation';
export default {
  methods: {
    ////////////////////////
    // Lock Control /////////
    /////////////////////////
    getLocks(file) {
      let allMarks = this.getMarks(file.doc, 'locked-code');
      let allLocks = [];
      allMarks.forEach(mark => {
        allLocks.push({
          from: this.getLockMarkFromPosition(mark, file),
          to: this.getLockMarkToPosition(mark, file),
          hide: mark.collapsed === true
        });
      });
      return allLocks;
    },
    getLockMarkFromPosition(mark, file) {
      let from = this.makePosition(mark.find().from);
      if (from.line === 0 && from.ch === 0 && file.lockStart) {
        from.ch -= 1;
      }
      return from;
    },
    getLockMarkToPosition(mark, file) {
      let to = this.makePosition(mark.find().to);
      let last = this.getLastPosition(file.doc);
      if (to.line === last.line && to.ch === last.ch && file.lockEnd) {
        to.ch += 1;
      }
      return to;
    },
    isFileLockedAtStart(file) {
      let fileLockedAtStart = false;
      file.locks.forEach(lock => {
        if (lock.from.line === 0 && lock.from.ch < 0) {
          fileLockedAtStart = true;
        }
      });
      return fileLockedAtStart;
    },
    isFileLockedAtEnd(file) {
      let fileLockedAtEnd = false;
      file.locks.forEach(lock => {
        let last = this.getLastPosition(file.doc);
        if (lock.to.line === last.line && lock.to.ch > last.ch) {
          fileLockedAtEnd = true;
        }
      });
      return fileLockedAtEnd;
    },
    addLocks(doc, locks) {
      if (doc.locks === undefined) {
        doc.locks = [];
      }
      if (locks !== undefined) {
        locks.forEach(lock => {
          this._addLock(doc, lock);
        });
      }
    },
    _addLock(doc, lock) {
      let first = { line: 0, ch: 0 };
      let last = this.getLastPosition(doc);
      let isInvisible = (lock.hide === true);
      let options = {
        readOnly: true,
        className: 'locked-code',
        collapsed: isInvisible
      };
      if (isInvisible) {
        options.replacedWith = this.hiddenCodeReplacement();
        options.handleMouseEvents = true;
      }
      if (lock.from.line === first.line && lock.from.ch < first.ch) {
        options.inclusiveLeft = true;
      }
      if (lock.to.line === last.line && lock.to.ch > last.ch) {
        options.inclusiveRight = true;
      }
      let lockMark = doc.markText(lock.from, lock.to, options);
      doc.locks.push(lockMark);
    },
    _clearLocks(doc) {
      if (doc.locks !== undefined) {
        doc.locks.forEach(lockMark => lockMark.clear());
      }
      doc.locks = undefined;
    },
    lockSelectedCode(hide = false) {
      let cm = this.$refs.codemirror.cminstance;
      let newLocks = cm.listSelections().map((selection, index) => {
        let lock = this.removeSelectionDirection(selection);
        lock.hide = hide;
        if (index === 0) {
          this._checkLockEdgeCases(lock).then(position => {
            if (position === 'left' || position === 'both') {
              lock.from.ch -= 1;
              this.currentFile.lockStart = true;
            }
            if (position === 'right' || position === 'both') {
              lock.to.ch += 1;
              this.currentFile.lockEnd = true;
            }
            this.lockConfirmVisible = false;
          });
        }
        return lock;
      });
      this.addLocks(cm.doc, newLocks);
    },
    _checkLockEdgeCases(lock) {
      let cm = this.$refs.codemirror.cminstance;
      let last = this.getLastPosition(cm.doc);
      this.lockConfirmPositions = [];
      if (lock.from.line === 0 && lock.from.ch === 0) {
        this.lockConfirmPositions.push('start');
      }
      if (lock.to.line === last.line && lock.to.ch === last.ch) {
        this.lockConfirmPositions.push('end');
      }
      return new Promise(resolve => {
        if (this.lockConfirmPositions.length > 0) {
          this.lockConfirmVisible = true;
          this.$on('lock-confirm', position => {
            resolve(position);
            this.$off('lock-confirm');
          });
        } else {
          resolve('none');
        }
      })
    },
    _getLocksAtMouse(pageX, pageY) {
      let cm = this.$refs.codemirror.cminstance;
      let mousePosition = cm.coordsChar({ left: pageX, top: pageY });
      return cm.findMarksAt(mousePosition).filter(mark => {
        return mark.className === 'locked-code';
      });
    },
    unlockLockedCode() {
      this.selectedLocks.forEach(lock => {
        lock.clear();
      });
    },
    hiddenCodeReplacement() {
      let element = document.createElement('span');
      element.innerHTML =
        '<span class="CodeMirror-foldmarker locked-code" title="' +
        CodeEditorTranslation[this.codeEditorLanguage].hiddenLock +
        '">…</span>';
      return element;
    },

    /////////////////////////
    // Helper Functions /////
    /////////////////////////
    removeSelectionDirection(selection) {
      let range = {};
      let anchor = selection.anchor;
      let head = selection.head;
      if (
        anchor.line < head.line ||
        (anchor.line === head.line && anchor.ch < head.ch)
      ) {
        range.from = { line: anchor.line, ch: anchor.ch };
        range.to = { line: head.line, ch: head.ch };
      } else {
        range.from = { line: head.line, ch: head.ch };
        range.to = { line: anchor.line, ch: anchor.ch };
      }
      return range;
    },
    makePosition(position) {
      return {
        line: position.line,
        ch: position.ch
      };
    },
    getMarks(doc, markClassName) {
      let allMarks = doc.getAllMarks();
      if (markClassName !== undefined) {
        allMarks = allMarks.filter(mark => {
          return mark.className === markClassName;
        });
      }
      return allMarks;
    },
    getLastPosition(doc) {
      const size = doc.size;
      return { line: size - 1, ch: doc.getLine(size - 1).length }
    },
    showContextMenu(mouse) {
      const selectedLocks = this._getLocksAtMouse(mouse.pageX, mouse.pageY);
      const selectedPlaceholders = this._getPlaceholdersAtMouse(mouse.pageX, mouse.pageY);
      
      if (selectedLocks && selectedLocks.length > 0 && this.hasLockControl) {
        this.selectedLocks = selectedLocks;
        this.contextMenuMode = 'unlock';
        this.contextMenuPosition.left = `${mouse.clientX - 15}px`;
        this.contextMenuPosition.top = `${mouse.clientY - 15}px`;
        this.contextMenuVisible = true;
      } else if (selectedPlaceholders && selectedPlaceholders.length > 0 && this.hasPlaceholderControl) {
        this.selectedPlaceholders = selectedPlaceholders;
        this.contextMenuMode = 'placeholder';
        this.contextMenuPosition.left = `${mouse.clientX - 15}px`;
        this.contextMenuPosition.top = `${mouse.clientY - 15}px`;
        this.contextMenuVisible = true;
      } else if (this.codemirror.somethingSelected()) {
        if (this.hasLockControl || this.hasPlaceholderControl) {
          this.contextMenuMode = 'lock';
          this.contextMenuPosition.left = `${mouse.clientX - 30}px`;
          this.contextMenuPosition.top = `${mouse.clientY - 15}px`;
          this.contextMenuVisible = true;
        }
      }
    },
    addPlaceholder() {
      let cm = this.$refs.codemirror.cminstance;
      let newPlaceholders = cm.listSelections().map(selection => {
        let placeholder = this.removeSelectionDirection(selection);
        return placeholder;
      });
      this.addPlaceholders(cm.doc, newPlaceholders);
      this.setCurrentFileModificationState();
    },
    addPlaceholders(doc, placeholders) {
      if (doc.placeholders === undefined) {
        doc.placeholders = [];
      }
      if (placeholders !== undefined) {
        placeholders.forEach(placeholder => {
          this._addPlaceholderMark(doc, placeholder);
        });
      }
    },
    _addPlaceholderMark(doc, placeholder) {
      const originalText = doc.getRange(placeholder.from, placeholder.to);
      let placeholderMark = doc.markText(placeholder.from, placeholder.to, {
        className: 'code-placeholder',
        attributes: {
          'data-placeholder': originalText
        },
        clearOnEnter: false,
        handleMouseEvents: true,
        inclusiveLeft: false,
        inclusiveRight: false,
        atomic: true,
        preserveWhitespace: true,
        replacedWith: (() => {
          const element = document.createElement('span');
          element.className = 'code-placeholder';
          element.textContent = originalText;
          
          if (!this.hasPlaceholderControl) {
            let keyHandler = null;

            element.addEventListener('mousedown', (e) => {
              e.preventDefault();
              e.stopPropagation();

              // 清除所有 placeholder 的 focus 状态
              doc.getAllMarks().forEach(mark => {
                if (mark.replacedWith && mark.replacedWith.className.includes('code-placeholder-focus')) {
                  mark.replacedWith.className = 'code-placeholder';
                  // 移除其他占位符的键盘事件监听
                  if (mark.keyHandler) {
                    doc.cm && doc.cm.off('keydown', mark.keyHandler);
                    mark.keyHandler = null;
                  }
                }
              });
              // 更新全局 placeholder focus 状态
              this.hasPlaceholderFocused = false;
              
              // 添加 focus 样式
              element.className = 'code-placeholder code-placeholder-focus';
              this.hasPlaceholderFocused = true;
              
              // 选中整个占位符区域
              const range = placeholderMark.find();
              if (doc.cm) {
                doc.cm.setSelection(range.from, range.to);
                doc.cm.focus();

                // 防止产生光标
                setTimeout(() => {
                  if (range) {
                    doc.cm.setSelection(range.from, range.to);
                  }
                }, 0);

                // 添加键盘事件监听，处理输入
                keyHandler = (event) => {
                  // 阻止方向键和 Home/End 键的响应
                  if (element.className.includes('code-placeholder-focus')) {
                    const preventKeys = [
                      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
                      'Left', 'Right', 'Up', 'Down',  // 兼容旧浏览器
                      'Home', 'End'
                    ];
                    
                    if (event.key && preventKeys.includes(event.key)) {
                      event.preventDefault();
                      event.stopPropagation();

                      // 清除所有 placeholder 的 focus 状态
                      doc.getAllMarks().forEach(mark => {
                        if (mark.replacedWith && mark.replacedWith.className.includes('code-placeholder-focus')) {
                          mark.replacedWith.className = 'code-placeholder';
                          // 移除其他占位符的键盘事件监听
                          if (mark.keyHandler) {
                            doc.cm && doc.cm.off('keydown', mark.keyHandler);
                            mark.keyHandler = null;
                          }
                        }
                      });
                      // 更新全局 placeholder focus 状态
                      this.hasPlaceholderFocused = false;
                      return;
                    }

                    // 只处理实际的输入键
                    if (event.key && 
                        event.key !== 'Tab' && 
                        event.key !== 'Shift' && 
                        event.key !== 'Control' && 
                        event.key !== 'Alt' && 
                        !preventKeys.includes(event.key)) {
                      placeholderMark.clear();
                      doc.cm.off('keydown', keyHandler);
                      keyHandler = null;
                    }
                  }
                };
                doc.cm.on('keydown', keyHandler);
                placeholderMark.keyHandler = keyHandler;
              }
            });
          }
          
          return element;
        })()
      });

      doc.placeholders.push(placeholderMark);

      // 只在 CodeMirror 实例存在时添加事件监听和刷新
      if (doc.cm) {
        // 在点击其他区域时清除 focus 状态
        const mousedownHandler = (cm, e) => {
          const pos = cm.coordsChar({
            left: e.pageX,
            top: e.pageY
          });
          const marks = cm.findMarksAt(pos);
          
          if (!marks.some(mark => mark.replacedWith && mark.replacedWith.className.includes('code-placeholder-focus'))) {
            this.hasPlaceholderFocused = false;
          }
        };
        doc.cm.on('mousedown', mousedownHandler);
        placeholderMark.mousedownHandler = mousedownHandler;

        this.$nextTick(() => {
          doc.cm.refresh();
        });
      }
    },
    _getPlaceholdersAtMouse(pageX, pageY) {
      let cm = this.$refs.codemirror.cminstance;
      let mousePosition = cm.coordsChar({ left: pageX, top: pageY });
      return cm.findMarksAt(mousePosition).filter(mark => {
        return mark.className === 'code-placeholder';
      });
    },
    removePlaceholder() {
      this.selectedPlaceholders.forEach(placeholder => {
        placeholder.clear();
      });
      this.setCurrentFileModificationState();
    },
    initFilePlaceholders(file) {
      if (file.placeholders === undefined) {
        this.$set(file, 'placeholders', []);
      }
    },
    getPlaceholders(file) {
      let allMarks = this.getMarks(file.doc, 'code-placeholder');
      let allPlaceholders = [];
      allMarks.forEach(mark => {
        allPlaceholders.push({
          from: this.makePosition(mark.find().from),
          to: this.makePosition(mark.find().to)
        });
      });
      return allPlaceholders;
    }
  }
};

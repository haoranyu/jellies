import CodeEditorTranslation from '../configs/translation';
import GUTTERS from '../configs/gutters';
const _isEqual = require('lodash.isequal');

export default {
  methods: {
    initFileLocks(file) {
      if (file.locks === undefined) {
        this.$set(file, 'locks', []);
      }
      file.locks.forEach(lock => {
        lock.hide = lock.hide === true;
      });
    },

    initFileLocksBoundary(file) {
      this.$set(file, 'lockStart', this.isFileLockedAtStart(file));
      this.$set(file, 'lockEnd', this.isFileLockedAtEnd(file));
    },

    updateControlMenuListeners(cm) {
      if (this.hasLockControl || this.hasPlaceholderControl) {
        cm.on('contextmenu', this.listenCmContextMenuEvent);
        cm.on('update', this.listenCmFocusEvent);
      } else {
        cm.off('contextmenu', this.listenCmContextMenuEvent);
        cm.off('update', this.listenCmFocusEvent);
      }
      cm.on('mousedown', (cm, e) => {
        const pos = cm.coordsChar({
          left: e.pageX,
          top: e.pageY
        });
        const marks = cm.findMarksAt(pos);
        if (!marks.some(mark => mark.className === 'code-placeholder')) {
          cm.getAllMarks().forEach(mark => {
            if (mark.replacedWith && mark.replacedWith.className.includes('code-placeholder-focus')) {
              mark.replacedWith.className = 'code-placeholder';
            }
          });
          this.hasPlaceholderFocused = false;
        }
      });
    },

    listenCmContextMenuEvent(cm, e) {
      e.preventDefault();
      setTimeout(() => {
        if (this.hasLockControl || this.hasPlaceholderControl) {
          this.showContextMenu(e);
        }
      }, 101);
    },

    listenCmFocusEvent(cm) {
      this.contextMenuVisible = false;
      cm.focus();
    },

    initFeedbackTooltipListener(cm) {
      if (this.hasFeedbackNotes) {
        cm.getWrapperElement().addEventListener('mouseover', e => {
          this.showFeedbackTooltipAtMouse(e);
        });
        cm.getWrapperElement().addEventListener('mouseup', e => {
          this.removeFeedbackNoteAtMouse(e);
        });
      }
    },

    /////////////////////////
    // Line Arrows Control //
    /////////////////////////
    addLineArrows(doc, lineArrows) {
      if (this.hasLineArrows) {
        if (lineArrows !== undefined) {
          lineArrows.forEach(lineArrow => {
            this.addLineArrow(doc, lineArrow);
          });
        }
      }
    },
    getLineArrowHeight(line) {
      let cm = this.$refs.codemirror.cminstance;
      return `${Math.ceil(cm.heightAtLine(line + 1) - cm.heightAtLine(line))}px`;
    },
    addLineArrow(doc, lineArrow) {
      this.addLineArrowStartGutterMarker(doc, lineArrow);
      this.addLineArrowMiddleGutterMarker(doc, lineArrow);
      this.addLineArrowEndGutterMarker(doc, lineArrow);
    },
    addLineArrowStartGutterMarker(doc, lineArrow) {
      let line = lineArrow.from;
      let element = document.createElement('div');
      if (lineArrow.from < lineArrow.to) {
        element.className = 'jsk-code-editor-line-arrow-marker jsk-code-editor-line-arrow-start-down-marker';
      } else {
        element.className = 'jsk-code-editor-line-arrow-marker jsk-code-editor-line-arrow-start-up-marker';
      }
      element.innerHTML = '<i class="' + lineArrow.type + '"></i>';
      doc.setGutterMarker(line, GUTTERS.LINE_ARROWS, element);
    },
    addLineArrowMiddleGutterMarker(doc, lineArrow) {
      let startLine = lineArrow.from
      let endLine = lineArrow.to
      if (lineArrow.from > lineArrow.to) {
        startLine = lineArrow.to
        endLine = lineArrow.from
      }
      for (let line = startLine + 1; line < endLine; line += 1) {
        let element = document.createElement('div');
        element.className = 'jsk-code-editor-line-arrow-marker jsk-code-editor-line-arrow-middle-marker';
        element.style.height = this.getLineArrowHeight(line);
        element.innerHTML = '<i class="' + lineArrow.type + '"></i>';
        doc.setGutterMarker(line, GUTTERS.LINE_ARROWS, element);
      }
    },
    addLineArrowEndGutterMarker(doc, lineArrow) {
      let line = lineArrow.to;
      let element = document.createElement('div');
      if (lineArrow.from < lineArrow.to) {
        element.className = 'jsk-code-editor-line-arrow-marker jsk-code-editor-line-arrow-end-down-marker';
      } else {
        element.className = 'jsk-code-editor-line-arrow-marker jsk-code-editor-line-arrow-end-up-marker';
      }
      element.innerHTML = '<i class="' + lineArrow.type + '"></i>';
      doc.setGutterMarker(line, GUTTERS.LINE_ARROWS, element);
    },
    clearLineArrows(doc) {
      if (this.hasLineArrows) {
        doc.clearGutter(GUTTERS.LINE_ARROWS);
      }
    },

    ////////////////////////////
    // Feedback Notes Control //
    ////////////////////////////
    addFeedbackNotes(doc, feedbackNotes) {
      if (this.hasFeedbackNotes) {
        if (doc.feedbackNotes === undefined) {
          doc.feedbackNotePositionMarkers = [];
          doc.feedbackNoteRangeMarkers = [];
        }
        if (feedbackNotes !== undefined) {
          feedbackNotes.forEach(feedbackNote => {
            if (feedbackNote) {
              this.addFeedbackNote(doc, feedbackNote);
            }
          });
        }
      }
    },
    addFeedbackNote(doc, feedbackNote) {
      if (_isEqual(feedbackNote.from, feedbackNote.to)) {
        let feedbackNotePositionMarker = this.addFeedbackNotePositionMarker(doc, feedbackNote);
        doc.feedbackNotePositionMarkers.push(feedbackNotePositionMarker);
      } else {
        let feedbackNoteRangeMarker = this.addFeedbackNoteRangeMarker(doc, feedbackNote);
        doc.feedbackNoteRangeMarkers.push(feedbackNoteRangeMarker);
      }
      this.addFeedbackNoteGutterMarker(doc, feedbackNote);
    },
    addFeedbackNoteRangeMarker(doc, feedbackNote) {
      return doc.markText(feedbackNote.from, feedbackNote.to, {
        className: 'feedback-range-' + feedbackNote.type,
        attributes: {
          content: feedbackNote.content,
          dismissible: feedbackNote.isDismissible,
          line: feedbackNote.from.line,
          index: feedbackNote.index
        }
      });
    },
    addFeedbackNotePositionMarker(doc, feedbackNote) {
      let element = document.createElement('span');
      element.setAttribute('data-content', feedbackNote.content);
      element.setAttribute('data-dismissible', feedbackNote.isDismissible);
      element.setAttribute('data-line', feedbackNote.from.line);
      element.setAttribute('data-index', feedbackNote.index);
      element.className = 'feedback-position-' + feedbackNote.type;
      element.innerHTML = '';
      return doc.setBookmark(feedbackNote.from, {
        widget: element,
        insertLeft: true
      });
    },
    addFeedbackNoteGutterMarker(doc, feedbackNote) {
      let line = feedbackNote.from.line;
      let element = document.createElement('div');
      element.className = 'jsk-code-editor-feedback-note-marker';
      element.innerHTML = '<i class="' + feedbackNote.type + '"></i>';
      doc.setGutterMarker(line, GUTTERS.FEEDBACK_NOTES, element);
    },
    clearFeedbackNotes(doc) {
      if (this.hasFeedbackNotes) {
        if (doc.feedbackNoteRangeMarkers !== undefined) {
          doc.feedbackNoteRangeMarkers.forEach(feedbackNoteRangeMarker => feedbackNoteRangeMarker.clear());
        }
        if (doc.feedbackNotePositionMarkers !== undefined) {
          doc.feedbackNotePositionMarkers.forEach(feedbackNotePositionMarker => feedbackNotePositionMarker.clear());
        }
        doc.clearGutter(GUTTERS.FEEDBACK_NOTES);
        doc.feedbackNotePositionMarkers = undefined;
        doc.feedbackNoteRangeMarkers = undefined;
      }
    },
    showFeedbackTooltipAtMouse(mouse) {
      this.feedbackTooltipVisible = false;
      let feedbackNotes = this.getFeedbackNoteMarksAtMouse(mouse);
      if (feedbackNotes.length > 0) {
        const feedbackNote = feedbackNotes[0];
        this.setFeedbackTooltipPosition(feedbackNote);
        this.feedbackTooltipVisible = true;
        if (feedbackNote.type === 'range') {
          this.feedbackTooltipContent = feedbackNote.attributes.content;
        } else {
          this.feedbackTooltipContent = feedbackNote.widgetNode.childNodes[0].dataset.content;
        }
      }
    },
    setFeedbackTooltipPosition(feedbackNote) {
      let cm = this.$refs.codemirror.cminstance;
      const halfCharWidth = cm.defaultCharWidth() / 2;
      const charHeight = cm.defaultTextHeight();
      let tooltipPositionX, tooltipPositionY;
      if (feedbackNote.type === 'range') {
        const tooltipPositionLeft = cm.charCoords(feedbackNote.find().from);
        const tooltipPositionRight = cm.charCoords(feedbackNote.find().to);
        tooltipPositionY = tooltipPositionRight.bottom;
        tooltipPositionX = (tooltipPositionLeft.left + tooltipPositionRight.left) / 2 - halfCharWidth;
      } else if (feedbackNote.type === 'bookmark') {
        const tooltipPosition = cm.charCoords(feedbackNote.find());
        tooltipPositionY = tooltipPosition.bottom;
        tooltipPositionX = tooltipPosition.left - 3.5;
      }
      if (tooltipPositionY > window.innerHeight / 2) {
        this.feedbackTooltipPosition.top = `${tooltipPositionY - charHeight + 20}px`;
        this.feedbackTooltipPlacement = 'top-start';
      } else {
        this.feedbackTooltipPosition.top = `${tooltipPositionY}px`;
        this.feedbackTooltipPlacement = 'bottom-start';
      }
      this.feedbackTooltipPosition.left = `${tooltipPositionX}px`;
    },
    getFeedbackNoteMarksAtMouse(mouse) {
      const pageX = mouse.pageX
      const pageY = mouse.pageY
      let cm = this.$refs.codemirror.cminstance;
      let mousePosition = cm.coordsChar({ left: pageX, top: pageY });
      const halfCharWidth = cm.defaultCharWidth() / 2;
      const isMouseAtChar = Math.abs(pageX - cm.charCoords(mousePosition).left) < halfCharWidth;
      if (!isMouseAtChar) {
        return [];
      }
      return cm.findMarksAt(mousePosition).filter(this.isFeedbackNoteMark);
    },
    isFeedbackNoteMark(mark) {
      const isRangeMarker = (
        mark.className === 'feedback-range-warning' ||
        mark.className === 'feedback-range-error'
      );
      const isPositionMarker = (
        mark.type === 'bookmark' &&
        mark.widgetNode && (
          mark.widgetNode.childNodes[0].className === 'feedback-position-warning' ||
          mark.widgetNode.childNodes[0].className === 'feedback-position-error'
        )
      );
      return isRangeMarker || isPositionMarker;
    },
    removeFeedbackNoteAtMouse(mouse) {
      let feedbackNotes = this.getFeedbackNoteMarksAtMouse(mouse);
      if (feedbackNotes.length > 0) {
        const feedbackNote = feedbackNotes[0];
        let isDismissible = false;
        let index = -1;
        if (feedbackNote.type === 'range') {
          isDismissible = feedbackNote.attributes.dismissible;
          index = parseInt(feedbackNote.attributes.index);
        } else {
          isDismissible = (feedbackNote.widgetNode.childNodes[0].dataset.dismissible === 'true');
          index = parseInt(feedbackNote.widgetNode.childNodes[0].dataset.index);
        }
        if (isDismissible) {
          feedbackNote.clear();
          this.files[0].feedbackNotes.splice(index, 1, null)
          this.removeFeedbackNoteGutterMarkerByFeedbackNote(feedbackNote);
        }
      }
    },
    removeFeedbackNoteGutterMarkerByFeedbackNote(feedbackNote) {
      let line;
      if (feedbackNote.type === 'range') {
        line = feedbackNote.attributes.line;
      } else {
        line = parseInt(feedbackNote.widgetNode.childNodes[0].dataset.line);
      }
      const doc = this.currentFile.doc;
      const markedSpansInLine = doc.lineInfo(line).handle.markedSpans;
      let feedbackNotesInLine = [];
      if (markedSpansInLine) {
        feedbackNotesInLine = markedSpansInLine.map(markedSpan => {
          return markedSpan.marker;
        }).filter(this.isFeedbackNoteMark)
      }
      if (feedbackNotesInLine.length === 0) {
        doc.setGutterMarker(line, GUTTERS.FEEDBACK_NOTES, null);
      }
    },

    //////////////////////////
    // Line Class Control //
    //////////////////////////
    addLineClasses(doc, lineClasses) {
      if (doc.lineClasses === undefined) {
        doc.lineClasses = [];
      }
      if (lineClasses !== undefined) {
        lineClasses.forEach((lineClass) => {
          this.addLineClass(doc, lineClass);
        });
      }
    },
    addLineClass(doc, lineClass) {
      doc.addLineClass(lineClass.line, lineClass.where, lineClass.class);
      doc.lineClasses.push({
        line: lineClass.line,
        where: lineClass.where,
        class: lineClass.class
      });
    },
    clearLineClasses(doc) {
      if (doc.lineClasses !== undefined) {
        doc.lineClasses.forEach(lineClass => {
          doc.removeLineClass(lineClass.line, lineClass.where, lineClass.class);
        });
      }
      doc.lineClasses = undefined;
    },

    //////////////////////////
    // Line Notes Control //
    //////////////////////////
    addLineNotes(doc, lineNotes) {
      if (this.hasLineNotes) {
        if (doc.lineNotes === undefined) {
          doc.lineNotes = [];
        }
        if (lineNotes !== undefined) {
          lineNotes.forEach(lineNote => {
            this.addLineNote(doc, lineNote);
          });
        }
      }
    },
    addLineNote(doc, lineNote) {
      let element = document.createElement('span');
      let elementClass = 'jsk-code-editor-note';
      let elementIcon = '';
      if (lineNote.type !== undefined) {
        elementClass += ' jsk-code-editor-note-' + lineNote.type;
      }
      if (lineNote.hasIcon === true) {
        let iconType = lineNote.type || 'info';
        let icons = {
          info: 'info',
          warning: 'warning',
          error: 'times-o',
          success: 'check-o'
        };
        elementIcon += '<i class="el-icon-j-' + icons[iconType] + '"></i>';
      }
      element.innerHTML =
        '<div class="' +
        elementClass +
        '">' +
        elementIcon +
        '<div>' +
        lineNote.content +
        '</div></div>';
      let lineNoteWidget = doc.addLineWidget(lineNote.line, element, {
        above: true
      });
      doc.lineNotes.push(lineNoteWidget);
    },
    clearLineNotes(doc) {
      if (this.hasLineNotes) {
        if (doc.lineNotes !== undefined) {
          doc.lineNotes.forEach(lineNoteWidget => lineNoteWidget.clear());
        }
        doc.lineNotes = undefined;
      }
    }
  },
  computed: {
    feedbackTooltipTheme() {
      return this.settings.theme === 'light' ? 'dark' : 'light';
    },
    closeConfirmContent() {
      if (this.codeEditorCloseConfirmContent !== undefined) {
        return this.codeEditorCloseConfirmContent;
      }
      return CodeEditorTranslation[this.codeEditorLanguage].closeConfirm;
    },
    reloadConfirmContent() {
      if (this.codeEditorReloadConfirmContent !== undefined) {
        return this.codeEditorReloadConfirmContent;
      }
      return CodeEditorTranslation[this.codeEditorLanguage].reloadConfirm;
    },
    lockConfirmContent() {
      if (this.codeEditorLockConfirmContent !== undefined) {
        return this.codeEditorLockConfirmContent;
      }
      return CodeEditorTranslation[this.codeEditorLanguage].lockConfirm;
    }
  }
};

const _isEqual = require('lodash.isequal');
const _cloneDeep = require('lodash.clonedeep');
import CodeMirror from 'codemirror';

export default {
  methods: {
    initFiles() {
      if (this.files.length === 0) {
        this.createAndSwitchToNewFile();
      } else {
        this.files.forEach(file => {
          if (!file.isInitialized) {
            this.initFile(file);
          }
        });
      }
    },
    initFile(file) {
      this.$set(file, 'isSaving', false);
      this.$set(file, 'isModified', false);
      this.initFileLocks(file);
      this.initFilePlaceholders(file);
      this.initFileDoc(file);
      this.initFileLocksBoundary(file);
      this.$set(file, 'codeInit', file.code);
      this.$set(file, 'locksInit', _cloneDeep(file.locks || []));
      this.$set(file, 'placeholdersInit', _cloneDeep(file.placeholders || []));
      this.$set(file, 'isInitialized', true);
    },

    initFileDoc(file) {
      file.doc = CodeMirror.Doc(file.code, this.getFileMode(file));
      if (file.readOnly) {
        file.doc.cantEdit = true;
      }
      this.addLocks(file.doc, file.locks);
      this.addPlaceholders(file.doc, file.placeholders);
      this.addLineArrows(file.doc, file.lineArrows);
      this.addFeedbackNotes(file.doc, file.feedbackNotes);
      this.addLineNotes(file.doc, file.lineNotes);
      this.addLineClasses(file.doc, file.lineClasses);
    },

    modificationLossPrevention(e) {
      if (this.hasModifiedFile()) {
        e = e || window.event;
        if (e) {
          e.returnValue = '';
        }
        return '';
      }
      return null;
    },

    /////////////////////////
    // Status Control ///////
    /////////////////////////
    setSaving(file, isSaving = true) {
      file.doc.cantEdit = isSaving;
      file.isSaving = isSaving;
    },
    setModificationState(file) {
      const isCodeChanged = file.codeInit !== file.doc.getValue();
      const currentLocks = this.getLocks(file);
      const currentPlaceholders = this.getPlaceholders(file);
      
      const locksInit = file.locksInit || [];
      const placeholdersInit = file.placeholdersInit || [];
      
      const areLocksChanged = !_isEqual(locksInit, currentLocks);
      const arePlaceholdersChanged = !_isEqual(placeholdersInit, currentPlaceholders);
      
      this.isAfterSwapDoc = false;
      file.isModified = isCodeChanged || areLocksChanged || arePlaceholdersChanged;
    },
    setCurrentFileModificationState() {
      return this.setModificationState(this.currentFile);
    },
    hasModifiedFile() {
      for (const file of this.files) {
        if (file.isModified) {
          return true
        }
      }
      return false
    },
    isFileClosable(file, indexOfFile) {
      const indexOfFirstFile = 0
      if (!this.isFirstFileClosable && indexOfFile === indexOfFirstFile ) {
        return false
      }
      return file.isSaving ? false : undefined
    },
    ////////////////////////////////
    // File Modification Outside ///
    ////////////////////////////////
    isCurrentFileChangedOutside() {
      if (!this.currentFile) return false;
      
      const currentLocks = this.getLocks(this.currentFile);
      const currentPlaceholders = this.getPlaceholders(this.currentFile);
      
      const locksInit = this.currentFile.locksInit || [];
      const placeholdersInit = this.currentFile.placeholdersInit || [];
      
      return !!(
        this.currentFileCode !== this.currentFile.codeInit ||
        !_isEqual(currentLocks, locksInit) ||
        !_isEqual(currentPlaceholders, placeholdersInit)
      );
    },
    reloadCurrentFile() {
      if (!this.currentFile) {
        return;
      }
      if (!this.currentFile.isModified) {
        this.initFile(this.currentFile);
        this.switchToCurrentFile();
      } else if (
        !this.isAfterSwapDoc ||
        (this.isAfterSwapDoc && this.isCurrentFileChangedOutside())
      ) {
        this.reloadConfirmFileName = this.currentFile.name;
        this.reloadConfirmVisible = true;
        new Promise(resolve => {
          this.$on('reload-confirm', result => {
            resolve(result);
            this.$off('reload-confirm');
          });
        }).then(result => {
          this.reloadConfirmVisible = false;
          if (result === 'reload') {
            this.initFile(this.currentFile);
            this.switchToCurrentFile();
          }
        });
      }
    },

    /////////////////////////
    // File Control /////////
    /////////////////////////
    flushCurrentFile() {
      let cm = this.$refs.codemirror.cminstance;
      this.currentFile.doc = cm.getDoc();
      this.currentFile.selections = cm.listSelections();
      this.currentFile.history = cm.getHistory();
    },
    switchToCurrentFile() {
      let cm = this.$refs.codemirror.cminstance;
      cm.swapDoc(this.currentFile.doc);
      this.isAfterSwapDoc = true;
      this.renderCurrentFile();
    },
    createAndSwitchToNewFile() {
      if (!this.canCreateNewFile) {
        return this.$emit('create-new-file-error')
      }
      let newFile = {
        name: 'untitled',
        code: ''
      };
      this.initFile(newFile);
      this.files.push(newFile);
      this.$refs.tabs.changeActive(this.files.length - 1);
      if (this.files.length === 1) {
        this.setActiveTab(0);
        this.switchToCurrentFile();
      } else {
        this.flushCurrentFile();
        this.setActiveTab(this.files.length - 1);
        this.switchToCurrentFile();
      }
    },
    getFileMode(file) {
      let mode = 'text/plain';
      if (file.language === undefined || CodeMirror.findModeByName(file.language) === undefined) {
        if (CodeMirror.findModeByFileName(file.name) !== undefined) {
          mode = CodeMirror.findModeByFileName(file.name).mime;
        }
      } else {
        mode = CodeMirror.findModeByName(file.language).mime;
      }
      return mode;
    },
    saveCurrentFile() {
      return this.saveFile(this.currentActiveIndex);
    },
    saveFile(index) {
      let file = this.files[index];
      if (file.isModified || file.name === 'untitled') {
        this.setSaving(file);
        return new Promise(saveDone => {
          this.$emit('before-save', index);
          this.beforeSaveFile(file, index).then(fileSaved => {
            if (fileSaved) {
              this.updateSavedFile(index);
              saveDone(true);
            } else {
              this.setSaving(file, false);
              saveDone(false);
            }
          });
        });
      }
    },
    saveAllFiles() {
      const fileIndexList = []
      for (let index = 0; index < this.files.length; index++) {
        let file = this.files[index];
        if (file.isModified || file.name === 'untitled') {
          fileIndexList.push(index)
          this.setSaving(file);
        }
      }
      return new Promise(saveDone => {
        this.$emit('before-save-all');
        this.beforeSaveAllFiles().then(filesSaved => {
          if (filesSaved) {
            fileIndexList.forEach(index => {
              this.updateSavedFile(index);
            })
            saveDone(true);
          } else {
            fileIndexList.forEach(index => {
              this.setSaving(this.files[index], false);
            })
            saveDone(false);
          }
        });
      });
    },
    updateSavedFile(index) {
      let file = this.files[index];
      const currentCode = file.doc.getValue();
      const currentLocks = this.getLocks(file);
      const currentPlaceholders = this.getPlaceholders(file);
      
      file.codeInit = currentCode;
      file.code = currentCode;
      file.locksInit = _cloneDeep(currentLocks);
      file.locks = _cloneDeep(currentLocks);
      file.placeholdersInit = _cloneDeep(currentPlaceholders);
      file.placeholders = _cloneDeep(currentPlaceholders);
      
      file.selections = file.doc.listSelections();
      file.history = file.doc.getHistory();
      
      this.$emit('saved', index);
      this.setSaving(file, false);
      this.setModificationState(file);
    },
    renderDoc(file) {
      // Suppose that the followings might be changed and need to be rerendered:
      // - line notes
      // - errors and warnings
      // - file mode
      file.doc.cm.refresh();
      file.doc.cm.setOption('mode', this.getFileMode(file));
      this.clearFeedbackNotes(file.doc);
      this.addFeedbackNotes(file.doc, file.feedbackNotes);
      this.clearLineArrows(file.doc);
      this.addLineArrows(file.doc, file.lineArrows);
      this.clearLineNotes(file.doc);
      this.addLineNotes(file.doc, file.lineNotes);
      this.clearLineClasses(file.doc);
      this.addLineClasses(file.doc, file.lineClasses);
      if (file.selections) {
        file.doc.setSelections(file.selections);
      }
      if (file.history) {
        file.doc.setHistory(file.history);
      }
    },
    renderCurrentFile() {
      this.renderDoc(this.currentFile);
    },
    renderCurrentFileLineArrows() {
      const file = this.currentFile;
      this.clearLineArrows(file.doc);
      this.$nextTick(() => {
        this.addLineArrows(file.doc, file.lineArrows);
      })
    },

    /////////////////////////
    // Tabs Control /////////
    /////////////////////////
    switchToTab(targetIndex) {
      this.flushCurrentFile();
      this.setActiveTab(targetIndex);
      this.switchToCurrentFile();
    },
    switchToPreviousTab() {
      this.setActiveTab(this.currentActiveIndex - 1);
    },
    setActiveTab(index) {
      if (index < 0) {
        index = 0;
      }
      this.currentActiveIndex = index;
      this.$refs.tabs.changeActive(index);
      this.$emit('switch-tab', index);
    },
    closeTab(index) {
      this.files.splice(index, 1);
      if (this.files.length === 0) {
        this.createAndSwitchToNewFile();
      } else if (index < this.currentActiveIndex) {
        this.switchToPreviousTab();
      } else if (index === this.currentActiveIndex) {
        this.switchToPreviousTab();
        this.switchToCurrentFile();
      }
    },
    beforeCloseTab(index) {
      return () => {
        return new Promise(returnToTab => {
          let file = this.files[index];
          if (file.isModified) {
            this.closeConfirmFileName = file.name;
            this.closeConfirmVisible = true;
            new Promise(resolve => {
              this.$on('close-confirm', result => {
                resolve(result);
                this.$off('close-confirm');
              });
            }).then(result => {
              this.closeConfirmVisible = false;
              if (result === 'cancel') {
                returnToTab(false);
              } else if (result === 'save') {
                this.saveFile(index).then(saveDone => {
                  if (saveDone) {
                    returnToTab(true);
                  } else {
                    returnToTab(false);
                  }
                });
              } else {
                returnToTab(true);
              }
            });
          } else {
            returnToTab(true);
          }
        });
      };
    },
    customTabTooltipContent(file) {
      let tooltipContent = file.path ? file.path : file.name
      this.customTabTooltips.forEach(({ value, title }) => {
        if (file.language === value) {
          tooltipContent = title
        }
      })
      return tooltipContent
    },
    tooltip(file) {
      if (this.hasCustomTabTooltip) {
        return this.customTabTooltipContent(file)
      }
      if (file.path !== undefined) {
        return file.path;
      }
      return file.name;
    }
  },
  computed: {
    files() {
      return this.codeEditorFiles;
    },
    currentFile() {
      return this.files[this.currentActiveIndex];
    },
    currentFileCode() {
      if (this.currentFile) {
        return this.currentFile.code;
      }
      return '';
    },
    currentFileLocks() {
      if (this.currentFile) {
        return this.currentFile.locks;
      }
      return [];
    },
    currentFileReadOnly() {
      if (this.currentFile) {
        return this.currentFile.readOnly;
      }
      return false;
    }
  }
};

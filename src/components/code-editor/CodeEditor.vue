<template>
  <div class="jsk-code-editor-container">
    <jsk-tabs
      ref="tabs"
      class="tabs"
      :tabs-init-active="0"
      :tabs-theme="settings.theme"
      tabs-height="35px"
      :has-tooltip="hasTabTooltips"
      :is-closable="areTabClosable"
      :has-options="hasControlPanel"
      :tabs-options-width="controlWidth"
    >
      <jsk-tab
        v-for="(file, index) in files"
        :key="index"
        :tab-index="index"
        :tab-tooltip="tooltip(file)"
        has-mark
        :before-close="beforeCloseTab(index)"
        :is-closable="file.isSaving ? false : undefined"
        @switch="switchToTab"
        @close="closeTab"
      >
        <div
          v-if="file.isSaving"
          slot="mark"
          class="saving-mark"
        >
          <i class="el-icon-j-loading" />
        </div>
        <div
          v-else-if="file.isModified"
          slot="mark"
          class="modified-mark"
        >
          ●
        </div>
        {{ file.name }}
      </jsk-tab>
      <ul
        slot="options"
        class="jsk-code-editor-control"
      >
        <slot name="controls" />
        <li v-if="hasNewFileControl">
          <i
            class="el-icon-j-plus"
            @click="createAndSwitchToNewFile"
          />
        </li>
        <li v-if="hasSaveCurrentFileControl">
          <i
            class="el-icon-j-save"
            @click="saveCurrentFile"
          />
        </li>
        <li v-if="hasSettingsControl">
          <jsk-popover
            popover-placement="bottom-end"
            popover-width="240"
            popover-trigger="click"
            popover-offset="40"
          >
            <jsk-form
              ref="form"
              form-size="small"
              form-label-position="top"
              class="jsk-settings-form"
              :form-model="settings"
              :form-label-width="120"
            >
              <jsk-form-item
                v-for="(value, key) in settingsContent.labels"
                :key="key"
                :form-item-label="value"
              >
                <jsk-radio-group
                  v-model="settings[key]"
                  radio-group-size="small"
                >
                  <jsk-radio-button
                    v-for="(content, label) in settingsContent[key]"
                    :key="label"
                    :label="label"
                  >
                    {{ content }}
                  </jsk-radio-button>
                </jsk-radio-group>
              </jsk-form-item>
            </jsk-form>
            <i
              slot="reference"
              class="el-icon-j-gear"
            />
          </jsk-popover>
        </li>
      </ul>
    </jsk-tabs>
    <div class="jsk-code-editor">
      <codemirror
        ref="codemirror"
        :options="editorOptions"
        class="jsk-code-editor-codemirror"
        @input="setCurrentFileModificationState"
        @gutterContextMenu="setBreakpoint"
      />
      <code-editor-lock-menu
        v-show="lockMenuVisiable"
        :style="lockMenuPosition"
        :lock-menu-mode="lockMenuMode"
        @lock-change="setCurrentFileModificationState"
        @lock="lockSelectedCode"
        @unlock="unlockLockedCode"
        @hide="lockSelectedCode(true)"
      />
      <code-editor-feedback-tooltip
        :feedback-tooltip-placement="feedbackTooltipPlacement"
        :feedback-tooltip-position="feedbackTooltipPosition"
        :feedback-tooltip-visiable="feedbackTooltipVisiable"
        :feedback-tooltip-theme="feedbackTooltipTheme"
        :feedback-tooltip-content="feedbackTooltipContent"
      />
    </div>
    <code-editor-close-confirm
      :close-confirm-filename="closeConfirmFileName"
      :close-confirm-content="closeConfirmContent"
      :visible.sync="closeConfirmVisiable"
    />
    <code-editor-reload-confirm
      :reload-confirm-filename="reloadConfirmFileName"
      :reload-confirm-content="reloadConfirmContent"
      :visible.sync="reloadConfirmVisiable"
    />
    <code-editor-lock-confirm
      :lock-confirm-content="lockConfirmContent"
      :lock-confirm-positions="lockConfirmPositions"
      :visible.sync="lockConfirmVisiable"
    />
  </div>
</template>

<script>
import JskTab from '../tab/Tab';
import JskTabs from '../tabs/Tabs';
import JskForm from '../form/Form';
import JskPopover from '../popover/Popover';
import JskFormItem from '../form-item/FormItem';
import JskRadioButton from '../radio-button/RadioButton';
import JskRadioGroup from '../radio-group/RadioGroup';
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import '../../plugins/codemirror';
import CodeMirror from 'codemirror';
import CodeEditorCloseConfirm from './addons/CloseConfirm';
import CodeEditorReloadConfirm from './addons/ReloadConfirm';
import CodeEditorLockConfirm from './addons/LockConfirm';
import CodeEditorLockMenu from './addons/LockMenu';
import CodeEditorFeedbackTooltip from './addons/FeedbackTooltip';
import CodeEditorTranslation from './configs/translation';
import CodeEditorCodemirrorOptions from './configs/options';
import CodeEditorDefaultSettings from './configs/settings';
const _isEqual = require('lodash.isequal');
const _merge = require('lodash.merge');
const _cloneDeep = require('lodash.clonedeep');
export default {
  name: 'JskCodeEditor',
  components: {
    CodeEditorCloseConfirm,
    CodeEditorReloadConfirm,
    CodeEditorLockConfirm,
    CodeEditorLockMenu,
    CodeEditorFeedbackTooltip,
    codemirror,
    JskTabs,
    JskTab,
    JskForm,
    JskPopover,
    JskFormItem,
    JskRadioButton,
    JskRadioGroup
  },
  props: {
    codeEditorCloseConfirmContent: Object,
    codeEditorReloadConfirmContent: Object,
    codeEditorLockConfirmContent: Object,
    codeEditorSettingsContent: Object,
    codeEditorSettings: Object,
    codeEditorFiles: {
      type: Array,
      default: () => {
        return [];
      }
    },
    codeEditorLanguage: {
      type: String,
      default: 'en'
    },
    codeEditorOptions: {
      type: Object,
      default: () => {
        return {};
      }
    },
    codeEditorInitActive: {
      type: Number,
      default: 0
    },
    codeEditorControlPanelWidth: {
      type: [String, Number],
      default: 100
    },
    areTabClosable: {
      type: Boolean,
      default: true
    },
    hasRepeatWordsAnnotations: {
      type: Boolean,
      default: false
    },
    hasLineNotes: {
      type: Boolean,
      default: true
    },
    hasFeedbackNotes: {
      type: Boolean,
      default: true
    },
    hasLockControl: {
      type: Boolean,
      default: false
    },
    hasBreakpointControl: {
      type: Boolean,
      default: false
    },
    hasControlPanel: {
      type: Boolean,
      default: true
    },
    hasNewFileControl: {
      type: Boolean,
      default: true
    },
    hasSaveCurrentFileControl: {
      type: Boolean,
      default: true
    },
    hasSettingsControl: {
      type: Boolean,
      default: true
    },
    hasTabTooltips: {
      type: Boolean,
      default: true
    },
    beforeSaveFile: {
      type: Function,
      default: () => {
        return new Promise(fileSaved => {
          fileSaved(true);
        });
      }
    },
    beforeSaveAllFiles: {
      type: Function,
      default: () => {
        return new Promise(filesSaved => {
          filesSaved(true);
        });
      }
    }
  },
  data: function() {
    return {
      isSwithcingTab: false,
      value: null,
      closeConfirmVisiable: false,
      closeConfirmFileName: undefined,
      reloadConfirmVisiable: false,
      reloadConfirmFileName: undefined,
      lockConfirmVisiable: false,
      lockConfirmPositions: [], 
      feedbackTooltipPlacement: undefined,
      feedbackTooltipVisiable: false,
      feedbackTooltipContent: undefined,
      feedbackTooltipPosition: { left: 0, top: 0 },
      lockMenuVisiable: false,
      lockMenuMode: 'lock',
      lockMenuPosition: { left: 0, top: 0 },
      selectedLocks: undefined,
      settings: _cloneDeep(CodeEditorDefaultSettings),
      editorOptions: _cloneDeep(CodeEditorCodemirrorOptions),
      currentActiveIndex: 0
    };
  },
  computed: {
    codemirror: function() {
      return this.$refs.codemirror.codemirror;
    },
    files: function() {
      return this.codeEditorFiles;
    },
    currentFile: function() {
      return this.files[this.currentActiveIndex];
    },
    currentFileCode: function() {
      if (this.currentFile) {
        return this.currentFile.code;
      }
      return '';
    },
    currentFileLocks: function() {
      if (this.currentFile) {
        return this.currentFile.locks;
      }
      return [];
    },
    currentFileReadOnly: function() {
      if (this.currentFile) {
        return this.currentFile.readOnly;
      }
      return false;
    },
    editorTheme: function() {
      let themeMapping = {
        dark: 'monokai',
        light: 'eclipse'
      };
      return themeMapping[this.settings.theme];
    },
    feedbackTooltipTheme: function() {
      return this.settings.theme === 'light' ? 'dark' : 'light';
    },
    controlWidth: function() {
      if (typeof this.codeEditorControlPanelWidth === 'string') {
        return this.codeEditorControlPanelWidth;
      }
      return this.codeEditorControlPanelWidth + 'px';
    },
    closeConfirmContent: function() {
      if (this.codeEditorCloseConfirmContent !== undefined) {
        return this.codeEditorCloseConfirmContent;
      }
      return CodeEditorTranslation[this.codeEditorLanguage].closeConfirm;
    },
    reloadConfirmContent: function() {
      if (this.codeEditorReloadConfirmContent !== undefined) {
        return this.codeEditorReloadConfirmContent;
      }
      return CodeEditorTranslation[this.codeEditorLanguage].reloadConfirm;
    },
    lockConfirmContent: function() {
      if (this.codeEditorLockConfirmContent !== undefined) {
        return this.codeEditorLockConfirmContent;
      }
      return CodeEditorTranslation[this.codeEditorLanguage].lockConfirm;
    },
    settingsContent: function() {
      if (this.codeEditorSettingsContent !== undefined) {
        return this.codeEditorSettingsContent;
      }
      return CodeEditorTranslation[this.codeEditorLanguage].settings;
    }
  },
  watch: {
    files: function () {
      this.initFiles();
    },
    settings: {
      deep: true,
      handler: function() {
        this.editorOptions.theme = this.editorTheme;
        this.setEditorIndentSize(this.settings.indent);
        this.setEditorMode(this.settings.mode);
        if (!_isEqual(this.settings, this.codeEditorSettings)) {
          this.$emit('update:codeEditorSettings', this.settings);
        }
      }
    },
    currentFileCode: function() {
      this.reloadCurrentFile();
    },
    currentFileLocks: {
      deep: true,
      handler: function() {
        this.reloadCurrentFile();
      }
    },
    currentFileReadOnly: function() {
      this.reloadCurrentFile();
    }
  },
  created: function() {
    this.initEditorOptions();
  },
  mounted: function() {
    this.initFiles();
    this.initEditorListeners();
    this.setActiveTab(this.codeEditorInitActive);
    this.switchToCurrentFile();
  },
  methods: {
    /////////////////////////
    // Initialization ///////
    /////////////////////////
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
      this.initFileDoc(file);
      this.initFileLocksBoundary(file);
      this.$set(file, 'codeInit', file.code);
      this.$set(file, 'locksInit', _cloneDeep(file.locks));
      this.$set(file, 'isInitialized', true);
    },
    initFileDoc(file) {
      file.doc = CodeMirror.Doc(file.code, this.getFileMode(file));
      if (file.readOnly) {
        file.doc.cantEdit = true;
      }
      this.addLocks(file.doc, file.locks);
      this.addFeedbackNotes(file.doc, file.feedbackNotes);
      this.addLineNotes(file.doc, file.lineNotes);
      this.addLineClasses(file.doc, file.lineClasses);
    },
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
    initEditorOptions() {
      this.editorOptions = _merge(this.editorOptions, this.codeEditorOptions);
      if (this.codeEditorSettings !== undefined) {
        this.settings = this.codeEditorSettings;
      } else {
        this.settings = CodeEditorDefaultSettings;
      }
      this.editorOptions.extraKeys['Ctrl-S'] = () => this.saveCurrentFile();
      this.editorOptions.extraKeys['Cmd-S'] = () => this.saveCurrentFile();
      if (this.hasRepeatWordsAnnotations) {
        this.editorOptions.highlightSelectionMatches = {
          trim: true,
          delay: 100,
          annotateScrollbar: true
        };
      }
    },
    initEditorListeners() {
      let cm = this.$refs.codemirror.cminstance;
      cm.save = this.saveCurrentFile;
      this.initLockControlListener(cm);
      this.initFeedbackTooltipListener(cm);
    },
    initLockControlListener(cm) {
      if (this.hasLockControl) {
        cm.on('contextmenu', (cm, e) => {
          e.preventDefault();
          setTimeout(() => {
            if (cm.somethingSelected()) {
              this.showLockControlAtSelection(e);
            } else {
              this.showLockControlAtMouse(e);
            }
          }, 101);
        });
        cm.on('update', cm => {
          this.lockMenuVisiable = false;
          cm.focus();
        });
      }
    },
    initFeedbackTooltipListener(cm) {
      if (this.hasFeedbackNotes) {
        cm.getWrapperElement().onmouseover = e => {
          this.showFeedbackTooltipAtMouse(e);
        };
      }
    },

    /////////////////////////
    // Status Control ///////
    /////////////////////////
    setSaving(file, isSaving = true) {
      file.doc.cantEdit = isSaving;
      file.isSaving = isSaving;
    },
    setModificationState(file) {
      let isCodeChanged = file.codeInit !== file.doc.getValue();
      let areLocksChanged = !_isEqual(file.locksInit, this.getLocks(file));
      this.isAfterSwapDoc = false;
      file.isModified = isCodeChanged || areLocksChanged;
    },
    setCurrentFileModificationState() {
      return this.setModificationState(this.currentFile);
    },

    ////////////////////////////////
    // File Modification Outside ///
    ////////////////////////////////
    isCurrentFileChangedOutside() {
      if (
        this.currentFileCode !== this.currentFile.codeInit ||
        !_isEqual(this.currentFileLocks, this.currentFile.locksInit)
      ) {
        return true;
      }
      return false;
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
        this.reloadConfirmVisiable = true;
        new Promise(resolve => {
          this.$on('reload-confirm', result => {
            resolve(result);
            this.$off('reload-confirm');
          });
        }).then(result => {
          this.reloadConfirmVisiable = false;
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
    },
    switchToCurrentFile() {
      let cm = this.$refs.codemirror.cminstance;
      cm.swapDoc(this.currentFile.doc);
      this.isAfterSwapDoc = true;
      this.renderCurrentFile();
    },
    createAndSwitchToNewFile() {
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
      if (file.language !== undefined) {
        mode = CodeMirror.findModeByName(file.language).mime;
      } else {
        if (CodeMirror.findModeByFileName(file.name) !== undefined) {
          mode = CodeMirror.findModeByFileName(file.name).mime;
        } else {
          mode = 'text/plain';
        }
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
      file.codeInit = file.doc.getValue();
      file.code = file.doc.getValue();
      file.locksInit = this.getLocks(file);
      file.locks = this.getLocks(file);
      this.$emit('saved', index);
      this.setSaving(file, false);
      this.setModificationState(file);
    },
    renderDoc(file) {
      // Suppose that the followings might be changed and need to be rerendered:
      // - line notes
      // - errors and warnings
      // - file mode
      file.doc.cm.setOption('mode', this.getFileMode(file));
      this.clearFeedbackNotes(file.doc);
      this.addFeedbackNotes(file.doc, file.feedbackNotes);
      this.clearLineNotes(file.doc);
      this.addLineNotes(file.doc, file.lineNotes);
      this.clearLineClasses(file.doc);
      this.addLineClasses(file.doc, file.lineClasses);
    },
    renderCurrentFile() {
      this.renderDoc(this.currentFile);
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
      } else {
        if (index < this.currentActiveIndex) {
          this.switchToPreviousTab();
        } else if (index === this.currentActiveIndex) {
          this.switchToPreviousTab();
          this.switchToCurrentFile();
        }
      }
    },
    beforeCloseTab(index) {
      return () => {
        return new Promise(returnToTab => {
          let file = this.files[index];
          if (file.isModified) {
            this.closeConfirmFileName = file.name;
            this.closeConfirmVisiable = true;
            new Promise(resolve => {
              this.$on('close-confirm', result => {
                resolve(result);
                this.$off('close-confirm');
              });
            }).then(result => {
              this.closeConfirmVisiable = false;
              if (result === 'cancel') {
                returnToTab(false);
              } else {
                if (result === 'save') {
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
              }
            });
          } else {
            returnToTab(true);
          }
        });
      };
    },

    ////////////////////////////
    // Feedback Notes Control //
    ////////////////////////////
    addFeedbackNotes(doc, feedbackNotes) {
      if (this.hasFeedbackNotes) {
        if (doc.feedbackNotes === undefined) {
          doc.feedbackNotes = [];
          doc.feedbackNotesGutterMarkers = [];
        }
        if (feedbackNotes !== undefined) {
          feedbackNotes.forEach(feedbackNote => {
            this.addFeedbackNote(doc, feedbackNote);
          });
        }
      }
    },
    addFeedbackNote(doc, feedbackNote) {
      let feedbackNoteMark = doc.markText(feedbackNote.from, feedbackNote.to, {
        className: 'feedback-' + feedbackNote.type,
        attributes: {
          content: feedbackNote.content
        }
      });
      let feedbackNoteGutterMark = this.addFeedbackNoteGutterMark(
        doc,
        feedbackNote
      );
      doc.feedbackNotesGutterMarkers.push(feedbackNoteGutterMark);
      doc.feedbackNotes.push(feedbackNoteMark);
    },
    addFeedbackNoteGutterMark(doc, feedbackNote) {
      let line = feedbackNote.from.line;
      let element = document.createElement('div');
      element.className = 'jsk-code-editor-feedback-note-marker';
      element.innerHTML = '<i class="' + feedbackNote.type + '"></i>';
      return doc.setGutterMarker(line, 'CodeMirror-feedback-notes', element);
    },
    clearFeedbackNotes(doc) {
      if (this.hasFeedbackNotes) {
        if (doc.feedbackNotes !== undefined) {
          doc.feedbackNotes.forEach(feedbackNote => feedbackNote.clear());
        }
        if (doc.feedbackNotesGutterMarkers !== undefined) {
          doc.feedbackNotesGutterMarkers.forEach(feedbackNotesGutterMarker => {
            doc.setGutterMarker(
              feedbackNotesGutterMarker.lineNo(),
              'CodeMirror-feedback-notes',
              null
            );
          });
        }
        doc.feedbackNotesGutterMarkers = undefined;
        doc.feedbackNotes = undefined;
      }
    },
    showFeedbackTooltipAtMouse(mouse) {
      this.feedbackTooltipVisiable = false;
      let feedbackNotes = this.getFeedbackNoteMarksAtMouse(
        mouse.pageX,
        mouse.pageY
      );
      if (feedbackNotes.length > 0) {
        this.setFeedbackTooltipPosition(feedbackNotes[0]);
        this.feedbackTooltipVisiable = true;
        this.feedbackTooltipContent = feedbackNotes[0].attributes.content;
      }
    },
    setFeedbackTooltipPosition(feedbackNote) {
      let cm = this.$refs.codemirror.cminstance;
      let tooltipPositionLeft = cm.charCoords(feedbackNote.find().from);
      let tooltipPositionRight = cm.charCoords(feedbackNote.find().to);
      let tooltipPositionX =
        (tooltipPositionLeft.left + tooltipPositionRight.left) / 2;
      let tooltipPositionY = tooltipPositionRight.top;
      if (tooltipPositionY > window.innerHeight / 2) {
        this.feedbackTooltipPosition.top = `${tooltipPositionY + 10}px`;
        this.feedbackTooltipPlacement = 'top';
      } else {
        this.feedbackTooltipPosition.top = `${tooltipPositionY - 10}px`;
        this.feedbackTooltipPlacement = 'bottom';
      }
      this.feedbackTooltipPosition.left = `${tooltipPositionX - 10}px`;
    },
    getFeedbackNoteMarksAtMouse(pageX, pageY) {
      let cm = this.$refs.codemirror.cminstance;
      let mousePosition = cm.coordsChar({ left: pageX, top: pageY });
      return cm.findMarksAt(mousePosition).filter(mark => {
        return (
          mark.className === 'feedback-warning' ||
          mark.className === 'feedback-error'
        );
      });
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
    },

    ////////////////////////
    // Breakpoint Control //
    ////////////////////////
    getBreakpoints(index) {
      return this.files[index].doc.breakpoints;
    },
    hasBreakpoint(line, cm) {
      if (cm === undefined) {
        cm = this.$refs.codemirror.cminstance;
      }
      let gutterMarkers = cm.lineInfo(line).gutterMarkers;
      let hasBreakpoint = gutterMarkers !== null;
      if (gutterMarkers !== null) {
        if (!gutterMarkers['CodeMirror-breakpoints']) {
          hasBreakpoint = false;
        }
      }
      return hasBreakpoint;
    },
    setBreakpoint(cm, line) {
      let doc = cm.getDoc();
      if (doc.breakpoints === undefined) {
        doc.breakpoints = [];
      }
      if (this.hasBreakpointControl) {
        if (this.hasBreakpoint(line, cm)) {
          this.removeBreakpoint(doc, line);
        } else {
          this.addBreakpoint(doc, line);
        }
      }
    },
    addBreakpoint(doc, line) {
      let element = document.createElement('div');
      element.className = 'jsk-code-editor-breakpoint';
      element.innerHTML = '●';
      doc.setGutterMarker(line, 'CodeMirror-breakpoints', element);
      doc.breakpoints.push(line);
    },
    removeBreakpoint(doc, line) {
      doc.setGutterMarker(line, 'CodeMirror-breakpoints', null);
      doc.breakpoints = doc.breakpoints.filter(function(value) {
        return value !== line;
      });
    },

    /////////////////////////
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
          this.addLock(doc, lock);
        });
      }
    },
    addLock(doc, lock) {
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
    clearLocks(doc) {
      if (doc.locks !== undefined) {
        doc.locks.forEach(lockMark => lockMark.clear());
      }
      doc.locks = undefined;
    },
    lockSelectedCode(hide = false) {
      let cm = this.$refs.codemirror.cminstance;
      let newLock = cm.listSelections()[0];
      let lock = this.removeSelectionDirection(newLock);
      lock.hide = hide;
      this.checkLockEdgeCases(lock).then(position => {
        if (position === 'left' || position === 'both') {
          lock.from.ch -= 1;
          this.currentFile.lockStart = true;
        }
        if (position === 'right' || position === 'both') {
          lock.to.ch += 1;
          this.currentFile.lockEnd = true;
        }
        this.lockConfirmVisiable = false;
        this.addLocks(cm.doc, [lock]);
      });
    },
    checkLockEdgeCases(lock) {
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
          this.lockConfirmVisiable = true;
          this.$on('lock-confirm', position => {
            resolve(position);
            this.$off('lock-confirm');
          });
        } else {
          resolve('none');
        }
      })
    },
    getLocksAtSelection() {
      let cm = this.$refs.codemirror.cminstance;
      if (cm.listSelections().length === 1) {
        let selection = this.removeSelectionDirection(cm.listSelections()[0]);
        return cm.findMarks(selection.from, selection.to).filter(mark => {
          return mark.className === 'locked-code';
        });
      }
    },
    getLocksAtMouse(pageX, pageY) {
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
    showLockControlAtSelection(mouse) {
      this.selectedLocks = this.getLocksAtSelection();
      if (this.selectedLocks.length > 0) {
        this.lockMenuMode = 'unlock';
        this.lockMenuPosition.left = `${mouse.clientX - 15}px`;
      } else {
        this.lockMenuMode = 'lock';
        this.lockMenuPosition.left = `${mouse.clientX - 30}px`;
      }
      this.lockMenuPosition.top = `${mouse.clientY - 15}px`;
      this.lockMenuVisiable = true;
    },
    showLockControlAtMouse(mouse) {
      this.selectedLocks = this.getLocksAtMouse(mouse.pageX, mouse.pageY);
      if (this.selectedLocks.length > 0) {
        this.lockMenuMode = 'unlock';
        this.lockMenuPosition.left = `${mouse.clientX - 30}px`;
        this.lockMenuPosition.top = `${mouse.clientY - 15}px`;
        this.lockMenuVisiable = true;
      }
    },
    hiddenCodeReplacement() {
      let element = document.createElement('span');
      element.innerHTML =
        '<span class="CodeMirror-foldmarker locked-code" title="' +
        CodeEditorTranslation[this.codeEditorLanguage].hiddenLock +
        '">…</span>';
      return element;
    },

    ////////////////////////////////
    // Configuration Functions /////
    ////////////////////////////////
    setEditorMode(mode) {
      if (mode === 'vim') {
        this.editorOptions.vimMode = true;
      } else {
        this.editorOptions.vimMode = false;
      }
      this.editorOptions.keyMap = mode;
    },
    setEditorIndentSize(indentSize) {
      indentSize = parseInt(indentSize);
      this.editorOptions.tabSize = indentSize;
      this.editorOptions.indentUnit = indentSize;
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
    tooltip(file) {
      if (file.path !== undefined) {
        return file.path;
      }
      return file.name;
    }
  }
};
</script>
<style scoped>
.tabs {
  flex-shrink: 0;
  flex-grow: 0;
}
.modified-mark,
.saving-mark {
  color: #399af4;
}
.saving-mark {
  padding-top: 1px;
}
</style>
<style>
.jsk-code-editor-container {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.jsk-code-editor {
  line-height: 24px;
  font-weight: 400;
  overflow-y: auto;
  font-size: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
}
.jsk-code-editor-codemirror {
  height: auto;
  align-self: stretch;
  width: 100%;
}
.jsk-code-editor-codemirror .CodeMirror {
  height: 100%;
  font-family: Inconsolata, Monaco, Menlo, Consolas, "Courier New", monospace !important;
}
.jsk-code-editor-codemirror .CodeMirror-overlayscroll-horizontal,
.jsk-code-editor-codemirror .CodeMirror-overlayscroll-vertical,
.jsk-code-editor-codemirror .CodeMirror-overlayscroll-horizontal div,
.jsk-code-editor-codemirror .CodeMirror-overlayscroll-vertical div {
  border-radius: 5px;
}
.jsk-code-editor-codemirror .cm-s-monokai .CodeMirror-matchingbracket {
  text-decoration: none;
  padding-bottom: 1px;
  outline: 1px solid #777777;
}
.jsk-code-editor-codemirror .cm-s-monokai .CodeMirror-nonmatchingbracket {
  color: #f33b29;
}
.jsk-code-editor-codemirror .cm-s-monokai .CodeMirror-overlayscroll-horizontal div,
.jsk-code-editor-codemirror .cm-s-monokai .CodeMirror-overlayscroll-vertical div {
  background: rgba(255, 255, 255, 0.15);
}
.jsk-code-editor-codemirror .cm-s-eclipse .CodeMirror-gutters {
  border-right: none;
  background: none;
}
.jsk-code-editor-codemirror .CodeMirror-focused .cm-matchhighlight {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFklEQVQI12NgYGBgkKzc8x9CMDAwAAAmhwSbidEoSQAAAABJRU5ErkJggg==");
  background-position: bottom;
  background-repeat: repeat-x;
}
.jsk-code-editor-codemirror .CodeMirror-selection-highlight-scrollbar {
  background-color: #399af4;
}
.jsk-code-editor-codemirror .CodeMirror-breakpoints {
  width: 14px;
}
.jsk-code-editor-codemirror .CodeMirror-feedback-notes {
  width: 16px;
}
.jsk-code-editor .locked-code,
.jsk-code-editor .locked-code-focus {
  opacity: 0.6;
  cursor: not-allowed;
}
.jsk-code-editor .locked-code-focus {
  border-bottom: 1px solid #4ec53d;
}
.jsk-code-editor .feedback-error,
.jsk-code-editor .feedback-warning {
  background-position: left bottom;
  background-repeat: repeat-x;
}
.jsk-code-editor .feedback-error {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJDw4cOCW1/KIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAHElEQVQI12NggIL/DAz/GdA5/xkY/qPKMDAwAADLZwf5rvm+LQAAAABJRU5ErkJggg==");
}
.jsk-code-editor .feedback-warning {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJFhQXEbhTg7YAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAMklEQVQI12NkgIIvJ3QXMjAwdDN+OaEbysDA4MPAwNDNwMCwiOHLCd1zX07o6kBVGQEAKBANtobskNMAAAAASUVORK5CYII=");
}
.jsk-code-editor-note {
  background: #d1d8e4;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  color: #333333;
  display: flex;
}
.jsk-code-editor-note-success {
  background: #bff199;
  color: #41b146;
}
.jsk-code-editor-note-warning {
  background: #fff598;
  color: #ffb020;
}
.jsk-code-editor-note-error {
  background: #ffd6d2;
  color: #dd2e1d;
}
.jsk-code-editor-note > i {
  line-height: 24px;
  font-size: 16px;
  width: 24px;
}
.jsk-code-editor-note > div p {
  margin: 0;
}
.jsk-code-editor-breakpoint {
  font-size: 16px;
  line-height: 22px;
  height: 24px;
  text-align: right;
  color: #dd2e1d;
}
.jsk-code-editor-feedback-note-marker {
  height: 24px;
}
.jsk-code-editor-feedback-note-marker i {
  margin-top: 5px;
  margin-left: 2px;
  width: 14px;
  height: 14px;
  display: block;
  background-repeat: no-repeat;
}
.jsk-code-editor-feedback-note-marker i.warning {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADqADAAQAAAABAAAADgAAAAC98Dn6AAABJklEQVQoFXWRTUoDQRCFq8ZR/MOIKLgMEX83wRuYA2SjG0Ev4V5B8AyeRFyK7ly5ExXREAmCKxkFs4g6z66SMp2asaCp7lfv8U1PM5UUTmtLeQ9HzMQ8NLzHzftnb2Mv4HwjxdvTNYBlmYXwDVeqdW5cfMXeJD7oPuvsWkjOAK1R0LxvgKi0rH0HooXYGEyPPF1diamDRKG5kFJFc9Q/oqed3M4rtLn6ot1T+0RHO3uYI1lW+iURVYNKo+99M/3XETzilfkv0dFkUBn91CV7q5jK/m5meu2O6HZmvGeSdrtrQu/tnbI/eXxZI1m+1BsyKcCb4Zn9nLbrnYJmQshspWC0SnK0OPthvkIPwVaaTE0c5Fk3Z8Y6gfvPU7AHgZGD+CoZmzz8AUtLhcGuiyt0AAAAAElFTkSuQmCC");
}
.jsk-code-editor-feedback-note-marker i.error {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADqADAAQAAAABAAAADgAAAAC98Dn6AAABSUlEQVQoFWNkQAOPLS05f3176szIwKgOkvrP8P8mG5f0Xtnjx78jK2VE5twzkAv99///NKBqEWRxBkaGN0yMjFlKFx6thonDNd7Vl5vx////dJgENpqRkXGm8sVHGSA5sEawTf/+r8KmGF2MiYkxDGQzE8hPYOdBVfB4+DKINvUwMPHyATE/g2hzLwO3mw9cP0gtSA8LKCCQ/cRp7cDA5xfKwKaizgB0GgO7lh4Dw99/DF93bYFoBvofpIcFFHrAkIOb+LarkYFNWY2BQ1sfLPbj8gWGtz1NcHkQA6SHCUUEzAEKA22CAyYgG5kPlWACxRNcEZAhXFYHdh7Iph9XL4JtFi6pQ1YCjlsWUOT+/PbkDcyf3w7vB/sJ7DygTSBN344AxWAAGKcgPeRHB8ggULyAIhdmKC4apAaWepBCgYGBrCQHs4XYRA4AxY+NWEoE1PsAAAAASUVORK5CYII=");
}
.jsk-code-editor-control {
  margin: 0;
  padding: 0;
  margin-right: 13px;
  list-style: none;
  display: flex;
  justify-content: flex-end;
}
.jsk-code-editor-control li {
  margin-left: 13px;
  line-height: 35px;
}
.jsk-code-editor-control li i {
  font-size: 16px;
  height: 35px;
  line-height: 35px;
  display: inline-block;
  box-sizing: content-box;
}
.jsk-code-editor-control li i:hover {
  cursor: pointer;
}
.jsk-code-editor-control li:first-child {
  margin-left: 0;
}
.jsk-settings-form {
  margin-top: -10px;
}
.jsk-settings-form div {
  margin-bottom: 10px !important;
}
.jsk-settings-form div:last-child {
  margin-bottom: 0 !important;
}
.jsk-settings-form div > label.el-form-item__label {
  padding-bottom: 0;
}
</style>

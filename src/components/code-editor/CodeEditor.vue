<template>
  <div class="jsk-code-editor-container">
    <jsk-tabs
      ref="tabs"
      class="file-tabs"
      :tabs-init-active="0"
      :tabs-theme="settings.theme || 'light'"
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
        :is-closable="isFileClosable(file, index)"
        @switch="switchToTab"
        @close="closeTab"
        @contextmenu.native.prevent="$emit('context-menu', index)"
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
            @touchstart.prevent="createAndSwitchToNewFile"
          />
        </li>
        <li v-if="hasSaveCurrentFileControl">
          <i
            class="el-icon-j-save"
            @click="saveCurrentFile"
            @touchstart.prevent="saveCurrentFile"
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
                v-for="(label, key) in settingsContent.labels"
                :key="key"
                :form-item-label="label"
              >
                <jsk-radio-group
                  v-model="settings[key]"
                  radio-group-size="mini"
                >
                  <jsk-radio-button
                    v-for="(content, labelName) in settingsContent[key]"
                    :key="labelName"
                    :label="labelName"
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
        :style="{
          fontSize: editorFontSize,
          lineHeight: '1.5em',
        }"
        @input="setCurrentFileModificationState"
        @refresh="renderCurrentFileLineArrows"
        @gutterContextMenu="setBreakpoint"
      />
      <code-editor-lock-menu
        v-show="lockMenuVisible"
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
        :feedback-tooltip-visible="feedbackTooltipVisible"
        :feedback-tooltip-theme="feedbackTooltipTheme"
        :feedback-tooltip-content="feedbackTooltipContent"
        feedback-tooltip-max-width="25vw"
      />
    </div>
    <code-editor-close-confirm
      :close-confirm-filename="closeConfirmFileName"
      :close-confirm-content="closeConfirmContent"
      :visible.sync="closeConfirmVisible"
    />
    <code-editor-reload-confirm
      :reload-confirm-filename="reloadConfirmFileName"
      :reload-confirm-content="reloadConfirmContent"
      :visible.sync="reloadConfirmVisible"
    />
    <code-editor-lock-confirm
      :lock-confirm-content="lockConfirmContent"
      :lock-confirm-positions="lockConfirmPositions"
      :visible.sync="lockConfirmVisible"
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
    hasLineArrows: {
      type: Boolean,
      default: true
    },
    hasModificationLossConfirm: {
      type: Boolean,
      default: false
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
    hasCustomTabTooltip: {
      type: Boolean,
      default: false
    },
    customTabTooltips: {
      type: Array,
      default: () => {
        return []
      }
    },
    beforeSaveFile: {
      type: Function,
      default: () => {
        return Promise.resolve(true);
      }
    },
    beforeSaveAllFiles: {
      type: Function,
      default: () => {
        return Promise.resolve(true);
      }
    },
    canCreateNewFile: {
      type: Boolean,
      default: true
    },
    isFirstFileClosable: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      closeConfirmVisible: false,
      closeConfirmFileName: undefined,
      reloadConfirmVisible: false,
      reloadConfirmFileName: undefined,
      lockConfirmVisible: false,
      lockConfirmPositions: [],
      feedbackTooltipPlacement: undefined,
      feedbackTooltipVisible: false,
      feedbackTooltipContent: undefined,
      feedbackTooltipPosition: { left: 0, top: 0 },
      lockMenuVisible: false,
      lockMenuMode: 'lock',
      lockMenuPosition: { left: 0, top: 0 },
      selectedLocks: undefined,
      settings: _cloneDeep(CodeEditorDefaultSettings),
      editorOptions: _cloneDeep(CodeEditorCodemirrorOptions),
      editorFontSizeOption: 'large',
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
      if (this.settings.theme) {
        return themeMapping[this.settings.theme];
      }
      return themeMapping['light'];
    },
    editorFontSize: function() {
      let fontSizeMapping = {
        small: '14px',
        normal: '16px',
        large: '20px',
        'extra-large': '24px'
      };
      if (this.editorFontSizeOption) {
        return fontSizeMapping[this.editorFontSizeOption];
      }
      return fontSizeMapping['normal'];
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
        this.setEditorFontSize(this.settings.fontSize);
        this.setEditorAutoIndent(this.settings.autoIndent);
        if (!_isEqual(this.settings, this.codeEditorSettings)) {
          this.$emit('update:codeEditorSettings', this.settings);
        }
      }
    },
    editorFontSizeOption: function () {
      this.$nextTick(() => {
        this.renderCurrentFile();
      })
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
    },
    hasLockControl() {
      const cm = this.$refs.codemirror.cminstance;
      if (this.hasLockControl) {
        this.initLockControlListener(cm)
      } else {
        this.removeLockControlListener(cm)
      }
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
  beforeDestroy: function() {
    if (this.hasModificationLossConfirm) {
      window.removeEventListener('beforeunload', this.modificationLossPrevention)
    }
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
      this.addLineArrows(file.doc, file.lineArrows);
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
      if (this.hasModificationLossConfirm) {
        window.addEventListener('beforeunload', this.modificationLossPrevention)
      }
    },
    listenCmContextMenuEvent(cm, e) {
      e.preventDefault();
      setTimeout(() => {
        if (cm.somethingSelected()) {
          this.showLockControlAtSelection(e);
        } else {
          this.showLockControlAtMouse(e);
        }
      }, 101);
    },
    listenCmFocusEvent(cm) {
      this.lockMenuVisible = false;
      cm.focus();
    },
    initLockControlListener(cm) {
      if (this.hasLockControl) {
        cm.on('contextmenu', this.listenCmContextMenuEvent);
        cm.on('update', this.listenCmFocusEvent);
      }
    },
    removeLockControlListener(cm) {
      cm.off('contextmenu', this.listenCmContextMenuEvent);
      cm.off('update', this.listenCmFocusEvent);
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
      let isCodeChanged = file.codeInit !== file.doc.getValue();
      let areLocksChanged = !_isEqual(file.locksInit, this.getLocks(file));
      this.isAfterSwapDoc = false;
      file.isModified = isCodeChanged || areLocksChanged;
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
      return !!(this.currentFileCode !== this.currentFile.codeInit ||
        !_isEqual(this.currentFileLocks, this.currentFile.locksInit));
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
      file.codeInit = file.doc.getValue();
      file.code = file.doc.getValue();
      file.locksInit = this.getLocks(file);
      file.locks = this.getLocks(file);
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
      doc.setGutterMarker(line, 'CodeMirror-line-arrows', element);
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
        doc.setGutterMarker(line, 'CodeMirror-line-arrows', element);
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
      doc.setGutterMarker(line, 'CodeMirror-line-arrows', element);
    },
    clearLineArrows(doc) {
      if (this.hasLineArrows) {
        doc.clearGutter('CodeMirror-line-arrows');
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
      doc.setGutterMarker(line, 'CodeMirror-feedback-notes', element);
    },
    clearFeedbackNotes(doc) {
      if (this.hasFeedbackNotes) {
        if (doc.feedbackNoteRangeMarkers !== undefined) {
          doc.feedbackNoteRangeMarkers.forEach(feedbackNoteRangeMarker => feedbackNoteRangeMarker.clear());
        }
        if (doc.feedbackNotePositionMarkers !== undefined) {
          doc.feedbackNotePositionMarkers.forEach(feedbackNotePositionMarker => feedbackNotePositionMarker.clear());
        }
        doc.clearGutter('CodeMirror-feedback-notes');
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
        doc.setGutterMarker(line, 'CodeMirror-feedback-notes', null);
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
      let newLocks = cm.listSelections().map((selection, index) => {
        let lock = this.removeSelectionDirection(selection);
        lock.hide = hide;
        if (index === 0) {
          this.checkLockEdgeCases(lock).then(position => {
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
      this.lockMenuVisible = true;
    },
    showLockControlAtMouse(mouse) {
      this.selectedLocks = this.getLocksAtMouse(mouse.pageX, mouse.pageY);
      if (this.selectedLocks.length > 0) {
        this.lockMenuMode = 'unlock';
        this.lockMenuPosition.left = `${mouse.clientX - 30}px`;
        this.lockMenuPosition.top = `${mouse.clientY - 15}px`;
        this.lockMenuVisible = true;
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
    setEditorFontSize(fontSize) {
      this.editorFontSizeOption = fontSize;
    },
    setEditorAutoIndent(autoIndent) {
      delete this.editorOptions.extraKeys['Enter']
      this.editorOptions.smartIndent = true
      switch (autoIndent) {
        case 'force':
          this.editorOptions.extraKeys['Enter'] = (cm) => {
            if (cm.doc.mode.name !== 'python') {
              cm.execCommand('indentAuto')
            }
            cm.replaceSelection('\n', 'end')
            cm.execCommand('indentAuto')
          }
          break;
        case 'smart':
          break;
        default:
          this.editorOptions.smartIndent = false
      }
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
  }
};
</script>
<style scoped>
.file-tabs {
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
  width: 0.875em;
}
.jsk-code-editor-codemirror .CodeMirror-feedback-notes {
  width: 1em;
}
.jsk-code-editor-codemirror .CodeMirror-line-arrows {
  width: 0.75em;
}
.jsk-code-editor .locked-code,
.jsk-code-editor .locked-code-focus {
  opacity: 0.6;
  cursor: not-allowed;
}
.jsk-code-editor .locked-code-focus {
  border-bottom: 1px solid #4ec53d;
}
.jsk-code-editor .feedback-range-error,
.jsk-code-editor .feedback-range-warning {
  background-position: left bottom;
  background-repeat: repeat-x;
}
.jsk-code-editor .feedback-range-error {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJDw4cOCW1/KIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAHElEQVQI12NggIL/DAz/GdA5/xkY/qPKMDAwAADLZwf5rvm+LQAAAABJRU5ErkJggg==");
}
.jsk-code-editor .feedback-range-warning {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJFhQXEbhTg7YAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAMklEQVQI12NkgIIvJ3QXMjAwdDN+OaEbysDA4MPAwNDNwMCwiOHLCd1zX07o6kBVGQEAKBANtobskNMAAAAASUVORK5CYII=");
}
.jsk-code-editor .feedback-position-error,
.jsk-code-editor .feedback-position-warning {
  position: relative;
  display: inline-block;
  width: 0;
  height: 0.8125em;
  border-left-width: 1px;
  border-left-style: dotted;
}
.jsk-code-editor .feedback-position-error {
  border-color: #f00;
}
.jsk-code-editor .feedback-position-warning {
  border-color: #e2bb2c;
}
.jsk-code-editor .feedback-position-error::after,
.jsk-code-editor .feedback-position-warning::after {
  content: "";
  position: absolute;
  background-repeat: no-repeat;
  width: 5px;
  height: 4px;
  left: -3px;
  bottom: -4px;
  display: block;
}
.jsk-code-editor .feedback-position-error::after {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAEAQMAAAB8/WcDAAAABlBMVEUAAAD/AAAb/40iAAAAAXRSTlMAQObYZgAAABBJREFUCNdjUGAoYLjB0AEABigB8ftae1QAAAAASUVORK5CYII=')
}
.jsk-code-editor .feedback-position-warning::after {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAEAQMAAAB8/WcDAAAABlBMVEUAAAD201WlOoUKAAAAAXRSTlMAQObYZgAAABBJREFUCNdjUGAoYLjB0AEABigB8ftae1QAAAAASUVORK5CYII=')
}
.jsk-code-editor-note {
  background: #d1d8e4;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 5px 10px;
  font-size: inherit;
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
  line-height: 1.8em;
  font-size: inherit;
  width: 1.5em;
}
.jsk-code-editor-note > div p {
  margin: 0;
}
.jsk-code-editor-breakpoint {
  font-size: inherit;
  line-height: 22px;
  height: 1.5em;
  text-align: right;
  color: #dd2e1d;
}
.jsk-code-editor-line-arrow-marker {
  height: 1.5em;
  padding-left: 2px;
  overflow: hidden;
  box-sizing: border-box;
}
.jsk-code-editor-line-arrow-marker i {
  width: 0.5em;
  display: block;
  border-style: solid none solid solid;
  border-right: none;
  border-width: 1px;
  height: 100%;
  position: relative;
}
.jsk-code-editor-line-arrow-marker i.warning {
  border-color: #ffb020;
}
.jsk-code-editor-line-arrow-marker i.danger {
  border-color: #dd2e1d;
}
.jsk-code-editor-line-arrow-middle-marker i {
  height: 100%;
  width: 0.375em;
  display: block;
  border-style: none;
  border-left-style: solid;
}
.jsk-code-editor-line-arrow-start-down-marker,
.jsk-code-editor-line-arrow-end-up-marker {
  padding-top: 0.75em;
}
.jsk-code-editor-line-arrow-start-up-marker,
.jsk-code-editor-line-arrow-end-down-marker {
  padding-bottom: 0.75em;
}
.jsk-code-editor-line-arrow-start-down-marker i,
.jsk-code-editor-line-arrow-end-up-marker i {
  border-bottom: none;
  border-top-left-radius: 0.1875em;
}
.jsk-code-editor-line-arrow-start-up-marker i,
.jsk-code-editor-line-arrow-end-down-marker i {
  border-top: none;
  border-bottom-left-radius: 0.1875em;
}
.jsk-code-editor-line-arrow-end-up-marker i::after,
.jsk-code-editor-line-arrow-end-down-marker i::after {
  position: absolute;
  right: -0.125em;
  width: 0;
  height: 0;
  display: block;
  content: " ";
  border-style: solid;
  border-width: 0.1875em 0 0.1875em 0.4375em;
}
.jsk-code-editor-line-arrow-end-down-marker i::after {
  bottom: -0.1875em;
}
.jsk-code-editor-line-arrow-end-up-marker i::after {
  top: -0.1875em;
}
.jsk-code-editor-line-arrow-end-up-marker i.warning::after,
.jsk-code-editor-line-arrow-end-down-marker i.warning::after {
  border-color: transparent transparent transparent #ffb020;
}
.jsk-code-editor-line-arrow-end-up-marker i.danger::after,
.jsk-code-editor-line-arrow-end-down-marker i.danger::after {
  border-color: transparent transparent transparent #dd2e1d;
}
.jsk-code-editor-feedback-note-marker i {
  display: flex;
  background-repeat: no-repeat;
  font-family: 'jellies-icons', sans-serif !important;
  font-style: normal;
}
.jsk-code-editor-feedback-note-marker i.warning::after {
  color: #ffb020;
  content: "\e927";
}
.jsk-code-editor-feedback-note-marker i.error::after {
  color: #dd2e1d;
  content: "\e90f";
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
.jsk-settings-form label {
  font-size: 14px;
  line-height: 20px !important;
}
.jsk-settings-form div {
  margin-bottom: 6px !important;
}
.jsk-settings-form div:last-child {
  margin-bottom: 0 !important;
}
.jsk-settings-form div > label.el-form-item__label {
  padding-bottom: 0;
}
</style>

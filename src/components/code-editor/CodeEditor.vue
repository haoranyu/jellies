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
      <code-editor-context-menu
        v-show="contextMenuVisible"
        :style="contextMenuPosition"
        :menu-mode="contextMenuMode"
        :has-lock-control="hasLockControl"
        :has-placeholder-control="hasPlaceholderControl"
        @lock-change="setCurrentFileModificationState"
        @lock="lockSelectedCode"
        @unlock="unlockLockedCode"
        @hide="lockSelectedCode(true)"
        @add-placeholder="addPlaceholder"
        @remove-placeholder="removePlaceholder"
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
import CodeEditorCloseConfirm from './addons/CloseConfirm';
import CodeEditorReloadConfirm from './addons/ReloadConfirm';
import CodeEditorLockConfirm from './addons/LockConfirm';
import CodeEditorContextMenu from './addons/ContextMenu';
import CodeEditorFeedbackTooltip from './addons/FeedbackTooltip';
import CodeEditorCodemirrorOptions from './configs/options';
import CodeEditorDefaultSettings from './configs/settings';
import breakpoints from './mixins/breakpoints';
import files from './mixins/files';
import feedbacks from './mixins/feedbacks';
import settings from './mixins/settings';
import marks from './mixins/marks';
const _isEqual = require('lodash.isequal');
const _merge = require('lodash.merge');
const _cloneDeep = require('lodash.clonedeep');
export default {
  name: 'JskCodeEditor',
  components: {
    CodeEditorCloseConfirm,
    CodeEditorReloadConfirm,
    CodeEditorLockConfirm,
    CodeEditorContextMenu,
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
  mixins: [
    breakpoints,
    feedbacks,
    files,
    settings,
    marks
  ],
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
    isViewportKept: {
      type: Boolean,
      default: false
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
    },
    hasPlaceholderControl: {
      type: Boolean,
      default: false
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
      contextMenuVisible: false,
      contextMenuMode: 'lock',
      contextMenuPosition: { left: 0, top: 0 },
      selectedLocks: undefined,
      selectedPlaceholders: undefined,
      settings: _cloneDeep(CodeEditorDefaultSettings),
      editorOptions: _cloneDeep(CodeEditorCodemirrorOptions),
      editorFontSizeOption: 'large',
      currentActiveIndex: 0,
      hasPlaceholderFocused: false
    };
  },
  computed: {
    codemirror() {
      return this.$refs.codemirror.codemirror;
    },
    controlWidth() {
      if (typeof this.codeEditorControlPanelWidth === 'string') {
        return this.codeEditorControlPanelWidth;
      }
      return this.codeEditorControlPanelWidth + 'px';
    }
  },
  watch: {
    files: function () {
      let viewport = null;
      if (this.isViewportKept) {
        viewport = this.codemirror.getScrollInfo();
      }
      this.initFiles();
      if (this.isViewportKept) {
        this.$nextTick(() => {
          this.codemirror.scrollTo(viewport.left, viewport.top);
        });
      }
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
      this.updateControlMenuListeners();
    },
    hasPlaceholderControl() {
      this.updateControlMenuListeners();
    },
    hasPlaceholderFocused(newValue) {
      if (this.$refs.codemirror) {
        const codemirrorWrapper = this.$refs.codemirror.cminstance.getWrapperElement();
        if (newValue) {
          codemirrorWrapper.classList.add('has-placeholder-focused');
        } else {
          codemirrorWrapper.classList.remove('has-placeholder-focused');
        }
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
      this.updateControlMenuListeners(cm);
      this.initFeedbackTooltipListener(cm);
      if (this.hasModificationLossConfirm) {
        window.addEventListener('beforeunload', this.modificationLossPrevention)
      }
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
<style lang="scss">
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
  .code-placeholder {
    display: inline-block;
    border: 1px solid #aaa;
    border-radius: 5px;
    color: #777;
    cursor: pointer;
    padding: 0 4px;
    margin: 0 1px;
    position: relative;
    line-height: 1.25;
    font-weight: bold;
    
    &::before {
      content: attr(data-placeholder);
      display: inline-block;
    }
    
    &:hover {
      background-color: color-mix(in srgb, #D1D8E4 50%, transparent);
    }
  }

  .code-placeholder-focus {
    background-color: #0164E1 !important;
    border: 1px solid #0164E1 !important;
    color: #FFF !important;
  }

  &.cm-s-monokai {
    .code-placeholder {
      color: #FFF !important;
      &:hover {
        background-color: color-mix(in srgb, #8B9AAE 50%, transparent);
      }
    }

    .code-placeholder-focus {
      background-color: #0059D1 !important;
      border-color: #0059D1 !important;
      color: #FFF !important;
    }
  }
  &.has-placeholder-focused {
    .CodeMirror-selected,
    .CodeMirror-selectedtext {
      background: transparent !important;
    }
  }
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

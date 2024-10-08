<template>
  <div
    :class="[
      'jsk-code-block',
      hasSelection ? '' : 'no-selection',
      hasLineNumbers ? '' : 'no-line-numbers',
      'jsk-code-block-copy-' + codeBlockCopyButtonTrigger
    ]"
    :style="{
      borderColor: codeBlockTheme === 'light' ? '#DDDDDD' : '#272822',
      width: width
    }"
  >
    <codemirror
      ref="codemirror"
      v-model="value"
      :options="cmOption"
      class="jsk-code-block-codemirror"
      :style="{
        maxHeight: maxHeight
      }"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
    <div class="jsk-code-block-buttons">
      <el-button
        v-if="isCopyAllowed"
        :type="copyButtonType"
        size="mini"
        class="jsk-code-block-copy"
        @click="onCopy"
      >
        {{ copyButtonText }}
      </el-button>
      <el-button
        v-if="isRunAllowed"
        type="info"
        size="mini"
        class="jsk-code-block-run"
        @click="onRun"
      >
        {{ codeBlockRunText }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import '../../plugins/codemirror/modes'
import '../../plugins/codemirror/themes'
import { Button } from 'element-ui';
import CodeMirror from 'codemirror';
import CopyToClipboard from 'copy-to-clipboard';
export default {
  name: 'JskCodeBlock',
  components: {
    ElButton: Button,
    codemirror
  },
  props: {
    codeBlockTheme: {
      type: String,
      default: 'light'
    },
    codeBlockRunText: {
      type: String,
      default: '运行'
    },
    codeBlockCopyText: {
      type: String,
      default: '复制'
    },
    codeBlockCopiedText: {
      type: String,
      default: '已复制'
    },
    codeBlockLanguage: {
      type: String,
      default: ''
    },
    codeBlockWidth: {
      type: [String, Number],
      default: 'inherit'
    },
    codeBlockMaxHeight: {
      type: [String, Number],
      default: 'inherit'
    },
    codeBlockCopyButtonTrigger: {
      type: String,
      default: 'show'
    },
    isSelectionAllowed: {
      type: Boolean,
      default: false
    },
    isCopyAllowed: {
      type: Boolean,
      default: false
    },
    isRunAllowed: {
      type: Boolean,
      default: false
    },
    hasLineNumbers: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      cmOption: {
        lineNumbers: true,
        readOnly: true,
        height: 'auto',
        lineWrapping: true,
        tabSize: 4,
        theme: 'eclipse',
        cursorBlinkRate: -1,
        autoheight: true,
        mode: 'text/plain'
      },
      isCopied: false,
      value: ''
    }
  },
  computed: {
    code: function() {
      if (this.$slots.default) {
        return this.$slots.default[0].text;
      }
      return '';
    },
    theme: function() {
      let themeMapping = {
        dark: 'monokai',
        light: 'eclipse'
      };
      return themeMapping[this.codeBlockTheme];
    },
    copyButtonType: function() {
      if (this.isCopied) {
        return 'success';
      } else if (this.codeBlockTheme === 'dark') {
        return 'primary';
      } else {
        return 'info';
      }
    },
    copyButtonText: function() {
      if (this.isCopied) {
        return this.codeBlockCopiedText;
      } else {
        return this.codeBlockCopyText;
      }
    },
    width: function() {
      if (typeof(this.codeBlockWidth) === 'string') {
        return this.codeBlockWidth;
      }
      return this.codeBlockWidth + 'px';
    },
    maxHeight: function() {
      if (typeof(this.codeBlockMaxHeight) === 'string') {
        return this.codeBlockMaxHeight;
      }
      return this.codeBlockMaxHeight + 'px';
    },
    hasSelection: function () {
      if (this.isSelectionAllowed || !this.readonly) {
        return true;
      }
      return false;
    }
  },
  watch: {
    value: function(value) {
      this.$emit('code-updated', value);
    },
    codeBlockLanguage: function () {
      this.refreshMode();
    }
  },
  mounted: function() {
    this.value = this.code;
    this.cmOption.readOnly = this.readonly;
    if (!this.readonly) {
      this.cmOption.cursorBlinkRate = 500;
    }
    this.cmOption.theme = this.theme;
    this.cmOption.lineNumbers = this.hasLineNumbers;
    this.cmOption.lineWrapping = this.hasLineNumbers;
    if (!this.hasSelection) {
      this.disableSelection();
    }
    this.refreshMode();
  },
  methods: {
    disableSelection: function() {
      this.$refs.codemirror.cminstance.on('mousedown', function(cm, event) {
        event.preventDefault();
      });
    },
    onCopy: function() {
      if (CopyToClipboard(this.value)) {
        this.isCopied = true;
      }
      setTimeout(() => {
        this.isCopied = false;
      }, 3000);
    },
    onRun: function() {
      this.$emit('run-code', {
        code: this.value,
        language: this.codeBlockLanguage
      });
    },
    refreshMode: function () {
      let result;
      if (this.codeBlockLanguage !== '') {
        result = CodeMirror.findModeByName(this.codeBlockLanguage);
      }
      this.cmOption.mode = result ? result.mime : 'text/plain';
    }
  }
}
</script>

<style scoped>
.jsk-code-block {
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
}
.jsk-code-block-buttons {
  position: absolute;
  top: 2px;
  right: 2px;
  z-index: 100;
}
.jsk-code-block-codemirror {
  overflow-y: auto;
}
.jsk-code-block-copy-hover .jsk-code-block-copy {
  display: none;
}
.jsk-code-block-copy-hover:hover .jsk-code-block-copy {
  display: block;
}
</style>
<style>
.jsk-code-block {
  line-height: 24px;
  overflow-y: auto;
}
.jsk-code-block-codemirror .CodeMirror {
  height: auto;
  font-family: Inconsolata, Monaco, Menlo, Consolas, "Courier New", monospace !important;
}
.jsk-code-block.no-selection .CodeMirror-line,
.jsk-code-block.no-selection .CodeMirror-lines {
  cursor: default;
}
.jsk-code-block.no-line-numbers .CodeMirror-lines {
  padding: 4px;
}
</style>

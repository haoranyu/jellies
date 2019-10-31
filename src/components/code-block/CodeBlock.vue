<template>
  <div
    :class="[
      'jsk-code-block',
      isSelectionAllowed ? '' : 'no-selection',
      'jsk-code-block-copy-' + codeBlockCopyButtonTrigger
    ]"
    :style="{
      borderColor: codeBlockTheme === 'light' ? '#DDDDDD' : '#272822',
      width: width
    }"
  >
    <codemirror
      ref="codemirror"
      v-model="code"
      :options="cmOption"
      class="jsk-code-block-codemirror"
      :style="{
        maxHeight: maxHeight
      }"
    >
    </codemirror>
    <jsk-button
      :button-type="buttonType"
      button-size="mini"
      v-if="isCopyAllowed"
      v-clipboard:copy="code"
      v-clipboard:success="onCopy"
      class="jsk-code-block-copy"
    >
      {{ isCopied ? codeBlockCopiedText : codeBlockCopyText }}
    </jsk-button>
  </div>
</template>


<script>
import CodeMirror from 'codemirror'
export default {
  name: 'JskCodeBlock',
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
      isCopied: false
    }
  },
  mounted: function() {
    this.cmOption.theme = this.theme;
    if (!this.isSelectionAllowed) {
      this.disableSelection();
    }
    if (this.codeBlockLanguage !== '') {
      this.cmOption.mode = CodeMirror.findModeByName(this.codeBlockLanguage).mode;
    }
  },
  methods: {
    disableSelection: function() {
      this.$refs.codemirror.cminstance.on('mousedown', function(cm, event) {
        event.preventDefault();
      });
    },
    onCopy: function() {
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 3000);
    }
  },
  props: {
    codeBlockTheme: {
      type: String,
      default: 'light'
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
        'dark': 'monokai',
        'light': 'eclipse'
      };
      return themeMapping[this.codeBlockTheme];
    },
    buttonType: function() {
      if (this.isCopied) {
        return 'success';
      } else if (this.codeBlockTheme === 'dark') {
        return 'primary';
      } else {
        return 'info';
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
  }
}
</script>

<style lang="scss" scoped>
.jsk-code-block {
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  &-copy {
    position: absolute;
    top: 2px;
    right: 2px;
    z-index: 100;
  }
  &-codemirror {
    overflow-y: auto;
  }
}
.jsk-code-block-copy-hover {
  .jsk-code-block-copy {
    display: none;
  }
  &:hover {
    .jsk-code-block-copy {
      display: block;
    }
  }
}
</style>
<style lang="scss">
.jsk-code-block {
  line-height: 24px;
  overflow-y: auto;
  .CodeMirror {
    height: auto;
  }
  &.no-selection {
    .CodeMirror {
      &-line,
      &-lines {
        cursor: default;
      }
    }
  }
}
</style>

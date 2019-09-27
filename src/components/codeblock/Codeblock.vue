<template>
  <div
    :class="[
      'jsk-codeblock',
      isSelectionAllowed ? '' : 'no-selection',
      'jsk-codeblock-copy-' + codeblockCopyButtonTrigger
    ]"
    :style="{
      borderColor: codeblockTheme === 'light' ? '#DDDDDD' : '#272822',
      width: width
    }"
  >
    <codemirror
      ref="codemirror"
      v-model="code"
      :options="cmOption"
      class="jsk-codeblock-codemirror"
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
      class="jsk-codeblock-copy"
    >
      {{ isCopied ? codeblockCopiedText : codeblockCopyText }}
    </jsk-button>
  </div>
</template>


<script>
import CodeMirror from 'codemirror'
export default {
  name: 'JskCodeblock',
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
    if (this.codeblockLanguage !== '') {
      this.cmOption.mode = CodeMirror.findModeByName(this.codeblockLanguage).mode;
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
    codeblockTheme: {
      type: String,
      default: 'light'
    },
    codeblockCopyText: {
      type: String,
      default: '复制'
    },
    codeblockCopiedText: {
      type: String,
      default: '已复制'
    },
    codeblockLanguage: {
      type: String,
      default: ''
    },
    codeblockWidth: {
      type: [String, Number],
      default: 'inherit'
    },
    codeblockMaxHeight: {
      type: [String, Number],
      default: 'inherit'
    },
    codeblockCopyButtonTrigger: {
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
      return themeMapping[this.codeblockTheme];
    },
    buttonType: function() {
      if (this.isCopied) {
        return 'success';
      } else if (this.codeblockTheme === 'dark') {
        return 'primary';
      } else {
        return 'info';
      }
    },
    width: function() {
      if (typeof(this.codeblockWidth) === 'string') {
        return this.codeblockWidth;
      }
      return this.codeblockWidth + 'px';
    },
    maxHeight: function() {
      if (typeof(this.codeblockMaxHeight) === 'string') {
        return this.codeblockMaxHeight;
      }
      return this.codeblockMaxHeight + 'px';
    },
  }
}
</script>

<style lang="scss" scoped>
.jsk-codeblock {
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
.jsk-codeblock-copy-hover {
  .jsk-codeblock-copy {
    display: none;
  }
  &:hover {
    .jsk-codeblock-copy {
      display: block;
    }
  }
}
</style>
<style lang="scss">
.jsk-codeblock {
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

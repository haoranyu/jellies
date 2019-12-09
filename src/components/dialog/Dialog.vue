<template>
  <el-dialog
    v-bind="trimAttrs($attrs)"
    :visible.sync="visibleProp"
    :title="dialogTitle"
    :width="typeof(dialogWidth) === 'string' ? dialogWidth : dialogWidth + 'px'"
    :top="typeof(dialogTop) === 'string' ? dialogTop : dialogTop + 'vh'"
    :modal="hasMask"
    :modal-append-to-body="isMaskOnBody"
    :append-to-body="isOnBody"
    :close-on-click-modal="isClickMaskClosable"
    :close-on-press-escape="isPressEscClosable"
    :show-close="hasCloseButton"
    :destroy-on-close="isDestroyedOnClose"
    :lock-scroll="isScrollLocked"
    :custom-class="customClass"
  >
    <div class="jsk-dialog-decoration" :style="decorationStyle" v-if="dialogDecoration.src !== null"></div>
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <slot></slot>
    <template slot="footer">
      <jsk-form
        form-size="small"
        @submit.native.prevent>
        <el-form-item class="jsk-dialog-footer">
          <el-row :gutter="12">
            <el-col :span="12" class="jsk-dialog-footer-left">
              <slot name="footer-left"></slot>
            </el-col>
            <el-col :span="12">
              <slot name="footer-right"></slot>
            </el-col>
          </el-row>
          <slot name="footer"></slot>
        </el-form-item>
      </jsk-form>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'JskDialog',
  inheritAttrs: false,
  computed: {
    hasTitle: function() {
      if (this.$slots.title || this.dialogTitle !== '') {
        return true;
      }
      return false;
    },
    decorationStyle: function() {
      return {
        top: this.dialogDecoration.top,
        left: this.dialogDecoration.left,
        backgroundImage: 'url(' + this.dialogDecoration.src + ')',
        width: this.dialogDecoration.width,
        height: this.dialogDecoration.height
      }
    },
    customClass: function() {
      let classList = [
        this.dialogCustomClass,
        'jsk-dialog',
        (this.dialogDecoration.src !== null ? 'jsk-dialog-padding-left' : ''),
        (this.hasTitle ? '' : ' jsk-hide-header')
      ];
      return classList.join(' ');
    }
  },
  data: function() {
    return {
      visibleProp: false
    };
  },
  created: function() {
    this.visibleProp = this.visible;
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    dialogWidth: {
      type: [String, Number],
      default: '50%'
    },
    dialogTop: {
      type: [String, Number],
      default: '15vh'
    },
    dialogCustomClass: {
      type: String,
      default: ''
    },
    dialogDecoration: {
      type: Object,
      default: function() {
        return {
          top: 0,
          left: 0,
          src: null,
          width: 0,
          height: 0
        }
      },
      style: {
        type: Object,
        default: function() {
          return {}
        }
      }
    },
    hasMask: {
      type: Boolean,
      default: true
    },
    isMaskOnBody: {
      type: Boolean,
      default: true
    },
    isOnBody: {
      type: Boolean,
      default: false
    },
    isScrollLocked: {
      type: Boolean,
      default: true
    },
    isClickMaskClosable: {
      type: Boolean,
      default: true
    },
    isPressEscClosable: {
      type: Boolean,
      default: true
    },
    isDestroyedOnClose: {
      type: Boolean,
      default: false
    },
    hasCloseButton: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'dialog-'];
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    }
  },
  watch: {
    visibleProp: function() {
      this.$emit('update:visible', this.visibleProp);
    },
    visible: function() {
      this.visibleProp = this.visible;
    }
  }
}
</script>
<style scoped>
.jsk-dialog-footer {
  margin-bottom: 0 !important;
}
.jsk-dialog-footer-left {
  text-align: left;
}
.jsk-dialog-decoration {
  display: block;
  position: absolute;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
<style>
.jsk-dialog.jsk-dialog-padding-left {
  padding-left: 80px !important;
}
.jsk-dialog.jsk-hide-header .el-dialog__header {
  padding: 10px 24px;
}
.jsk-dialog .el-dialog__header {
  padding-bottom: 0 !important;
}
.jsk-dialog .el-dialog__footer {
  padding-top: 0 !important;
}
.jsk-dialog .el-dialog__title {
  font-weight: bold;
}
.jsk-dialog .el-dialog__headerbtn {
  font-size: 24px;
  top: 24px;
  right: 20px;
}
.jsk-dialog .el-dialog__headerbtn .el-dialog__close {
  color: #777 !important;
}
.jsk-dialog .el-dialog__headerbtn:focus .el-dialog__close,
.jsk-dialog .el-dialog__headerbtn:hover .el-dialog__close {
  color: #555 !important;
}
.jsk-dialog .el-dialog__body {
  padding: 14px 24px;
}
</style>

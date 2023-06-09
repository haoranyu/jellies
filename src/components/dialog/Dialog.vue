<template>
  <el-dialog
    class="jsk-dialog-wrapper"
    v-bind="trimAttrs($attrs)"
    :visible.sync="visibleProp"
    :title="dialogTitle"
    :width="typeof(dialogWidth) === 'string' ? dialogWidth : dialogWidth + 'px'"
    top="0"
    :modal="hasMask"
    :modal-append-to-body="isMaskOnBody"
    :append-to-body="isOnBody"
    :close-on-click-modal="isClickMaskClosable"
    :close-on-press-escape="isPressEscClosable"
    :show-close="hasCloseButton"
    :destroy-on-close="isDestroyedOnClose"
    :lock-scroll="isScrollLocked"
    :custom-class="customClass"
    @open="$emit('open')"
    @opend="$emit('opend')"
    @close="$emit('close')"
    @closed="$emit('closed')"
  >
    <div
      v-if="dialogDecoration.src !== null"
      class="jsk-dialog-decoration"
      :style="decorationStyle"
    />
    <template slot="title">
      <slot name="title" />
    </template>
    <slot />
    <template slot="footer">
      <jsk-form
        size="small"
        @submit.native.prevent
      >
        <el-form-item class="jsk-dialog-footer">
          <el-row :gutter="12">
            <el-col
              :span="12"
              class="jsk-dialog-footer-left"
            >
              <slot name="footer-left" />
            </el-col>
            <el-col :span="12">
              <slot name="footer-right" />
            </el-col>
          </el-row>
          <slot name="footer" />
        </el-form-item>
      </jsk-form>
    </template>
  </el-dialog>
</template>

<script>
import {
  Dialog,
  FormItem,
  Row,
  Col
} from 'element-ui';
import JskForm from '../form/'
export default {
  name: 'JskDialog',
  components: {
    ElDialog: Dialog,
    JskForm,
    ElFormItem: FormItem,
    ElRow: Row,
    ElCol: Col
  },
  inheritAttrs: false,
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
  data: function() {
    return {
      visibleProp: false
    };
  },
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
        height: this.dialogDecoration.height,
        backgroundPosition: this.dialogDecoration.backgroundPosition || 'center center'
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
  watch: {
    visibleProp: function() {
      this.$emit('update:visible', this.visibleProp);
    },
    visible: function() {
      this.visibleProp = this.visible;
    }
  },
  created: function() {
    this.visibleProp = this.visible;
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixes = ['is-', 'has-', 'dialog-'];
        prefixes.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
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
  background-size: cover;
}
</style>
<style>
.jsk-dialog-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.jsk-dialog {
  margin-bottom: 0 !important;
}
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

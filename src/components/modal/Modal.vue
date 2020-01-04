<template>
  <el-dialog
    ref="dialog"
    v-bind="trimAttrs($attrs)"
    :visible.sync="visibleProp"
    :width="typeof(modalWidth) === 'string' ? modalWidth : modalWidth + 'px'"
    :top="typeof(modalTop) === 'string' ? modalTop : modalTop + 'vh'"
    :modal="hasMask"
    :modal-append-to-body="isMaskOnBody"
    :append-to-body="isOnBody"
    :close-on-click-modal="isClickMaskClosable"
    :close-on-press-escape="isPressEscClosable"
    :show-close="false"
    :destroy-on-close="isDestroyedOnClose"
    :fullscreen="isFullscreen"
    :lock-scroll="isScrollLocked"
    :custom-class="modalCustomClass + ' jsk-modal'"
  >
    <template slot="title">
      <el-row :gutter="12">
        <el-col :span="18">
          {{ modalTitle }}
        </el-col>
        <el-col :span="6" class="jsk-modal-title-right">
          <i @click="closeModal" class="el-icon-j-times-square jsk-modal-option jsk-modal-option-close" v-if="hasCloseButton"></i>
          <i @click="changeModalSize" :class="['el-icon-j-' + modalSizeOption + '-square', 'jsk-modal-option', 'jsk-modal-option-size']" v-if="hasSizeButton"></i>
        </el-col>
      </el-row>
    </template>
    <div class="jsk-modal-body" :style="{maxHeight: modalBodyMaxHeight, padding: modalPadding + 'px'}">
      <slot></slot>
    </div>
  </el-dialog>
</template>

<script>
import {
  Dialog as ElDialog,
  Row as ElRow,
  Col as ElCol,
} from 'element-ui';
export default {
  name: 'JskModal',
  inheritAttrs: false,
  components: {
    ElDialog,
    ElRow,
    ElCol
  },
  computed: {
    modalSizeOption: function() {
      return this.isFullscreen ? 'shrink' : 'expand';
    },
    modalBodyMaxHeight: function() {
      let topHeight = parseInt(this.modalTop);
      if (this.isFullscreen) {
        return 'calc(100vh - 40px)';
      }
      return 'calc(' + (100 - topHeight * 2) + 'vh - 42px)';
    }
  },
  data: function() {
    return {
      visibleProp: false,
      isFullscreen: false
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
    modalTitle: {
      type: String,
      default: ''
    },
    modalWidth: {
      type: [String, Number],
      default: '50%'
    },
    modalTop: {
      type: [String, Number],
      default: '15vh'
    },
    modalCustomClass: {
      type: String,
      default: ''
    },
    modalPadding: {
      type: Number,
      default: 12
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
    },
    hasSizeButton: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'modal-'];
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    },
    changeModalSize: function() {
      this.isFullscreen = !this.isFullscreen;
    },
    closeModal: function() {
      this.$refs.dialog.handleClose();
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
<style>
.jsk-modal {
  overflow: hidden;
}
.jsk-modal-title-right {
  text-align: right;
  height: 40px;
}
.jsk-modal-option {
  display: block;
  float: right;
  font-size: 27px;
  margin-left: 6px;
  height: 40px;
  padding: 0;
  line-height: 42px !important;
  cursor: pointer;
}
.jsk-modal-option-size {
  color: #2188E9;
}
.jsk-modal-option-close {
  color: #DD2E1D;
}
.jsk-modal-body {
  box-sizing: border-box;
  overflow-y: auto;
}
.jsk-modal .el-dialog__header {
  background: #EBEEF3;
  height: 40px;
  line-height: 40px;
  padding: 0 9px 0 12px;
  font-size: 16px;
}
.jsk-modal .el-dialog__body {
  padding: 0;
  border: 2px solid #EBEEF3;
  border-top: none;
}
.jsk-modal.is-fullscreen {
  overflow: visible !important;
}
.jsk-modal.is-fullscreen .el-dialog__body {
  border: none;
}
</style>

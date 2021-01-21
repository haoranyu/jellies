<template>
  <el-dialog
    ref="dialog"
    class="jsk-modal-wrapper"
    v-bind="trimAttrs($attrs)"
    :visible.sync="visibleProp"
    :width="typeof(modalWidth) === 'string' ? modalWidth : modalWidth + 'px'"
    top="0"
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
    @open="$emit('open')"
    @opend="$emit('opend')"
    @close="$emit('close')"
    @closed="$emit('closed')"
  >
    <template slot="title">
      <el-row :gutter="12">
        <el-col :span="18">
          {{ modalTitle }}
        </el-col>
        <el-col
          :span="6"
          class="jsk-modal-title-right"
        >
          <i
            v-if="hasCloseButton"
            class="el-icon-j-times-square jsk-modal-option jsk-modal-option-close"
            @click="closeModal"
          />
          <i
            v-if="hasSizeButton"
            :class="['el-icon-j-' + modalSizeOption + '-square', 'jsk-modal-option', 'jsk-modal-option-size']"
            @click="changeModalSize"
          />
        </el-col>
      </el-row>
    </template>
    <div
      class="jsk-modal-body"
      :style="{maxHeight: modalBodyMaxHeight, padding: modalPadding + 'px'}"
    >
      <slot />
    </div>
  </el-dialog>
</template>

<script>
import Draggabilly from 'draggabilly'
import {
  Dialog,
  Row,
  Col
} from 'element-ui';
export default {
  name: 'JskModal',
  components: {
    ElDialog: Dialog,
    ElRow: Row,
    ElCol: Col
  },
  inheritAttrs: false,
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
    isDraggable: {
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
  data: function() {
    return {
      visibleProp: false,
      isFullscreen: false,
      draggie: false,
      position: null
    };
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
  mounted: function() {
    this.initDraggie();
  },
  methods: {
    initDraggie: function () {
      if (this.isDraggable) {
        let draggabillySettings = {
          handle: '.el-dialog__header'
        };
        if (!this.isClickMaskClosable) {
          draggabillySettings.containment = '.el-dialog__wrapper';
        }
        this.draggie = new Draggabilly(this.$refs.dialog.$refs.dialog, draggabillySettings);
        this.position = {
          x: this.draggie.position.x,
          y: this.draggie.position.y
        };
      }
    },
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
      if (this.isFullscreen) {
        if (this.isDraggable) {
          this.draggie.setPosition(this.position.x, this.position.y);
          this.draggie.disable();
        }
        this.$emit('expand');
      } else {
        if (this.isDraggable) {
          this.draggie.enable();
        }
        this.$emit('shrink');
      }
    },
    closeModal: function() {
      this.$refs.dialog.handleClose();
    }
  }
}
</script>
<style>
.jsk-modal-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden !important;
}
.jsk-modal {
  overflow: hidden;
  margin-bottom: 0 !important;
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

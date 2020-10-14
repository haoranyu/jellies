<template>
  <el-drawer
    v-bind="trimAttrs($attrs)"
    :visible.sync="visibleProp"
    :title="drawerTitle"
    :size="typeof(drawerWidth) === 'string' ? drawerWidth : drawerWidth + 'px'"
    :modal="hasMask"
    :modal-append-to-body="isMaskOnBody"
    :append-to-body="isOnBody"
    :wrapper-closable="isClickMaskClosable"
    :close-on-press-escape="isPressEscClosable"
    :show-close="hasCloseButton"
    :destroy-on-close="isDestroyedOnClose"
    :custom-class="drawerCustomClass"
    :direction="dialogDirection"
    @open="$emit('open')"
    @opend="$emit('opend')"
    @close="$emit('close')"
    @closed="$emit('closed')"
  >
    <template slot="title">
      <slot name="title" />
    </template>
    <slot />
  </el-drawer>
</template>

<script>
import { Drawer } from 'element-ui';
export default {
  name: 'JskDrawer',
  components: {
    ElDrawer: Drawer
  },
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    drawerTitle: {
      type: String,
      default: ''
    },
    drawerWidth: {
      type: [String, Number],
      default: '30%'
    },
    drawerCustomClass: {
      type: String,
      default: ''
    },
    drawerPosition: {
      type: String,
      default: 'right'
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
  },
  data: function() {
    return {
      visibleProp: false
    };
  },
  computed: {
    dialogDirection: function() {
      const direction = {
        right: 'rtl',
        left: 'ltr',
        top: 'ttb',
        bottom: 'btt'
      };
      return direction[this.drawerPosition];
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
        let prefixs = ['is-', 'has-', 'drawer-'];
        prefixs.forEach((prefix) => {
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
<style>
.el-drawer__close-btn {
  padding-top: 4px;
}
.el-drawer__header {
  margin-bottom: 24px;
}
.el-drawer,
.el-drawer__header > span,
.el-drawer__header > button {
  outline: none;
}
</style>

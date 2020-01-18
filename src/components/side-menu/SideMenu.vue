<template>
  <aside
    :style="outerStyle"
    :class="hasCollapse ? 'jsk-side-menu-collapse-enabled' : ''">
    <el-menu
      ref="menu"
      v-bind="trimAttrs($attrs)"
      mode="vertical"
      :collapse.sync="isCollapsedProp"
      :router="hasRouter"
      :collapse-transition="hasCollapseAnimation"
      v-on:select="selectEvent"
      v-on:open="openEvent"
      v-on:close="closeEvent"
      :style="innerStyle"
    >
      <slot></slot>
      <div style="height: 56px"></div>
      <el-menu-item
        v-if="hasCollapse"
        class="jsk-side-menu-collapse-option"
        @click="isCollapsedProp = !isCollapsedProp">
        <i :class="this.collapseIcon"></i>
        <span
          slot="title"
          v-text="this.collapseText">
        </span>
      </el-menu-item>
    </el-menu>
  </aside>
</template>

<script>
import {
  Menu,
  MenuItem
} from 'element-ui';
export default {
  name: 'JskSideMenu',
  inheritAttrs: false,
  components: {
    'ElMenu': Menu,
    'ElMenuItem': MenuItem
  },
  data: function() {
    return {
      isCollapsedProp: false
    }
  },
  props: {
    sideMenuMinHeight: {
      type: [String, Number],
      default: 0
    },
    sideMenuMaxHeight: {
      type: [String, Number],
      default: '100vh'
    },
    sideMenuMinWidth: {
      type: [String, Number],
      default: 300
    },
    sideMenuCollapseShowText: {
      type: String,
      default: '展开'
    },
    sideMenuCollapseHideText: {
      type: String,
      default: '收起'
    },
    isFullscreen: {
      type: Boolean,
      default: false,
    },
    isCollapsed: {
      type: Boolean,
      default: false,
    },
    hasCollapse: {
      type: Boolean,
      default: true,
    },
    hasRouter: {
      type: Boolean,
      default: false,
    },
    hasCollapseAnimation: {
      type: Boolean,
      default: true
    }
  },
  created: function() {
    this.isCollapsedProp = this.isCollapsed;
  },
  computed: {
    maxHeight: function() {
      if (typeof(this.sideMenuMaxHeight) === 'string') {
        return this.sideMenuMaxHeight;
      }
      return this.sideMenuMaxHeight + 'px';
    },
    minHeight: function() {
      if (typeof(this.sideMenuMinHeight) === 'string') {
        return this.sideMenuMinHeight;
      }
      return this.sideMenuMinHeight + 'px';
    },
    minWidth: function() {
      if (typeof(this.sideMenuMinWidth) === 'string') {
        return this.sideMenuMinWidth;
      }
      return this.sideMenuMinWidth + 'px';
    },
    outerStyle: function() {
      return {
        minHeight: this.minHeight,
        maxHeight: this.maxHeight,
        overflowY: 'auto',
        height: this.isFullscreen ? '100vh' : 'inherit',
        position: this.isFullscreen ? 'absolute' : 'inherit',
        top: this.isFullscreen ? 0 : 'inherit',
        left: this.isFullscreen ? 0 : 'inherit'
      };
    },
    innerStyle: function() {
      return {
        minHeight: this.isFullscreen ? '100vh' : this.minHeight,
        minWidth: this.isCollapsedProp ? 0 : this.minWidth
      }
    },
    collapseIcon: function() {
      return 'el-icon-j-double-angle-' + (this.isCollapsedProp ? 'right' : 'left');
    },
    collapseText: function() {
      if (this.isCollapsedProp) {
        return this.sideMenuCollapseShowText;
      }
      return this.sideMenuCollapseHideText;
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'side-menu-'];
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    },
    open: function(index) {
      this.$refs.menu.open(index);
    },
    close: function(index) {
      this.$refs.menu.close(index);
    },
    selectEvent: function(index, indexPath) {
      this.$emit('select', index, indexPath);
    },
    openEvent: function(index, indexPath) {
      this.$emit('open', index, indexPath);
    },
    closeEvent: function(index, indexPath) {
      this.$emit('close', index, indexPath);
    }
  },
  watch: {
    isCollapsedProp: function() {
      this.$emit('update:isCollapsed', this.isCollapsedProp);
    },
    visible: function() {
      this.isCollapsedProp = this.isCollapsed;
    }
  }
}
</script>
<style scoped>
.jsk-side-menu-collapse-enabled {
  position: relative;
  box-sizing: border-box;
}
.jsk-side-menu-collapse-option {
  border-top: #ddd 1px solid;
  font-size: 14px;
  white-space: nowrap;
  width: 100%;
  height: 56px;
  line-height: 56px;
  position: absolute;
  bottom: 0;
  padding: 0 20px;
  cursor: pointer;
  color: #555555;
  box-sizing: border-box;
}
.jsk-side-menu-collapse-option [class^="el-icon-"] {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  line-height: 18px;
  color: #999;
}
</style>

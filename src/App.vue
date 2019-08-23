<template>
  <jsk-side-menu
    :is-collapsed.sync="isCollapsed"
    :has-collapse="true"
    side-menu-min-height="400px"
    side-menu-default-active="2"
    is-fullscreen
    @open="handleOpen"
    @close="handleClose">
    <jsk-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <jsk-menu-item-group>
        <template slot="title">分组一</template>
        <jsk-menu-item index="1-1">选项1</jsk-menu-item>
        <jsk-menu-item index="1-2">选项2</jsk-menu-item>
      </jsk-menu-item-group>
      <jsk-menu-item-group title="分组2">
        <jsk-menu-item index="1-3">选项3</jsk-menu-item>
      </jsk-menu-item-group>
      <jsk-submenu index="1-4">
        <template slot="title">选项4</template>
        <jsk-menu-item index="1-4-1">选项1</jsk-menu-item>
      </jsk-submenu>
    </jsk-submenu>
    <jsk-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </jsk-menu-item>
    <jsk-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </jsk-menu-item>
    <jsk-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </jsk-menu-item>
  </jsk-side-menu>
</template>

<script>
import JskSideMenu from './components/SideMenu.vue'
import JskMenuItemGroup from './components/MenuItemGroup.vue'
import JskMenuItem from './components/MenuItem.vue'
import JskSubmenu from './components/Submenu.vue'
export default {
  data() {
    return {
      isCollapsed: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components: {
    JskSideMenu,
    JskMenuItemGroup,
    JskMenuItem,
    JskSubmenu
  }
};
</script>

<style>
body {
  background: #EBEEF3;
}
.el-alert {
  margin-bottom: 12px !important;
}
</style>

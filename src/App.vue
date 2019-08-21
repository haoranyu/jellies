<template>
  <div>
    <el-button @click="drawerVisible = true" type="primary" style="margin-left: 16px;">
      点我打开
    </el-button>
    <jsk-drawer
      :visible.sync="drawerVisible"
      drawer-position="left">
      <span>我来啦!</span>
    </jsk-drawer>

  </div>
</template>

<script>
import JskDrawer from './components/Drawer.vue'
export default {
  data() {
    return {
      drawerVisible: false
    };
  },
  methods: {
    test: function() {
      alert('xxx');
    }
  },
  components: {
    JskDrawer
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

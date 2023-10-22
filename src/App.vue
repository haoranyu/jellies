<template>
  <jsk-header header-background-color="#FFF">
    <a class="logo" href="#">计蒜客</a>
    <jsk-dropdown class="switch-site">
      <span class="el-dropdown-link">
        青少信息学<i class="el-icon-j-caret-down el-icon--right"></i>
      </span>
      <jsk-dropdown-menu slot="dropdown">
        <jsk-dropdown-item>青少信息学</jsk-dropdown-item>
        <jsk-dropdown-item>大学慕课</jsk-dropdown-item>
      </jsk-dropdown-menu>
    </jsk-dropdown>
    <jsk-topnav
      :style="{ marginLeft: '32px' }"
      :topnav-items="navItems"
    >
    </jsk-topnav>
  </jsk-header>
</template>

<script>
export default {
  name: 'app',
  data: function() {
    return {
      navItems: [
        {
          name: '首页',
          callback: () => {}
        },
        {
          name: '选课中心',
          callback: () => {}
        },
        {
          name: '学习中心',
          callback: () => {}
        },
        {
          name: '题库',
          chidrenItems: [
            {
              name: '信息学题库',
              callback: () => {
                console.log('1234')
              }
            },
            {
              name: 'OI题库',
              callback: () => {}
            }
          ]
        },
        {
          name: '比赛',
          callback: () => {}
        }
      ]
    }
  }
}
</script>

<style>
body {
  background: #EBEEF3;
  margin: 0;
}
.logo {
  text-indent: -160px;
  overflow: hidden;
  display: block;
  height: 50px;
  width: 116px;
  background-image: url(https://res.jisuanke.com/img/upload/f17a9b86b45312e92e708c0719e915f571c21b83.svg);
  background-repeat: no-repeat;
  background-size: 116px 28px;
  background-position: center center;
}
.switch-site {
  margin-top: 19px;
  padding-left: 12px;
  outline: none;
  height: 22px;
  line-height: 22px;
  margin-bottom: 11px;
}
</style>

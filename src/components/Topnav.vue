<template>
  <ul :style="{ height: topnavHeight, lineHeight: topnavHeight }">
    <li v-for="(item, index) in topnavItems" :class="index === currentActive ? 'active' : ''" v-bind:key="index" v-on:click="toItem(index)">
      {{ item.name }}
    </li>
  </ul>
</template>


<script>
export default {
  name: 'JskTopnav',
  props: {
    topnavHeight: {
      type: String,
      default: '50px'
    },
    topnavItems: {
      type: Array,
      default: () => [
        {
          name: '首页',
          callback: () => {}
        }
      ]
    },
    topnavInitActive: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      currentActive: 0
    }
  },
  mounted: function() {
    this.currentActive = this.topnavInitActive
  },
  methods: {
    toItem: function(index) {
      this.currentActive = index
      this.topnavItems[index].callback()
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 16px;
  color: #777;
}
ul > li {
  text-align: center;
  padding: 0 16px;
  display: block;
  float: left;
  position: relative;
  cursor: pointer;
}
ul > li.active,
ul > li:hover {
  color: #41B146;
}
ul > li::after {
  content: " ";
  width: 0;
  height: 2px;
  background: #41B146;
  border-radius: 1px;
  position: absolute;
  bottom: 6px;
  left: 50%;
  transition: 0.3s all cubic-bezier(.46, 1, .23, 1.52);
}
ul > li.active::after {
  width: 20%;
  left: 40%;
}
</style>
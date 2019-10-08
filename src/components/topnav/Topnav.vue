<template>
  <ul :style="{ height: height, lineHeight: height }">
    <li
      v-for="(item, index) in topnavItems"
      :class="index === currentActive ? 'active' : ''"
      v-bind:key="index"
      v-on:click="toItem(index)"
      v-on:mouseover="hoverItem(index)"
      v-on:mouseout="hoverItem(currentActive)"
      :style="{
        color: (index === currentActive || index === currentHover)  ? topnavActiveColor : 'inherit'
      }"
    >
      {{ item.name }}
      <div
        class="avtive-bar"
        :style="{
          background: topnavActiveColor
        }"
      ></div>
    </li>
  </ul>
</template>


<script>
export default {
  name: 'JskTopnav',
  props: {
    topnavHeight: {
      type: [String, Number],
      default: 50
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
    },
    topnavActiveColor: {
      type: String,
      default: '#41B146'
    }
  },
  data: function() {
    return {
      currentActive: 0,
      currentHover: 0
    }
  },
  mounted: function() {
    this.currentActive = this.topnavInitActive;
    this.currentHover = this.topnavInitActive;
  },
  methods: {
    toItem: function(index) {
      this.currentActive = index;
      this.topnavItems[index].callback();
    },
    hoverItem: function(index) {
      this.currentHover = index;
    }
  },
  computed: {
    height: function() {
      if (typeof(this.topnavHeight) === 'string') {
        return this.topnavHeight;
      }
      return this.topnavHeight + 'px';
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
ul > li .avtive-bar {
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
ul > li.active .avtive-bar {
  width: 20%;
  left: 40%;
}
</style>

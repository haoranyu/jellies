<template>
  <ul :style="{ height: height, lineHeight: height }">
    <li
      v-for="(item, index) in topnavItems"
      :key="index"
      :class="index === currentActive ? 'active' : ''"
      :style="{
        color: (index === currentActive || index === currentHover) ? topnavActiveColor : 'inherit'
      }"
      @click="toItem(index)"
      @mouseover="hoverItem(index)"
      @mouseout="hoverItem(currentActive)"
    >
      {{ item.name }}
      <div
        class="avtive-bar"
        :style="{
          background: topnavActiveColor
        }"
      />
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
    topnavCurrentActive: Number,
    topnavActiveColor: {
      type: String,
      default: '#41B146'
    }
  },
  data: function() {
    return {
      currentActive: 0,
      currentHover: 0
    };
  },
  computed: {
    height: function() {
      if (typeof(this.topnavHeight) === 'string') {
        return this.topnavHeight;
      }
      return this.topnavHeight + 'px';
    }
  },
  watch: {
    currentActive: function() {
      if (this.topnavCurrentActive) {
        this.$emit('update:topnavCurrentActive', this.currentActive);
      }
    },
    topnavCurrentActive: function() {
      this.currentActive = this.topnavCurrentActive;
      this.currentHover = this.topnavCurrentActive;
    }
  },
  mounted: function() {
    if (this.topnavCurrentActive || this.topnavInitActive) {
      this.currentActive = this.topnavCurrentActive || this.topnavInitActive;
      this.currentHover = this.topnavCurrentActive || this.topnavInitActive;
    }
  },
  methods: {
    toItem: function(index) {
      this.currentActive = index;
      this.topnavItems[index].callback();
    },
    hoverItem: function(index) {
      this.currentHover = index;
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

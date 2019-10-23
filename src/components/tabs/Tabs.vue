<template>
  <div
  class="tabs-bar"
  :style="{
    background: outerBackgroundColor,
    height: height,
    lineHeight: height
  }">
    <ul class="tabs" :style="{
      height: height,
      width: outerLeftWidth,
      color: innerTextColor
    }">
      <slot></slot>
    </ul>
    <div class="options" v-if="hasOptions" :style="{
      width: outerRightWidth,
      color: innerTextColor
    }">
      <slot name="options"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JskTabs',
  data: function() {
    return {
      currentActive: 0
    }
  },
  props: {
    tabsBackgroundColor: String,
    tabsActiveTabBackgroundColor: String,
    tabsTabTextColor: String,
    tabsActiveTabTextColor: String,
    tabsHeight: {
      type: [String, Number],
      default: 40
    },
    tabsWidth: {
      type: [String, Number],
      default: 40
    },
    tabsTabWidth: {
      type: [String, Number],
      default: 100
    },
    tabsOptionsWidth: {
      type: [String, Number],
      default: 100
    },
    tabsTheme: {
      type: String,
      default: 'light'
    },
    tabsInitActive: {
      type: Number,
      default: 0
    },
    hasOptions: {
      type: Boolean,
      default: false
    },
    hasDivider: {
      type: Boolean,
      default: false
    },
    hasTooltip: {
      type: Boolean,
      default: false
    },
    isClosable: {
      type: Boolean,
      default: false
    },
    tabsAfterSwitchMethod: {
      type: Function,
      default: (index) => {
        return true;
      }
    },
    tabsAfterCloseMethod: {
      type: Function,
      default: (index) => {
        return true;
      }
    }
  },
  computed: {
    height: function() {
      if (typeof(this.tabsHeight) === 'string') {
        return this.tabsHeight;
      }
      return this.tabsHeight + 'px';
    },
    outerLeftWidth: function() {
      if (typeof(this.tabsWidth) === 'string') {
        return this.tabsWidth;
      }
      return this.tabsWidth + 'px';
    },
    outerRightWidth: function() {
      if (typeof(this.tabsOptionsWidth) === 'string') {
        return this.tabsOptionsWidth;
      }
      return this.tabsOptionsWidth + 'px';
    },
    outerBackgroundColor: function() {
      if (this.tabsBackgroundColor) {
        return this.tabsBackgroundColor;
      } else if (this.tabsTheme === 'dark') {
        return '#333333';
      } else {
        return '#bec8d8';
      }
    },
    innerWidth: function() {
      if (typeof(this.tabsTabWidth) === 'string') {
        return this.tabsTabWidth;
      }
      return this.tabsTabWidth + 'px';
    },
    innerTextColor: function() {
      if (this.tabsTabTextColor) {
        return this.tabsTabTextColor;
      } else if (this.tabsTheme === 'dark') {
        return '#AFAFAF';
      } else {
        return '#555555';
      }
    },
    innerActiveBackgroundColor: function() {
      if (this.tabsActiveTabBackgroundColor) {
        return this.tabsActiveTabBackgroundColor;
      } else if (this.tabsTheme === 'dark') {
        return '#272823';
      } else {
        return '#FFFFFF';
      }
    },
    innerActiveTextColor: function() {
      if (this.tabsActiveTabTextColor) {
        return this.tabsActiveTabTextColor;
      } else if (this.tabsTheme === 'dark') {
        return '#F0F0F0';
      } else {
        return '#333333';
      }
    },
    tooltipTheme: function() {
      if (this.tabsTheme === 'dark') {
        return 'light';
      } else {
        return 'dark';
      }
    }
  }
}
</script>

<style scoped>
.tabs-bar {
  width: 100%;
  display: flex;
}
.tabs {
  list-style: none;
  margin: 0;
  padding: 0;
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: visible;
}
.options {
  flex-grow: 0;
  flex-shrink: 0;
  text-align: right;
}
</style>

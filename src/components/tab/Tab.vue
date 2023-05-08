<template>
  <jsk-tooltip
    :tooltip-open-delay="1000"
    :tooltip-content="tooltipContent"
    tooltip-placement="bottom"
    :tooltip-theme="tooltipTheme"
    :disabled="!showTooltip"
  >
    <li
      :class="isCurrentActive ? 'active' : ''"
      :style="{
        width: width,
        height: height,
        background: background,
        color: color,
        borderRightStyle: dividerStyle,
        borderRightColor: dividerColor
      }"
      @click="switchTrigger"
      @touchstart.prevent="switchTrigger"
    >
      <div
        v-if="$parent.hasBar"
        class="bar"
        :style="{
          background: barColor
        }"
      />
      <i
        :class="[
          'el-icon-j-times',
          closable ? 'closable' : ''
        ]"
        :style="{
          height: height,
          lineHeight: height,
          background: background
        }"
        @click.stop="closeTrigger"
      />
      <span
        v-show="hasMark"
        class="mark"
      >
        <slot name="mark" />
      </span>
      <slot />
    </li>
  </jsk-tooltip>
</template>

<script>
import JskTooltip from '../tooltip/Tooltip';
export default {
  name: 'JskTab',
  components: {
    JskTooltip
  },
  props: {
    tabIndex: Number,
    tabTooltip: String,
    isActive: {
      type: Boolean,
      default: false
    },
    isClosable: Boolean,
    hasMark: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: Function,
      default: () => {
        return new Promise(returnToTab => {
          returnToTab(true);
        });
      }
    }
  },
  computed: {
    width: function() {
      return this.$parent.innerWidth;
    },
    height: function() {
      return this.$parent.height;
    },
    barColor: function() {
      if (this.isCurrentActive) {
        return this.$parent.tabsActiveTabBarColor;
      }
      return this.$parent.outerBackgroundColor;
    },
    background: function() {
      if (this.isCurrentActive) {
        return this.$parent.innerActiveBackgroundColor;
      }
      return this.$parent.outerBackgroundColor;
    },
    color: function() {
      if (this.isCurrentActive) {
        return this.$parent.innerActiveTextColor;
      }
      return 'inherit';
    },
    closable: function() {
      if (this.isClosable === undefined) {
        return this.$parent.isClosable;
      }
      return this.isClosable;
    },
    dividerStyle: function() {
      if (this.isCurrentActive) {
        return 'none';
      }
      return this.$parent.hasDivider ? 'solid' : 'none';
    },
    dividerColor: function() {
      if (this.$parent.tabsTheme === 'dark') {
        return 'rgba(0, 0, 0, 0.3)';
      }
      return 'rgba(0, 0, 0, 0.1)';
    },
    showTooltip: function() {
      return this.$parent.hasTooltip;
    },
    tooltipTheme: function() {
      return this.$parent.tooltipTheme;
    },
    content: function() {
      if (this.$slots.default) {
        return this.$slots.default[0].text;
      }
      return '';
    },
    isCurrentActive: function() {
      if (this.isActive || this.$parent.currentActive === this.tabIndex) {
        return true;
      }
      return false;
    },
    tooltipContent: function() {
      if (this.tabTooltip) {
        return this.tabTooltip;
      }
      return this.content;
    }
  },
  methods: {
    switchTrigger: function() {
      this.$emit('switch', this.tabIndex, this.$parent.currentActive);
      this.$parent.currentActive = this.tabIndex;
    },
    closeTrigger: function() {
      this.beforeClose().then(result => {
        if (result) {
          this.$emit('close', this.tabIndex);
        }
      });
    }
  }
};
</script>

<style scoped>
li {
  text-align: center;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 7px;
  position: relative;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: rgba(0, 0, 0, 0.1);
  user-select: none;
  outline: none;
}
i,
.mark {
  font-size: 14px;
  position: absolute;
  right: 5px;
  z-index: 30;
  width: 14px;
}
.bar {
  position: absolute;
  height: 2px;
  width: 100%;
  top: 0;
  left: 0;
}
i {
  display: none;
  z-index: 50;
}
li:hover i.closable {
  display: block;
}
li:hover i.closable:hover {
  cursor: pointer;
}
</style>

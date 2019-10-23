<template>
  <jsk-tooltip
    :tooltip-open-delay="1000"
    :tooltip-content="content"
    tooltip-placement="bottom"
    :tooltip-theme="tooltipTheme"
    :disabled="!showTooltip"
    v-if="!closed">
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
    >
      <i
        :class="[
          'el-icon-j-times',
          closable ? 'closable' : ''
        ]" :style="{
          height: height,
          lineHeight: height,
          background: background
        }"
        @click.stop="closeTrigger"
      ></i>
      <slot></slot>
    </li>
  </jsk-tooltip>
</template>

<script>
export default {
  name: 'JskTab',
  data: function() {
    return {
      closed: false
    }
  },
  props: {
    tabIndex: Number,
    isActive: {
      type: Boolean,
      default: false
    },
    tabBeforeSwitchMethod: {
      type: Function,
      default: (index) => {
        return true;
      }
    },
    tabBeforeCloseMethod: {
      type: Function,
      default: (index) => {
        return true;
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
      return this.$parent.isClosable;
    },
    dividerStyle: function() {
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
    }
  },
  methods: {
    switchTrigger: function() {
      if (this.tabBeforeSwitchMethod(this.tabIndex)) {
        this.$parent.currentActive = this.tabIndex;
        this.$parent.tabsAfterSwitchMethod(this.tabIndex);
      }
    },
    closeTrigger: function() {
      if (this.tabBeforeCloseMethod(this.tabIndex)) {
        this.closed = true;
        this.$parent.tabsAfterCloseMethod(this.tabIndex);
      }
    }
  }
}
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
i {
  font-size: 14px;
  position: absolute;
  right: 5px;
  display: none;
}
li:hover i.closable {
  display: block;
}
li:hover i.closable:hover {
  cursor: pointer;
}
</style>

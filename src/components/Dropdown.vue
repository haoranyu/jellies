<template>
  <el-dropdown
     v-bind="trimAttrs($attrs)"
     v-on:click="$emit('click')"
     v-on:command="handleCommand"
     v-on:visible-change="visibleChange"
     :hide-on-click="isItemClickCollapsible​"
  >
    <template slot="dropdown">
      <slot name="dropdown"></slot>
    </template>
    <slot></slot>
  </el-dropdown>
</template>

<script>
export default {
  name: 'JskDropdown',
  inheritAttrs: false,
  props: {
    isItemClickCollapsible​: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'dropdown-'];
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    },
    handleCommand: function(command) {
      this.$emit('command', command);
    },
    visibleChange: function(visibility) {
      this.$emit('visible-change', visibility);
    }
  }
}
</script>
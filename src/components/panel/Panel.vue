<template>
  <div :class="panelTheme">
    <div
      v-if="hasHeaderSlot"
      :class="panelHeaderTheme"
    >
      <slot name="header" />
    </div>
    <div class="panel-body">
      <slot />
    </div>
    <div
      v-if="hasFooterSlot"
      :class="panelFooterTheme"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'JskPanel',
  props: {
    panelType: {
      type: String,
      default: 'info'
    },
    panelHeader: {
      type: Object,
      default: () => {
        return {
          padding: true,
          background: true,
          border: true
        }
      }
    },
    panelFooter: {
      type: Object,
      default: () => {
        return {
          padding: true,
          background: true,
          border: true
        }
      }
    }
  },
  computed: {
    hasFooterSlot: function() {
      return !!this.$slots['footer'];
    },
    hasHeaderSlot: function() {
      return !!this.$slots['header'];
    },
    panelTheme: function() {
      return [
        'panel panel-' + this.panelType
      ];
    },
    panelHeaderTheme: function() {
      return [
        'panel-header',
        this.panelHeader.background === false ? 'no-background' : '',
        this.panelHeader.border === false ? 'no-border' : '',
        this.panelHeader.padding === false ? 'no-padding' : ''
      ];
    },
    panelFooterTheme: function() {
      return [
        'panel-footer',
        this.panelFooter.background === false ? 'no-background' : '',
        this.panelFooter.border === false ? 'no-border' : '',
        this.panelFooter.padding === false ? 'no-padding' : ''
      ];
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../plugins/theme-variables.scss';
.panel {
  background: #FFFFFF;
  overflow: hidden;
  border-radius: $--border-radius-base;
}
.panel-body {
  padding: $--card-padding;
}
.panel-header,
.panel-footer {
  background: $--color-face-lightest;
  padding: $--card-padding;
}
.panel-header {
  border-bottom: 1px solid $--color-line-lightest
}
.panel-footer {
  border-top: 1px solid $--color-line-lightest
}
.panel-success .panel-header,
.panel-success .panel-footer {
  background: $--color-success-lighter;
  border-color: $--color-success-lighter;
}
.panel-warning .panel-header,
.panel-warning .panel-footer {
  background: $--color-warning-lighter;
  border-color: $--color-warning-lighter;
}
.panel-danger .panel-header,
.panel-danger .panel-footer {
  background: $--color-danger-lighter;
  border-color: $--color-danger-lighter;
}
.no-background {
  background: none !important;
}
.no-border {
  border: none !important;
}
.no-padding {
  padding: 0 !important;
}
</style>

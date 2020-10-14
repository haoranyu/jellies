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
        'panel panel-' + this.panelType,
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

<style scoped>
.panel {
  background: #FFFFFF;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 0 8px 0 rgba(139, 154, 174, 0.3);
}
.panel-body {
  padding: 24px;
}
.panel-header,
.panel-footer {
  background: #F2F4F7;
  padding: 24px;
}
.panel-header {
  border-bottom: 1px solid #F0F0F0
}
.panel-footer {
  border-top: 1px solid #F0F0F0
}
.panel-success .panel-header,
.panel-success .panel-footer {
  background: #BFF199;
  border-color: #BFF199;
}
.panel-warning .panel-header,
.panel-warning .panel-footer {
  background: #FFF598;
  border-color: #FFF598;
}
.panel-danger .panel-header,
.panel-danger .panel-footer {
  background: #FFD6D2;
  border-color: #FFD6D2;
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

<template>
  <span v-if="!isLink || disabled" :class="theme">
    <slot>
    </slot>
  </span>
  <a v-else :href="href" :class="theme">
    <slot>
    </slot>
  </a>
</template>

<script>
export default {
  name: 'JskText',
  props: {
    textType: {
      type: String,
      default: 'default'
    },
    isLink: {
      type: Boolean,
      default: false
    },
    isBold: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: '#'
    },
    hasHoverUnderline: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    theme: function() {
      return [
        'text-' + this.textType,
        (this.hasHoverUnderline && !this.disabled) ? 'has-underline' : '',
        this.disabled ? 'is-disabled' : '',
        this.isBold ? 'is-bold' : ''
      ];
    }
  }
}
</script>

<style scoped>
.text-success {
  color: #41B146;
}
.text-warning {
  color: #FFB020;
}
.text-danger {
  color: #DD2E1D;
}
.text-info {
  color: #333333;
}
.text-success.is-disabled {
  color: #BFF199;
  border-color: #BFF199;
}
.text-warning.is-disabled {
  color: #FFF598;
  border-color: #FFF598;
}
.text-danger.is-disabled {
  color: #FFD6D2;
  border-color: #FFD6D2;
}
.text-info.is-disabled {
  color: #999999;
  border-color: #999999;
}
.has-underline:hover {
  border-bottom-width: 1px;
  border-bottom-style: solid;
}
.is-disabled {
  cursor: not-allowed;
}
.is-bold {
  font-weight: bold;
}
</style>

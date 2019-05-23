<template>
  <jsk-text
    :text-type="linkType"
    is-link
    v-bind="trimAttrs($attrs)"
  >
    <slot>
    </slot>
  </jsk-text>
</template>

<script>
import JskText from './Text.vue';
export default {
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'link-'];
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    }
  },
  props: {
    linkType: {
      type: String,
      default: 'default'
    }
  },
  components: {
    JskText
  }
};
</script>

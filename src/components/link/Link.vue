<template>
  <jsk-text
    :text-type="linkType"
    :has-hover-underline="true"
    is-link
    v-bind="trimAttrs($attrs)"
  >
    <slot />
  </jsk-text>
</template>

<script>
import JskText from '../text/Text.vue';
export default {
  name: 'JskLink',
  components: {
    JskText
  },
  props: {
    linkType: {
      type: String,
      default: 'default'
    }
  },
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
  }
};
</script>

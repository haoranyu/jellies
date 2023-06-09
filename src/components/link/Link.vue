<template>
  <jsk-text
    :text-type="linkType"
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
        let prefixes = ['is-', 'has-', 'link-'];
        prefixes.forEach((prefix) => {
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

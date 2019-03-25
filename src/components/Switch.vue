<template>
  <el-switch
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :active-color="switchActiveColor"
    :inactive-color="switchInactiveColor"
    :active-icon-class="switchActiveIcon"
    :inactive-icon-class="switchInactiveIcon"
  >
  </el-switch>
</template>

<script>
export default {
  name: 'JskSwitch',
  inheritAttrs: false,
  data: function() {
    return {
      value: ''
    };
  },
  created: function() {
    this.value = this.vModel;
  },
  props: {
    vModel: String,
    switchActiveColor: {
      type: String,
      default: '#67D757'
    },
    switchInactiveColor: {
      type: String,
      default: '#DEE3EB'
    },
    switchActiveIcon: {
      type: String,
      default: ''
    },
    switchInactiveIcon: {
      type: String,
      default: ''
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'switch-'];
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    }
  },
  model: {
    prop: 'vModel',
    event: 'change'
  },
  watch: {
    value: function() {
      this.$emit('change', this.value);
    },
    vModel: function() {
      this.value = this.vModel;
    }
  }
}
</script>

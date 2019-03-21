<template>
  <el-radio-group
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :text-color="radioButtonTextColor"
    :fill="radioButtonBackgroundColor"
  >
    <slot>
    </slot>
  </el-radio-group>
</template>

<script>
export default {
  name: 'JskRadioGroup',
  inheritAttrs: false,
  data: function() {
    return {
      value: ''
    }
  },
  created: function() {
    this.value = this.vModel
  },
  props: {
    vModel: String,
    radioButtonTextColor: {
      type: String,
      default: '#FFFFFF'
    },
    radioButtonBackgroundColor: {
      type: String,
      default: '#41B146'
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'radio-group-']
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key]
          }
        })
      })
      return attrs
    }
  },
  model: {
    prop: 'vModel',
    event: 'change'
  },
  watch: {
    value: function() {
      this.$emit('change', this.value)
    },
    vModel: function() {
      this.value = this.vModel
    }
  }
}
</script>

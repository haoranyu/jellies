<template>
  <el-switch
    ref="switch"
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :active-color="switchActiveColor"
    :inactive-color="switchInactiveColor"
    :active-icon-class="switchActiveIcon"
    :inactive-icon-class="switchInactiveIcon"
  />
</template>

<script>
import { Switch } from 'element-ui';
export default {
  name: 'JskSwitch',
  components: {
    ElSwitch: Switch
  },
  inheritAttrs: false,
  model: {
    prop: 'vModel',
    event: 'change'
  },
  props: {
    vModel: Boolean,
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
  data: function() {
    return {
      value: true
    };
  },
  watch: {
    value: function() {
      this.$emit('change', this.value);
      this.$nextTick(() => {
        if (this.value !== this.vModel) {
          this.value = this.vModel;
        }
      });
    },
    vModel: function() {
      this.value = this.vModel;
    }
  },
  created: function() {
    this.value = this.vModel;
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
    },
    focus: function() {
      this.$refs.switch.focus();
    }
  }
}
</script>

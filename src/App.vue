<template>
  <jsk-radio-group v-model="radio">
    <jsk-radio-button label="上海"></jsk-radio-button>
    <jsk-radio-button label="北京"></jsk-radio-button>
    <jsk-radio-button label="广州"></jsk-radio-button>
    <jsk-radio-button label="深圳"></jsk-radio-button>
  </jsk-radio-group>
</template>

<script>
import JskRadio from './components/Radio.vue'
import JskRadioGroup from './components/RadioGroup.vue'
import JskRadioButton from './components/RadioButton.vue'
export default {
  name: 'app',
  methods: {
    test: function(t) {
      console.log(t)
    }
  },
  components: {
    JskRadio,
    JskRadioGroup,
    JskRadioButton
  },
  data() {
    return {
      radio: '上海'
    }
  }
}
</script>

<style>
body {
  background: #EBEEF3;
  //margin: 0;
}
</style>

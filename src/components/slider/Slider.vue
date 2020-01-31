<template>
  <div class="slider">
    <el-slider
      v-model="value"
      v-bind="trimAttrs($attrs)"
      v-on:focus="$emit('focus')"
      v-on:blur="$emit('blur')"
      v-on:clear="$emit('clear')"
      v-on:change="finishedLimitationTrigger"
      :min="sliderMinStep"
      :max="sliderMaxStep"
      :step="sliderStepLength"
      :show-stops="isStopsVisible"
      :show-tooltip="hasTooltip"
      :format-tooltip="sliderTooltipFormat"
      :range="isIntervalSelection"
    >
    </el-slider>
    <div class="upper-layer">
      <div class="finished" :style="{ width: finishedBarLength() }"></div>
      <ul class="dots" v-show="isStopsVisible">
        <li v-for="(v, k) in (new Array(((this.sliderMaxStep - this.sliderMinStep) / sliderStepLength) + 1))" v-bind:key="k"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Slider } from 'element-ui';
export default {
  name: 'JskSlider',
  inheritAttrs: false,
  components: {
    'ElSlider': Slider
  },
  data: function() {
    return {
      value: 0
    };
  },
  created: function() {
    this.value = this.vModel;
  },
  props: {
    vModel: [Number, Array],
    sliderFinishedStep: {
      type: Number,
      default: -1
    },
    sliderStepLength: {
      type: Number,
      default: 1
    },
    sliderMaxStep: {
      type: Number,
      default: 10
    },
    sliderMinStep: {
      type: Number,
      default: 0
    },
    sliderTooltipFormat: {
      type: Function,
      default: (step) => step
    },
    isStopsVisible: {
      type: Boolean,
      default: true
    },
    isIntervalSelection: {
      type: Boolean,
      default: false
    },
    hasTooltip: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'slider-'];
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    },
    finishedBarLength: function() {
      let finishedStepsLength = this.sliderFinishedStep - this.sliderMinStep;
      let totalStepsLength = this.sliderMaxStep - this.sliderMinStep;
      if (finishedStepsLength === 0) {
        return '0';
      } else if (finishedStepsLength / totalStepsLength === 1) {
        return '100%';
      } else {
        return 'calc(6px + ' + (finishedStepsLength / totalStepsLength * 100) +'%)';
      }
    },
    finishedLimitationTrigger: function() {
      if (this.value >= this.sliderFinishedStep) {
        this.value = this.sliderFinishedStep;
      }
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

<style>
.el-slider .el-slider__stop {
  width: 6px !important;
  height: 6px !important;
  top: 3px;
  z-index: 201;
}
.el-slider .el-slider__button {
  border: none;
  background-color: #41B146;
  box-shadow: 0 0 4px 0 rgba(139, 154, 174, 0.4);
}
.el-slider .disabled .el-slider__button {
  background-color: rgba(150, 150, 150, 1);
}
.el-slider .el-slider__bar {
  background-image: linear-gradient(to right, rgba(78, 197, 61, 0) 20%, rgba(78, 197, 61, 1) 100%) !important;
  z-index: 101;
}
.el-slider .disabled .el-slider__bar {
  background-image: linear-gradient(to right, rgba(180, 180, 180, 0) 20%, rgba(180, 180, 180, 1) 100%) !important;
  z-index: 101;
}
.el-slider .el-slider__runway {
  box-shadow: inset 0 1px 1px 0 rgba(139, 154, 174, 0.3);
}
</style>

<style scoped>
.slider {
  position: relative;
}
.upper-layer {
  height: 12px;
  width: 100%;
  position: absolute;
  top: 0;
  margin: 3px 0;
  pointer-events: none;
}
.finished {
  height: 12px;
  width: 100%;
  background: #4EC53D;
  z-index: 100;
  position: absolute;
  border-radius: 6px;
}
ul.dots {
  list-style: none;
  display: flex;
  margin: 3px -3px;
  padding: 0;
  justify-content: space-between;
}
ul.dots > li,
ul.dots > li:first-child::after,
ul.dots > li:last-child::before {
  border-radius: 100%;
  background-color: #FFF;
  height: 6px;
  width: 6px;
  content: " ";
  z-index: 102;
}
ul.dots > li:first-child {
  visibility: hidden;
  position: relative;
}
ul.dots > li:last-child {
  visibility: hidden;
}
ul.dots > li:first-child::after,
ul.dots > li:last-child::before {
  display: block;
  visibility: visible;
  position: absolute;
}
ul.dots > li:first-child::after {
  left: 5px;
}
ul.dots > li:last-child::before {
  right: 2px;
}
</style>

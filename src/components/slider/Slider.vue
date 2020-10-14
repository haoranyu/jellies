<template>
  <div class="slider">
    <el-slider
      v-model="value"
      v-bind="trimAttrs($attrs)"
      :min="sliderMinStep"
      :max="sliderMaxStep"
      :step="sliderStepLength"
      :show-stops="isStopsVisible"
      :show-tooltip="hasTooltip"
      :format-tooltip="sliderTooltipFormat"
      :range="isIntervalSelection"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      @clear="$emit('clear')"
      @change="finishedLimitationTrigger"
    />
    <div class="upper-layer">
      <div
        class="finished"
        :style="{ width: finishedBarLength() }"
      />
      <ul
        v-show="isStopsVisible"
        class="dots"
      >
        <li
          v-for="(v, k) in (new Array(((sliderMaxStep - sliderMinStep) / sliderStepLength) + 1))"
          :key="k"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import { Slider } from 'element-ui';
export default {
  name: 'JskSlider',
  components: {
    ElSlider: Slider
  },
  inheritAttrs: false,
  model: {
    prop: 'vModel',
    event: 'change'
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
  data: function() {
    return {
      value: 0
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
  }
}
</script>

<style>
.el-slider {
  font-size: 14px;
}
.el-slider .el-slider__stop {
  width: 6px !important;
  height: 6px !important;
  top: 3px;
  z-index: 201;
}
.el-slider .el-slider__button-wrapper {
  transition: all 500ms ease 0s;
  top: -2px;
}
.el-slider .el-slider__button-wrapper .el-tooltip {
  display: block;
}
.el-slider .el-slider__button {
  border: none;
  background-color: #41B146;
  box-shadow: 0 0 4px 0 rgba(139, 154, 174, 0.4);
}
.el-slider .el-slider__bar {
  background-image: linear-gradient(to right, rgba(78, 197, 61, 0) 20%, #4ec53d 100%) !important;
  z-index: 101;
}
.el-slider .el-slider__runway {
  box-shadow: inset 0 1px 1px 0 rgba(139, 154, 174, 0.3);
}
.el-slider .disabled .el-slider__button {
  background-color: #969696;
}
.el-slider .disabled .el-slider__bar {
  background-image: linear-gradient(to right, rgba(180, 180, 180, 0) 20%, #b4b4b4 100%) !important;
  z-index: 101;
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

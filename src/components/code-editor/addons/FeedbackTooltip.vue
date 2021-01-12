<template>
  <div v-if="feedbackTooltipVisiable">
    <jsk-tooltip
      :tooltip-placement="feedbackTooltipPlacement"
      :tooltip-theme="feedbackTooltipTheme"
      :is-visible="true"
      is-manual
    >
      <div
        slot="default"
        class="feedback-tooltip"
        :style="feedbackTooltipPosition"
      />
      <!-- eslint-disable vue/no-v-html-->
      <div
        slot="content"
        :style="{
          maxWidth: maxWidth
        }"
        v-html="feedbackTooltipContent"
      />
      <!-- eslint-enable vue/no-v-html-->
    </jsk-tooltip>
  </div>
</template>
<script>
import JskTooltip from '../../tooltip/Tooltip';
export default {
  name: 'JskCodeEditorFeedbackTooltip',
  components: {
    JskTooltip
  },
  props: {
    feedbackTooltipPosition: {
      type: Object,
      default: () => {
        return {
          top: 0,
          left: 0
        };
      }
    },
    feedbackTooltipPlacement: {
      type: String,
      default: 'bottom'
    },
    feedbackTooltipVisiable: {
      type: Boolean,
      default: false
    },
    feedbackTooltipContent: {
      type: String,
      default: 'Hints'
    },
    feedbackTooltipTheme: {
      type: String,
      default: 'light'
    },
    feedbackTooltipMaxWidth: {
      type: [String, Number],
      default: 500
    }
  },
  computed: {
    maxWidth: function() {
      if (typeof this.feedbackTooltipMaxWidth === 'string') {
        return this.feedbackTooltipMaxWidth;
      }
      return this.feedbackTooltipMaxWidth + 'px';
    }
  }
};
</script>
<style scoped>
.feedback-tooltip {
  position: fixed;
  pointer-events: none;
  z-index: 500;
  left: 0;
  top: 0;
  min-width: 30px;
  min-height: 30px;
}
</style>

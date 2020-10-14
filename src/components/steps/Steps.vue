<script>
import { Steps } from 'element-ui';
const StepsWrapper = Steps;
StepsWrapper.name = 'JskSteps';
StepsWrapper.props = {
  stepsSpace: [String, Number],
  stepsDirection: {
    type: String,
    default: 'horizontal'
  },
  stepsActiveIndex: {
    type: Number,
    default: 0
  },
  stepsCurrentStatus: {
    type: String,
    default: 'process'
  },
  stepsFinishStatus: {
    type: String,
    default: 'finish'
  },
  isCenterAligned: {
    type: Boolean,
    default: false
  },
  isSimpleStyle: {
    type: Boolean,
    default: false
  }
};
StepsWrapper.computed = {
  space: function() {
    return this.stepsSpace;
  },
  active: function() {
    return this.stepsActiveIndex;
  },
  processStatus: function() {
    return this.stepsCurrentStatus;
  },
  finishStatus: function() {
    return this.stepsFinishStatus;
  },
  alignCenter: function() {
    return this.isCenterAligned;
  },
  simple: function() {
    return this.isSimpleStyle;
  },
  direction: function() {
    return this.stepsDirection;
  }
};
export default StepsWrapper;
</script>

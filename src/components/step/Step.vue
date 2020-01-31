<script>
import { Step } from "element-ui";
const StepWrapper = Step;
StepWrapper.name = 'JskStep';
StepWrapper.props = {
  stepTitle: String,
  stepDescription: String,
  stepIcon: String,
  stepStatus: String
};
StepWrapper.computed = {
  title: function() {
    return this.stepTitle;
  },
  description: function() {
    return this.stepDescription;
  },
  icon: function() {
    return this.stepIcon;
  },
  status: function() {
    return this.stepStatus;
  }
};
export default StepWrapper;
</script>

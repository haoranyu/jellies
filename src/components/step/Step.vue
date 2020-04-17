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
StepWrapper.computed.title = function() {
  return this.stepTitle;
};
StepWrapper.computed.description = function() {
  return this.stepDescription;
};
StepWrapper.computed.icon = function() {
  return this.stepIcon;
};
StepWrapper.computed.status = function() {
  return this.stepStatus;
};
export default StepWrapper;
</script>

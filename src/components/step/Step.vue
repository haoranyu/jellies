<script>
import { Step } from 'element-ui'
Step.props = {};
export default {
  name: 'JskStep',
  mixins: [ Step ],
  props: {
    stepTitle: String,
    stepDescription: String,
    stepIcon: String,
    stepStatus: String
  },
  computed: {
    title: function () {
      return this.stepTitle;
    },
    description: function () {
      return this.stepDescription;
    },
    icon: function () {
      return this.stepIcon;
    },
    status: function () {
      return this.stepStatus;
    }
  }
}
</script>

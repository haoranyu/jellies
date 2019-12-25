<script>
import { Pane } from 'splitpanes'
Pane.props = {};
export default {
  name: 'JskSplitpanesPane',
  mixins: [ Pane ],
  props: {
    splitpanesPaneSize: {
      type: [Number, String],
      default: null
    },
    splitpanesPaneMax: {
      type: [Number, String],
      default: 100
    },
    splitpanesPaneMin: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    size: function() {
      return this.splitpanesPaneSize;
    },
    maxSize: function() {
      return this.splitpanesPaneMax;
    },
    minSize: function() {
      return this.splitpanesPaneMin;
    }
  }
}
</script>

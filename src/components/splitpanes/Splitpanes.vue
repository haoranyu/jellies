<script>
import { Splitpanes } from 'splitpanes'
Splitpanes.props = {};
export default {
  name: 'JskSplitpanes',
  mixins: [ Splitpanes ],
  props: {
    isVertical: {
      type: Boolean,
      default: false
    },
    isExpansive: {
      type: Boolean,
      default: true
    },
    hasLeadingSplitter: {
      type: Boolean,
      default: false
    },
    hasDblclickExpansion: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    horizontal: function() {
      return this.isVertical;
    },
    pushOtherPanes: function() {
      return this.isExpansive;
    },
    dblClickSplitter: function() {
      return this.hasDblclickExpansion;
    },
    firstSplitter:  function() {
      return this.isFirstSplitter;
    }
  }
}
</script>
<style>
.splitpanes {
  display: flex;
  width: 100%;
  height: 100%;
}
.splitpanes--vertical {
  flex-direction: row;
}
.splitpanes--horizontal {
  flex-direction: column;
}
.splitpanes--dragging * {
  user-select: none;
}
.splitpanes__pane {
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: width 0.2s ease-out, height 0.2s ease-out;
}
.splitpanes--dragging .splitpanes__pane {
  transition: none;
}
.splitpanes__splitter {
  touch-action: none;
}
.splitpanes--vertical > .splitpanes__splitter {
  min-width: 1px;
  cursor: col-resize;
}
.splitpanes--horizontal > .splitpanes__splitter {
  min-height: 1px;
  cursor: row-resize;
}
.splitpanes.jsk-splitpanes .splitpanes__pane {
  background-color: transparent;
}
.splitpanes.jsk-splitpanes .splitpanes__splitter {
  background-color: #EBEEF3;
  box-sizing: border-box;
  position: relative;
}
.splitpanes.jsk-splitpanes .splitpanes__splitter:before,
.splitpanes.jsk-splitpanes .splitpanes__splitter:after {
  content: "";
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  background-color: rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s;
}
.splitpanes.jsk-splitpanes .splitpanes__splitter:hover:before,
.splitpanes.jsk-splitpanes .splitpanes__splitter:hover:after {
  background-color: rgba(0, 0, 0, 0.25);
}
.splitpanes.jsk-splitpanes .splitpanes__splitter:first-child {
  cursor: auto;
}
.jsk-splitpanes.splitpanes .splitpanes .splitpanes__splitter {
  z-index: 1;
}
.jsk-splitpanes.splitpanes--vertical > .splitpanes__splitter,
.jsk-splitpanes .splitpanes--vertical > .splitpanes__splitter {
  width: 12px;
  border-left: none;
  margin-left: -1px;
}
.jsk-splitpanes.splitpanes--vertical > .splitpanes__splitter:before,
.jsk-splitpanes .splitpanes--vertical > .splitpanes__splitter:before,
.jsk-splitpanes.splitpanes--vertical > .splitpanes__splitter:after,
.jsk-splitpanes .splitpanes--vertical > .splitpanes__splitter:after {
  width: 1px;
  height: 40px;
}
.jsk-splitpanes.splitpanes--vertical > .splitpanes__splitter:before,
.jsk-splitpanes .splitpanes--vertical > .splitpanes__splitter:before {
  margin-left: 18px;
}
.jsk-splitpanes.splitpanes--vertical > .splitpanes__splitter:after,
.jsk-splitpanes .splitpanes--vertical > .splitpanes__splitter:after {
  margin-left: 21px;
}
.jsk-splitpanes.splitpanes--horizontal > .splitpanes__splitter,
.jsk-splitpanes .splitpanes--horizontal > .splitpanes__splitter {
  height: 12px;
  border-top: none;
  margin-top: -1px;
}
.jsk-splitpanes.splitpanes--horizontal > .splitpanes__splitter:before,
.jsk-splitpanes .splitpanes--horizontal > .splitpanes__splitter:before,
.jsk-splitpanes.splitpanes--horizontal > .splitpanes__splitter:after,
.jsk-splitpanes .splitpanes--horizontal > .splitpanes__splitter:after {
  width: 40px;
  height: 1px;
}
.jsk-splitpanes.splitpanes--horizontal > .splitpanes__splitter:before,
.jsk-splitpanes .splitpanes--horizontal > .splitpanes__splitter:before {
  margin-top: 18px;
}
.jsk-splitpanes.splitpanes--horizontal > .splitpanes__splitter:after,
.jsk-splitpanes .splitpanes--horizontal > .splitpanes__splitter:after {
  margin-top: 21px;
}
</style>

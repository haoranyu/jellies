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
<style lang="scss">
.splitpanes {
  display: flex;
  width: 100%;
  height: 100%;
  &--vertical {flex-direction: row;}
  &--horizontal {flex-direction: column;}
  &--dragging * {user-select: none;}
  &__pane {
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: width 0.2s ease-out, height 0.2s ease-out;
    .splitpanes--dragging & {transition: none;}
  }
  // Disable default zoom behavior on touch device when double tapping splitter.
  &__splitter {touch-action: none;}
  &--vertical > .splitpanes__splitter {min-width: 1px;cursor: col-resize;}
  &--horizontal > .splitpanes__splitter {min-height: 1px;cursor: row-resize;}
}
.splitpanes.jsk-splitpanes {
  .splitpanes__pane {
    background-color: transparent
  }
  .splitpanes__splitter {
    background-color: #EBEEF3;
    box-sizing: border-box;
    position: relative;
    &:before, &:after {
      content: "";
      position: absolute;
      top: calc(50% - 20px);
      left: calc(50% - 20px);
      background-color: rgba(0, 0, 0, .15);
      transition: background-color 0.3s;
    }
    &:hover:before, &:hover:after {background-color: rgba(0, 0, 0, .25);}
    &:first-child {cursor: auto;}
  }
}
.jsk-splitpanes {
  &.splitpanes .splitpanes .splitpanes__splitter {
    z-index: 1;
  }
  &.splitpanes--vertical > .splitpanes__splitter,
  .splitpanes--vertical > .splitpanes__splitter {
    width: 12px;
    border-left: none;
    margin-left: -1px;
    &:before, &:after {
      width: 1px;
      height: 40px;
    }
    &:before {
      margin-left: 18px;
    }
    &:after {
      margin-left: 21px;
    }
  }
  &.splitpanes--horizontal > .splitpanes__splitter,
  .splitpanes--horizontal > .splitpanes__splitter {
    height: 12px;
    border-top: none;
    margin-top: -1px;
    &:before,
    &:after {
      width: 40px;
      height: 1px;
    }
    &:before {
      margin-top: 18px;
    }
    &:after {
      margin-top: 21px;
    }
  }
}
</style>

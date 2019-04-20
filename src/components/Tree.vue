<script>
import { Tree } from 'element-ui';

Tree.components.ElTreeNode.components.NodeContent.render = function(h) {
  const parent = this.$parent;
  const tree = parent.tree;
  const node = this.node;
  const { data, store } = node;

  return (
    parent.renderContent
      ? parent.renderContent.call(parent._renderProxy, h, { _self: tree.$vnode.context, node, data, store })
      : tree.$scopedSlots.default
        ? tree.$scopedSlots.default({ node, data })
        : <span class="el-tree-node__label"><i class={ data.icon ? [data.icon, 'el-tree-node__icon'] : '' }></i>{ data.label }</span>
  );
}

export default Tree
</script>

<style>
.el-tree .el-tree-node__icon {
  margin-right: 4px;
}
.el-tree-node .el-checkbox .el-checkbox__inner::after {
  left: 3px;
  top: 0;
}
</style>
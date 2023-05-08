<script>
import { Tree } from 'element-ui';
const TreeWrapper = Tree;
TreeWrapper.components.ElTreeNode.components.NodeContent.render = function(h) {
  const parent = this.$parent;
  const tree = parent.tree;
  const node = this.node;
  const { data, store } = node;

  return parent.renderContent ? h(parent.renderContent.call(parent._renderProxy, h, {
      _self: tree.$vnode.context,
      node,
      data,
      store
    })) : tree.$scopedSlots.default ? tree.$scopedSlots.default({ node, data }) : h('span', { class: 'el-tree-node__label' }, [
      data.icon ? h('i', { class: [data.icon, 'el-tree-node__icon'] }) : '',
      data.label
    ]);
};
TreeWrapper.name = 'JskTree';
export default TreeWrapper;
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

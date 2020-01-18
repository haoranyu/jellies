<script>
import Vue from 'vue'
import { DropdownMenu } from 'element-ui';
export default Vue.extend({
  name: 'JskDropdownMenu',
  mixins: [DropdownMenu]
})
</script>


<style scoped>
.el-dropdown-menu {
  border: 1px solid #F0F0F0;
}
</style>

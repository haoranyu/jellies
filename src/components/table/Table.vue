<script>
import Vue from 'vue'
import { Table } from 'element-ui';
export default Vue.extend({
  name: 'JskTable',
  mixins: [Table]
})
</script>



<style scoped>
.el-table {
  border-top: 2px solid #DDD;
}
.el-table::before {
  height: 2px;
}
.el-table.el-table--border {
  border-top: 1px solid #DDD;
}
.el-table.el-table--border::before {
  height: 1px;
}
</style>

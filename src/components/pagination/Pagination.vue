<template>
  <el-pagination
    background
    :small="paginationSize === 'small'"
    v-bind="trimAttrs($attrs)"
    :current-page="currentPage"
    :page-size="pageSize"
    @size-change="sizeChange"
    @current-change="currentChange"
    @prev-click="prevClick"
    @next-click="nextClick"
  >
    <slot />
  </el-pagination>
</template>

<script>
import { Pagination } from 'element-ui';
export default {
  name: 'JskPagination',
  components: {
    ElPagination: Pagination
  },
  inheritAttrs: false,
  props: {
    paginationCurrentPage: {
      type: Number,
      default: 1
    },
    paginationPageSize: {
      type: Number,
      default: 10
    },
    paginationSize: {
      type: String,
      default: 'large'
    }
  },
  data: function() {
    return {
      currentPage: this.paginationCurrentPage,
      pageSize: this.paginationPageSize
    };
  },
  watch: {
    paginationCurrentPage: function() {
      this.currentPage = this.paginationCurrentPage;
    },
    paginationPageSize: function() {
      this.pageSize = this.paginationPageSize;
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'pagination-'];
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    },
    currentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.$emit('current-change', currentPage);
    },
    sizeChange: function(pageSize) {
      this.pageSize = pageSize;
      this.$emit('size-change', pageSize);
    },
    prevClick: function(currentPage) {
      this.currentPage = currentPage;
      this.$emit('prev-click', currentPage);
    },
    nextClick: function(currentPage) {
      this.currentPage = currentPage;
      this.$emit('next-click', currentPage);
    }
  }
}
</script>

<style>
.el-pagination {
  font-weight: 500 !important;
}
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .btn-next,
.el-pagination.is-background .el-pager li {
  background: white !important;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #41B146 !important;
}
</style>

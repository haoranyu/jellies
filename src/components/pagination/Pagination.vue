<template>
  <el-pagination
    background
    :small="paginationSize === 'small'"
    v-bind="trimAttrs($attrs)"
    v-on:size-change="sizeChange"
    v-on:current-change="currentChange"
    v-on:prev-click="prevClick"
    v-on:next-click="nextClick"
    :current-page="currentPage"
    :page-size="pageSize"
  >
    <slot>
    </slot>
  </el-pagination>
</template>

<script>
import { Pagination as ElPagination } from 'element-ui';
export default {
  name: 'JskPagination',
  inheritAttrs: false,
  components: {
    ElPagination
  },
  data: function() {
    return {
      currentPage: this.paginationCurrentPage,
      pageSize: this.paginationPageSize
    };
  },
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
  },
  watch: {
    paginationCurrentPage: function() {
      this.currentPage = this.paginationCurrentPage;
    },
    paginationPageSize: function() {
      this.pageSize = this.paginationPageSize;
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

<template>
  <el-upload
    ref="upload"
    v-bind="trimAttrs($attrs)"
    :drag="isDraggable"
    :show-file-list="hasFileList"
    :auto-upload="isAutoUpload"
    :limit="uploadFileMax"
  >
    <template slot="trigger">
      <slot name="trigger" />
    </template>
    <template slot="tip">
      <slot name="tip" />
    </template>
    <slot />
  </el-upload>
</template>
<script>
import { Upload } from 'element-ui';
export default {
  name: 'JskUpload',
  components: {
    ElUpload: Upload
  },
  inheritAttrs: false,
  props: {
    isDraggable: {
      type: Boolean,
      default: false
    },
    hasFileList: {
      type: Boolean,
      default: true
    },
    isAutoUpload: {
      type: Boolean,
      default: true
    },
    uploadFileMax: {
      type: Number,
      default: 1
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixes = ['is-', 'has-', 'upload-'];
        prefixes.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    },
    clearFiles: function() {
      this.$refs.upload.clearFiles();
    },
    abort: function(file) {
      this.$refs.upload.abort(file);
    },
    submit: function() {
      this.$refs.upload.submit();
    }
  }
}
</script>
<style lang="scss">
@import "../../plugins/theme-variables.scss";
.el-upload-list--picture .el-upload-list__item {
  border: none;
}
.el-upload-list--picture .el-upload-list__item-status-label {
  background: $--color-success !important;
  box-shadow: none !important;
}
.el-upload .el-upload-dragger {
  border-width: 2px;
}
</style>

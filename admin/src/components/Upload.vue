<template>
  <!-- :on-change="changeFile" -->
  <div>
    <el-upload :list-type="listType"
               :before-upload="beforeUpload"
               :limit="getMaxLen"
               :action="actionUrl"
               :before-remove="beforeRemove"
               :on-success="successFile"
               :on-change="changeFile"
               :auto-upload="true"
               :file-list="fileList"
               :on-exceed="handleExceed"
               ref="upload">
      <i class="el-icon-plus"
         v-if="listType === 'picture-card'"></i>
      <el-button size="small"
                 v-if="listType === 'text'"
                 type="primary">点击上传</el-button>
      <div slot="tip"
           class="el-upload__tip"
           v-if="tip">{{tip}}</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'defaultList',
    event: 'input'
  },
  data () {
    return {
      fileList: [],
      actionUrl: "http://localhost:7002/upload",
    }
  },
  props: {
    defaultList: {
      type: Array,
      default: () => []
    },
    listType: {
      type: String,
      default: 'picture-card'
    },
    tip: {
      type: String,
      default: '只能上传jpg/png文件，且不超过2MB'
    },
    maxSize: {
      type: Number,
      default: 2
    }
  },
  computed: {
    getMaxLen () {
      return this.listType === 'picture-card' ? 1 : 1
    }
  },
  methods: {
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 ${this.getMaxLen} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    changeFile (files, fileList) {
      this.fileList = fileList;
    },
    beforeRemove (files, fileList) {
      console.log(files, fileList)
      return false;
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < this.maxSize;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error(`上传头像图片大小不能超过 ${this.maxSize}MB!`);
        return false;
      }
      if (!(isJPG && isLt2M)) {
        this.$ref.upload.abort();
      }
      return isJPG && isLt2M;
    },
    async successFile (response, file, fileList) {
      console.log(response, file, fileList)
    },
    async initCOS () {
      // let res = await this.$ajaxGet('getSTS');
      // console.log(res);
    }
  },
  async mounted () {
    await this.initCOS();

  },
  watch: {
    fileList: {
      handler (newVal) {
        this.$emit('input', newVal);
      },
      deep: true
    },
    defaultList: {
      handler (newV) {
        this.fileList = newV;
      },
      immediate: true,
      deep: true
    }
  }

}
</script>

<style>
</style>

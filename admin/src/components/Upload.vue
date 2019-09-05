<template>
  <el-upload action=""
             list-type="picture-card"
             :on-preview="handlePictureCardPreview"
             :on-remove="handleRemove"
             :file-list="fileList"
             :auto-upload="false"
             :on-change="changeFile">
    <i class="el-icon-plus"></i>
  </el-upload>
</template>

<script>
export default {
  data () {
    return {
      fileList: []
    }
  },
  methods: {
    changeFile (file, fileList) {
      console.log(file, fileList)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview (file) {

      console.log(file);
    },
    async initCOS () {
      let res = await this.$ajaxGet('getSTS');
      console.log(res);
    }
  },
  async mounted () {
    this.$nextTick(() => console.log(COS));
    await this.initCOS();
  },

}
</script>

<style>
</style>

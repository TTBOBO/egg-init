<template>
  <Header @back="goBack"
          isBack
          content="添加商品">
    <div style="width:700px;">
      <CustomForm :optionData="addGoodsOption"
                  v-model="addGoodsData"
                  ref="goodsForm">
        <template slot="thumbnail"
                  slot-scope="props">
          {{props}}
          <Upload></Upload>
        </template>
      </CustomForm>
      <div>
        <el-button type="primary"
                   @click="onSubmit"
                   :loading="loading">立即创建</el-button>
        <el-button @click="resetFields">重置</el-button>
      </div>
    </div>
  </Header>
</template>

<script>
import CustomForm from '@/components/CustomForm.vue';
import Header from '@/components/Header.vue';
import Upload from '@/components/Upload.vue';
export default {
  data () {
    return {
      loading: false,
      addGoodsData: null,
      addGoodsOption: {
        formList: [
          { field: "name", title: "商品名称", value: 'required', validate: "", type: "input" },
          { field: "categoryId", title: "商品类型", value: '', validate: "required", type: "select", optionUrl: "categoryList", urlkey: "data", colKey: "id", colName: "categoryName" },
          { field: "status", title: "商品状态", value: "down", validate: "required", type: "switch", activeT: "上架", activeV: "up", inactiveT: "下架", inactiveV: "down" },
          { field: "salePrice", title: "销售价格", value: 0, validate: "required", type: "input", inputType: 'number' },
          { field: "goodsInfo", title: "商品描述", value: '', validate: "", type: "textarea" },
          // { field: "thumbnail", title: "thumbnail", value: "", validate: "", scoped: true },
        ],
        infoUrl: "",
        validata: {},
        LabelWidth: '100px',
      }
    }
  },
  methods: {
    goBack () {

    },
    async onSubmit () {
      let res = await this.$refs.goodsForm.validate();
      if (!res) return;
      this.loading = true;
      let addData = await this.$ajaxPost('addGoods', this.addGoodsData);
      if (addData.result) {
        this.$message.success("添加商品成功");
        this.$router.back();
      } else {
        this.$message.error(addData.message);
      }
      this.loading = false;
    },
    resetFields () {
      this.$refs.goodsForm.resetFields();
    }
  },
  components: {
    CustomForm,
    Header,
    Upload
  },
  mounted () {

  },
  async created () {
    await util.createJs('cos-js-sdk-v5', '/static/js/cos-js-sdk-v5.min.js');
  },
  watch: {
    addGoodsData: {
      deep: true,
      handler (newV) {
        console.log(newV);
      }
    }
  }
}
</script>

<style>
</style>

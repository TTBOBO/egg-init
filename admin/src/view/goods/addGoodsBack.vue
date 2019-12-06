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
      addGoodsData: {},
      addGoodsOption: {
        formList: [
          { field: "name", title: "商品名称", value: '', validate: "", type: "input" },
          { field: "categoryId", title: "商品类型", value: '', validate: "required", type: "select", optionUrl: "categoryList", urlkey: "data", colKey: "id", colName: "categoryName" },
          { field: "status", title: "商品状态", value: "up", validate: "required", type: "switch", activeT: "上架", activeV: "up", inactiveT: "下架", inactiveV: "down" },
          { field: "salePrice", title: "销售价格", value: '', validate: "required", type: "input" },
          { field: "goodsInfo", title: "商品描述", value: '', validate: "", type: "textarea" },
          // { field: "thumbnail", title: "thumbnail", value: "", validate: "", scoped: true },
        ],
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
      let { goodsId } = this.$route.query;
      if (goodsId) {
        this.addGoodsData.goodsId = goodsId;
      }
      let addData = await this.$ajaxPost(goodsId ? 'updateGoods' : 'addGoods', this.addGoodsData);
      if (addData.result) {
        this.$message.success(`${goodsId ? '编辑' : '添加'}商品成功`);
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
    // const goodsId = this.$route.query.goodsId;
    // if (goodsId) {
    //   let { result: { data } } = await this.$ajaxGet('goodsList', { goodsId });
    //   if (data.length) {
    //     this.addGoodsData = data[0];
    //   }
    // }
  }
}
</script>

<style>
</style>

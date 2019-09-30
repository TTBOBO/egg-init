<template>
  <el-card class="form-container">
    <CustomForm :optionData="goodsAttributeOption"
                ref="Form"
                v-model="goodsAttributeData"></CustomForm>
    <div class="submit">
      <el-button type="primary"
                 @click="submitForm()">提交</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </div>
  </el-card>

</template>

<script>

import CustomForm from '@/components/CustomForm';
export default {
  data () {
    return {
      goodsAttributeData: {},
      goodsAttributeOption: {
        formList: [
          { field: "name", title: "名称", value: '', validate: "required", type: "input" },
          { field: "goods_attribute_category_id", title: "商品类型", value: '', validate: "required", type: "select", optionUrl: "goodsAttributeCategoryList", urlkey: "data", colKey: "goods_attribute_category_id", colName: "name" },
          { field: "select_type", title: "属性选择类型", value: 1, validate: "", type: "radio", option: { 0: "唯一", 1: "单选", 2: '多选' }, valueType: "number" },
          { field: "input_type", title: "属性录入方式", value: 0, validate: "", type: "radio", option: { 0: "手工录入", 1: "从列表中选取" }, valueType: "number" },
          { field: "filter_type", title: "分类筛选样式", value: 0, validate: "", type: "radio", option: { 0: "普通", 1: "颜色" }, valueType: "number" },
          // { field: "search_type", title: "检索类型", value: "0", validate: "required", type: "radio", option: { 0: "普通", 1: "颜色" }, },
          { field: "search_type", title: "检索类型", value: 0, validate: "", type: "radio", option: { 0: "不需要进行检索", 1: "关键字检索", 3: "范围检索" }, valueType: "number" },
          { field: "related_status", title: "相同属性产品是否关联", value: 0, validate: "", type: "radio", option: { 0: "不关联", 1: "关联" }, valueType: "number" },
          { field: "hand_add_status", title: "是否支持手动新增", value: 0, validate: "", type: "radio", option: { 0: "不支持", 1: "支持" }, valueType: "number" },
          { field: "type", title: "属性的类型", value: 0, validate: "", type: "radio", option: { 0: "规格", 1: "参数" }, valueType: "number" },
          { field: "input_list", title: "可选值列表", value: '', validate: "required", type: "textarea" },
          { field: "sort", title: "排序字段", value: 0, validate: "required", type: "input", valueType: "number" },
        ],
        validata: {},
        LabelWidth: '160px',
      }
    }
  },
  components: {
    CustomForm
  },
  async mounted () {
    this.$nextTick(async () => {
      const { id } = this.$route.query;
      if (id) {
        let { result } = await this.$ajaxGet('GoodsAttributeInfo', { goods_attribute_id: id });
        result.input_list = result.input_list && result.input_list.split(',').join('\r\n');
        this.goodsAttributeData = result;
      }

    })
  },
  async created () {

  },
  methods: {
    async submitForm () {
      let status = await this.$refs.Form.validate();
      const { id } = this.$route.query;
      let postData = JSON.parse(JSON.stringify(this.goodsAttributeData));
      if (id) {
        postData.goods_attribute_id = Number(id);
      }
      if (!status) return;
      postData.input_list = postData.input_list.replace(/\n/g, ',');
      let { code, message } = await this.$ajaxPost('addUpdateGoodsAttribute', postData);
      if (code === 0) {
        this.$message.success(`${id ? '编辑' : '添加'}成功`);
        this.$router.back();
      } else {
        this.$message.error(message);
      }
    },
    async resetForm () {
      await this.$refs.Form.resetFields();
    }
  },
  watch: {
    // goodsAttributeData (newV) {
    //   // console.log(newV);
    // }
  }

}
</script>

<style lang="less">
.form-container {
  width: 800px;
  position: absolute;
  left: 0;
  right: 0;
  width: 720px;
  padding: 35px 35px 15px;
  margin: 20px auto;
  .submit {
    text-align: center;
  }
}
</style>

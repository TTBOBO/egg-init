<template>
  <Header @back="goBack"
          isBack
          content="添加商品">
    <div style="width:900px;margin:auto;">
      <el-card class="box-card">
        <el-steps :active="activeIndex"
                  align-center
                  finish-status="success">
          <el-step :title="item"
                   v-for="item in stepArr"
                   :key="item"></el-step>
        </el-steps>
        <div class="add-container">
          <CustomForm :optionData="addGoodsOptionOne"
                      v-show="activeIndex === 2"
                      v-model="addGoodsData"
                      ref="goodsForm0">
            <template slot="categoryId"
                      slot-scope="props">
              <el-cascader v-model="props.data.categoryId"
                           :options="props.column.option"></el-cascader>
            </template>
          </CustomForm>
          <CustomForm :optionData="addGoodsOptionTwo"
                      v-show="activeIndex === 1"
                      v-model="addGoodsDataTwo"
                      ref="goodsForm1">
            <template slot="categoryId"
                      slot-scope="props">
              <el-cascader v-model="props.data.categoryId"
                           :options="props.column.option"></el-cascader>
            </template>
          </CustomForm>
          <CustomForm :optionData="addGoodsOptionThree"
                      v-show="activeIndex === 0"
                      v-model="addGoodsDataThree"
                      ref="goodsForm2"
                      @goods_attribute_category_id="goods_attribute_category_id">
            <template slot="sku"
                      slot-scope="props">
              <el-card class="card-bg">
                <CustomForm :optionData="addGoodsOptionAttr"
                            v-if="showAttrForm"
                            v-model="props.data.sku"
                            ref="goodsParamsForm">
                </CustomForm>
              </el-card>
            </template>
            <template slot="pic"
                      slot-scope="{}">
            </template>
            <template slot="params"
                      slot-scope="props">
              <el-card class="card-bg">
                <CustomForm :optionData="addGoodsOptionParams"
                            v-if="showParamsForm"
                            v-model="props.data.params"
                            ref="goodsParamsForm">
                </CustomForm>
              </el-card>

            </template>
            <template slot="album_pics"
                      slot-scope="{}">
            </template>
          </CustomForm>
        </div>
        <div class="submit-container">
          <el-button @click="handler(false)"
                     v-if="activeIndex != 0">上一步，填写{{stepArr[activeIndex - 1]}}</el-button>
          <el-button @click="handler(true)"
                     type="primary">{{activeIndex == 2 ? '完成，提交商品信息' : `下一步，填写${stepArr[activeIndex + 1]}`}}</el-button>
        </div>
      </el-card>
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
      showParamsForm: false,
      showAttrForm: false,
      activeIndex: 0,
      stepArr: ['商品信息', '商品促销', '商品属性'],
      addGoodsData: {},
      addGoodsDataTwo: {},
      addGoodsDataThree: {},
      addGoodsDataAttr: {},
      addGoodsOptionOne: {
        formList: [
          { field: "name", title: "商品名称", value: '1', validate: "required", type: "input" },
          { field: "subTitle", title: "副标题", value: '1', validate: "required", type: "input" },
          { field: "categoryId", title: "商品类型", value: [], scoped: true, validate: "required", type: "select", multiple: true, optionUrl: "getCategoryTree", urlkey: "result", selectPar: { level: 0 } },
          { field: "goodsInfo", title: "商品介绍", value: '1', validate: "required", type: "textarea" },
          { field: "salePrice", title: "销售价格", value: '1', validate: "required", type: "input" },
          { field: "originalPrice", title: "市场价", value: '1', validate: "required", type: "input" },
          { field: "stock", title: "库存", value: '1', validate: "required", type: "input", valueType: "number" },
          { field: "unit", title: "单位", value: '件', validate: "required", type: "input" },
          { field: "weight", title: "商品重量", value: '0', validate: "required", type: "input", valueType: "number", append: "克", width: '60%' }
        ],
        validata: {},
        LabelWidth: '100px',
      },
      addGoodsOptionTwo: {
        formList: [
          { field: "detailTitle", title: "详情页标题", value: 0, validate: "required", type: "input" },
          { field: "detailDesc", title: "详细页描述", value: '', validate: "required", type: "input" },
          { field: "categoryId", title: "服务保证", value: [], scoped: true, validate: "", type: "checkbox", option: { 1: "无忧退货", 2: "快速退款", 3: "免费包邮" } },
          { field: "keywords", title: "商品关键字", value: '', validate: "", type: "textarea" },
          { field: "status", title: "商品状态", value: "down", validate: "", type: "switch", activeT: "上架", activeV: "up", inactiveT: "下架", inactiveV: "down" },
          { field: "recommandStatus", title: "商品状态", value: 0, validate: "", type: "switch", activeT: "推荐", activeV: 1, inactiveT: "不推荐", inactiveV: 0 },
          { field: "newStatus", title: "是否是新品", value: 0, validate: "", type: "switch", activeT: "是新品", activeV: 1, inactiveT: "不是新品", inactiveV: 0 },
        ],
        validata: {},
        LabelWidth: '100px',
      },
      addGoodsOptionThree: {
        formList: [
          { field: "goods_attribute_category_id", title: "属性类型", value: '', validate: "required", type: "select", optionUrl: "goodsAttributeCategoryList", urlkey: "data", colKey: "goods_attribute_category_id", colName: "name", emitCb: true },
          { field: "sku", title: "商品规格", value: {}, validate: "", scoped: true },
          { field: "pic", title: "属性图片", value: [], scoped: true, validate: "" },
          { field: "params", title: "商品参数", value: {}, validate: "", scoped: true },
          { field: "album_pics", title: "商品相册", value: "down", validate: "", scoped: true },
        ],
        validata: {},
        LabelWidth: '100px',
      },
      addGoodsOptionParams: {
        formList: [],
        validata: {},
        LabelWidth: '100px',
      },
      addGoodsOptionAttr: {
        formList: [],
        validata: {},
        LabelWidth: '100px',
      }
    }
  },
  methods: {
    async goods_attribute_category_id ({ value }) {
      await this.getGoodsAttributeList(value);
      await this.getGoodsAttributeParamsList(value);
    },
    async getGoodsAttributeList (value) {
      let { result: { data } } = await this.$ajaxGet('GoodsAttributeList', { type: 0, goods_attribute_category_id: value });
      this.addGoodsOptionParams.formList = [];
      this.showAttrForm = false;
      if (!value) {
        this.showAttrForm = false;
        return;
      }
      data.forEach((item, index) => {
        let option = item.input_list.split(',');
        this.addGoodsOptionAttr.formList.push({ field: index + '', title: item.name, value: [], selectDataType: 2, type: "checkbox", validate: "", option })
      })
      this.showAttrForm = true;
    },
    async getGoodsAttributeParamsList (value) {
      let { result: { data } } = await this.$ajaxGet('GoodsAttributeList', { type: 1, goods_attribute_category_id: value });
      this.addGoodsOptionParams.formList = [];
      this.showParamsForm = false;
      if (!value) {
        this.showParamsForm = false;
        return;
      }
      data.forEach((item, index) => {
        let option = item.input_list.split(',');
        this.addGoodsOptionParams.formList.push({ field: index + '', title: item.name, value: "", selectDataType: 2, type: item.input_type === 0 ? 'input' : "select", validate: "", option })
      })
      console.log(this.addGoodsOptionParams.formList)
      this.showParamsForm = true;
    },
    goBack () {

    },
    async handler (status) {
      if (!status) {
        this.activeIndex -= 1;
      } else {
        let res = await this.$refs['goodsForm' + this.activeIndex].validate();
        if (res) {
          this.activeIndex += 1;
          console.log(this.addGoodsData)
        }
      }

    },
    async onSubmit () {
      // let res = await this.$refs.goodsForm.validate();
      // if (!res) return;
      // this.loading = true;
      // let { goodsId } = this.$route.query;
      // if (goodsId) {
      //   this.addGoodsData.goodsId = goodsId;
      // }
      // let addData = await this.$ajaxPost(goodsId ? 'updateGoods' : 'addGoods', this.addGoodsData);
      // if (addData.result) {
      //   this.$message.success(`${goodsId ? '编辑' : '添加'}商品成功`);
      //   this.$router.back();
      // } else {
      //   this.$message.error(addData.message);
      // }
      // this.loading = false;
    },
    resetFields () {
      this.$refs.goodsForm.resetFields();
    },
  },
  components: {
    CustomForm,
    Header,
    Upload
  },
  mounted () { },
  async created () {
    await util.createJs('cos-js-sdk-v5', '/static/js/cos-js-sdk-v5.min.js');
    const goodsId = this.$route.query.goodsId;
    if (goodsId) {
      let { result: { data } } = await this.$ajaxGet('goodsList', { goodsId });
      if (data.length) {
        this.addGoodsData = data[0];
      }
    }
  },
  watch: {
    addGoodsData (newV) {
      console.log(newV);
    }
  }
}
</script>

<style lang="less">
.add-container {
  padding: 50px 20px;
}
.submit-container {
  text-align: center;
}
.card-bg {
  background: #f8f9fc;
  box-shadow: none !important;
}
.el-form-item {
  margin-bottom: 22px !important;
}
</style>

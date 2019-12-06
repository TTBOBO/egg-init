<template>
  <Header isBack
          content="添加商品">
    <div style="width:1100px;margin:auto;">
      <el-card class="box-card">
        <el-steps :active="activeIndex"
                  align-center
                  finish-status="success">
          <el-step :title="item"
                   v-for="item in stepArr"
                   :key="item"></el-step>
        </el-steps>
        <div class="add-container">
          <div style="width:600px;margin: 0 auto;"
               v-show="activeIndex === 0">
            <CustomForm :optionData="addGoodsOptionOne"
                        v-model="addGoodsData"
                        ref="goodsForm0">
              <template slot="categoryId"
                        slot-scope="props">
                <el-cascader v-model="props.data.categoryId"
                             :options="props.column.option"></el-cascader>
              </template>
            </CustomForm>
          </div>
          <div style="width:600px;margin: 0 auto;"
               v-show="activeIndex === 1">
            <CustomForm :optionData="addGoodsOptionTwo"
                        v-model="addGoodsDataTwo"
                        ref="goodsForm1">
              <template slot="promotionType"
                        slot-scope="props">
                <el-radio-group v-model="props.data.promotionType"
                                size="small">
                  <el-radio-button v-for="(item,index) in props.column.option"
                                   :label="item.value"
                                   :key="index">{{item.label}}</el-radio-button>
                </el-radio-group>
                <div style="margin-top:20px;">
                  <CustomForm :optionData="promotionOption"
                              v-model="promotionData['1']"
                              v-show="props.data.promotionType == 1"
                              ref="promotionForm1">

                  </CustomForm>
                  <CustomForm :optionData="memberOption"
                              v-model="promotionData['2']"
                              v-show="props.data.promotionType == 2"
                              ref="promotionForm2">

                  </CustomForm>
                  <CustomTable ref="ladderTable"
                               :optionData="ladderTableOption"
                               :defaultData="promotionData[3]"
                               @deleteLadder="deleteLadder"
                               @addLadder="addLadder"
                               v-show="props.data.promotionType == 3">
                    <template v-for="(tableItem,tableIndex) in ladderTableOption.columns"
                              :slot="tableItem.value"
                              slot-scope="props">
                      <el-input v-model="props.row[tableItem.value]"
                                :key="tableIndex"></el-input>
                    </template>
                  </CustomTable>
                  <CustomTable ref="fullTable"
                               :optionData="fullTableOption"
                               :defaultData="promotionData[4]"
                               @deleteFull="deleteFull"
                               @addFull="addFull"
                               v-show="props.data.promotionType == 4">
                    <template v-for="(tableItem,tableIndex) in fullTableOption.columns"
                              :slot="tableItem.value"
                              slot-scope="props">
                      <el-input v-model="props.row[tableItem.value]"
                                :key="tableIndex"></el-input>
                    </template>
                  </CustomTable>
                </div>
              </template>
            </CustomForm>
          </div>
          <CustomForm :optionData="addGoodsOptionThree"
                      v-show="activeIndex === 2"
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
                  <template :slot="index+''"
                            slot-scope="props"
                            v-for="(item,index) in getGoodsAttributeListData">
                    <el-checkbox-group v-model="props.data[index+'']"
                                       :key="index">
                      <el-checkbox v-for="(checkItem,checkIndex) in props.column.option"
                                   :label="checkItem.value"
                                   :key="checkIndex">{{checkItem.label}}</el-checkbox>
                    </el-checkbox-group>
                    <template v-if="index === 1">
                      <CustomTable ref="customTable"
                                   :key="index+'table'"
                                   :optionData="tableOption"
                                   :defaultData="tableData"
                                   @deleteItem="deleteItem"
                                   @tableData="changeData">
                        <template v-for="(tableItem,tableIndex) in tableDefaultOption"
                                  :slot="tableItem.value"
                                  slot-scope="props">
                          <el-input v-model="props.row[tableItem.value]"
                                    :key="tableIndex"></el-input>
                        </template>
                      </CustomTable>
                      <div :key="index+'btn'"
                           style="margin-top:10px;">
                        <el-button @click="reloadSkuList"
                                   type="primary">
                          刷新列表
                        </el-button>
                      </div>
                    </template>
                  </template>
                </CustomForm>
              </el-card>
            </template>

            <template slot="pic"
                      slot-scope="props">
              <CustomForm :optionData="addGoodsOptionAttrPic"
                          v-if="showParamsForm"
                          v-model="props.data.pic"
                          ref="goodsPicForm">
                <template :slot="index+''"
                          slot-scope="props"
                          v-for="(item,index) in getGoodsAttributeListData">
                  <Upload :key="index"
                          listType="text"
                          v-model="props.data[index+'']"></Upload>
                </template>
              </CustomForm>
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
                      slot-scope="props">
              <Upload v-model="props.data.album_pics"></Upload>
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
import CustomTable from '@/components/CustomTable.vue';
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
      goodsAttributeValueListData: [],
      tableData: [], // sku列表数据
      promotionData: { 1: {}, 2: {}, 3: [{ count: 0, price: 0 }], 4: [{ fullPrice: 0, reducePrice: 0 }] },
      obj: {},
      addGoodsOptionOne: {
        formList: [
          { field: "name", title: "商品名称", value: '测试商品', validate: "required", type: "input" },
          { field: "subTitle", title: "副标题", value: '测试商品副标题1', validate: "required", type: "input" },
          { field: "categoryId", title: "商品类型", value: [], scoped: true, validate: "required", type: "select", multiple: true, optionUrl: "getCategoryTree", urlkey: "result", selectPar: { level: 0 } },
          { field: "goodsInfo", title: "商品介绍", value: '商品介绍1', validate: "required", type: "textarea" },
          { field: "salePrice", title: "销售价格", value: '99', validate: "required", type: "input" },
          { field: "originalPrice", title: "市场价", value: '139', validate: "required", type: "input" },
          { field: "stock", title: "库存", value: '100', validate: "required", type: "input", valueType: "number" },
          { field: "unit", title: "单位", value: '件', validate: "required", type: "input" },
          { field: "weight", title: "商品重量", value: '0', validate: "required", type: "input", valueType: "number", append: "克", width: '60%' }
        ],
        validata: {},
        LabelWidth: '100px',
      },
      addGoodsOptionTwo: {
        formList: [
          { field: "detailTitle", title: "详情页标题", value: 0, validate: "required", type: "input" },
          { field: "detailDesc", title: "详细页描述", value: '', validate: "", type: "input" },
          { field: "keywords", title: "商品关键字", value: '', validate: "", type: "input" },
          { field: "status", title: "商品状态", value: "down", validate: "", type: "switch", activeT: "上架", activeV: "up", inactiveT: "下架", inactiveV: "down" },
          { field: "recommandStatus", title: "商品状态", value: '0', validate: "", type: "switch", activeT: "推荐", activeV: '1', inactiveT: "不推荐", inactiveV: '0' },
          { field: "newStatus", title: "是否是新品", value: '0', validate: "", type: "switch", activeT: "是新品", activeV: '1', inactiveT: "不是新品", inactiveV: '0' },
          { field: "serviceIds", title: "服务保证", value: [], scoped: true, validate: "required", type: "checkbox", option: { 1: "无忧退货", 2: "快速退款", 3: "免费包邮" } },
          { field: "promotionType", title: "选择优惠方式", value: 0, validate: "", scoped: true, valueType: "number", option: { 0: "无优惠", 1: "特惠促销", 2: "会员价格", 3: "阶梯价格", 4: "满减价格" } },
        ],
        validata: {},
        LabelWidth: '120px',
      },
      addGoodsOptionThree: {
        formList: [
          { field: "goods_attribute_category_id", title: "属性类型", value: '', validate: "required", type: "select", optionUrl: "goodsAttributeCategoryList", urlkey: "data", colKey: "goods_attribute_category_id", colName: "name", emitCb: true, width: '250px' },
          { field: "sku", title: "商品规格", value: { 0: [], 1: [] }, validate: "", scoped: true },
          { field: "pic", title: "属性图片", value: {}, scoped: true, validate: "" },
          { field: "params", title: "商品参数", value: {}, validate: "", scoped: true },
          { field: "album_pics", title: "商品相册", value: [{ url: 'https://tab-1251403076.cos.ap-shenzhen-fsi.myqcloud.com/test.png' }], validate: "", scoped: true },
        ],
        validata: {},
        LabelWidth: '100px',
      },
      promotionOption: {
        formList: [
          { field: "promotionStartTime", title: "开始时间", value: '', validate: "required", type: "datetime", width: '200px', dateType: 'datetime', valueFormat: "yyyy-MM-dd HH:mm:ss" },
          { field: "promotionEndTime", title: "结束时间", value: '', validate: "required", type: "datetime", width: '200px', dateType: 'datetime' },
          { field: "promotionPrice", title: "促销价格", value: '', validate: "required", width: '200px' },
        ],
        validata: {},
        LabelWidth: '100px',
      },
      memberOption: {
        formList: [
          { field: "gold", title: "黄金会员", value: '', validate: "required", width: '200px' },
          { field: "platinum", title: "白金会员", value: '', validate: "required", width: '200px' },
          { field: "diamond", title: "钻石会员", value: '', validate: "required", width: '200px' },
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
      },
      addGoodsOptionAttrPic: null,
      getGoodsAttributeListData: [],
      tableDefaultOption: [
        { lable: "销售价格", value: "price", type: "", search: "", tipAlign: "right", scoped: true, width: 100 },
        { lable: "商品库存", value: "stock", type: "", search: "", tipAlign: "right", scoped: true, width: 100 },
        { lable: "库存预警值", value: "low_stock", type: "", search: "", tipAlign: "right", scoped: true, width: 100 },
        { lable: "SKU编号", value: "skuCode", type: "", search: "", tipAlign: "right", scoped: true, width: 100 }],
      tableOption: {
        toolEventWidth: "100px",
        hiddenPage: true,
        arraySpanMethod: this.arraySpanMethod,
        columns: [],
        toolEvent: [{ type: "danger", emit: "deleteItem", title: "删除" }],
        topBtnGroup: []
      },
      ladderTableOption: {
        toolEventWidth: "150px",
        hiddenPage: true,
        columns: [
          { lable: "数量", value: "count", type: "", search: "", tipAlign: "right", scoped: true },
          { lable: "折扣", value: "price", type: "", search: "", tipAlign: "right", scoped: true }
        ],
        toolEvent: [{ type: "danger", emit: "deleteLadder", title: "删除", index_con: "index == 0" }, { type: "primary", emit: "addLadder", title: "添加" }],
        topBtnGroup: []
      },
      fullTableOption: {
        toolEventWidth: "150px",
        hiddenPage: true,
        columns: [
          { lable: "满", value: "fullPrice", type: "", search: "", tipAlign: "right", scoped: true },
          { lable: "立减", value: "reducePrice", type: "", search: "", tipAlign: "right", scoped: true }
        ],
        toolEvent: [{ type: "danger", emit: "deleteFull", title: "删除", index_con: "index == 0" }, { type: "primary", emit: "addFull", title: "添加" }],
        topBtnGroup: []
      }

    }
  },
  methods: {
    deleteLadder ({ key }) {
      this.promotionData[3].splice(key, 1);
    },
    addLadder () {
      this.promotionData[3].push({ count: 0, price: 0 })
    },
    deleteFull ({ key }) {
      this.promotionData[4].splice(key, 1);
    },
    addFull () {
      this.promotionData[4].push({ fullPrice: 0, reducePrice: 0 })
    },
    deleteItem ({ key }) {
      this.tableData.splice(key, 1);
      this.obj = util.getStartIndex(this.tableData, 'sp1');
    },
    changeData () {
      // console.log(data);
    },
    async reloadSkuList () {
      this.skuLen = this.addGoodsDataThree.sku[1].length;
      let data = [];
      this.addGoodsDataThree.sku[0].forEach(sku0 => {
        this.addGoodsDataThree.sku[1].forEach(sku1 => data.push({ sp1: sku0, sp2: sku1, price: '', stock: '', low_stock: '', skuCode: '' }))
      })
      this.tableData = data;
      this.obj = util.getStartIndex(this.tableData, 'sp1');
    },
    async goods_attribute_category_id ({ value }) {
      await this.getGoodsAttributeList(value);
      await this.getGoodsAttributeParamsList(value);
      this.tableData = [];
    },
    async getGoodsAttributeList (value) {
      let { result: { data } } = await this.$ajaxGet('GoodsAttributeList', { type: 0, goods_attribute_category_id: value });
      this.getGoodsAttributeListData = data;
      this.addGoodsOptionAttr.formList = [];
      this.tableOption.columns = [];
      this.addGoodsOptionAttrPic = JSON.parse(JSON.stringify(this.addGoodsOptionAttr));
      let columns = []; //规格列表
      this.showAttrForm = false;
      if (!value) {
        this.showAttrForm = false;
        return;
      }
      data.forEach((item, index) => {
        let option = item.input_list.split(',');
        this.addGoodsOptionAttr.formList.push({ field: index + '', title: item.name, value: [], selectDataType: 2, validate: "", option, scoped: true }); //, type: "checkbox"
        this.addGoodsOptionAttrPic.formList.push({ field: index + '', title: item.name, value: [], validate: "", scoped: true }); //, type: "checkbox"
        columns.push({ lable: item.name, value: "sp" + (index + 1), type: "", search: "", tooltip: true, tipAlign: "right" })
      })
      this.tableOption.columns.push(...columns, ...this.tableDefaultOption);
      this.$nextTick(() => this.showAttrForm = true);
    },
    async getGoodsAttributeParamsList (value) {
      let { result: { data } } = await this.$ajaxGet('GoodsAttributeList', { type: 1, goods_attribute_category_id: value });
      this.addGoodsOptionParams.formList = [];
      this.showParamsForm = false;
      if (!value) {
        this.showParamsForm = false;
        return;
      }
      data.forEach(item => {
        let option = item.input_list.split(',');
        this.addGoodsOptionParams.formList.push({ field: item.goods_attribute_id + '', title: item.name, value: "", validate: "required", selectDataType: 2, type: item.input_type === 0 ? 'input' : "select", option, width: '250px' })
      })
      this.$nextTick(() => this.showParamsForm = true);
    },
    arraySpanMethod ({
      rowIndex,
      columnIndex
    }) {
      let dataObj = this.obj;
      if (columnIndex == 0) {
        if (dataObj[rowIndex]) {
          return {
            rowspan: (dataObj[rowIndex][1] - dataObj[rowIndex][0]) + 1,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    async handler (status) {
      if (!status) {
        this.activeIndex -= 1;
      } else {
        var res = await this.$refs['goodsForm' + this.activeIndex].validate();
        if (this.activeIndex === 1) {
          const { promotionType } = this.addGoodsDataTwo;
          if ((promotionType === 1 || promotionType === 2) && !await this.$refs['promotionForm' + promotionType].validate()) {
            res = false;
          }
        } else if (this.activeIndex === 2 && !await this.$refs['goodsParamsForm'].validate()) {
          res = false;
        }
        if (res) {
          this.activeIndex < this.stepArr.length - 1 ? this.activeIndex += 1 : await this.onSubmit();
        }
      }
    },
    async onSubmit () {
      const { addGoodsData, addGoodsDataTwo, addGoodsDataThree, tableData, promotionData } = this;
      util.setLocalStorage('defaultData', JSON.stringify({
        addGoodsData, addGoodsDataTwo, addGoodsDataThree, tableData, promotionData
      }))
      let { categoryId } = addGoodsData;
      let { serviceIds } = addGoodsDataTwo;
      let { goods_attribute_category_id, album_pics: [{ url }], params } = addGoodsDataThree;
      const postData = {
        ...addGoodsData,
        categoryId: categoryId[categoryId.length - 1],
        ...addGoodsDataTwo,
        serviceIds: serviceIds.join(','),
        ...promotionData[1],
        goods_attribute_category_id,
        album_pics: url,
        goodsAttributeValueList: this.goodsAttributeValueList(params),
        goodsFullReductionList: promotionData[4], //满减价格
        goodsLadderList: promotionData[3], //阶梯价格
        memberPrice: promotionData[2],
        skuStockList: tableData
      }
      util.setLocalStorage('postData', JSON.stringify(postData))
      this.loading = true;
      let { goodsId } = this.$route.query;
      if (goodsId) {
        postData.goodsId = goodsId;
      }
      let addData = await this.$ajaxPost(goodsId ? 'addGoods' : 'addGoods', postData);
      if (addData.result) {
        this.$message.success(`${goodsId ? '编辑' : '添加'}商品成功`);
        this.$router.back();
      } else {
        this.$message.error(addData.message);
      }
      this.loading = false;
    },
    goodsAttributeValueList (params) {
      let arr = [];
      for (var item in params) {
        let data = { goods_attribute_id: item, value: params[item] }
        this.goodsAttributeValueListData.forEach((_item) => {
          if (_item.goodsId == this.goodsId && _item.goods_attribute_id == item) {
            data.id = _item.id;
          }
        })
        if (this.goodsId) {
          data.goodsId = this.goodsId;
        }
        arr.push(data);
      }
      return arr;
    },
    reversalArr (list) {
      return list.reduce((current, item) => {
        current[item.goods_attribute_id] = item.value;
        return current;
      }, {})
    },
    resetFields () {
      this.$refs.goodsForm.resetFields();
    },
    getDefultSku (list) {
      let obj = {};
      list.forEach(item => {
        for (var i in item) {
          if (i.indexOf('sp') === 0) {
            const index = i.split('sp')[1];
            if (item[i]) {
              if (!obj[index - 1]) {
                obj[index - 1] = [];
              }
              if (obj[index - 1].indexOf(item[i]) == -1) {
                obj[index - 1].push(item[i]);
              }
            }
          }
        }
      })
      return obj;
    },
  },
  components: {
    CustomForm,
    CustomTable,
    Header,
    Upload
  },
  async mounted () { },
  async created () {
    await util.createJs('cos-js-sdk-v5', '/static/js/cos-js-sdk-v5.min.js');
    const goodsId = this.$route.query.goodsId;
    this.goodsId = goodsId;
    if (goodsId) {
      let { result } = await this.$ajaxGet('updateGoodsInfo', { goodsId });
      await this.goods_attribute_category_id({ value: result.goods_attribute_category_id });
      result.categoryId = [result.parentId, result.categoryId];
      result.serviceIds = result.serviceIds.split(',');
      result.album_pics = [{ url: result.album_pics }]
      result.params = this.reversalArr(result.goodsAttributeValueList)
      result.pic = {};
      result.sku = this.getDefultSku(result.skuStockList)
      this.goodsAttributeValueListData = result.goodsAttributeValueList;
      this.addGoodsData = result;
      this.addGoodsDataTwo = result;
      this.addGoodsDataThree = result;
      this.promotionData = {
        1: { promotionStartTime: result.promotionStartTime, promotionEndTime: result.promotionEndTime, promotionPrice: result.promotionPrice },
        2: result.memberPrice,
        3: result.goodsLadderList.length ? result.goodsLadderList : [{ count: 0, price: 0 }],
        4: result.goodsFullReductionList.length ? result.goodsFullReductionList : [{ fullPrice: 0, reducePrice: 0 }]
      }
      this.tableData = result.skuStockList;
      this.obj = util.getStartIndex(this.tableData, 'sp1');
    }
  },
  watch: {
    // addGoodsData (newV) {
    //   // console.log(newV);
    // }
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

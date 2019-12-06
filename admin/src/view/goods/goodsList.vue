<template>
  <div class="container">
    <CustomTable ref="customTable"
                 @createdGoods="createdGoods"
                 @upGoods="upGoods"
                 @downGoods="downGoods"
                 @edit="edit"
                 @changeStauts="changeStauts"
                 :optionData="tableOption">
      <template slot-scope="props"
                slot="status">
        <span class="circular"
              :style="{background:props.row.status === 'up' ?'#409eff':'#909399'}"></span>
        {{props.column.selectOPtion[props.row.status]}}
      </template>
      <template slot-scope="props"
                slot="tag">
        <el-tooltip effect="dark"
                    v-if="props.row.verifyStatus === '0'"
                    content="待审核状态无法操作"
                    placement="top-start">
          <i class="el-icon-warning"></i>
        </el-tooltip>
        新品：<el-switch v-model="props.row.newStatus"
                   active-value="1"
                   inactive-value="0"
                   :disabled="props.row.verifyStatus === '0'"
                   @change="val => changeNewStatus(val,props.row.goodsId)">
        </el-switch>
        推荐：<el-switch v-model="props.row.recommandStatus"
                   active-value="1"
                   inactive-value="0"
                   :disabled="props.row.verifyStatus === '0'"
                   @change="val => changeNewRecommatus(val,props.row.goodsId)">
        </el-switch>
      </template>

      <template slot-scope="props"
                slot="album_pics">
        <div style="width: 100px;height: 50px;">
          <el-image v-if="props.row.album_pics"
                    style="width: 100%;width: 100%;border-radius: 5px;cursor: pointer;"
                    :src="props.row.album_pics.split(',')[0]"
                    :preview-src-list="props.row.album_pics.split(',')">
          </el-image>
        </div>
      </template>
      <template slot-scope="{row:{goodsId,goods_attribute_category_id}}"
                slot="sku">
        <el-button type="primary"
                   icon="el-icon-edit"
                   circle
                   @click="changeSku(goodsId,goods_attribute_category_id)"></el-button>
      </template>

    </CustomTable>
    <el-dialog title="编辑货品信息"
               :visible.sync="showSku"
               width="700px">
      <p>商品编号：{{goodsId}}</p>
      <SkuCom :firstCol="skuColumns"
              v-if="showSku"
              :tableData="tableData"></SkuCom>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="showSku = false">取 消</el-button>
        <el-button type="primary"
                   @click="changeSkuData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import CustomTable from '@/components/CustomTable';
import SkuCom from './SkuCom'
export default {
  data () {
    return {
      statusType: { initial: "", audited: "success", dispatching: "warning", completed: "primary", canceled: "danger" },
      tableOption: {
        baseUrl: "goodsList",
        toolEventWidth: "200px",
        initheight: true,
        selection: true,
        search: {
          page: 1,  //页数
          size: 10,  //每页多少条
        },
        columns: [
          { lable: "商品编号", value: "goodsId", type: "", search: "goodsId", tooltip: true, tipAlign: "right" },
          { lable: "商品名称", value: "name", type: "", search: "name", tooltip: true, tipAlign: "right" },
          { lable: "价格", value: "salePrice", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "缩略图", value: "album_pics", type: "", search: "", tooltip: false, tipAlign: "right", scoped: true, width: 120 },
          { lable: "销量", value: "sale", type: "", search: "", tooltip: true, tipAlign: "right", defaultVal: '0' },
          { lable: "标签", value: "tag", type: "", tooltip: false, scoped: true, width: 200 },
          { lable: "库存", value: "sku", type: "", tooltip: false, scoped: true },
          { lable: "商品类型", value: "categoryId", type: "select", search: "categoryId", tooltip: true, tipAlign: "right", url: "categoryList", keyurl: "data", selectDataType: 4, colKey: "id", colName: "categoryName" },
          { lable: "商品状态", value: "status", type: "select", search: "status", tooltip: true, tipAlign: "right", selectOPtion: { up: "上架", down: "下架" }, scoped: true },
          { lable: "审核状态", value: "verifyStatus", type: "select", search: "verifyStatus", tooltip: true, tipAlign: "right", selectOPtion: { 0: "待审核", 1: "审核通过", 2: "审核失败" } },
          { lable: "创建时间", value: "createdTime", type: "", search: "", tooltip: true, tipAlign: "right" }
        ],
        toolEvent: [
          { type: "primary", emit: "changeStauts", title: "", hasloading: true, handStatus: { obj: "status", title: { up: "下架", down: "上架" }, type: { up: "danger", down: "primary" } }, judgement_con: "verifyStatus === '0'" },
          { type: "primary", emit: "edit", title: "编辑", judgement_con: "verifyStatus === '0'" },
        ],
        topBtnGroup: [
          { name: "创建商品", bgcolor: "primary", emit: "createdGoods", hasSel: 0, hasMore: '' },
          { name: "批量上架", bgcolor: "primary", emit: "upGoods", icon: "el-icon-top", hasSel: 1, hasMore: "more", hasloading: true },
          { name: "批量下架", bgcolor: "danger", emit: "downGoods", icon: "el-icon-bottom", hasSel: 1, hasMore: "more" },
        ]
      },
      skuColumns: [],
      showSku: false,
      tableData: [],
      goodsId: ''
    }
  },
  components: {
    CustomTable,
    SkuCom
  },
  methods: {
    async changeNewStatus (val, goodsId) {
      const { code, message, result: [num] } = await this.$ajaxPost('changeGoodsStatus', { ids: [goodsId], newStatus: val });
      this.tip(num, code, message, 0);
      this.$refs.customTable.curReload();
    },
    async changeNewRecommatus (val, goodsId) {
      const { code, message, result: [num] } = await this.$ajaxPost('changeGoodsStatus', { ids: [goodsId], recommandStatus: val });
      this.tip(num, code, message, 1)
      this.$refs.customTable.curReload();
    },
    tip (num, code, message, status) {
      if (num) {
        this.$message.success(`修改${status ? '推荐' : '新品'}成功`);
      } else {
        this.$message.error(code == -1 ? message : `修改${status ? '推荐' : '新品'}失败`);
      }
    },
    async changeSku (goodsId, goods_attribute_category_id) {

      let { result: { data } } = await this.$ajaxGet('GoodsAttributeList', { type: 0, goods_attribute_category_id });
      let columns = [];
      data.forEach((item, index) => {
        columns.push({ lable: item.name, value: "sp" + (index + 1), type: "", search: "", tooltip: true, tipAlign: "right" })
      })
      this.skuColumns = columns;
      let { result } = await this.$ajaxGet('getSkuList', { goodsId });
      this.tableData = result;
      this.showSku = !this.showSku;
      this.goodsId = goodsId;
    },
    async changeSkuData () {
      let { code } = await this.$ajaxPost('changeSku', { data: this.tableData, goodsId: this.goodsId });
      if (code === 0) {
        this.$message.success('修改库存信息成功');
        this.showSku = !this.showSku;
      }
    },
    createdGoods () {
      this.$router.push('addGoods');
    },
    filterItems (list, status) {
      return list.reduce((total, item) => (item.status === status && item.verifyStatus !== '0') ? (total.push(item.goodsId) ? total : total) : total, []);
    },
    upGoods (selection) {
      let ids = this.filterItems(selection, 'down');
      if (ids.length) {
        this.changeGoodsStatus(ids, 'up');
      } else {
        this.$message.warning("没有可执行的数据");
      }
    },
    downGoods (selection) {
      let ids = this.filterItems(selection, 'up');
      if (ids.length) {
        this.changeGoodsStatus(ids, 'down');
      } else {
        this.$message.warning("没有可执行的数据");
      }
    },
    async changeGoodsStatus (ids, status) {
      let res = await this.$ajaxPost('changeGoodsStatus', { ids, status });
      this.$message[res.code === 0 ? 'success' : 'error'](`商品${status === 'up' ? '上架' : '下架'}${res.code === 0 ? '成功' : '失败'}`);
      this.$refs.customTable.curReload();
    },
    async changeStauts ({ row: { goodsId, status } }) {
      await this.changeGoodsStatus([goodsId], status === 'up' ? 'down' : 'up');
    },
    edit ({ row: { goodsId } }) {
      this.$router.push({ path: "addGoods", query: { goodsId } })
    }
  },
  created () {
    if (this.$route.query.id) {
      this.tableOption.columns[0].searchVal = this.$route.query.id;
    }
  }
}
</script>

<style lang='less'>
.circular {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>

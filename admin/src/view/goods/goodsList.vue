<template>
  <div class="container">
    <CustomTable ref="customTable"
                 @createdGoods="createdGoods"
                 @upGoods="upGoods"
                 @downGoods="downGoods"
                 @edit="edit"
                 @changeStauts="changeStauts"
                 :optionData="tableOption">
    </CustomTable>
  </div>
</template>
<script>
import CustomTable from '@/components/CustomTable';
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
          { lable: "商品编号", value: "goodsId", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "商品名称", value: "name", type: "", search: "name", tooltip: true, tipAlign: "right" },
          { lable: "价格", value: "salePrice", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "缩略图", value: "thumbnail", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "商品类型", value: "categoryId", type: "select", search: "categoryId", tooltip: true, tipAlign: "right", url: "categoryList", keyurl: "data", selectDataType: 4, colKey: "id", colName: "categoryName" },
          { lable: "商品状态", value: "status", type: "select", search: "status", tooltip: true, tipAlign: "right", selectOPtion: { up: "上架", down: "下架" } },
          { lable: "创建时间", value: "createdTime", type: "", search: "", tooltip: true, tipAlign: "right" }
        ],
        toolEvent: [
          { type: "primary", emit: "changeStauts", title: "", hasloading: true, handStatus: { obj: "status", title: { up: "下架", down: "上架" }, type: { up: "danger", down: "primary" } } },
          { type: "primary", emit: "edit", title: "编辑" },
        ],
        topBtnGroup: [
          { name: "创建商品", bgcolor: "primary", emit: "createdGoods", hasSel: 0, hasMore: '' },
          { name: "批量上架", bgcolor: "primary", emit: "upGoods", icon: "el-icon-top", hasSel: 1, hasMore: "more", hasloading: true },
          { name: "批量下架", bgcolor: "danger", emit: "downGoods", icon: "el-icon-bottom", hasSel: 1, hasMore: "more" },
        ]
      }
    }
  },
  components: {
    CustomTable
  },
  methods: {
    info ({ row: { id } }) {
      console.log(id);
    },
    createdGoods () {
      this.$router.push({ name: 'addGoods' });
    },
    filterItems (list, status) {
      return list.reduce((total, item) => item.status === status ? (total.push(item.goodsId) ? total : total) : total, []);
    },
    upGoods (selection) {
      let ids = this.filterItems(selection, 'down');
      if (ids.length) {
        this.changeGoodsStatus(ids, 'up');
      }
    },
    downGoods (selection) {
      let ids = this.filterItems(selection, 'up');
      if (ids.length) {
        this.changeGoodsStatus(ids, 'down');
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
    edit (params) {
      console.log(params)
    }
  },
  mounted () {

  },
  created () {

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

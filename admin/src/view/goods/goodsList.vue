<template>
  <div class="container">
    <CustomTable ref="customTable"
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
        toolEvent: [],
        topBtnGroup: []
      }
    }
  },
  components: {
    CustomTable
  },
  methods: {
    info ({ row: { id } }) {
      console.log(id)
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

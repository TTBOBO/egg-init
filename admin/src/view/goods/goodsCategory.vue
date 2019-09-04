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
        baseUrl: "categoryList",
        toolEventWidth: "200px",
        initheight: true,
        search: {
          page: 1,  //页数
          size: 10,  //每页多少条
        },
        columns: [
          { lable: "类型编号", value: "id", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "商品类型名称", value: "categoryName", type: "", search: "categoryName", tooltip: true, tipAlign: "right" },
          { lable: "商品类型描述", value: "categoryDes", type: "", search: "", tooltip: true, tipAlign: "right" },
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

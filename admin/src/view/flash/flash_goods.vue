<template>
  <div class="container">
    <CustomTable ref="customTable"
                 :optionData="tableOption"
                 @list="list">
      <template slot="count"
                slot-scope="{row}">
        {{row.goods.length}}
      </template>
    </CustomTable>
  </div>
</template>
<script>
import CustomTable from '@/components/CustomTable';
export default {
  data () {
    return {
      currentId: null,
      promotionData: {},
      statusType: { initial: "", audited: "success", dispatching: "warning", completed: "primary", canceled: "danger" },
      tableOption: {
        baseUrl: "getFlashList",
        toolEventWidth: "250px",
        initheight: true,
        evalKey: "id",
        search: {
          page: 1,  //页数
          size: 10,  //每页多少条
          type: 1,
          counts: true
        },
        expand: true,
        columns: [
          { lable: "编号", value: "id", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "活动名称", value: "name", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "活动开始时间", value: "start_date", search: "", tooltip: true, tipAlign: "right" },
          { lable: "活动结束时间", value: "end_date", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "商品数量", value: "count", type: "", search: "", tooltip: true, tipAlign: "right", scoped: true },
        ],
        toolEvent: [
          { type: "primary", emit: "list", title: "商品列表" }],
        topBtnGroup: []
      }
    }
  },
  components: {
    CustomTable
  },
  methods: {
    list ({ row: { id } }) {
      this.$router.push({
        name: 'flash_promotion_goods',
        query: {
          promotionId: this.$route.query.promotion,
          sessionId: id
        }
      })
    },
  },
  mounted () {

  },
  created () {
    this.tableOption.search.promotionId = this.$route.query.promotion;
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

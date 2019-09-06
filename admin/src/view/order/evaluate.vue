<template>
  <div class="container">
    <CustomTable ref="customTable"
                 :optionData="tableOption"
                 @feedback="feedback">
      <template slot-scope="props"
                slot="score">
        <el-rate v-model="props.row.score"
                 disabled
                 show-score
                 text-color="#ff9900"
                 score-template="{value}">
        </el-rate>
      </template>
      <template slot="expand"
                slot-scope="props">
        123
      </template>
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
        baseUrl: "CommerList",
        toolEventWidth: "200px",
        initheight: true,
        evalKey: "commentId",
        search: {
          page: 1,  //页数
          size: 10,  //每页多少条
        },
        expand: true,
        columns: [
          { lable: "", value: "expand", search: "", width: 50, tooltip: true, tipAlign: "right", resizable: true, scoped: true, expand: true },
          { lable: "评论用户", value: "nickName", type: "", search: "nickName", tooltip: true, tipAlign: "right", evelKey: "customer.nickName" },
          { lable: "评论时间", value: "createdTime", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "评论订单号", value: "billNumber", search: "", tooltip: true, tipAlign: "right", evelKey: "order.billNumber" },
          { lable: "评分", value: "score", type: "", search: "", tooltip: true, tipAlign: "right", scoped: true },
          { lable: "评语", value: "comment", type: "", search: "", tooltip: true, tipAlign: "right" }
        ],
        toolEvent: [{ type: "primary", emit: "feedback", title: "回复" },],
        topBtnGroup: [

        ]
      }
    }
  },
  components: {
    CustomTable
  },
  methods: {
    feedback ({ row }) {
      console.log(row);
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

<template>
  <div class="container">
    <CustomTable ref="customTable"
                 @diverGoods="diverGoods"
                 :optionData="tableOption">
      <template slot-scope="props"
                slot="status">
        <el-button :type="statusType[props.row.status]"
                   size="mini"
                   round>
          {{props.column.selectOPtion[props.row.status]}}
        </el-button>
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
        baseUrl: "orderList",
        toolEventWidth: "200px",
        initheight: true,
        search: {
          page: 1,  //页数
          size: 10,  //每页多少条
        },
        columns: [
          { lable: "订单编号", value: "billNumber", type: "", search: "billNumber", tooltip: true, tipAlign: "right" },
          { lable: "商品名称", value: "shopName", type: "", search: "shopName", tooltip: true, tipAlign: "right" },
          { lable: "订单状态", value: "status", type: "select", search: "status", tooltip: true, tipAlign: "right", scoped: true, selectOPtion: { initial: "待处理", audited: "已接单", dispatching: "配送中", completed: "已完成", canceled: "已取消" } },
          { lable: "折扣价格", value: "reductionAmount", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "支付金额", value: "paymentAmount", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "运费", value: "freightAmount", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "总支付金额", value: "totalAmount", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "创建时间", value: "createdTime", type: "time", search: "createdTime", tooltip: true, width: '150px', tipAlign: "right", sort: 'custom', sortOrder: 'desc' },
          { lable: "购买用户", value: "uuid", type: "", search: "uuid", tooltip: true, tipAlign: "right", evelKey: "customer.nickName" },
          { lable: "备注", value: "remark", type: "", search: "", tooltip: true, tipAlign: "right" },
        ],
        toolEvent: [{ type: "primary", emit: "diverGoods", title: "发货", judgement_con: 'status != "audited"' }],
        topBtnGroup: [

        ]
      }
    }
  },
  components: {
    CustomTable
  },
  methods: {
    async diverGoods ({ row: { orderId } }) {
      let { result: [len] } = await this.$ajaxPost('diverGoods', { orderId: orderId });
      len ? this.$message.success("发货成功") : this.$message.error("发货失败");
      this.$refs.customTable.curReload();
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

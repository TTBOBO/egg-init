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
        <el-timeline>
          <el-timeline-item type="primary"
                            :timestamp="props.row.createdTime">
            用户评论：{{props.row.comment}}
          </el-timeline-item>
          <el-timeline-item color="#0bbd87"
                            :timestamp="props.row.lastModifierTime">
            商家反馈：{{props.row.remark}}
          </el-timeline-item>
        </el-timeline>
      </template>
    </CustomTable>
    <el-dialog title="回复评论"
               :visible="showAddRemark"
               width="30%">
      <CustomForm :optionData="remarkOption"
                  ref="Form"
                  v-if="showAddRemark"
                  v-model="remarkData"></CustomForm>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addRemark">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import CustomTable from '@/components/CustomTable';
import CustomForm from '@/components/CustomForm';
export default {
  data () {
    return {
      showAddRemark: false,
      commentId: '',
      remarkData: null,
      remarkOption: {
        formList: [
          { field: "remark", title: "评论反馈", value: '', validate: "required", type: "textarea" },
        ],
        validata: {},
        LabelWidth: '130px',
      },
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
        toolEvent: [{ type: "primary", emit: "feedback", title: "回复", judgement_con: 'remark != ""' }],
        topBtnGroup: []
      }
    }
  },
  components: {
    CustomTable,
    CustomForm
  },
  methods: {
    feedback ({ row }) {
      this.showAddRemark = true;
      this.commentId = row.commentId;
      console.log(row);
    },
    async addRemark () {
      let res = await this.$refs.Form.validate()
      if (!res) return;
      let postData = { ...this.remarkData, commentId: this.commentId };
      const { code, message } = await this.$ajaxPost('addRemark', postData);
      code === 0 ? this.$message.success("反馈成功") : this.$message.error(message);
      this.showAddRemark = false;
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

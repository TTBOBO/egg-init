<template>
  <div class="container">
    <CustomTable ref="customTable"
                 :optionData="tableOption"
                 @add="add"
                 @list="list"
                 @edit="edit"
                 @delete="del">
      <template slot-scope="props"
                slot="status">
        <el-switch v-model="props.row.status"
                   active-value="1"
                   inactive-value="0"
                   @change="changeStatus(props.row)">
        </el-switch>
      </template>
    </CustomTable>
    <el-dialog :title="(currentId ? '修改' : '添加')+'数据'"
               :visible="showAddPromotion"
               width="50%">
      <CustomForm :optionData="promotionOption"
                  ref="Form"
                  v-if="showAddPromotion"
                  v-model="promotionData"></CustomForm>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="showAddPromotion = false">取 消</el-button>
        <el-button type="primary"
                   @click="addUpdatePromotion">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import CustomTable from '@/components/CustomTable';
import CustomForm from '@/components/CustomForm';
import common from '../../minix/common';
export default {
  mixins: [common],
  data () {
    return {
      showAddPromotion: false,
      currentId: null,
      promotionData: {},
      promotionOption: {
        formList: [
          { field: "name", title: "活动标题", value: '', validate: "required" },
          { field: "start_date", title: "开始时间", value: '', validate: "required", type: "time", dateType: "time" },
          { field: "end_date", title: "结束时间", value: '', validate: "required", type: "time", dateType: "time" },
          { field: "status", title: "上线/下线", value: '1', validate: "required", type: "radio", option: { 1: "上线", 0: "下线" } },
        ],
        validata: {},
        LabelWidth: '130px',
      },
      statusType: { initial: "", audited: "success", dispatching: "warning", completed: "primary", canceled: "danger" },
      tableOption: {
        baseUrl: "getFlashList",
        toolEventWidth: "250px",
        initheight: true,
        evalKey: "id",
        search: {
          page: 1,  //页数
          size: 10,  //每页多少条
          type: 1
        },
        expand: true,
        columns: [
          { lable: "编号", value: "id", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "活动名称", value: "name", type: "", search: "name", tooltip: true, tipAlign: "right" },
          { lable: "活动开始时间", value: "start_date", search: "", tooltip: true, tipAlign: "right" },
          { lable: "活动结束时间", value: "end_date", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "上线/下线", value: "status", type: "", search: "", tooltip: true, tipAlign: "right", scoped: true }
        ],
        toolEvent: [
          { type: "primary", emit: "edit", title: "编辑" },
          { type: "danger", emit: "delete", title: "删除" }],
        topBtnGroup: [
          { name: "添加活动时间", bgcolor: "primary", emit: "add" },
        ]
      }
    }
  },
  components: {
    CustomTable,
    CustomForm
  },
  methods: {
    list () {

    },
    add () {
      this.currentId = null;
      this.setDialogStatus();
    },
    edit ({ row }) {
      this.promotionData = row;
      this.setDialogStatus();
      this.currentId = row.id;
    },
    async del ({ row: { id } }) {
      let status = await this.confirm({ text: '是否要删除?' });
      if (status) {
        await this.$ajaxPost('delFlashPromotion', { id, type: 1 });
      }
      this.$refs.customTable.curReload();
    },
    async changeStatus ({ id, name, status }) {
      let res = await this.confirm({ text: '是否要修改上线/下线状态?' });
      if (res) {
        await this.$ajaxPost('crateFlashPromotion', { id, name, status, type: 1 });
      }
      this.$refs.customTable.curReload();
    },
    async addUpdatePromotion () {
      let res = await this.$refs.Form.validate()
      if (!res) return;
      const { code, message } = await this.$ajaxPost('crateFlashPromotion', { ...this.promotionData, id: this.currentId, type: 1 });
      code === 0 ? this.$message.success((this.currentId ? '编辑' : '添加') + "成功") : this.$message.error(message);
      this.setDialogStatus();
      this.$refs.customTable.curReload();
    },
    setDialogStatus () {
      this.showAddPromotion = !this.showAddPromotion;
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

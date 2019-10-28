<template>
  <div class="container">
    <CustomTable ref="customTable"
                 :optionData="tableOption"
                 @edit="edit"
                 @delete="delItem"
                 @add="add">
      <template slot-scope="props"
                slot="recommend_status">
        <el-switch v-model="props.row.recommend_status"
                   :active-value="1"
                   :inactive-value="0"
                   active-text="推荐"
                   inactive-text="不推荐"
                   @change="changeStatus(props.row)">
        </el-switch>
      </template>
    </CustomTable>
    <el-dialog title="设置排序"
               :visible="status"
               width="50%">
      <CustomForm :optionData="smsOption"
                  ref="Form"
                  v-if="status"
                  v-model="goodsData"></CustomForm>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="status = false">取 消</el-button>
        <el-button type="primary"
                   @click="updateData">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="选择商品"
               :visible="status1"
               width="50%">
      <CustomTable ref="customTable1"
                   @selectChange="selectChange"
                   :optionData="addtableOption">
      </CustomTable>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="status1 = false">取 消</el-button>
        <el-button type="primary"
                   @click="addData">确 定</el-button>
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
      goodsData: {},
      currentId: null,
      status: false,
      status1: false,
      selsectedList: [],
      tableOption: {
        baseUrl: "getSmsList",
        toolEventWidth: "250px",
        initheight: true,
        evalKey: "id",
        search: {
          page: 1,  //页数
          size: 10,  //每页多少条
          type: this.baseType
        },
        columns: [
          { lable: "编号", value: "id", tooltip: true, tipAlign: "right" },
          { lable: "商品名称", value: 'name', evelKey: "good.name", tooltip: true, tipAlign: "right", search: "name", type: '' },
          { lable: "上线/下线", value: "recommend_status", type: "", search: "", tooltip: true, tipAlign: "right", scoped: true },
          { lable: "状态", value: 'recommend_status', search: "recommend_status", tooltip: true, tipAlign: "right", type: "select", selectOPtion: { 1: "推荐", 0: "不推荐" } },
          { lable: "创建时间", value: 'createdTime', search: "", tooltip: true, tipAlign: "right", type: "" },
          { lable: "排序", value: 'sort', tooltip: true, tipAlign: "right" },

        ],
        toolEvent: [
          { type: "primary", emit: "edit", title: "设置排序" },
          { type: "danger", emit: "delete", title: "删除" }],
        topBtnGroup: [
          { name: "添加", bgcolor: "primary", emit: "add" }
        ]
      },
      addtableOption: {
        baseUrl: "goodsList",
        toolEventWidth: "250px",
        initheight: true,
        evalKey: "id",
        selection: true,
        search: {
          page: 1,  //页数
          size: 10,  //每页多少条
          // promotionType: true
        },
        columns: [
          { lable: "商品名称", value: 'name', tooltip: true, tipAlign: "right" },
          { lable: "商品价格", value: 'salePrice', tooltip: true, tipAlign: "right" },
        ],
        toolEvent: [],
        topBtnGroup: []
      },
      smsOption: {
        formList: [
          { field: "sort", title: "排序", value: '', validate: "required", type: "input", valueType: "number" },
        ],
        validata: {},
        LabelWidth: '130px',
      }
    }
  },
  props: {
    baseType: {
      type: String,
      default: '1'
    }
  },
  components: {
    CustomTable,
    CustomForm
  },
  methods: {
    selectChange (list) {
      this.selectedList = list;
    },
    add () {
      this.status1 = true;
    },
    async edit ({ row }) {
      this.goodsData = row
      this.currentId = row.id
      this.status = true;
    },
    async delItem ({ row }) {
      let status = await this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      if (status) {
        const { id, goodsId } = row
        let { code, message } = await this.$ajaxPost('delFlashPromotionGoods', { id, goodsId });
        if (code !== 0) {
          this.$message.error(message);
          return false;
        } else {
          this.$message.success('删除成功');
        }
        this.status = false;
        this.$refs.customTable.curReload();
      }
    },
    async changeStatus ({ id, recommend_status }) {
      await this.$ajaxPost('updateSms', { id, recommend_status, type: this.baseType });
      this.$refs.customTable.curReload();
    },
    async updateData () {

      let { code, message } = await this.$ajaxPost('updateSms', { ...this.goodsData, id: this.currentId, type: this.baseType });
      if (code !== 0) {
        this.$message.error(message);
        return false;
      } else {
        this.$message.success('编辑成功');
      }
      this.status = false;
      this.$refs.customTable.curReload();
    },
    async addData () {
      let { code, message } = await this.$ajaxPost('createdSms', { type: this.baseType, goodsIds: this.selectedList.map(i => i.goodsId) })
      if (code !== 0) {
        this.$message.error(message);
      } else {
        this.$message.success('添加成功');
        this.status1 = false;
        this.$refs.customTable.curReload();
      }
    }
  },
  mounted () {

  },
  created () {
    const { sessionId, promotionId } = this.$route.query;
    this.tableOption.search = {
      ...this.tableOption.search,
      sessionId,
      promotionId
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

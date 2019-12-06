<template>
  <div class="container">
    <CustomTable ref="customTable"
                 :optionData="tableOption"
                 @edit="edit"
                 @delete="delItem"
                 @add="add">
    </CustomTable>
    <el-dialog title="编辑秒杀商品信息"
               :visible="status"
               width="50%">
      <CustomForm :optionData="promotionOption"
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
import common from '../../minix/common';
export default {
  mixins: [common],
  data () {
    return {
      goodsData: {},
      currentId: null,
      status: false,
      status1: false,
      selsectedList: [],
      tableOption: {
        baseUrl: "getFlashPromotionGoodsList",
        toolEventWidth: "250px",
        initheight: true,
        evalKey: "id",
        search: {
          page: 1,  //页数
          size: 10,  //每页多少条
          type: 1
        },
        columns: [
          { lable: "编号", value: "id", tooltip: true, tipAlign: "right" },
          { lable: "商品名称", value: 'name', evelKey: "good.name", tooltip: true, tipAlign: "right" },
          { lable: "商品价格", value: 'salePrice', evelKey: "good.salePrice", tooltip: true, tipAlign: "right" },
          { lable: "剩余数量", value: 'stock', evelKey: "good.stock", tooltip: true, tipAlign: "right" },
          { lable: "秒杀价格", value: "flash_promotion_price", tooltip: true, tipAlign: "right" },
          { lable: "秒杀数量", value: "flash_promotion_count", tooltip: true, tipAlign: "right" },
          { lable: "限购数量", value: "flash_promotion_limit", tooltip: true, tipAlign: "right" },
        ],
        toolEvent: [
          { type: "primary", emit: "edit", title: "编辑" },
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
          promotionType: true
        },
        columns: [
          { lable: "商品名称", value: 'name', tooltip: true, tipAlign: "right" },
          { lable: "商品价格", value: 'salePrice', tooltip: true, tipAlign: "right" },
        ],
        toolEvent: [],
        topBtnGroup: []
      },
      promotionOption: {
        formList: [
          { field: "name", title: "商品名称", value: '', validate: "required", type: 'lable' },
          { field: "salePrice", title: "商品价格", value: '', validate: "required", type: 'lable' },
          { field: "flash_promotion_price", title: "秒杀价格", value: '', validate: "required" },
          { field: "stock", title: "剩余数量", value: '', validate: "required", type: 'lable' },
          { field: "flash_promotion_count", title: "秒杀数量", value: '', validate: "required", type: "input", valueType: "number" },
          { field: "flash_promotion_limit", title: "限购数量", value: '', validate: "required", type: "input", valueType: "number" },
        ],
        validata: {},
        LabelWidth: '130px',
      }
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
      this.goodsData = {
        ...row,
        ...row.good
      }
      this.currentId = row.id
      this.status = true;
    },
    async delItem ({ row }) {
      let status = await this.confirm({ text: '是否要删除?' });
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
    async updateData () {
      const { flash_promotion_price, flash_promotion_count, flash_promotion_limit } = this.goodsData;

      let { code, message } = await this.$ajaxPost('updateFlashPromotionGoods', { flash_promotion_price, flash_promotion_count, flash_promotion_limit, id: this.currentId });
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
      const { promotionId, sessionId } = this.$route.query;

      let { code, message } = await this.$ajaxPost('crateFlashPromotionGoods', { promotionId: Number(promotionId), sessionId: Number(sessionId), goodsId: this.selectedList.map(item => item.goodsId) })
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


<template>
  <div class="container">
    <CustomTable ref="customTable"
                 @add="add"
                 @edit="edit"
                 @del="del"
                 :optionData="tableOption">
      <template slot="setting"
                slot-scope="scope">
        <el-button size='mini'
                   @click="getAttribute(scope,0)">属性列表</el-button>
        <el-button size='mini'
                   @click="getAttribute(scope,1)">参数列表</el-button>
      </template>
    </CustomTable>
    <el-dialog :title="addEditStatus ? '添加' : '编辑' +'类型'"
               :visible.sync="showDialog"
               width="600px">
      <CustomForm :optionData="categoryOption"
                  ref="Form"
                  v-if="showDialog"
                  v-model="categoryData"></CustomForm>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="hideDialog">确 定</el-button>
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
      addEditStatus: false,
      categoryData: {},
      showDialog: false,
      statusType: { initial: "", audited: "success", dispatching: "warning", completed: "primary", canceled: "danger" },
      tableOption: {
        baseUrl: "goodsAttributeCategoryList",
        toolEventWidth: "200px",
        initheight: true,
        search: {
          page: 1,  //页数
          size: 10,  //每页多少条
        },
        columns: [
          { lable: "类型编号", value: "goods_attribute_category_id", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "类型名称", value: "name", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "属性数量", value: "attributeCount", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "参数数量", value: "paramCount", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "设置", value: "setting", scoped: true, width: 250 }
        ],
        toolEvent: [{ type: "primary", emit: "edit", title: "编辑" }, { type: "danger", emit: "del", title: "删除" }],
        topBtnGroup: [
          { name: "添加类型", bgcolor: "primary", emit: "add" },
        ]
      },
      categoryOption: {
        formList: [
          { field: "name", title: "类型名称", value: '', validate: "required", type: "input" },
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
    async edit ({ row }) {
      this.addEditStatus = false;
      this.editid = row.goods_attribute_category_id;
      this.categoryData = row;
      this.changeDialogStatus();
    },
    async getAttribute ({ row: { goods_attribute_category_id } }, type) {
      this.$router.push({
        path: 'goodsAttribute',
        query: {
          id: goods_attribute_category_id,
          type
        }
      })
    },
    async add () {
      this.addEditStatus = true;
      this.changeDialogStatus();

    },
    async del ({ row: { goods_attribute_category_id } }) {
      await this.$ajaxPost('deleteGoodsAttributeCategory', { goods_attribute_category_id });
      this.$message.success("删除成功");
      this.$refs.customTable.curReload();
    },
    changeDialogStatus () {
      this.showDialog = !this.showDialog;
    },
    async hideDialog () {
      let res = await this.$refs.Form.validate()
      if (!res) return;
      let postData = { ...this.categoryData };
      if (!this.addEditStatus) {
        postData.goods_attribute_category_id = this.editid;
      }
      // return false;
      let data = await this.$ajaxPost(this.addEditStatus ? 'addGoodsAttributeCategory' : 'updateGoodsAttributeCategory', postData);
      if (data.code === 0) {
        this.$message.success(`${this.addEditStatus ? '添加' : '编辑'}成功`);
        this.changeDialogStatus();
        this.$refs.customTable.curReload();
      } else {
        this.$message.error(data.message);
      }

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

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
                   @click="seeNext(scope.row)">查看{{scope.row.parentId ? '上' : '下'}}一级</el-button>
      </template>
    </CustomTable>
    <el-dialog :title="addEditStatus ? '添加' : '编辑' +'商品类型'"
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
        baseUrl: "categoryList",
        toolEventWidth: "200px",
        initheight: true,
        search: {
          page: 1,  //页数
          size: 10,  //每页多少条
          level: 0,
          hasChild: true
        },
        columns: [
          { lable: "编号", value: "id", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "分类名称", value: "categoryName", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "级别", value: "level", type: "select", search: "", tooltip: true, tipAlign: "right", selectOPtion: { 0: "一级", 1: "二级" } },
          { lable: "商品数量", value: "productCount", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "商品单位", value: "productUnit", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "商品类型描述", value: "categoryDes", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "创建时间", value: "createdTime", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "最后修改时间", value: "lastModifierTime", tooltip: true, tipAlign: "right" },
          { lable: "设置", value: "setting", scoped: true, width: 150 }
        ],
        toolEvent: [{ type: "primary", emit: "edit", title: "编辑" }, { type: "danger", emit: "del", title: "删除" }],
        topBtnGroup: [
          { name: "添加类型", bgcolor: "primary", emit: "add" },
        ]
      },
      categoryOption: {
        formList: [
          { field: "categoryName", title: "商品类型名称", value: '', validate: "required", type: "input" },
          { field: "parentId", title: "上级分类", value: "", validate: "required", type: "select", option: { 0: "无上级分类" }, optionUrl: 'categoryList', colKey: 'id', colName: 'categoryName', valueType: "number" },
          { field: "productCount", title: "商品数量", value: '', validate: "", type: "input", valueType: "number" },
          { field: "productUnit", title: "商品单位", value: '', type: "input" },
          // { field: "showStatus", title: "显示状态", value: "", validate: "required", type: "switch", activeT: "不显示", activeV: "1", inactiveT: "显示", inactiveV: "0" },
          { field: "showStatus", title: "显示状态", value: "0", validate: "required", type: "radio", option: { 0: "不显示", 1: "显示" } },
          { field: "keywords", title: "关键字", value: '', type: "input" },
          { field: "categoryDes", title: "商品类型描述", value: '', validate: "", type: "input" },
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
      this.editid = row.id;
      this.categoryData = row;
      this.changeDialogStatus();
    },
    async seeNext ({ id, parentId }) {
      this.tableOption.search.level = parentId ? 0 : 1;
      this.tableOption.search.parentId = !parentId ? id : '';

      this.$refs.customTable.reload();
    },
    async add () {
      this.addEditStatus = true;
      this.changeDialogStatus();

    },
    async del ({ row: { id } }) {
      await this.$ajaxPost('deleteCategory', { id });
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
        postData.id = this.editid;
      }
      postData.level = postData.parentId !== '0' ? 1 : 0;
      let data = await this.$ajaxPost(this.addEditStatus ? 'addCategory' : 'updateCateGory', postData);
      if (data.code === 0) {
        this.$message.success(`${this.addEditStatus ? '添加' : '编辑'}成功`);
        await this.$refs.Form.resetFields()
        this.changeDialogStatus();
        this.$refs.customTable.curReload();
      } else {
        this.$message.error(data.message);
      }

    }
  },
  async mounted () {
    await this.$ajaxGet('getCategoryTree', { level: 0 })
  },
  created () {

  },
  watch: {}
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

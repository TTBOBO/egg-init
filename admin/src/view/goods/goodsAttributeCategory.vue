
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
                   @click="getAttribute(scope)">属性列表</el-button>
        <el-button size='mini'
                   @click="getParams(scope)">参数列表</el-button>
      </template>
    </CustomTable>
  </div>
</template>
<script>
import CustomTable from '@/components/CustomTable';
export default {
  data () {
    return {
      addEditStatus: false,
      categoryData: null,
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
          { lable: "属性数量", value: "attributeCount", type: "select", search: "", tooltip: true, tipAlign: "right", selectOPtion: { 0: "一级", 1: "二级" } },
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
          { field: "categoryName", title: "商品类型名称", value: '', validate: "required", type: "input" },
          { field: "parentId", title: "上级分类", value: "", validate: "required", type: "select", option: { 0: "无上级分类" }, selectDataType: 4, optionUrl: 'categoryList', colKey: 'id', colName: 'categoryName' },
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
    CustomTable
  },
  methods: {
    async edit ({ row }) {
      this.addEditStatus = false;
      this.editid = row.id;
      this.changeDialogStatus();
      this.$nextTick(() => {
        this.categoryData = row;
      })
    },
    async getAttribute (row) {
      this.$router.push({
        path: 'goodsAttribute',
        query: {
          id: row.row.goods_attribute_category_id,
          type: "attributeCount"
        }
      })
    },
    async getParams (row) {
      this.$router.push({
        path: 'goodsAttribute',
        query: {
          id: row.row.goods_attribute_category_id,
          type: "paramCount"
        }
      })
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
      // console.log(postData)
      // return false;
      let data = await this.$ajaxPost(this.addEditStatus ? 'addCategory' : 'updateCateGory', postData);
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

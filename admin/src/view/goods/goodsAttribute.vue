
<template>
  <div class="container">
    <CustomTable ref="customTable"
                 @add="add"
                 @edit="edit"
                 @del="del"
                 :optionData="tableOption">
    </CustomTable>
  </div>
</template>
<script>
import CustomTable from '@/components/CustomTable';
export default {
  data () {
    return {
      tableOption: {
        baseUrl: "GoodsAttributeList",
        toolEventWidth: "200px",
        initheight: true,
        search: {
          page: 1,  //页数
          size: 10,  //每页多少条
        },
        columns: [
          { lable: "编号", value: "goods_attribute_id", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "属性名称", value: "name", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "商品类型", value: "attributeCount", type: "select", search: "", tooltip: true, tipAlign: "right", evelKey: "goodsAttributeCategory.name" },
          { lable: "属性是否可选", value: "select_type", type: "select", search: "", tooltip: true, tipAlign: "right", selectOPtion: { 0: "唯一", 1: "单选", 2: '多选' } },
          { lable: "属性值的录入方式", value: "input_type", type: "select", width: 250, selectOPtion: { 0: "手工录入", 1: "从列表中选取" } },
          { lable: "可选值列表", value: "input_list", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "排序", value: "sort", type: "", search: "", tooltip: true, tipAlign: "right" },

        ],
        toolEvent: [{ type: "primary", emit: "edit", title: "编辑" }, { type: "danger", emit: "del", title: "删除" }],
        topBtnGroup: [
          { name: this.$route.query.type == 0 ? "添加属性" : "添加参数", bgcolor: "primary", emit: "add" },
        ]
      },
    }
  },
  components: {
    CustomTable
  },
  methods: {
    edit ({ row }) {
      this.$router.push({
        path: "addGoodsAttribute",
        query: {
          type: this.$route.query.type,
          id: row.goods_attribute_id
        }
      })
    },
    add () {
      this.$router.push({
        path: "addGoodsAttribute",
        query: {}
      })
    },
    async del ({ row: { goods_attribute_id, type, goods_attribute_category_id } }) {
      let res = await this.$confirm('确认删除么？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      if (res) {
        await this.$ajaxDelete('deleteGoodsAttribute', { goods_attribute_id, type, goods_attribute_category_id });
        this.$message.success("删除成功");
        this.$refs.customTable.curReload();
      }

    },
  },
  mounted () {

  },
  created () {
    const { type, id } = this.$route.query
    this.tableOption.search.type = type;
    this.tableOption.search.goods_attribute_category_id = id;
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

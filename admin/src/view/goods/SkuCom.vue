<template>
  <CustomTable ref="customTable"
               key="table"
               :optionData="tableOption"
               :defaultData="tableData"
               @tableData="changeData">
    <template v-for="(tableItem,tableIndex) in tableDefaultOption"
              :slot="tableItem.value"
              slot-scope="props">
      <el-input v-model="props.row[tableItem.value]"
                :key="tableIndex"></el-input>
    </template>
  </CustomTable>
</template>

<script>
import CustomTable from '@/components/CustomTable.vue';
export default {
  data () {
    return {
      tableDefaultOption: [
        { lable: "销售价格", value: "price", type: "", search: "", tipAlign: "right", scoped: true, width: 100 },
        { lable: "商品库存", value: "stock", type: "", search: "", tipAlign: "right", scoped: true, width: 100 },
        { lable: "库存预警值", value: "low_stock", type: "", search: "", tipAlign: "right", scoped: true, width: 100 },
        { lable: "SKU编号", value: "skuCode", type: "", search: "", tipAlign: "right", scoped: true, width: 100 }],
      tableOption: {
        toolEventWidth: "100px",
        hiddenPage: true,
        arraySpanMethod: this.arraySpanMethod,
        columns: [],
        toolEvent: [],
        topBtnGroup: []
      },
      obj: {}
    }
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    firstCol: {
      type: Array,
      default: () => []
    }
  },
  components: {
    CustomTable
  },
  methods: {
    changeData (data) {
      this.$emit('tableData', data);
    },
    arraySpanMethod ({
      rowIndex,
      columnIndex
    }) {
      let dataObj = this.obj;
      if (columnIndex == 0) {
        if (dataObj[rowIndex]) {
          return {
            rowspan: (dataObj[rowIndex][1] - dataObj[rowIndex][0]) + 1,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
  },
  created () {
    this.obj = util.getStartIndex(this.tableData, 'sp1');
    this.tableOption.columns.push(...this.firstCol, ...this.tableDefaultOption);
  }
}
</script>

<style>
</style>

<template>
  <el-table :data="tableData"
            style="width: 100%"
            :default-sort="{prop: 'date', order: 'descending'}">
    <template v-for="(column,index) in option">
      <!-- <el-table-column v-if="!item.isShow"
                       :key="index"
                       :prop="item.prop"
                       :label="item.label"
                       :sortable="item.sortable"
                       :render-header="renderHeader"
                       width="180"> -->
      <item :item="column"
            :key="index">

      </item>
      <!-- </el-table-column> -->
    </template>
  </el-table>
</template>

<script>
import item from './item';
export default {
  data () {
    return {
      option: [{
        sortable: true,
        label: "日期",
        prop: "date"
      }, {
        sortable: true,
        label: "姓名",
        prop: "name"
      }, {
        sortable: true,
        label: "地址",
        prop: "address"
      }],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  components: {
    item
  },
  methods: {
    renderHeader (h, { column }) {
      return h('span', column.label)
    },
    formatter (row) {
      return row.address;
    }
  }
}
</script>

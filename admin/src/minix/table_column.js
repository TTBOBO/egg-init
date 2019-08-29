export default {
  data() {
    return {
      taskListloading: false,
      taskTableData: [],
      show: true,
      columns: [],
      search: {
        sort: '', //排序
        type: '',
        // status: "All",
        page: 1, //页数
        size: 20 //每页多少条
        // count:0,  //总数
      },
      pageSizes: [10, 20, 30, 40, 50, 100],
      selectIndex: '', //点击的行
      defaultSearch: '',
      searchData: [], //存放搜索条件的地方
      btnGroup: [], //存储table顶部按钮
      selectItem: [], //存放table  多选框选中的值
      showhideCol: false, //显示隐藏列dialog
      checkGroup: [],
      dbEdit: {}, //存放双击编辑的属性
      tableMaxHeight: '',
      promises: [],
      testColumn: [],
      db_item: {}
    }
  },
  methods: {
    formatterTime(row, column) {
      return row[column.value]
    }
  }
}

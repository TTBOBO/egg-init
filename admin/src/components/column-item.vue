<template>
  <el-table-column :fixed="item.fixed|| false"
                   :min-width="item.MinWidth"
                   :prop="item.value"
                   tooltip-effect="light"
                   :show-overflow-tooltip="item.tooltip || false"
                   :resizable="item.resizable || true"
                   :label="item.lable"
                   :align="item.align || 'center'"
                   :width="item.width || 'auto'"
                   :sort-orders="sortOrders"
                   v-if="item.isShow && !isExpandOrIndex(item)&& !item.filters"
                   :sortable="item.sort || false">
    <template slot-scope="scope">
      <template v-if="item.render || item.scoped || item.expand">
        <expand-solt :column="item"
                     :row="scope.row"
                     :render="item.render"></expand-solt>
      </template>
      <template v-else-if="item.type == 'time'">
        <span v-html="formatterTime(scope.row, item)"></span>
      </template>
      <template v-else-if="item.evelKey">
        <span v-html="getFormat(item.evelKey,scope.row)"></span>
      </template>
      <template v-else-if="item.type ==  'select' ">
        <span>{{item.selectOPtion[scope.row[item.value]] || scope.row[item.value]}}</span>
      </template>
      <template v-else-if="item.dbclick">
        <div @dblclick="showInput(scope,scope['$index'])">
          <span v-if="!(scope.row[scope.column.property+scope['$index']])">{{scope.row[item.value]}}</span>
          <el-input :class="'index_'+scope['$index']"
                    :ref="scope.column.property+scope['$index']"
                    v-if="(scope.row[scope.column.property+scope['$index']])"
                    @blur="editInput(scope,scope['$index'])"
                    v-model="scope.row[item.value]"
                    :placeholder="'请输入'+item.lable"></el-input>
        </div>
      </template>
      <template v-else>
        <span>{{(scope.row[item.value] !== null || scope.row[item.value] != undefined) ? scope.row[item.value] : item.defaultVal}}</span>
      </template>
    </template>
    <template slot="header"
              slot-scope="scope">
      <expandDom :column="item"
                 v-if="item.solt_header"
                 :index="scope.$index"
                 :ctx="{}"></expandDom>
      <span v-else>{{scope.column.label}}</span>
    </template>
    <slot></slot>
  </el-table-column>

  <el-table-column :type="item.expand ? 'expand' : 'index'"
                   :fixed="item.fixed|| false"
                   :min-width="item.MinWidth"
                   :prop="item.value"
                   tooltip-effect="light"
                   :show-overflow-tooltip="item.tooltip || false"
                   :resizable="item.resizable || true"
                   :label="item.lable"
                   :align="item.align || 'center'"
                   :width="item.width || 'auto'"
                   v-else-if="item.isShow && isExpandOrIndex(item) && !item.filters">
    <template slot-scope="scope">
      <template v-if="item.render || item.scoped || item.expand">
        <expand-solt :column="item"
                     :row="scope.row"
                     :render="item.render"></expand-solt>
      </template>
    </template>
    <template slot="header"
              slot-scope="scope">
      <expandDom :column="item"
                 v-if="item.solt_header"
                 :index="scope.$index"
                 :ctx="{}"></expandDom>
      <span v-else>{{scope.column.label}}</span>
    </template>
    <slot></slot>
  </el-table-column>

  <el-table-column :fixed="item.fixed|| false"
                   :min-width="item.MinWidth"
                   :filter-method="filterHandler"
                   :filters="item.filters"
                   :prop="item.value"
                   tooltip-effect="light"
                   :show-overflow-tooltip="item.tooltip || false"
                   :resizable="item.resizable || true"
                   :label="item.lable"
                   :align="item.align || 'center'"
                   :width="item.width || 'auto'"
                   :sort-orders="sortOrders"
                   v-else-if="item.isShow && !isExpandOrIndex(item) && item.filters"
                   :sortable="item.sort || false">
    <template slot-scope="scope">
      <template v-if="item.render || item.scoped || item.expand">
        <expand-solt :column="item"
                     :row="scope.row"
                     :render="item.render"></expand-solt>
      </template>
      <template v-else-if="item.type == 'time'">
        <span v-html="formatterTime(scope.row, item)"></span>
      </template>
      <template v-else-if="item.evelKey">
        <span v-html="getFormat(item.evelKey,scope.row)"></span>
      </template>
      <template v-else-if="item.type ==  'select' ">
        <span>{{item.selectOPtion[scope.row[item.value]] || scope.row[item.value]}}</span>
      </template>
      <template v-else-if="item.dbclick">
        <div @dblclick="showInput(scope,scope['$index'])">
          <span v-if="!(scope.row[scope.column.property+scope['$index']])">{{scope.row[item.value]}}</span>
          <el-input :class="'index_'+scope['$index']"
                    :ref="scope.column.property+scope['$index']"
                    v-if="(scope.row[scope.column.property+scope['$index']])"
                    @blur="editInput(scope,scope['$index'])"
                    v-model="scope.row[item.value]"
                    :placeholder="'请输入'+item.lable"></el-input>
        </div>
      </template>
      <template v-else>
        <span>{{(scope.row[item.value] !== null || scope.row[item.value] != undefined) ? scope.row[item.value] : item.defaultVal}}</span>
      </template>
    </template>
    <template slot="header"
              slot-scope="scope">
      <expandDom :column="item"
                 v-if="item.solt_header"
                 :index="scope.$index"
                 :ctx="{}"></expandDom>
      <span v-else>{{scope.column.label}}</span>
    </template>
    <slot></slot>
  </el-table-column>
</template>

<script>
import table_column from '../minix/table_column.js';
export default {
  name: "column-item",
  mixins: [table_column],
  data () {
    return {
      ctx: null,
      sortOrders: ['ascending', 'descending', null] || ['ascending', 'descending', 'ascending']
    }
  },
  props: {
    t_columns: {
      type: Array,
      default: () => []
    },
    optionData: {
      type: Object,
      default: function () {
        return {
          url: "",
          columns: [], //table  表格列数据
          toolEvent: [], //table表操作按钮 组
          topBtnGroup: [], //table  顶部操作按钮组
          autoCol: true,
          primary: "",
          tab: false,
        };
      }
    },
    item: {
      type: Object,
      default: () => { }
    },
    columnDataObj: {
      type: Object,
      default: () => { }
    },
    columnData: {
      type: Array,
      default: () => []
    }
  },
  components: {
    expandDom: {
      name: "expandDom",
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        },
        ctx: Object,
        header: Boolean
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index
        };
        if (ctx.props.column) {
          const value = ctx.props.column[ctx.props.column.scopedKey] || ctx.props.column.value;
          if (ctx.props.column) params.column = ctx.props.column;
          let scoped = ctx.parent.ctx['$scopedSlots']; //取出当前组件对应的table组件的$scopedSlots

          if (ctx.props.column.solt_header && scoped[value + '_header']) {
            try {
              return h('span', scoped[value + '_header'](params));
            } catch (error) {
              console.error(error);
              return h('span', {}, "");
            }
          }
        }
      },
      renderError: (h, err) => {
        return (h, {}, err);
      }
    },
    'expand-solt': {
      name: "expand-solt",
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        },
        header: Boolean
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index
        };
        const value = ctx.props.column.value;
        if (ctx.props.column) params.column = ctx.props.column;
        let scoped = ctx.parent.ctx['$scopedSlots']; //取出当前组件对应的table组件的$scopedSlots
        if (ctx.props.column.scoped) { //如果用scopedSlots时
          try {
            return h('span', scoped[value](params));
            // return h('span', scoped[value] && scoped[value](params));
          } catch (error) {
            console.error(error);
            return h('span', {}, "");
          }
        } else { //如果用  render时
          if (ctx.props.column) params.column = ctx.props.column;
          return ctx.props.render(h, params);
        }
      }
    },
  },
  methods: {
    isExpandOrIndex (item) {
      return item.expand || item.index;
    },
    getFormat (formatStr, props) {
      return formatStr.split('.').reduce((total, cur) => total[cur], props);
    },
    //格式化时间
    formatterTime (row, column) {
      return row[column.value];
    },
    filterHandler (value, row, column) {
      const property = column['property'];
      return row[property] == value;
    },
    get_solt_scoped (ctx) {
      return (ctx.$options._componentTag != 'CustomTable' && ctx.$options._componentTag != 'Custom-table' && ctx.$options._componentTag) ? this.get_solt_scoped(ctx.$parent) : ctx;
    },
    showInput (scope, index) {
      //去除  appModule列 第一行 下标为0   appModule0
      let res = scope.column.property + scope['$index'];
      if (!this.ctx.taskTableData[index][res]) {
        this.ctx.taskTableData[index][res] = true;
        this.$set(this.ctx.taskTableData, index, this.ctx.taskTableData[index])
      }
      this.$nextTick(() => this.$refs[res][2].focus());
    },
    //双击编辑
    editInput (scope, index) {
      this.ctx.editInput(scope, index);
    }
  },
  created () {
    this.ctx = this.get_solt_scoped(this);
  },
}
</script>

<style>
</style>

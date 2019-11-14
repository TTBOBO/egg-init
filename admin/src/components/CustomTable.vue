<template>
  <div style=''>
    <div ref="top-form">
      <el-form :inline="true"
               size="mini"
               v-if="getSearchLength"
               class="search-form"
               @submit.native.prevent>
        <template v-for="(item,index) in searchData">
          <el-form-item :key='index'
                        v-if="item"
                        :label="item.lable+'：'">
            <el-input v-if="item.type == '' || item.type == 'input'"
                      :style="{width: item.seaW ? item.seaW+'px' : '190px'}"
                      v-model="item.value"
                      clearable
                      :placeholder="item.pla || '请输入'+item.lable"></el-input>
            <el-date-picker v-else-if="item.type == 'time'"
                            :style="{width: item.seaW ? item.seaW+'px' : '190px'}"
                            v-model="item.value"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
            <el-select v-else-if="item.type == 'multiple' || item.type == 'select'"
                       filterable
                       clearable
                       v-model="item.value"
                       :multiple="item.multiple"
                       :placeholder="item.pla || '请选择'+item.lable"
                       @change="(val) => changeSearchVal(val,index)">
              <template v-if="item.selectOPtion">
                <el-option v-for="(_item,_index) in item.selectOPtion"
                           :key="_index"
                           :disabled="_item.disabled"
                           :label="_item.label"
                           :value="_item.value">
                </el-option>
              </template>
            </el-select>
          </el-form-item>
        </template>
        <el-button type="primary"
                   @click="onSubmit"
                   size="mini">查询</el-button>
      </el-form>
      <el-button size="small"
                 v-if="optionData.showhideColumn"
                 @click.stop="setColums"
                 icon=""
                 style="margin-right: 3px;margin-bottom:20px;"><a style="width:0px;height:0px;"></a>显示隐藏列</el-button>
      <span class="btn-items"
            v-if="btnGroup.length > 0"
            style="margin-bottom:10px;display: inline-block;">
        <el-button v-for="(item,index) in btnGroup"
                   size="small"
                   :loading="item.loading"
                   :type="item.bgcolor"
                   @click.stop="handBtn(item,index)"
                   :disabled="item.disabled"
                   :icon="item.icon "
                   :key="'btn'+index"
                   ref="info"
                   style="margin-right: 3px;"><a :id="item.type"
             style="width:0px;height:0px;"></a>{{item.title}}</el-button>
      </span>
    </div>
    <el-table ref="table"
              :span-method="optionData.arraySpanMethod || arraySpanMethod"
              :data="taskTableData"
              :max-height="tableMaxHeight || 'auto'"
              border
              v-loading="taskListloading"
              style="margin-top: 1px;"
              size="mini"
              :id="optionData.tableId"
              :row-class-name="setClassName"
              @cell-click="cellClick"
              @cell-dblclick="cellDbClick"
              @sort-change="sortChange"
              @row-click="rowClick"
              @select="selectChange"
              @select-all="selectChange"
              @expand-change="expandChange"
              :row-key="optionData.evalKey || 'job_name'"
              :expand-row-keys="expandedRows"
              :default-sort="defaultSort"
              v-if="showTable">
      <el-table-column type="selection"
                       align="center"
                       v-if="optionData.selection">
      </el-table-column>
      <el-table-column type="index"
                       align="center"
                       v-if="optionData.indexNum">
      </el-table-column>
      <!-- :t_columns="testColumn"
                     :columnDataObj="columnDataObj"
                     :columnData="columnData"
                     :optionData="optionData" 
                     :t_columns="testColumn"
                       :columnDataObj="columnDataObj"
                       :columnData="columnData"
                       :optionData="optionData"-->
      <template v-for="(item,index) in testColumn">
        <column-item :item="item"
                     :key="index"
                     v-if="!item.child"></column-item>
        <el-table-column v-if="item.child"
                         :label="item.lable"
                         :width="item.width || '200'"
                         :key="index">
          <column-item v-for="(_item,_index) in item.child"
                       :key="_index"
                       :item="_item"></column-item>
        </el-table-column>
      </template>
      <el-table-column label='操作'
                       min-width="80"
                       :width="optionData.toolEventWidth"
                       :fixed="optionData.toolEventWFixed || false"
                       align="center"
                       v-if="optionData.toolEvent && optionData.toolEvent.length > 0 && showTable">
        <template slot-scope="scope">
          <slot name="tool"
                :scope="scope"></slot>
          <template v-for="(btn, index) in optionData.toolEvent">
            <el-button v-if="!btn.child"
                       :key="index"
                       :type="btn.handStatus ? getHandType(scope.row[btn.handStatus.obj],btn.handStatus.type) : (btn.type || 'primary')"
                       size="mini"
                       :loading="toolLoading[scope.$index] && btn.hasloading"
                       :icon="btn.icon"
                       :disabled="getBtnStatus(scope,btn)"
                       :plain="btn.plain"
                       @click.native.prevent="btnMethod(btn,scope.row, scope.$index)">
              {{btn.handStatus ? getHandTitle(scope.row[btn.handStatus.obj],btn.handStatus.title) : btn.title }}
            </el-button>
            <el-dropdown :key="index"
                         v-else
                         style="margin-left:10px;">
              <el-button type="primary"
                         size="mini">
                {{btn.title}}<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(child,_index) in btn.child"
                                  :key="_index">
                  <el-button :key="index"
                             :type="child.handStatus ? getHandType(scope.row[child.handStatus.obj],child.handStatus.type) : (child.type || 'primary')"
                             size="mini"
                             :icon="child.icon"
                             :loading="toolLoading[scope.$index] && child.hasloading"
                             :disabled="getBtnStatus(scope,child)"
                             :plain="child.plain"
                             @click.native.prevent="btnMethod(child,scope.row, index)">
                    {{child.handStatus ? getHandTitle(scope.row[child.handStatus.obj],child.handStatus.title) : child.title }}
                  </el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-bottom: 9px;"
                   v-if="!optionData.hiddenPage"
                   @size-change='sizeChange'
                   @current-change="pageChange"
                   :current-page.sync="search.page"
                   :page-size.sync="search.size"
                   layout="total, prev, pager, next, jumper,sizes"
                   :total="search.count"
                   :page-sizes="optionData.pageSizes || pageSizes"
                   class="page-wrap"></el-pagination>
    <el-dialog title="显示隐藏列"
               :visible.sync="showhideCol"
               width="50%"
               append-to-body
               top="300px">
      <div class="checkbox-group">
        <el-checkbox-group v-model="checkGroup"
                           @change="changeGroup">
          <draggable @end="end"
                     :list="columns">
            <template v-for="(item,index) in columns">
              <el-checkbox v-if="item.type != 'expand'"
                           :label="item.lable"
                           :key="index">{{item.lable}}</el-checkbox>
            </template>
          </draggable>
        </el-checkbox-group>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import draggable from 'vuedraggable';
import columnItem from './column-item.vue';
import table_column from '../minix/table_column.js'
export default {
  mixins: [table_column],
  name: 'CustomTable',
  data () {
    return {
      expandedRows: [],
      index: 0,
      showTable: false,
      columnData: null, //存储 列的数据
      // columnDataObj: {},
      defaultSort: null,
      toolLoading: []
    }
  },
  props: {
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
    defaultData: Array,
    formData: Function,
    dataKey: {
      type: [String, Number],
      default: ""
    }
  },
  computed: {
    getSearchLength () {
      return this.searchData.filter(item => item).length
    }
  },
  components: {
    draggable,
    columnItem,
  },
  methods: {
    getDefaultSort () {
      let orderByConfig = {
        desc: "descending",
        asc: "ascending"
      }
      const res = this.optionData.columns.filter(item => item.sort)[0];
      this.defaultSort = res ? { prop: res.value, order: orderByConfig[res.sortOrder] || 'descending' } : {};
      if (!this.defaultSort.prop) {  //没有默认sort的时候不会触发sort-change事件，所以手动触发获取table表格数据
        this.getTaskTableData();
      }
    },
    getCol () {
      let obj = {};
      this.columns.forEach(item => {
        obj[item.value] = item;
      })
      this.testColumn = this.optionData.columnData ? this.assignData(this.optionData.columnData, obj) : this
        .columns; //是否有表头合并
      // this.getColumnDataObj();
    },
    // getColumnDataObj () {
    //   this.columnDataObj = this.getChildColumn(this.testColumn)
    //   this.columnData = JSON.parse(JSON.stringify(this.testColumn));
    // },
    getChildColumn (item) {
      return item.reduce((total, cur) => {
        if (cur.child) {
          return Object.assign({}, total, this.getChildColumn(cur.child));
        } else {
          total[cur.value] = cur
          return total;
        }
      }, {})
    },
    assignData (data, obj) {
      for (var i in data) {
        if (data[i].child) {
          data[i].child = this.assignData(data[i].child, obj);
        } else {
          let _obj = JSON.parse(JSON.stringify(Object.assign({}, data[i], obj[data[i].value])));
          data[i] = null
          data[i] = _obj;
        }
      }
      return data;
    },
    getBtnStatus (scope, item) {
      let data = scope.row;
      let index = scope.$index;
      this.end(data, index);
      return item.judgement_con ? eval('data.' + item.judgement_con) : (item.index_con ? eval(item.index_con) : false);
    },
    end () { },
    // hideDialog () {
    //   this.$set(this.columns, this.checkGroups);
    //   this.showhideCol = false;
    // },
    changeGroup (group) {
      this.columns.forEach((item, index) => {
        item.isShow = group.indexOf(item.lable) != -1 ? true : false;
        this.$set(this.columns, index, item);
      });
      this.testColumn = JSON.parse(JSON.stringify(this.optionData.columnData ? this.assignData(this.optionData
        .columnData) : this.columns));
      // this.getColumnDataObj();
      this.showTable = false;
      this.taskListloading = true;
      setTimeout(() => {
        this.showTable = true;
        this.taskListloading = false;
      }, 200)
    },
    expandChange (row, expandedRows) {
      this.expandedRows = expandedRows.map(item => this.getEvalKey(this.optionData.evalKey, item));
      this.$emit("expandChange", {
        row,
        expandedRows
      });
    },
    setClassName ({
      row,
      index
    }) {
      return this.optionData.expandCln ? this.optionData.expandCln({
        row,
        index
      }) : "";
    },
    //显示隐藏列
    setColums () {
      this.showhideCol = !this.showhideCol;
    },
    async getSearchList () {
      let serArr;
      let obj = {};
      let item = null;
      if (!this.optionData.columns) return false;
      this.searchData = new Array(this.optionData.columns.length);
      for (var i = 0; i < this.optionData.columns.length; i++) {
        item = this.optionData.columns[i];
        if (item.search && item.type != "img") {
          obj = {
            range: "",
            search: item.search, //搜索条件
            lable: item.lable, //显示的字
            value: item.searchVal || "", //默认值
            type: item.type, //搜索 type   类型  time   select   普通框
            pla: item.pla, // placeholder值
            seaW: item.seaW, //搜索宽度
            multiple: item.multiple || false,
            field: item.value
          };
          if (item.searchVal) {
            this.search[item.search] = item.searchVal;
          }
          if (item.url) {
            let res = await this[item.mock ? '$ajaxMock' : '$ajaxGet'](item.url, {}, item.urlType || 1);
            //当selectDataType为1时，  selectOPtion为obj类型使用第一种方式处理数据 反之是数组类型  用第二种方式处理
            serArr = item.mock ? util.getSelectOpt(res, 3) : util.getSelectOpt(res.result[item.url] || res
              .result[item.keyurl], item.selectDataType || 2, { colKey: item.colKey, colName: item.colName });
            if (item.selectOPtion) {
              serArr = [...util.getSelectOpt(item.selectOPtion, 1), ...serArr]; //默认的数据放前面，接口数据放后面
            }
            obj.selectOPtion = serArr; //下拉框数据   //select switch 存在
            this.searchData.splice(i, 1, obj); // 防止
            item.selectOPtion = util.getSelectReverse(serArr); //反序列化给table表格提供数据，合并 默认设置 以及接口返回的数据
          } else {
            if (item.type == 'select' || item.type == "switch" && item.selectOPtion) {
              serArr = util.getSelectOpt(item.selectOPtion, 1);
              obj.selectOPtion = serArr;
            }
            this.searchData.splice(i, 1, obj);
          }
        }
      }
    },
    onSubmit () {
      let filter = {}; //[]
      let num = 0;
      this.searchData.forEach((item) => {
        /**
         * 分为   time  select  number 普通输入框
         */
        const { search, value, type, multiple } = item
        if (search) {
          if (value) {
            if ((type == 'time' || multiple)) {
              if (value.length && ((multiple && value[0] !== '全部') || (!multiple))) {
                filter[search] = value.join(',');
              } else {
                delete this.search[search];
              }
              num += 1;
            } else {
              filter[search] = value;
              num += 1;
            }
          } else {
            delete this.search[search];
          }
        }
      });
      this.$emit("getSearch", this.searchData);
      if (num == 0) {
        filter = {};
        this.search = JSON.parse(JSON.stringify(this.defaultSearch));
        this.getTaskTableData();
        // return false;
      } else {
        //初始化搜索数据  value为空
        // this.clearSearchValue();
        let _filter = Object.assign(this.search, filter); //合并
        this.search = _filter;
        this.search.page = 1;
        this.getTaskTableData();
      }
    },
    //清空搜索
    clearSearchValue () {
      this.searchData.forEach(item => {
        item.value = "";
        item.range = "";
      });
    },
    //取得点击的行index
    rowClick (row, event, column) {
      this.taskTableData.forEach((item, index) => {
        if (item[this.optionData.primary] === row[this.optionData.primary]) {
          this.selectIndex = index;
          return false;
        }
      })
      this.$emit('rowClick', {
        row,
        column,
        selectIndex: this.selectIndex
      });
    },
    //双击编辑
    editInput (scope, index) {
      let res = scope.column.property + scope['$index'];
      //修改后的值
      //console.log(this.taskTableData[index][scope.column.property])
      if (this.taskTableData[index][res]) {
        this.taskTableData[index][res] = false;
        this.$set(this.taskTableData, index, this.taskTableData[index])
      }
      this.$emit('cellDbClick', {
        value: this.taskTableData[index][scope.column.property],
        id: this.taskTableData[index][this.optionData.primary]
      });
    },
    cellClick () {
      // this.$emit('cellClick',{row, column});
    },
    cellDbClick (row, column) {
      this.$emit('cellDbClick', {
        row,
        column
      });
    },
    sortChange ({ prop, order }) {
      let orderByConfig = {
        descending: "desc",
        ascending: "asc"
      }
      this.search.sort_by = prop
      this.search.sort_type = orderByConfig[order];
      this.getTaskTableData();
      this.$emit('sortChange', prop, order);
    },
    toggleRowSelection () {
      this.$nextTick(() => {
        let ids = this.selectItem.map(item => {
          return this.optionData.evalKey ? this.getEvalKey(this.optionData.evalKey, item) : item.job_id;
        });
        let id = null;
        this.taskTableData.forEach(item => {
          id = this.optionData.evalKey ? this.getEvalKey(this.optionData.evalKey, item) : item.job_id;
          if (ids.indexOf(id) != -1)
            this.$refs.table.toggleRowSelection(item, true);
        })
      })
    },
    getEvalKey (formatStr, item) {
      let format = formatStr.split('.');
      let res = format.reduce((total, cur) => {
        return total[cur];
      }, item)
      return res;
    },
    selectChange (selection) {
      this.selectItem = selection;
      this.btnGroup.forEach(item => {
        //未满足选中数量  按钮置灰
        if (!item.hasSel)
          return false;
        item.disabled = this.getDisStatus(item);
      })
      this.$emit('selectChange', selection);
    },
    getDisStatus (item) {
      let res = false;
      if (item.hasSel && item.hasMore == 'more') { //选中数 大于等于 item.hasSel
        res = this.selectItem.length >= item.hasSel ? false : true;
      } else if (item.hasSel && !item.hasMore) { //选中数 等于 item.hasSel
        res = item.hasSel == this.selectItem.length ? false : true;
      } else if (item.hasSel && item.hasMore == 'less') { //选中数 小于等于 item.hasSel
        res = this.selectItem.length <= item.hasSel && this.selectItem.length > 0 ? false : true;
      }
      return res;
    },
    sizeChange (size) {
      this.search.size = size;
      this.$emit('sizeChange', size);
      this.getTaskTableData();
    },
    pageChange (page) {
      this.search.page = page;
      this.$emit('pageChange', page);
      this.getTaskTableData();
    },
    //跟局 状态 返回对应的字
    getHandTitle: function (data, obj) {
      return obj[data] || "";
    },
    //返回  按钮根据 状态 显示  的type 类型
    getHandType: function (data, obj) {
      return obj[data] || "";
    },
    topBtnGroup (group) {
      if (!group || group.length == 0)
        return false;
      group.forEach(item => this.getButtonOption(item));
    },
    getButtonOption (item) {
      this.btnGroup.push({
        title: item.name,
        bgcolor: item.bgcolor || "success",
        type: item.type,
        url: item.url,
        emit: item.emit,
        icon: item.icon || "",
        disabled: this.getDisStatus(item),
        loading: false,
        hasloading: item.hasloading,
        hasSel: item.hasSel, //需要选中几个
        hasMore: item.hasMore //( more,  less,   == ) =>  item.hasSel
      })
    },
    setSelectOption (options, valParams) {
      this.columns.forEach((item, index) => {
        if (item.type === 'select' && options[item.value]) {
          //反序列数据给table表格使用
          item.selectOPtion = util.getSelectReverse(options[item.value]);
          if (item.search) {
            this.searchData[index].selectOPtion = options[item.search]
          }
          //给multiple项设置默认值并制定option设置成不可选择
          if (valParams && valParams[item.search]) {
            this.searchData[index].value = valParams[item.search]
            this.changeSearchVal(valParams[item.search], index);
          } else {
            this.changeSearchVal(this.searchData[index].value, index);
          }
        }
      })
      this.getCol()
    },
    changeSearchVal (val, index) {
      if (typeof val === 'object') {
        if (val.indexOf('全部') !== -1) {
          this.searchData[index].value = ['全部'];
          this.searchData[index].selectOPtion.forEach((item, _index) => {
            if (_index > 0) {
              item.disabled = true;
            }
          })
        } else {
          this.searchData[index].selectOPtion.forEach(item => item.disabled = false)
        }
      }
    },
    handBtn (item, index) {
      if (item.hasloading) {
        this.btnGroup[index].loading = true;
        setTimeout(() => this.btnGroup[index].loading = false, 1000);
      }
      if (item.emit)
        this.$emit(item.emit, this.selectItem)
    },
    //table  表格的 按钮事件
    btnMethod (item, row, key) {
      if (item.hasloading) {
        this.toolLoading[key] = true;
        setTimeout(() => this.$set(this.toolLoading, key, false), 1000);
      }
      if (item.emit)
        this.$emit(item.emit, {
          row,
          key
        })
    },
    curReload (status) {
      if (!status)
        this.selectItem = [];
      this.getTaskTableData({
        saveSelection: status
      });
    },
    //重新加载  //并初始化搜索条件
    reload () {
      this.defaultSearch = JSON.parse(JSON.stringify(Object.assign(this.search, this.optionData.search)));
      this.search = JSON.parse(JSON.stringify(this.defaultSearch));
      this.getTaskTableData();
    },
    initDbClick () {
      if (!this.optionData.dbEdit)
        return false;
      this.columns.forEach(item => {
        if (item.dbclick) {
          for (var i = 0; i < this.search.size; i++) {
            this[`${item.value.toString() + i}`] = false;
            this.dbEdit[`${item.value.toString() + i}`] = false;
          }
        }
      })
    },
    arraySpanMethod () {
      return [1, 1]
    },
    async init () {
      //默认存储初始化的获取数据条件，方便重新加载功能
      this.defaultSearch = JSON.parse(JSON.stringify(Object.assign(this.search, this.optionData.search)));
      //浅拷贝 父组件  默认传过来的 serch 参数 （合集）
      this.search = this.optionData.assignSearch ? this.optionData.search : Object.assign(this.search, this
        .optionData.search);
      this.topBtnGroup(this.optionData.topBtnGroup);
      await this.getSearchList();
      this.columns = this.optionData.columns;
      if (!this.columns)
        return false;
      this.columns = this.columns.filter(item => !item.hidden);
      this.columns.forEach(item => {
        item.isShow = true;
        this.checkGroup.push(item.lable)
      }); //设置显示隐藏列
      this.initDbClick();
      this.getCol();
      this.getDefaultSort();
      this.showTable = true;
    },
    async getTaskTableData (params = {}) {
      if (this.optionData.tableLoadIcon)
        this.taskListloading = true;
      if (params.isRef)
        this.search.page = 1;
      if (this.defaultData) {
        this.setTabelData(this.defaultData);
        // this.$emit("tableData", this.defaultData);
        return false;
      }
      let res = await this[this.optionData.ajaxType || '$ajaxGet'](this.optionData.baseUrl, this.search, this.optionData.urlType || 3);
      if (res.err_code == 0 || res.code == 200 || res.code == 0) {
        let dataKey = this.optionData.dataKey;
        const data = res.result[dataKey] || res.result.data;
        // this.$emit("tableData", res.result, this.dataKey);
        this.setTabelData(data);
        if (params.saveSelection)
          this.toggleRowSelection();
        if (this.optionData.tableLoadIcon)
          this.taskListloading = false;
        this.search.count = res.result.jobs_total_num || res.result.data_total_num;
      } else {
        this.$alert(res.err_msg || res.data.message || res.data.err_msg, "获取列表失败", {
          dangerouslyUseHTMLString: true
        });
        this.taskTableData = [];
      }
      this.showTable = true;
    },
    setTabelData (data) {
      if (this.formData)
        data = this.formData(data);
      //当table 有双击编辑的功能的话
      if (this.optionData.dbEdit) {
        this.columns.forEach((col) => {
          data.forEach((item, index) => {
            if (col.dbclick)
              item[col.value + index] = false;
          })
        })
      }
      this.taskTableData = data;
      // this.$emit("tableData", this.defaultData);
      // this.$emit("tableData", {
      //   data
      // }, this.dataKey);
    },
    async addColumn (cols) {
      let colsArr = cols.filter(item => {
        item.isShow = true;
        this.checkGroup.push(item.lable);
        return !item.hidden;
      });
      this.columns.push(...colsArr);
      await this.getSearchList();
      if (this.optionData.dbEdit) {
        this.columns.forEach((col) => {
          this.taskTableData.forEach((item, index) => {
            if (col.dbclick)
              item[col.value + index] = false;
          })
        })
      }
      this.getCol();
    },
    addTopButton (buttonItem) {
      this.getButtonOption(buttonItem);
    }
  },
  mounted () {
    if (this.optionData.initheight) {
      this.$nextTick(() => {
        this.tableMaxHeight = typeof this.optionData.initheight == 'boolean' ? this.$parent.$el.clientHeight - (
          this.$refs['top-form'].clientHeight + 180) : this.optionData.initheight;
        window.onresize = util.throttle(() => {
          this.tableMaxHeight = typeof this.optionData.initheight == 'boolean' ? this.$parent.$el
            .clientHeight - (this.$refs['top-form'].clientHeight + 180) : this.optionData.initheight;
        }, 1000)
      })
    }
    this.init();
  },
  created () { },
  destroyed () {
    window.onresize = () => { };
  },
  watch: {
    defaultData (newV) {
      this.setTabelData(newV);
    },
    taskTableData: {
      deep: true,
      handler (newV) {
        this.$emit("tableData", newV);
      }
    }
  }
};
</script>
<style>
.img {
  cursor: pointer;
  width: 50px;
  height: 50px;
}
.page-wrap {
  margin: 10px 0;
  text-align: center;
}
.checkbox-group .el-checkbox-group div {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.checkbox-group .el-checkbox + .el-checkbox {
  margin-left: 0 !important;
}
.expand .el-table__expand-column .cell {
  display: none;
}
.el-table__expanded-cell {
  background: #f7f7f7 !important;
}
</style>

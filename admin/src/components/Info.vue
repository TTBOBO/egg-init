<template>
  <div class="info-component"
       style=" overflow:auto"
       :style="{'max-height':getMaxHeight}">
    <el-form ref="form"
             :label-width="labelWidth || '140px'"
             :inline="inline">
      <div class="form-div"
           v-for="(item,index) in infoOption"
           :key="index"
           :class="{hasTip:item.width}"
           :style="{width:(item.width || getWidth),float:getFloat}">
        <el-form-item :label="item.label+'：'"
                      style="width:100%;">
          <expand-dom v-if="item.render || item.scoped"
                      :column="item"
                      :data="infoData"
                      :prop="item.prop"
                      :render="item.render"
                      :index="index"></expand-dom>
          <span class="txt"
                v-else-if="item.type == 'time'">{{infoData[item.prop] | getTime}}</span>
          <span class="txt"
                v-else-if="item.type == 'select'">{{item.selectOPtion && item.selectOPtion[infoData[item.prop]]}}</span>
          <span class="txt"
                v-else-if="item.format"><span v-html="getFormat(item.format)"></span>{{item.append}}</span>
          <a v-else-if="item.href"
             :target="item.blank ? '_blank' : ''"
             :href="infoData[item.href]">{{infoData[item.prop]}}</a>
          <template v-else>

            <span class="tip txt"
                  :class="item.className || {}"
                  v-html="infoData[item.prop]"
                  v-if="!item.tip"></span>
            <el-tooltip class="item"
                        effect="dark"
                        :content="infoData[item.prop]"
                        placement="top-start"
                        v-else>
              <div class="tip-content txt"
                   :class="item.className || {}">{{infoData[item.prop]}}</div>
            </el-tooltip>
            <!-- <span class="tip" v-html="infoData[item.prop] !== '' ? infoData[item.prop]   : '空'"  v-if="!item.tip"></span> -->

            <span v-if="item.append">{{item.append}}</span>
          </template>
        </el-form-item>
        <div class="br-b"
             v-if="hasLine"></div>
      </div>

    </el-form>
  </div>
</template>

<script>
// import util from '@/assets/js/util';
export default {
  data () {
    return {
      curOption: []
    }
  },
  props: {
    infoOption: {
      type: Array,
      default: function () {

        return []
      }
    },
    infoData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    inline: {
      type: Boolean,
      default: function () {
        return true
      }
    },
    'maxHeight': { //组件做大高度
      type: Boolean,
      default: function () {
        return false
      }
    },
    'labelWidth': { //组件高度
      type: String,
      default: function () {
        return ""
      }
    },
    'infoHeight': { //组件高度
      type: String,
      default: function () {
        return ""
      }
    },
    hasLine: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    'label-position': {
      type: String,
      default: function () {
        return "right"
      }
    }
  },
  methods: {
    getFormat (formatStr) {
      let format = formatStr.split('.');
      return format.reduce((total, cur) => total ? total[cur] : total, this.infoData);
    },
    loadSelect () {
      let serArr;
      if (!this.curOption) {
        return false;
      }
      this.curOption.forEach(item => {
        if (item.type == 'select' || item.type == "switch" && item.selectOPtion) {
          if (item.url) {
            this[item.mock ? '$ajaxMock' : '$ajaxGet'](item.url, {}, item.urlType || 1).then(res => {
              //当selectDataType为1时，  selectOPtion为obj类型使用第一种方式处理数据 反之是数组类型  用第二种方式处理
              serArr = item.mock ? util.getSelectOpt(res, 3) : util.getSelectOpt(res.result[item.url], item
                .selectDataType || 2);

              if (item.selectOPtion) {
                serArr = [...serArr, ...util.getSelectOpt(item.selectOPtion, 1)]
              }
              item.selectOPtion = serArr; //下拉框数据   //select switch 存在
              item.selectOPtion = util.getSelectReverse(serArr); //反序列化给table表格提供数据，合并 默认设置 以及接口返回的数据
            })
          }
        }
      })
      this.curOption = this.curOption.slice(0);
    },
    init () {
      this.curOption = this.infoOption.slice(0);
      this.loadSelect();
    }
  },
  computed: {
    getWidth () {
      return (this.inline ? '49%' : 'auto');
    },
    getMaxHeight () {
      return (!this['maxHeight'] ? this.infoHeight || '300px' : 'auto');
    },
    getFloat () {
      return (this.inline ? 'left' : 'none');
    },
  },
  filters: {
    getTime (value) {
      if (!value) return "";
      return util.time.getNowTime(value);
    },
  },
  created () {
    this.init();
  },
  components: {
    expandDom: {
      functional: true,
      props: {
        prop: String,
        data: Object,
        render: Function,
        index: Number,
        column: Object
      },
      render: (h, ctx) => {
        const params = {
          prop: ctx.props.prop,
          index: ctx.props.index,
          data: ctx.props.data,
          column: ctx.props.column
        };
        if (ctx.props.column.scoped) {
          const value = ctx.props.prop;
          return h('div', ctx.parent.$scopedSlots[value](params));
        } else {
          return ctx.props.render(h, params);
        }

      }
    }
  },
}
</script>

<style>
.run {
  color: #30bc64;
}

.none {
  color: #f14132;
}

.warning {
  color: #e6a23c;
}

.form-div {
  position: relative;
}

.form-div:nth-child(even) .br {
  width: 0;
}

.br {
  width: 2px;
  /* background: #ebeef5; */
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
}

.br-b {
  position: absolute;
  width: 100%;
  bottom: 10px;
  left: 0;
  border-bottom: 1px solid #ebeef5;
}

.tip {
  display: inline-block;
  /* width: 40%; */
  /* height: 60px; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-form-item__content {
  text-align: left;
}

.tip-content {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info-component .el-form--inline .el-form-item {
  margin-right: 0;
}

.info-component .el-form .el-form-item {
  margin-bottom: 0 !important;
}

.txt {
  color: #a9a9a9;
}
</style>

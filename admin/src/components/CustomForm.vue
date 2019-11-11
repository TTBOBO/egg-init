<template>
  <div class="">
    <el-form ref="form"
             v-if="showForm"
             :model="paramsData"
             :inline="formOption['inline'] || false"
             :rules="validata"
             :label-width="formOption.LabelWidth || '120px'"
             :inline-message="formOption['inline-message']"
             :status-icon="true"
             :border="formOption.border || true"
             @submit.native.prevent>
      <el-form-item v-for="(item,index) in formOption.formList"
                    v-show="!item.hidden"
                    :prop="item.field"
                    :key='index'
                    :style="{width:'100%'}">
        <span slot="label">
          <span class="mb"
                v-show="item.slotMark"> ~ </span>
          <span v-if="item.title">{{item.title+'：'}}</span>
          <el-tooltip v-if="item.slotLabel"
                      class="item"
                      effect="dark"
                      :placement="item.tipAli || 'top'">
            <div slot="content"
                 v-html="item.tip || ''"></div>
            <i class="el-icon-question"></i>
          </el-tooltip>
        </span>

        <!-- && !item.format -->
        <template v-if="(!item.type && !item.scoped) || (item.type == 'input' || item.type == 'textarea' && !item.scoped)">
          <div :style="{display:item.otherScoped ? '' : 'flex'}">
            <el-input v-if="item.valueType"
                      :min="0"
                      :style="{width:item.width || '100%'}"
                      :type="item.valueType || 'text'"
                      v-model.number="paramsData[item.field]"
                      :clearable="item.valueType ? false : true"
                      :disabled="item.disabled"
                      :placeholder="'请输入'+(item.pla || item.title)"></el-input>
            <el-input v-else
                      :style="{width:item.width || '100%'}"
                      :type="(item.type == 'input' || item.type == 'input') ? 'text' : item.type"
                      :autosize="item.autosize"
                      v-model="paramsData[item.field]"
                      :clearable="item.valueType ? false : true"
                      :disabled="item.disabled"
                      :placeholder="'请输入'+(item.pla || item.title)"></el-input>
            <span style="margin-left:20px;"
                  v-if="item.append">{{item.append}}</span>
          </div>
        </template>

        <template v-else-if="item.type == 'select'  && !item.scoped">
          <el-select v-model="paramsData[item.field]"
                     filterable
                     default-first-option
                     :disabled="item.disabled"
                     :allow-create="item.allowCre"
                     clearable
                     :multiple="item.multiple ? true : false"
                     :placeholder="'请选择'+(item.pla || item.title)"
                     :style="{width:item.width || '100%'}"
                     @change="selectChange(item)">
            <el-option v-for="(selOpt,_index) in item.option"
                       :label="selOpt.label"
                       :value="selOpt.value"
                       :key='_index'>
            </el-option>
          </el-select>
        </template>
        <template v-else-if="item.type == 'checkbox'">
          <el-checkbox-group v-model="paramsData[item.field]"
                             @change="change">
            <el-checkbox v-for="(cheOpt,_index) in item.option"
                         :label="cheOpt.value"
                         :key='_index'>{{cheOpt.label}}
            </el-checkbox>
          </el-checkbox-group>
        </template>
        <template v-else-if="item.type == 'radio'">
          <el-radio-group v-model="paramsData[item.field]">
            <el-radio v-for="(cheOpt,_index) in item.option"
                      :label="cheOpt.value"
                      :key='_index'>{{cheOpt.label}}</el-radio>
          </el-radio-group>
        </template>
        <template v-else-if="item.type == 'switch'">
          <el-switch v-model="paramsData[item.field]"
                     active-color="#13ce66"
                     :active-text="item.activeT"
                     :inactive-text="item.inactiveT"
                     :active-value="item.activeV !== undefined ? item.activeV : true"
                     :inactive-value="item.inactiveV !== undefined ? item.inactiveV : false"
                     inactive-color="#ff4949"> </el-switch>
        </template>

        <template v-else-if="item.type == 'time'">
          <el-time-picker style="width:100%"
                          :format="item.timeFormat || ''"
                          :value-format="item.valueFormat || 'HH:mm:ss'"
                          v-model="paramsData[item.field]"
                          :disabled="item.disabled"
                          align="right"
                          :placeholder="'请选择'+(item.pla || item.title)"
                          :picker-options="item.pickerOpt"
                          :style="{width:item.width || '100%'}"> </el-time-picker>
        </template>
        <template v-else-if="item.type == 'datetime'">
          <el-date-picker style="width:100%"
                          :format="item.timeFormat || ''"
                          :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
                          v-model="paramsData[item.field]"
                          :disabled="item.disabled"
                          align="right"
                          :placeholder="'请选择'+(item.pla || item.title)"
                          :type="item.dateType || 'date'"
                          :picker-options="item.pickerOpt"
                          :style="{width:item.width || '100%'}"> </el-date-picker>
        </template>
        <template v-else-if="item.type == 'datetimerange'">
          <el-date-picker :style="{width:item.width || '100%'}"
                          :format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
                          v-model="paramsData['a']['b']['c']"
                          :disabled="item.disabled"
                          type="datetimerange"
                          align="center"
                          :placeholder="'请选择'+(item.pla || item.title)"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :default-time="['12:00:00', '08:00:00']"> </el-date-picker>
        </template>
        <template v-else-if="item.scoped">
          <expand-dom :data="paramsData"
                      :column="item"
                      :rule="validata[item.field]"
                      v-model="paramsData[item.field]"
                      :render="item.render"
                      :index="index"></expand-dom>
        </template>
        <template v-else-if="item.format">
          {{getFormat(item.format)}}
        </template>
        <template v-else-if="item.type == 'customSelect'">
          <div @click="showDio(item)">
            <el-input :style="{width:item.width || '100%'}"
                      v-model="paramsData[item.field]"
                      readonly
                      :placeholder="'点击添加'+(item.pla || item.title)"></el-input>
          </div>
        </template>
        <template v-else-if="item.type == 'lable'">
          <div v-html="paramsData[item.field]"
               :style="{width:item.width || '100%'}"></div>
        </template>
        <expand-dom v-if="item.otherScoped"
                    :data="paramsData"
                    :column="item"
                    :rule="validata[item.field]"
                    v-model="paramsData[item.field]"
                    :render="item.render"
                    :index="index"></expand-dom>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  model: {
    prop: "formDataInfo",
    event: "input"
  },
  data () {
    return {
      formOption: {},
      paramsData: {}, //存放form表单数据
      initFormDefaultData: {},
      validata: {}, //存放校验数据
      deleteValidata: {}, //hidden存放的校验数据
      showForm: false,
      promises: [], //异步接口
      showConf: false,
      formOptionData: {}
    };
  },
  props: {
    optionData: {
      type: Object,
      default: function () {
        return {
          formList: [],
          infoUrl: ""
        };
      }
    },
    formDataInfo: {
      type: Object,
      default: function () {
        return {};
      }
    },
    dataKey: {
      type: [String, Number],
      default: ""
    }
  },
  components: {
    expandDom: {
      functional: true,
      props: {
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        },
        data: [Object],
        rule: [Array]
      },
      render: (h, ctx) => {
        const params = {
          index: ctx.props.index,
          rule: ctx.props.rule,
          data: ctx.props.data
        };
        if (ctx.props.column.scoped || ctx.props.column.otherScoped) { //如果用scopedSlots时
          const field = ctx.props.column.field;
          if (ctx.props.column) params.column = ctx.props.column;
          return h('div', ctx.parent.$scopedSlots[field](params));
        } else { //如果用  render时
          if (ctx.props.column) params.column = ctx.props.column;
          return ctx.props.render(h, params);
        }
      }
    }
  },
  methods: {
    change () {
      // console.log(val);
    },
    getEval () {

    },
    getFormat (formatStr) {
      if (!this.formDataInfo) return "";
      return formatStr.split('.').reduce((total, cur) => total[cur], this.formDataInfo);
    },
    showDio (item) {
      if (item.type == 'customSelect') {
        this.showConf = true;
        this.selectItem = item.field;
      }

    },
    selectChange (item) {
      this.$set(this.paramsData, item.field, this.paramsData[item.field])
      if (item.emitCb) {
        this.$emit(item.field, {
          value: this.paramsData[item.field],
          field: item.field
        });
      }
    },

    setItemHidden (field, state) {
      this.formOption.formList.forEach(item => {
        if (field == item.field) {
          item.hidden = state ? true : false; //设置formitem 显示隐藏
          state ? delete this.paramsData[item.field] : this.paramsData[item.field] = (this.paramsData[item
            .field] || item.value); //删除对应的值 / 设置默认值
          this.paramsData = JSON.parse(JSON.stringify(this.paramsData))
          if (state && this.validata[field]) {
            this.deleteValidata[field] = this.validata[field];
            delete this.validata[field];
          } else if (!state && this.deleteValidata[field]) {
            this.validata[field] = this.deleteValidata[field];
          }
        }
      })
    },
    setSelectOption (params, field) {
      this.paramsData[field || this.selectItem] = JSON.stringify(params);
      if (!field)
        this.showConf = false;
    },
    async initForm () {
      let item = null;
      let selArr = [];
      if (!this.formOption.formList.length) return false;
      for (var i = 0; i < this.formOption.formList.length; i++) {
        selArr = [];
        item = this.formOption.formList[i];
        if (item.optionUrl) {
          let data = null;
          if (!this.formOptionData[item.optionUrl]) {
            let { result } = await this.$ajaxGet(item.optionUrl, item.selectPar);
            this.formOptionData[item.optionUrl] = result.data;
            data = result.data;
          } else {
            data = this.formOptionData[item.optionUrl];
          }
          selArr = (item.valueType || item.colKey) ? util.getSelectOpt(data, item.colKey ? 4 : 2, { colKey: item.colKey, colName: item.colName }, item.valueType) : data;
        }
        if (item.option) {
          selArr = [...util.getSelectOpt(item.option, item.selectDataType || 1, {}, item.valueType), ...selArr]; //默认的数据放前面，接口数据放后面
        }
        item.option = selArr;
        // let currentArr = ['datetimerange', 'upload', 'checkbox']
        // this.paramsData[item.field] = item.value || ((item.type == "select" && item.multiple) || currentArr.indexOf(item.type) != -1 ? [] : '');
      }
      this.initvalidata();
      this.updateData();
      this.$nextTick(() => this.showForm = !this.showForm)
    },
    initvalidata () {
      this.validata = util.initValidate({
        valideDate: this.formOption.formList,
        CustomValidata: this.formOption.validata
      });
    },
    //更新数据
    updateData () {
      let value = null;
      this.formOption.formList.forEach(item => {

        value = item.format ? this.getFormat(item.format) : (this.formDataInfo[item.field] !==
          "" && this.formDataInfo[item.field] !== undefined ? this.formDataInfo[item.field] : item.value); // || item.value
        this.$set(this.paramsData, item.field, value)
      })
    },
    setVal (field, val) {
      this.$set(this.paramsData, field, val); //设置新的值
    },
    async updateSelectOption (field, newV = '') {
      let selArr = [], item = null;
      for (var i = 0; i < this.optionData.formList.length; i++) {
        item = this.optionData.formList[i];
        if (item.field == field) {
          selArr = [];
          if (item.optionUrl) {
            let { result } = await this.$ajaxGet(item.optionUrl, item.selectPar, item.dataType || 3);
            let data = result[item.urlkey];
            selArr = (item.valueType || item.colKey) ? util.getSelectOpt(data, item.colKey ? 4 : 2, { colKey: item.colKey, colName: item.colName }, item.valueType) : data;
          }
          if (item.option) {
            selArr = [...util.getSelectOpt(item.option, item.selectDataType || 1, {}, item.valueType), ...selArr]; //默认的数据放前面，接口数据放后面
          }
          item.option = selArr;
          this.$set(this.formOption.formList, i, item);
          this.setVal(field, newV);
        }
      }
    },
    async validate () {
      return new Promise((resolve, reject) => {
        this.$refs['form'].validate(valid => {
          resolve(valid);
        }).catch(err => {
          reject(err);
        })
      })
    },
    resetFields () {
      this.$refs['form'] && this.$refs['form'].resetFields();
      this.formOption.formList.forEach(item => {
        this.paramsData[item.field] = item.value;
        // if ((item.type == "select" && item.multiple) || item.type == 'datetimerange' || item.type == 'upload' ||
        //   item.type == "checkbox") {
        //   this.paramsData[item.field] = [];
        // } else {
        //   this.paramsData[item.field] = item.type == 'switch' ? false : "";
        // }
      })
      this.paramsData = JSON.parse(JSON.stringify(this.paramsData));
    }
  },
  beforeDestroy () {
    this.resetFields();
  },
  async created () {
    this.formOption = util.copyObj(this.optionData);
    this.initFormDefaultData = util.copyObj(this.optionData);
    await this.initForm(); //初始化 form  数组格式

  },
  watch: {
    paramsData: {
      handler (newVal) {
        this.$emit('changeData', newVal, this.dataKey);
        this.$emit('input', newVal);
      },
      deep: true
    },
    formDataInfo: {
      handler () {
        this.updateData();
      },
      deep: true
    }
  }
};
</script>
<style>
.mb {
  font-size: 12px;
  color: red;
}
</style>

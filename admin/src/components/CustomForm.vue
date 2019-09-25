<template>
  <div class="">
    <el-form ref="form"
             v-if="showForm"
             :model="paramsData"
             :inline="optionData['inline'] || false"
             :rules="validata"
             :label-width="optionData.LabelWidth || '120px'"
             :inline-message="optionData['inline-message']"
             :status-icon="true"
             :border="optionData.border || true"
             @submit.native.prevent>
      <el-form-item v-for="(item,index) in optionData.formList"
                    v-show="!item.hidden"
                    :label="item.title+'：'"
                    :prop="item.field"
                    :key='index'
                    :style="{width:item.width}">
        <span slot="label">
          <span class="mb"
                v-show="item.slotMark"> ~ </span>
          {{item.title}}
          <el-tooltip v-if="item.slotLabel"
                      class="item"
                      effect="dark"
                      :content="item.tip || ''"
                      :placement="item.tipAli || 'top'">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </span>

        <!-- && !item.format -->
        <template v-if="(!item.type && !item.scoped) || (item.type == 'input' || item.type == 'textarea' && !item.scoped)">
          <div style="display: flex;">
            <el-input v-if="item.inputType"
                      :min="0"
                      style="width:100%"
                      :type="item.inputType || 'text'"
                      v-model.number="paramsData[item.field]"
                      :clearable="item.inputType ? false : true"
                      :disabled="item.disabled"
                      :placeholder="'请输入'+(item.pla || item.title)"></el-input>
            <el-input v-else
                      style="width:100%"
                      :type="(item.type == 'input' || item.type == 'input') ? 'text' : item.type"
                      :autosize="item.autosize"
                      v-model="paramsData[item.field]"
                      :clearable="item.inputType ? false : true"
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
                      :name="paramsData[item.field]"
                      :label="cheOpt.value"
                      :key='_index'>{{cheOpt.label}}</el-radio>
          </el-radio-group>
        </template>
        <template v-else-if="item.type == 'switch'">
          <el-switch v-model="paramsData[item.field]"
                     active-color="#13ce66"
                     :active-text="item.activeT"
                     :inactive-text="item.inactiveT"
                     :active-value="item.activeV || true"
                     :inactive-value="item.inactiveV || false"
                     inactive-color="#ff4949"> </el-switch>
        </template>
        <template v-else-if="item.type == 'datetime'">
          <el-date-picker style="width:100%"
                          :format="item.format || ''"
                          v-model="paramsData[item.field]"
                          :disabled="item.disabled"
                          align="right"
                          :placeholder="'请选择'+(item.pla || item.title)"
                          :type="item.dateType || 'date'"
                          :picker-options="item.pickerOpt"> </el-date-picker>
        </template>
        <template v-else-if="item.type == 'datetimerange'">
          <el-date-picker style="width:100%"
                          :format="item.format || ''"
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
            <el-input style="width:100%"
                      v-model="paramsData[item.field]"
                      readonly
                      :placeholder="'点击添加'+(item.pla || item.title)"></el-input>
          </div>
        </template>
        <template v-else-if="item.type == 'lable'">
          <div v-html="paramsData[item.field]"
               style="width:100%"></div>
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
      paramsData: {}, //存放form表单数据
      validata: {}, //存放校验数据
      deleteValidata: {}, //hidden存放的校验数据
      showForm: false,
      promises: [], //异步接口
      showConf: false
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
        return null;
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
        // return h('div','123')
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
    change (val) {
      console.log(val);
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
      if (item.emitCb) {
        this.$emit(item.field, {
          value: this.paramsData[item.field],
          field: item.field
        });
      }

    },

    setItemHidden (field, state) {
      this.optionData.formList.forEach(item => {
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
    setSelectOption (params) {
      this.paramsData[this.selectItem] = JSON.stringify(params);
      this.showConf = false;
    },
    initForm () {
      if (this.optionData.formList.length == 0) return false;
      this.optionData.formList.forEach(item => {
        if (item.optionUrl) {
          item.option = [];
          this.promises.push(this.$ajaxGet(item.optionUrl, item.selectPar, item.dataType || 3).then(res => {
            res.result[item.urlkey || 'images'].forEach(_item => {
              (item.colKey && item.colName) ? item.option.push({
                value: _item[item.colKey],
                label: _item[item.colName]
              }) : item.option.push({
                value: _item,
                label: _item
              });
            });
          }))
        }
      })
      //编辑
      Promise.all(this.promises).then(() => {
        //添加
        this.optionData.formList.forEach(item => {
          // item.hidden = false;
          if ((item.type == "select" && item.multiple) || item.type == 'datetimerange' || item.type ==
            'upload' || item.type == "checkbox") {
            this.paramsData[item.field] = item.value || []; // item.value = [];
          } else {
            this.paramsData[item.field] = item.value !== '' ? item.value : "";
            // this.paramsData[item.field] = item.value != '' || typeof  item.value != 'boolean' ?  item.value : "";
          }
          //防止重新修改option参数  getSelectOpt
          if ((item.type == "select" || item.type == "radio" || item.type == "checkbox" || item.type ==
            "radio") && !item.optionUrl) {
            item.option = util.getSelectOpt(item.option, 1);
          }
        })
        this.paramsData = JSON.parse(JSON.stringify(this.paramsData));
        this.initvalidata();
        // console.log(this.validata)
        this.showForm = !this.showForm; //显示form
        this.updateData();
      })
    },
    initvalidata () {
      this.validata = util.initValidate({
        valideDate: this.optionData.formList,
        CustomValidata: this.optionData.validata
      });
    },
    //更新数据
    updateData () {
      if (this.formDataInfo) {
        this.$nextTick(() => {
          let obj = {};
          this.optionData.formList.forEach(item => {
            obj[item.field] = item.format ? this.getFormat(item.format) : (this.formDataInfo[item.field] !==
              "" && this.formDataInfo[item.field] != undefined ? this.formDataInfo[item.field] : (this
                .formDataInfo[item.field])); // || item.value
            // this.$set(this.paramsData,item.field, obj[item.field])
            // this.setVal(item.field,obj[item.field])
          })
          this.paramsData = Object.assign(this.paramsData, obj);
        })
      }
    },
    setVal (field, val) {
      this.paramsData[field] = val;
    },
    updateSelectOption (field, newV = '') {
      this.optionData.formList.forEach((item, index) => {
        if (item.field == field && item.optionUrl) {
          this.$ajaxGet(item.optionUrl, item.selectPar, item.dataType || 3).then(res => {
            item.option = [];
            res.result[item.urlkey || 'images'].forEach(_item => {
              (item.colKey && item.colName) ? item.option.push({
                value: _item[item.colKey],
                label: _item[item.colName]
              }) : item.option.push({
                value: _item,
                label: _item
              });
            });
            this.$set(this.optionData.formList, index, item);
            this.$set(this.paramsData, field, newV); //设置新的值
          })
        }
      })
    },
    getSelectOpt (data) {
      let optArr = [];
      if (!Array.isArray(data)) {
        for (var i in data) {
          optArr.push({
            value: i, // == 'true' ? true : (i == 'false' ? false : i)
            label: data[i]
          });
        }
        return optArr;
      } else {
        return data;
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
      this.$refs['form'].resetFields();
      this.optionData.formList.forEach(item => {
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
  mounted () { },
  created () {
    this.id = this.$route.query.id; //保存id
    this.initForm(); //初始化 form  数组格式
  },
  watch: {
    paramsData: {
      handler (newVal) {
        this.$emit('changeData', newVal, this.dataKey);
        // console.log(newVal)
        this.$emit('input', newVal)
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

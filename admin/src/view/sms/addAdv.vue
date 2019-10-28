<template>
  <Header isBack
          content="添加商品">
    <div style="width:700px">
      <CustomForm :optionData="advOption"
                  ref="Form"
                  v-model="advData">
        <template slot="pic"
                  slot-scope="props">
          <Upload v-model="props.data.pic"
                  :maxSize='1'></Upload>
        </template>
      </CustomForm>
      <div>
        <el-button type="primary"
                   @click="submitForm">提交数据</el-button>
        <el-button @click="resetForm">重置数据</el-button>
      </div>
    </div>
  </Header>
</template>

<script>
import CustomForm from '@/components/CustomForm.vue';
import Header from '@/components/Header.vue';
import Upload from '@/components/Upload.vue';
export default {
  data () {
    return {
      advData: {},
      advOption: {
        formList: [
          { field: "name", title: "广告名称", value: '', validate: "required", type: "input" },
          { field: "type", title: "广告位置", value: '', validate: "required", type: "select", valueType: "number", option: { 0: "PC首页轮播", 1: "APP首页轮播" } },
          { field: "start_date", title: "开始时间", value: '', validate: "required", type: "datetime", dateType: 'datetime' },
          { field: "end_date", title: "到期时间", value: '', validate: "required", type: "datetime", dateType: 'datetime' },
          { field: "status", title: "上线/下线", value: 1, validate: "required", valueType: "number", type: "radio", option: { 0: "下线", 1: "上线" } },
          { field: "pic", title: "广告图片", value: [], validate: "required", scoped: true },
          { field: "sort", title: "排序", value: '', validate: "", type: "input", valueType: "number" },
          { field: "url", title: "广告链接", value: '', validate: "", type: "input" },
          { field: "note", title: "广告备注", value: '', validate: "", type: "textarea" },
        ],
        validata: {},
        LabelWidth: '130px',
      }
    }
  },
  components: {
    CustomForm,
    Header,
    Upload
  },
  methods: {
    async submitForm () {
      let status = await this.$refs.Form.validate();
      if (!status) {
        return
      }
      const id = this.$route.query.id;
      let postData = util.copyObj(this.advData)
      postData.pic = postData.pic.map(item => item.url).join(',');
      let { code, message } = await this.$ajaxPost('createdAndUpdateAdv', { ...postData, id });
      if (code === 0) {
        this.$message.success(`${id ? '编辑' : '添加'}成功`);
        this.$router.back();
      } else {
        this.$message.error(message)
      }
    },
    resetForm () {
      this.$refs.Form.resetFields();
    }
  },
  async created () {
    if (this.$route.query.id) {
      let { result } = await this.$ajaxGet('getAdvInfo', { id: this.$route.query.id });
      result.pic = result.pic.split(',').map(url => {
        return {
          url
        }
      })
      this.advData = result;
    }
  }
}
</script>

<style>
</style>

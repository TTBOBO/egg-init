<template>
  <div class="header-container">
    <el-page-header @back="goBack"
                    :title="title"
                    :content="content">
    </el-page-header>
    <div class="header-content">
      <slot></slot>
    </div>
    <CustomForm></CustomForm>
  </div>
</template>

<script>
import CustomForm from '@/components/CustomForm.vue';
export default {
  data () {
    return {}
  },
  props: {
    content: String,
    title: String,
    isBack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goBack () {
      if (this.isBack) {
        this.$router.back();
        return;
      }
      this.$emit('back');
    }
  },
  components: {
    CustomForm
  }
}
</script>

<style lang="less">
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  .header-content {
    margin-top: 25px;
    flex: 1;
    overflow-y: auto;
  }
}
</style>

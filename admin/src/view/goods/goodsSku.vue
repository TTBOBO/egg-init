<template>
  <div>
    123
    {{value}}
    <el-cascader v-model="value"
                 :options="options"></el-cascader>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: [],
      options: []
    }
  },
  async mounted () {
    const { result } = await this.$ajaxGet('getCategoryTree', { level: 0 });
    console.log(result);
    this.options = result;
  }
}
</script>

<style>
</style>

<template>
  <div>
    123
    {{value}}
    <!-- <el-cascader v-model="value"
                 :options="options"></el-cascader> -->
    <svg width="100%"
         height="100%">

      <rect width="300"
            rx="20"
            ry="20"
            height="100"
            style="fill:red;stroke-width:10;
stroke:yellow; fill-opacity:0.5" />
      <ellipse cx="300"
               cy="150"
               rx="200"
               ry="80"
               style="fill:rgb(200,100,50);
stroke:rgb(0,0,100);stroke-width:2" />

    </svg>
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

<template>
  <el-table-column v-if="!item.isShow"
                   :prop="item.prop"
                   :label="item.label"
                   :sortable="item.sortable"
                   width="180">
    <template slot-scope="scope">
      {{scope.row[scope.column.property]}}
    </template>
  </el-table-column>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    item: {
      type: Object,
      default: () => { }
    }
  }
}
</script>

<style>
</style>

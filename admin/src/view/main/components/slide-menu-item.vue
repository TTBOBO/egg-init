<template>
  <el-submenu :index="`${parentName}`">
    <template slot="title">
      <i :class="[parentItem.icon]"></i>
      <span>{{ parentItem.meta.title }}</span>
    </template>
    <!-- 子节点 -->
    <template v-for="(item,index) in children">
      <side-menu-item v-if="showChildren(item)"
                      :key="index"
                      :parent-item="item"></side-menu-item>
      <el-menu-item v-else
                    :index="getNameOrHref(item)"
                    :key="index"><i :class="[parentItem.meta.icon]"></i><span slot="title">{{item.meta.title}}</span></el-menu-item>
    </template>
  </el-submenu>
</template>

<script>
import mixin from './mixin'
export default {
  name: 'SideMenuItem',
  mixins: [mixin]
}
</script>

<style>
</style>

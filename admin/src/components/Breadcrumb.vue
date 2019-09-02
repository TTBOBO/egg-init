<template>
  <div>
    <el-breadcrumb separator="/">
      <transition-group :name="transitionName">
        <el-breadcrumb-item v-for="(item,index) in breadcrumbList "
                            :key="item.path">
          <span v-if="index === breadcrumbList.length -1">{{item.meta.title}}</span>
          <a v-else
             @click="handleClick(item)">
            {{item.meta.title}}
          </a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
export default {
  data () {
    return {
      breadcrumbList: [],
      transitionName: "slide-right"
    }
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
      let { meta } = matched[0];
      console.log(matched)
      this.breadcrumbList = meta && meta.title !== '首页' ? [{ path: '/', meta: { title: '首页' } }].concat(matched) : [matched[1]];
    },
    handleClick ({ redirect, path }) {
      this.$router.push(redirect || pathToRegexp.compile(path)(this.$route.params || this.$route.query));
    }
  },
  created () {
    this.getBreadcrumb();
  },
  watch: {
    $route () {
      this.getBreadcrumb();
    }
  }
}
</script>

<style lang="less">
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1) !important;
  position: absolute;
  width: 100%;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
</style>

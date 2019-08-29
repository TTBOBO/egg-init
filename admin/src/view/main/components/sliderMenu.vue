<template>
  <div class="slider-container">
    <el-menu ref="menu"
             :collapse="collapsed"
             :default-active="activeName"
             :default-openeds="openedNames"
             @select="handleSelect">
      <template v-for="(item,index) in menuList">
        <template v-if="item.children && item.children.length === 1">
          <el-menu-item :index="getNameOrHref(item, true)"
                        :key="index">
            <i :class="[item.children[0].meta.icon]"></i><span slot="title">{{ item.children[0].meta.title }}</span>
          </el-menu-item>
        </template>
        <template v-else>
          <SidemenuItem v-if="showChildren(item)"
                        :key="index"
                        :parent-item="item"></SidemenuItem>
          <el-menu-item v-else
                        :index="getNameOrHref(item)"
                        :key="`menu-${item.meta.title}`"><i :class="[item.meta.icon]"></i><span slot="title">{{ item.meta.title }}</span></el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import mixin from './mixin';
import SidemenuItem from './slide-menu-item';
export default {
  mixins: [mixin],
  data () {
    return {
      openedNames: []
    }
  },
  props: {
    menuList: {
      type: Array,
      default () {
        return [];
      }
    },
    theme: {
      type: String,
      default: "dark"
    },
    collapsed: {
      type: Boolean,
      default: function () {
        return false;
      }
    },
    accordion: {
      type: Boolean,
      default: function () {
        return true;
      }
    },
    activeName: {
      type: String,
      default: ""
    },
    openNames: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleSelect (name) {
      //传给父组件值
      this.$emit("on-select", name);
    },
    getOpenedNamesByActiveName (name) {
      return this.$route.matched
        .map(item => item.name)
        .filter(item => item !== name);
    },
    getUnion (arr1, arr2) {
      return Array.from(new Set([...arr1, ...arr2]));
    }
  },
  mounted () {
    console.log(this.menuList)
    this.openedNames = this.getUnion(
      this.openedNames,
      this.getOpenedNamesByActiveName(name)
    );
  },
  components: {
    SidemenuItem
  },
  watch: {
    activeName (name) {
      let res = this.$route.matched
        .map(item => item.name)
        .filter(item => item != name);
      this.openedNames = res;
    },
    openedNames (val) {
      console.log(val)
      // this.$nextTick(() => {
      //   this.$refs.menu.open(val);
      // });
    }
  }
}
</script>

<style lang='less'>
.slider-container {
  width: 100%;
  height: 100%;
}
</style>

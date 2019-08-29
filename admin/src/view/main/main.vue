<template>
  <el-container class="container">
    <el-aside :style="{width:!collapsed ? '200px' : '65px'}">
      <sliderMenu :menuList="menuList"
                  @on-select="handSelect"
                  :active-name="$route.name"
                  :collapsed="collapsed"></sliderMenu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="user-con">
          <i @click="collapsedSider"
             :class="{'el-icon-s-fold':!collapsed,'el-icon-s-unfold':collapsed}"
             size="24"></i>
          <el-dropdown @command="dropClick">
            <img src="../../assets/logo.png"
                 class="auth-pic" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
              <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <div class="main-container">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import sliderMenu from './components/sliderMenu'
export default {
  data () {
    return {
      collapsed: false
    }
  },
  computed: {
    menuList () {
      return this.$store.getters.menuList
    },
  },
  components: {
    sliderMenu
  },
  methods: {
    collapsedSider () {
      this.collapsed = !this.collapsed;
    },
    handSelect (name) {
      if (name.indexOf("href_") != -1) {
        window.open(name.split("_")[1]);
        return false;
      }
      this.$router.push({
        name: name
      })

    },
    dropClick (name) {
      console.log(name)
    }
  }
}
</script>

<style lang='less'>
.container {
  width: 100%;
  height: 100%;
  .slider-container {
    background: #fff;
  }
  .user-con {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    height: 64px;
    padding: 0 20px;
    // margin-right: 20px;
    border-radius: 0 0 5px 5px;
    .auth-pic {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      overflow: hidden;
      margin-top: 10px;
    }
    i {
      cursor: pointer;
      font-size: 24px;
    }
  }
  .el-main {
    .main-container {
      background: #fff;
      height: 100%;
      border-radius: 5px;
    }
  }
  .el-aside {
    transition: 0.3s linear;
  }
}
</style>

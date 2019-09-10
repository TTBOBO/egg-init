<template>
  <el-container class="container ">
    <el-aside :style="{width:!collapsed ? '200px' : '65px'}">
      <div class="logo"> </div>
      <sliderMenu :menuList="menuList"
                  @on-select="handSelect"
                  :active-name="$route.name"
                  :collapsed="collapsed"></sliderMenu>
    </el-aside>
    <el-container>
      <el-header style="height:auto;">
        <div class="user-con">
          <div class="user-con-left">
            <i @click="collapsedSider"
               :class="{'el-icon-s-fold':!collapsed,'el-icon-s-unfold':collapsed}"
               size="24"></i>
            <Breadcrumb style="min-width:300px;height:17px;"></Breadcrumb>
          </div>
          <div class="user-con-right">
            <el-badge :value="number"
                      @click.native="showDrewer = true">
              <i class="el-icon-message-solid"
                 :class="run ? 'animated rubberBand run' : ''"></i>
            </el-badge>

            <el-dropdown @command="dropClick">
              <img src="../../assets/logo.png"
                   class="auth-pic" />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </div>
      </el-header>
      <el-main>
        <div class="main-container">
          <transition :name="transitionName">
            <keep-alive :include="catchRoutes">
              <router-view :key="key" />
            </keep-alive>
          </transition>
        </div>
      </el-main>
      <el-drawer title="我的消息"
                 :visible.sync="showDrewer"
                 direction="rtl"
                 size="300px">
        <Message v-if="showDrewer"
                 @setMessageList="getMessageList"></Message>
      </el-drawer>
    </el-container>
  </el-container>
</template>

<script>
import sliderMenu from './components/sliderMenu'
import Breadcrumb from '@/components/Breadcrumb'
import Message from './components/message'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      showDrewer: false,
      collapsed: false,
      transitionName: "slide-left",
      number: 0,
      run: false
    }
  },
  computed: {
    menuList () {
      return this.$store.getters.menuList
    },
    key () {
      return this.$route.path
    },
    catchRoutes () {
      return [];
    }
  },
  components: {
    sliderMenu,
    Breadcrumb,
    Message
  },
  methods: {
    ...mapMutations(['LOGINOUT', 'SETUSERINFO']),
    collapsedSider () {
      this.collapsed = !this.collapsed;
    },
    handSelect (name) {
      const curName = this.$route.name;
      name.indexOf("href_") != -1 ? window.open(name.split("_")[1]) : (curName != name ? this.$router.push({ name }) : '');
    },
    goLogin () {
      this.$router.replace('/login');
    },
    dropClick (name) {
      switch (name) {
        case 'loginOut':
          this.LOGINOUT();
          this.goLogin();
          break;
        default:
          break;
      }
    },
    async getMessageList () {
      let { result: { data } } = await this.$ajaxGet('getMessageList', { page: this.page });
      this.number = data.filter(item => item.status === '1').length;
      if (this.number) {
        this.timer = setInterval(() => this.run = !this.run, 1000)
      } else {
        clearInterval(this.timer);
      }
    },
  },
  async created () {
    await this.getMessageList();
    const userInfo = util.getLocalStorage('userInfo');
    userInfo ? this.SETUSERINFO(JSON.parse(userInfo)) : this.goLogin();
  },
}
</script>

<style lang='less'>
.el-drawer__container {
  overflow: hidden;
}
.container {
  .el-aside {
    display: flex;
    flex-flow: column;
    background: #fff;
    .logo {
      height: 45px;
      background: #737070;
      border-radius: 5px;
      margin: 10px;
    }
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
    .user-con-left {
      display: flex;
      align-items: center;
      position: relative;
      i {
        margin-right: 30px;
      }
    }
    .user-con-right {
      display: flex;
      align-items: center;
      width: 130px;
      justify-content: space-around;
      .run {
        // animation: animated 0.3s linear infinite;
      }
    }
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
  .el-header,
  .el-main {
    padding-right: 0;
    padding-bottom: 0;
  }
  .el-main {
    display: flex;

    .main-container {
      padding: 15px;
      background: #fff;
      border-radius: 5px;
      flex: 1;
      // padding-bottom: 50px;
      overflow: hidden;
      position: relative;
    }
  }
  .el-aside {
    transition: 0.3s linear;
  }
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    position: absolute;
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
  .pointer {
    cursor: pointer;
  }
  .shadow {
    &:hover {
      box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.25);
    }
  }
}
.el-drawer__body {
  display: flex;
  overflow: hidden;
}
</style>

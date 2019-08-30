<template>
  <div class="container">
    <div class="main">
      <div class="centerContent">
        <div class="error-body"
             style="">
          4
          <span class=" cus-icon"
                style="color:#eb5757;"><i class="cus-icon el-icon-warning"></i></span>
          3

        </div>
        <p style="font-size:24px;text-align:center;color:#dddde2">权限不足</p>
        <div class="error-foot">
          <el-button class="err-btn"
                     type="text"
                     style="padding:0px 20px;"
                     @click="goHome()">返回首页</el-button>
          <el-button style=" width: 150px;height: 40px;"
                     type="warning"
                     @click="goBack()">返回上一页</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      loading: false
    };
  },
  methods: {
    goHome () {
      this.$router.replace({
        path: "/"
      });
    },
    goBack () {
      this.$router.back();
    }
  },
  mounted () {
    this.show = !this.show;
  }
};
</script>

<style scoped>
.title {
  width: 100%;
  height: 35px;
  text-align: center;
  line-height: 35px;
  font-size: 18px;
  margin-bottom: 25px;
}
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  bottom: 0px;
  overflow: hidden;
  background: #f7f7f7;
}
.main {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 700px;
  /*background: #fafafa;*/
  color: #000;
  height: 400px;
  margin: auto;
  box-shadow: 1px 1px 6px #d0cccc;
  border-radius: 2px;
  transition: 0.3s linear;
  padding: 16px;
}
.main:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: #eee;
}
.centerContent {
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.error-body {
  width: 100%;
  height: 250px;
  font-size: 200px;
  text-align: center;
  font-weight: 700;
  color: rgba(45, 140, 240, 0.9);
}
.error-foot {
  width: 100%;
  /* height: 100px; */
  display: flex;
  text-align: center;
  display: flex;
  justify-content: space-around;
  padding: 16px;
}
.err-btn {
  height: 40px;
  color: #999;
}
.err-btn:hover {
  color: #f90;
}
.cus-icon {
  transition: 3s;
  animation: errbounce 3s infinite;
}
@keyframes errbounce {
  from,
  20%,
  53%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -30px, 0);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0, -4px, 0);
  }
}
</style>

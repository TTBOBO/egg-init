<template>
  <div class="container">
    <div class="main">
      <transition enter-active-class="fadeInRight"
                  leave-active-class="zoomOutRight">
        <div v-show="show"
             class="content animated">
          <div class="title">后台管理系统</div>
          <el-form :model="loginForm"
                   :rules="ruleInline"
                   status-icon
                   ref="ruleForm"
                   label-width="0">
            <el-form-item prop="userName">
              <el-input type="text"
                        placeholder="用户名"
                        v-model="loginForm.userName"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password"
                        placeholder="密码"
                        v-model="loginForm.password"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <div style="display: flex;align-items: center;">
                <el-input type="text"
                          placeholder="验证码"
                          v-model="loginForm.code"
                          autocomplete="off"></el-input>
                <div v-html="code"
                     @click="changeCode"
                     class="code"></div>
              </div>

            </el-form-item>
            <el-form-item>
              <el-button style="width:100%"
                         type="primary"
                         :loading="loading"
                         @click="submitForm">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </transition>
    </div>
    <div class="bg">
    </div>
  </div>
</template>

<script>
import md5 from 'md5';
export default {
  data () {
    return {
      show: false,
      loading: false,
      code: "",
      loginForm: {
        userName: "",
        password: "",
        code: ""
      },
      ruleInline: {
        userName: [{
          required: true,
          message: '请填写用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请填写密码',
          trigger: 'blur'
        },
        {
          type: 'string',
          min: 6,
          message: '密码长度不能小于6位',
          trigger: 'blur'
        }
        ],
        code: [{
          required: true,
          message: '验证码不能为空',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
  },
  methods: {
    showList () {
      this.show = !this.show;
    },
    async submitForm () {
      this.loading = true;
      let status = await this.$refs.ruleForm.validate();
      if (status) {
        const { code, data: { userInfo, token } } = await this.$ajaxPost('login', { ...this.loginForm, password: md5(this.loginForm.password) });
        if (code !== -1) {
          this.$message.success("登录成功");
          util.setLocalStorage('userInfo', JSON.stringify(userInfo));
          util.setLocalStorage('token', token);
          this.$router.push('/');
        } else {
          this.$message.error("用户名或密码错误");
          await this.getCode();
        }
      }
      this.loading = false;
    },
    async changeCode () {
      await this.getCode();
    },
    async getCode () {
      let { img } = await this.$ajaxGet('get_code_img');
      this.code = img;
    }
  },
  components: {},
  mounted () {
    this.getCode();
    this.showList();
  }
}
</script>

<style>
.title {
  width: 100%;
  height: 35px;
  text-align: center;
  line-height: 35px;
  font-size: 18px;
  margin-bottom: 25px;
}
.code {
  cursor: pointer;
  height: 40px;
}
.code svg {
  margin-left: 20px;
  height: 40px;
}
.main {
  overflow: hidden;
  height: 100%;
  display: flex;
  align-items: center;
  color: #000;
  -ms-flex-line-pack: center;
  align-content: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  z-index: 2;
  background: linear-gradient(
    to bottom right,
    rgba(24, 125, 211, 0.75) 10%,
    rgba(255, 48, 84, 0.55) 63%,
    rgba(255, 48, 84, 0.75) 99%
  );
}
.bg {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.content {
  width: 420px;
  padding: 40px;
  background: #fff;
  border: 1px solid #e4e1e1;
  border-radius: 10px;
  /* margin: 250px auto; */
  box-shadow: 0px 2px 2px #e4e1e1;
  z-index: 2;
}
</style>

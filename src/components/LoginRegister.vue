<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="tab-container">
    <!-- login -->
    <el-tab-pane label="登陆" name="login">
      <el-form ref="login" :model="loginForm" :rules="loginRules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('login')">立即登陆</el-button>
          <el-button @click="cancel('login')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <!-- register -->
    <el-tab-pane label="注册" name="register">
      <el-form ref="register" :model="registerForm" :rules="registerRules" label-width="80px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input v-model="registerForm.captcha">
            <el-button
              class="el-input__icon yzm"
              slot="suffix"
              @click="getCaptcha('register')"
              :disabled="captchaDisabled"
            >{{captchaText}}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register('register')" :loading="registerBtnLoading">立即注册</el-button>
          <el-button @click="cancel('register')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      activeName: "register",
      form: {
        name: ""
      },
      /***********************/
      registerForm: {
        email: "",
        username: "",
        password: "",
        captcha: ""
      },
      registerRules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              $.post(
                "/api/user/emailIsExist",
                { email: this.registerForm.email },
                res => {
                  let { code, message } = { ...res };
                  if (code == 1) {
                    callback();
                  } else {
                    callback(new Error(`此邮箱已存在`));
                  }
                }
              );
            },
            trigger: "blur"
          }
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 18, message: "长度在2到18个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在6到18个字符", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "请输入6位数验证码", trigger: "blur" }
        ]
      },
      captchaText: "获取验证码",
      captchaDisabled: false,
      registerBtnLoading: false,
      /*********************/
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 18, message: "长度在2到18个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在6到18个字符", trigger: "blur" }
        ]
      },
      loginBtnLoading: false
    };
  },
  created() {},
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    /**
     * 隐藏模态框
     */
    cancel() {
      if (HTMLElement && !HTMLElement.prototype.pressKey) {
        HTMLElement.prototype.pressKey = function(code) {
          var evt = document.createEvent("UIEvents");
          evt.keyCode = code;
          evt.initEvent("keydown", true, true);
          this.dispatchEvent(evt);
        };
      }
      document.body.pressKey(27); // 主动触发esc
    },
    getCaptcha(formName) {
      this.$refs[formName].validateField("email", v => {
        console.log(v);
        if (!v) {
          this.captchaDisabled = true;
          let time = 120;
          let timer = setInterval(() => {
            if (time == 0) {
              this.captchaText = `获取验证码`;
              this.captchaDisabled = false;
              clearInterval(timer);
            }
            this.captchaText = `${time--} S`;
          }, 1000);
          $.post(
            "/api/user/getCaptcha",
            { email: this.registerForm.email },
            res => {
              let { code, message } = { ...res };
              if (code == 1) {
                this.$message.success(message);
              } else {
                this.$message.error(message);
              }
            }
          );
        } else {
          this.$message.error(`请先填写信息`);
        }
      });
    },
    register(formName) {
      this.$refs[formName].validate(v => {
        if (v) {
          this.registerBtnLoading = true;
          let user = {
            ...this.registerForm
          };
          $.post("/api/user/register", user, res => {
            let { code, message } = { ...res };
            if (code == 1) {
              this.$message.success(message);
            } else {
              this.$message.error(message);
            }
            this.registerBtnLoading = false;
            this.activeName = `login`;
            this.$refs[formName].resetFields();
          });
        } else {
          this.$message.error(`请规范填写信息`);
        }
      });
    },
    login(formName) {}
  }
};
</script>

<style lang="less" scoped>
.yzm {
  font-weight: normal;
  width: 120px;
  cursor: pointer;
  margin-right: -4px;
}
</style>
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="tab-container">
    <!-- login -->
    <el-tab-pane label="登陆" name="login">
      <el-form ref="login" :model="loginForm" :rules="loginRules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" clearable show-password></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input v-model="loginForm.captcha">
            <el-button
              :loading="loginCaptchaBtnLoading"
              class="el-input__icon yzm"
              slot="suffix"
              style="padding: 4px 0;"
            >
              <el-image :fit="`scale-down`" :src="loginCaptchaImgSrc">
                <div slot="error" style=" margin-top: 9px;font-size: 12px;">先正确填写用户名</div>
              </el-image>
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('login')" :loading="loginBtnLoading">立即登陆</el-button>
          <el-button @click="cancel('login')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <!-- register -->
    <el-tab-pane label="注册" name="register">
      <el-form ref="register" :model="registerForm" :rules="registerRules" label-width="80px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" show-password clearable></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input v-model="registerForm.captcha" clearable>
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
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import Http from "@/util/Http";
export default {
  props: ["loginAndRegisterDialogVisible"],
  data() {
    return {
      activeName: "login",
      form: {
        name: ""
      },
      /***********************/
      registerForm: {
        email: "2672575663@qq.com",
        username: "test",
        password: "123456",
        captcha: ""
      },
      registerRules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              Http.post("/api/user/emailIsExist", {
                email: this.registerForm.email
              }).then(res => {
                let { code, message } = res.data;
                if (code == 1) {
                  callback();
                } else {
                  callback(new Error(message));
                }
              });
            },
            trigger: "blur"
          }
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 18, message: "长度在2到18个字符", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let username = this.registerForm.username;
              Http.post("/api/user/usernameIsExist", { username }).then(res => {
                let { code, message } = res.data;
                if (code == 0) {
                  callback();
                } else {
                  callback(new Error(message));
                }
              });
            },
            trigger: "blur"
          }
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
        password: "",
        captcha: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 18, message: "长度在2到18个字符", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let username = this.loginForm.username;
              Http.post("/api/user/usernameIsExist", { username }).then(res => {
                let { code, message } = res.data;
                if (code == 1) {
                  this.loginCaptchaBtnLoading = true;
                  Http.post("/api/user/getCaptchaImg", { username }).then(
                    res => {
                      let { captchaCode, captchaSrc } = res.data;
                      this.loginCaptchaImgSrc = captchaSrc;
                      this.loginCaptchaBtnLoading = false;
                      callback();
                    }
                  );
                } else {
                  this.loginCaptchaImgSrc = "";
                  callback(new Error(message));
                }
              });
            },
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在6到18个字符", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入4位数验证码", trigger: "blur" }
        ]
      },
      loginBtnLoading: false,
      loginCaptchaImgSrc: "",
      loginCaptchaBtnLoading: false
    };
  },

  methods: {
    ...mapMutations({
      setUserInfo: "_setUserInfo"
    }),
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    /**
     * 隐藏模态框
     */
    cancel(formName) {
      this.$emit("update:loginAndRegisterDialogVisible", false);
      this.$refs[formName].resetFields();
    },
    /**
     * 获取验证码
     */
    getCaptcha(formName) {
      this.$refs[formName].validateField("email", v => {
        if (!v) {
          this.captchaDisabled = true;
          let time = 120;
          this.captchaText = `${time} S`;
          let timer = setInterval(() => {
            time--;
            this.captchaText = `${time} S`;
            if (time < 1) {
              this.captchaText = `获取验证码`;
              this.captchaDisabled = false;
              clearInterval(timer);
            }
          }, 1000);
          Http.post("/api/user/getCaptcha", {
            email: this.registerForm.email
          }).then(res => {
            let { code, message } = res.data;
            if (code == 1) {
              this.$message.success(message);
            } else {
              this.$message.error(message);
            }
          });
        } else {
          this.$message.error(`请先填写信息`);
        }
      });
    },
    /**
     * 注册
     */
    register(formName) {
      this.$refs[formName].validate(v => {
        if (v) {
          this.registerBtnLoading = true;
          let user = { ...this.registerForm };
          Http.post("/api/user/register", user).then(res => {
            let { code, message } = res.data;
            if (code == 1) {
              this.$message.success(message);
              this.activeName = `login`;
              this.$refs[formName].resetFields();
            } else {
              this.$message.error(message);
            }
            this.registerBtnLoading = false;
          });
        } else {
          this.$message.error(`请规范填写信息`);
        }
      });
    },
    /**
     * 登陆
     */
    login(formName) {
      let b = true;
      this.$refs[formName].validateField("password", v => (b = v));
      this.$refs[formName].validateField("captcha", v => (b = v));
      if (!b) {
        this.loginBtnLoading = true;
        let user = { ...this.loginForm };
        Http.post("/api/user/login", user).then(res => {
          // console.log(res.data);
          let { code, message, userInfo, token } = res.data;
          if (code == 1) {
            this.$message.success(message);
            this.$refs[formName].resetFields();
            this.setUserInfo(userInfo);
            localStorage.setItem("token", token);
            this.cancel(formName);
            // 给Header组件传递事件 修改未读评论数量
            Http.get(`/api/comment/unreadCount/${userInfo.id}`).then(res => {
              let { count } = res.data;
              this.$emit("setUnreadCount", count);
            });
          } else {
            this.$message.error(message);
            this.loginCaptchaBtnLoading = true;
            Http.post("/api/user/getCaptchaImg", {
              username: user.username
            }).then(res => {
              let { captchaCode, captchaSrc } = res.data;
              this.loginCaptchaImgSrc = captchaSrc;
              this.loginCaptchaBtnLoading = false;
            });
          }
        });
        this.loginBtnLoading = false;
      } else {
        this.$message.error(`请正确填写信息`);
      }
    }
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
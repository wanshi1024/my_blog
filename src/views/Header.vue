<template>
  <div class="header">
    <div class="header-wrap">
      <!-- header-wrap start -->
      <h1 class="logo">
        <el-link href="/" class="logo-text" :underline="false">BLOG</el-link>
      </h1>
      <el-input
        class="header-input"
        prefix-icon="el-icon-search"
        clearable
        v-model="input"
        placeholder="请输入要搜索的内容然后Enter键"
      />
      <div class="header-menu">
        <span class="span" :style="{left:PageIndex*80+'px'}"></span>
        <ul>
          <li v-for="(item, index) in menuList" :key="index" @click="PageIndex=index">
            <a :class="{active:PageIndex==index}">{{item}}</a>
          </li>
        </ul>
      </div>

      <div class="login-register">
        <el-button v-if="false" @click="openLoginRegister()">登陆</el-button>

        <el-dropdown  @command="handleCommand" class="user-info" v-else>
          <span class="avatar">
            <el-avatar class="avatar-img" shape="circle" size="small" :src="`/img/logo.png`"></el-avatar>
            顽石mua 
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">个人中心</el-dropdown-item>
            <el-dropdown-item command="2">最新回复(20)</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="header-mobile">
        <el-button
          class="header-mobile-btn"
          icon="el-icon-menu"
          @click="mobileMenuIsShow=!mobileMenuIsShow"
        ></el-button>
      </div>
      <div class="moblie-menu">
        <el-collapse-transition>
          <ul v-show="mobileMenuIsShow">
            <li v-for="(item, index) in menuList" :key="index">
              <a>{{item}}</a>
            </li>
          </ul>
        </el-collapse-transition>
      </div>

      <!-- header-wrap  end -->
    </div>
  </div>
</template>

<script>
import LoginRegister from "@/components/LoginRegister";
export default {
  name: "",
  data() {
    return {
      input: "",
      menuList: ["首页", "文章", "留言", "关于"],
      PageIndex: 0,
      mobileMenuIsShow: false
    };
  },
  components: { LoginRegister },
  methods: {
    openLoginRegister() {
      const h = this.$createElement;
      this.$msgbox({
        title: "请您操作",
        // message: h('p', null, [
        //   h('span', null, '内容可以是 '),
        //   h('i', { style: 'color: teal' }, 'VNode')
        // ]),
        message: h(LoginRegister),
        showCancelButton: true,
        // confirmButtonText: '确定',
        // cancelButtonText: '取消',
        showCancelButton: false,
        showConfirmButton: false,
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: "info",
          message: "action: " + action
        });
      });
    },
    handleCommand(command){
      this.$message(`你点击的是${command}`);
      if(command==1){
        this.$router.push('/user')
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 80px;
  line-height: 80px;
  background: #1e9fff;
  overflow: hidden;
  .header-wrap {
    // padding: 0 70px 0 40px;
    padding: 0 30px;
    & > * {
      display: inline-block;
    }
    .logo {
      .logo-text {
        font-size: 36px;
        color: white;
      }
    }
    .header-input {
      margin-left: 50px;
      width: 367px;
      min-width: 200px;
      height: 45px;
      background: transparent;
      font-size: 16px;
    }
    .header-menu {
      position: relative;
      // float: right;
      margin-left: 10%;
      ul {
        display: flex;
        justify-content: space-between;
        li {
          font-size: 16px;
          width: 80px;
          text-align: center;
          position: relative;
          display: inline-block;
          cursor: pointer;
          a {
            color: rgba(255, 255, 255, 0.7);
          }
          a.active {
            color: white;
          }
        }
      }
      .span {
        bottom: 6px;
        left: 0;
        width: 80px;
        height: 4px;
        background: #c1e4ff;
        position: absolute;
        transition: all 0.2s;
      }
    }
    .login-register {
      float: right;
      .user-info {
        .avatar {
          color: white;
          cursor: pointer;
          .avatar-img {
            transform: translate(-25%, 30%);
          }
        }
      }
    }

    .header-mobile {
      float: right;
      .header-mobile-btn {
        display: none;
      }
    }
    .moblie-menu {
      width: 100%;
      line-height: 60px;
      position: absolute;
      left: 0px;
      top: 80px;
      text-align: center;
      background: #1e9fff;
      z-index: 2;
      ul {
        li {
          border-top: 2px solid rgba(255, 255, 255, 0.08);
          a {
            display: block;
            height: 100%;
            width: 100%;
            font-size: 20px;
            color: #fff;
          }
        }
      }
    }

    // 最大宽度数值下 屏幕显示的
    @media only screen and (max-width: 750px) {
      .header-input,
      .header-menu,
      .login-register {
        display: none;
      }
      .header-mobile .header-mobile-btn {
        display: inline-block;
      }
    }
  }
}
@media only screen and (max-width: 750px) {
  //  .header .header-wrap .header-input,
  //  .header .header-wrap .header-menu {
  //     display: none;
  //   }
  //   h2 {
  //     color: red;
  //   }
}
</style>
<template>
  <div class="upload_avatar_container">
    <!-- http://123.56.23.25:1111/upload -->
    <el-upload
      class="avatar-uploader"
      action=" http://123.56.23.25:1111/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      title="点击上传"
    >
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-image :src="imageUrl" class="avatar-img">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <!-- <img   /> -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import Http from "@/util/Http";
export default {
  props: ["uploadAvatarDialogVisible"],
  data() {
    return {
      imageUrl: ""
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  created() {
    this.imageUrl = this.userInfo.avatar == null ? "" : this.userInfo.avatar;
  },
  methods: {
    ...mapMutations({
      setUserInfo: "_setUserInfo"
    }),
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(res);
      let { imgURL, code } = { ...res };
      if (code == 200) {
        Http.post("/api/user/uploadAvatar", {
          ...this.userInfo,
          avatar: imgURL
        }).then(res => {
          let { code, message, userInfo } = res.data;
          if (code == 1) {
            this.setUserInfo(userInfo);
            this.$message.success(message);
            this.$emit("update:uploadAvatarDialogVisible", false);
          } else {
            this.$message.error(message);
          }
        });
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less" scoped>
.upload_avatar_container {
  display: flex;
  justify-content: space-between;
  & > * {
    width: 200px;
    height: 200px;
  }
  .avatar-uploader {
    border: 1px #dddddd solid;
    text-align: center;
    cursor: pointer;
    i {
      font-size: 5em;
      margin-top: 60px;
      color: #dddddd;
    }
  }
  .avatar-img {
    border: 1px #dddddd solid;
    text-align: center;
    i {
      font-size: 5em;
      margin-top: 60px;
      color: #dddddd;
    }
  }
}
</style>
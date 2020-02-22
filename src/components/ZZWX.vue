<template>
  <el-card class="aside-container">
    <div class="weixin">
      <h4>站长微信</h4>
      <img class="img" src="http://localhost:8080/img/weixin.jpg" />
    </div>
  </el-card>
</template>

<script>
export default {
  name: "",
  data() {
    return {
     
    };
  },
};
</script>

<style lang="less" scoped>
.aside-container {
  h4 {
    font-size: 18px;
    font-weight: normal;
  }
  .weixin {
    .img {
      margin-top: 10px;
      width: 60%;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.075);
      padding: 4px;
    }
  }
}
</style>
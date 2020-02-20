<template>
  <el-card class="aside-container">
    <div class="weixin">
      <h4>站长微信</h4>
      <el-image class="img" src="`../assets/weixin.jpg`"></el-image>
    </div>
    <el-divider></el-divider>
    <div class="hot-labels">
      <h4>热门标签</h4>
      <div class="labels">
        <ArticleLabel />
        <ArticleLabel />
        <ArticleLabel />
        <ArticleLabel />
        <ArticleLabel />
        <ArticleLabel />
      </div>
    </div>
  </el-card>
</template>

<script>
import ArticleLabel from "@/components/ArticleLabel";
export default {
  name: "",
  data() {
    return {
     
    };
  },
  components: {
    ArticleLabel
  }
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
  .hot-labels {
    .labels {
      margin-top: 10px;
    }
  }
}
</style>
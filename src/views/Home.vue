<template>
  <div class="container">
    <div class="left">
      <Notice />
      <ArticleList />
    </div>
    <div class="right">
      <Aside />
    </div>
  </div>
</template>

<script>
import Notice from "@/components/Notice";
import ArticleList from "@/components/ArticleList";
import Aside from "@/components/Aside";

export default {
  name: "home",
  components: {
    Notice,
    ArticleList,
    Aside
  }
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
  max-width: 1500px;
  margin: 0 auto;
  height: 100%;
  // background: skyblue;
  padding-top: 20px;
  .left {
    width: 68%;
  }
  .right {
    width: 20%;
    margin-right: 10%;
    // background: white;
  }
  @media only screen and (max-width: 1000px) {
    .left {
      width: 100%;
    }
    .right {
      display: none;
    }
  }
}
</style>

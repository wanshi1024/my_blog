<template>
  <div class="article-list-container">
    <div class="list">
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
    </div>
    <div class="paging">
      <el-pagination background layout="prev, pager, next" :total="50"></el-pagination>
    </div>
  </div>
</template>

<script>
import ArticleItem from "@/components/ArticleItem";
export default {
  name: "",
  data() {
    return {};
  },
  components: {
    ArticleItem
  }
};
</script>

<style lang="less" scoped>
.article-list-container {
  width: 100%;
  .list {
    width: 98%;
    margin: 0 auto;
    & > * {
      margin: 10px auto;
    }
  }
  .paging {
    width: 98%;
    text-align: center;
    padding: 10px 0;
  }
}
</style>
<template>
  <el-card class="related-container">
    <h4>相关文章</h4>
    <ul class="article-list">
      <p v-if="articleList.length==0">暂无相关文章</p>
      <li v-for="(item, index) in articleList" :key="index">
        <el-link :href="`/article/${item.id}`">{{item.articleTitle}}</el-link>
      </li>
    </ul>
  </el-card>
</template>

<script>
import Http from "@/util/Http";
export default {
  name: "",
  data() {
    return {
      articleList: []
    };
  },
  created() {
    Http.get(
      `/api/article/findRelatedArticle/${this.$route.params.articleId}`
    ).then(res => {
      let { articleList } = res.data;
      this.articleList = articleList;
    });
  }
};
</script>

<style lang="less" scoped>
.related-container {
  h4 {
    font-size: 18px;
    font-weight: normal;
  }
  .article-list {
    margin-top: 10px;
    li {
      padding: 4px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      a {
        color: #6795b5;
        cursor: pointer;
        font-size: 14px;
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
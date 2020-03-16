<template>
  <div class="article-list-container">
    <div class="list">
      <ArticleItem
        v-for="(item,index) in articleList"
        :key="index"
        :article="item"
        :articleId="item.id"
      />
    </div>
    <div class="paging">
      <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
import ArticleItem from "@/components/article/ArticleItem";
import Http from "@/util/Http";
export default {
  name: "",
  data() {
    return {
      total: 0,
      articleList: []
    };
  },
  created() {
    this.getArticleList()
  },
  methods: {
    getArticleList() {
      Http.get("/api/article/articleList?current=1&size=5").then(res => {
        let { articleList, total } = res.data;
        this.total = total;
        this.articleList = articleList;
      });
    }
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
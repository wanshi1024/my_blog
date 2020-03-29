<template>
  <div class="article-list-container">
    <div class="list">
      <p v-if="!articleListData.total ">未查到您搜索条件里的文章信息,您可以跟换条件查询试试</p>
      <ArticleItem
        v-for="(item,index) in articleListData.articleList"
        :key="index"
        :article="item"
        :articleId="item.id"
      />
    </div>
    <div class="paging">
      <el-pagination
        background
        layout="total,prev,pager,next"
        :total="articleListData.total"
        :page-size="5"
        :current-page.sync="current"
        @current-change="changeCurrent"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import ArticleItem from "@/components/article/ArticleItem";
import Http from "@/util/Http";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      current: 1
    };
  },
  computed: {
    ...mapState({
      articleListData: state => state.articleListData,
      findArticleCondition: state => state.findArticleCondition
    })
  },
  created() {
    this.setArticleListData({ current: this.current, size: 5 });
  },
  methods: {
    ...mapActions({
      setArticleListData: "setArticleListData",
      setFindArticleCondition: "setFindArticleCondition"
    }),
    changeCurrent(v) {
      let condition = {};
      if (this.findArticleCondition.articleTitle != "") {
        condition.articleTitle = this.findArticleCondition.articleTitle;
      }
      if (this.findArticleCondition.articleLabel != "") {
        condition.articleLabel = this.findArticleCondition.articleLabel;
      }
      condition.current = this.current;
      condition.size = 5;
      this.setFindArticleCondition(condition);
      this.setArticleListData(this.findArticleCondition);
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
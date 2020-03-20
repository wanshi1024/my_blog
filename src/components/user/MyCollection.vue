<template>
  <div class="my-collection-container">
    <div class="list">
      <ArticleItem
        v-for="(item,index) in articleList"
        :key="index"
        :article="item"
        :articleId="item.id"
      />
    </div>
    <div class="paging">
      <el-pagination
        background
        layout="total,prev,pager,next"
        :total="total"
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
  name: "",
  data() {
    return {
      articleList: [],
      total: 0,
      current: 1
    };
  },
  created() {
    this.getArticleList(1);
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  methods: {
    getArticleList(v) {
      Http.get(
        `/api/article/myCollectionArticleList?userId=${this.userInfo.id}&current=${v}&size=5`
      ).then(res => {
        let { total, articleList } = res.data;
        this.articleList = articleList;
        this.total = total;
      });
    },
    changeCurrent(v) {
      this.getArticleList(v);
    }
  },
  components: {
    ArticleItem
  }
};
</script>

<style lang="less" scoped>
.my-collection-container {
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
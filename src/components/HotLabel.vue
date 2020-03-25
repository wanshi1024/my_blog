<template>
  <el-card class="hot-label-container">
    <el-tooltip class="item" effect="dark" content="点击标签查询文章,重复点击取消标签查询条件" placement="top-start">
      <h4>热门标签</h4>
    </el-tooltip>
    <div class="labels">
      <ArticleLabel
        v-for="(item,index) in hotLabelList"
        :key="index"
        :name="item.labelName"
        :class="{active : activeIndex == item.id}"
        @click.native="findArticleByLabel(item)"
      />
    </div>
  </el-card>
</template>

<script>
import ArticleLabel from "@/components/article/ArticleLabel";
import Http from "@/util/Http";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      hotLabelList: [],
      activeIndex: -1
    };
  },
  components: {
    ArticleLabel
  },
  created() {
    Http.get(`/api/articleLabel/getHotLabel`).then(res => {
      let { hotLabelList } = res.data;
      this.hotLabelList = hotLabelList;
    });
  },
  computed: {
    ...mapState({
      findArticleCondition: state => state.findArticleCondition
    })
  },
  methods: {
    // 通过标签查询文章
    findArticleByLabel(item) {
      if (this.activeIndex == item.id) {
        this.activeIndex = -1;
        this.setFindArticleCondition({
          articleLabel: "",
          articleTitle: this.findArticleCondition.articleTitle,
          current: 1,
          size: 5
        });
        this.setArticleListData(this.findArticleCondition);
        return;
      }
      this.activeIndex = item.id;
      this.setFindArticleCondition({
        articleLabel: item.labelName,
        articleTitle: this.findArticleCondition.articleTitle,
        current: 1,
        size: 5
      });
      // console.log(this.findArticleCondition,`hotlabel`);

      this.setArticleListData(this.findArticleCondition);
    },
    ...mapActions({
      setArticleListData: "setArticleListData",
      setFindArticleCondition: "setFindArticleCondition"
    })
  }
};
</script>

<style lang="less" scoped>
.hot-label-container {
  h4 {
    font-size: 18px;
    font-weight: normal;
    width: 4em;
  }
  .labels {
    margin-top: 10px;
    a {
      text-decoration-line: none;
      cursor: pointer;
      display: inline-block;
      height: 20px;
      line-height: 20px;
      padding: 2px 5px;
      background-color: #99cfff;
      font-size: 12px;
      color: #fff;
      border-radius: 4px;
      margin: 4px;
      transition: all 0.5s;
    }
    .active,
    a:hover {
      background-color: #339dff;
      color: #fff;
      transform: scale(1.05);
    }
  }
}
@media only screen and (max-width: 750px) {
  .hot-label-container {
    display: none;
  }
}
</style>
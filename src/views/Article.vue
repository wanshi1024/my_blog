<template>
  <div class="article-container">
    <div class="left">
      <div class="article-wrap">
        <div class="article-header">
          <h4 class="article-title">{{article.articleTitle}}</h4>
          <p class="article-info">
            <a>{{article.username}}</a>
            <span class="time">发布于 {{article.publishDate}}</span>
            <span class="read-count">阅读数 {{article.readCount}}</span>
            <span class="collection">
              <i class="el-icon-star-off"></i>
              收藏
            </span>
          </p>
        </div>
        <el-divider></el-divider>
        <article v-html="article.articleContent"></article>
        <el-divider></el-divider>
        <div class="labels">
          <ArticleLabel v-for="(item, index) in labelName" :key="index" :name="item" />
        </div>
        <el-divider></el-divider>
        <div class="reply">
          <p v-if="false">没有登录</p>
          <div v-else class="reply-wrap">
            <el-input type="textarea"></el-input>
            <p>
              <span>还能输入1000个字符</span>
              <el-button type="primary" size="small" class="reply-btn">发表评论</el-button>
            </p>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="comment">
          <Comment />
        </div>
      </div>
    </div>
    <div class="right">
      <ZZWX />
      <!-- <HotLabel /> -->
      <RelatedArticle />
    </div>
  </div>
</template>

<script>
import ArticleLabel from "@/components/article/ArticleLabel";
import Comment from "@/components/article/Comment";
import ZZWX from "@/components/ZZWX";
import HotLabel from "@/components/HotLabel";
import RelatedArticle from "@/components/article/RelatedArticle";
import Http from "@/util/Http";
export default {
  name: "",
  data() {
    return {
      article: {},
      labelName: []
    };
  },
  components: {
    ArticleLabel,
    Comment,
    ZZWX,
    HotLabel,
    RelatedArticle
  },
  created() {
    // console.log(this.$route.params);
    this.getArticleData();
  },
  computed: {
    articleLabelToArr() {
      return this.article.articleLabel.split(",");
    }
  },
  methods: {
    /**
     * 获取文章数据
     */
    getArticleData() {
      Http.get(
        `/api/article/findArticleById?id=${this.$route.params.articleId}`
      ).then(res => {
        let { article, labelName } = res.data;
        this.article = article;
        this.labelName = labelName;
      });
    },
    /**
     * 增加阅读数量  +1
     */
    increaseReadCount(){
      
    }
  }
};
</script>

<style lang="less" scoped>
.article-container {
  display: flex;
  justify-content: space-between;
  max-width: 1500px;
  margin: 0 auto;
  height: 100%;
  background: white;
  padding-top: 20px;
  .left {
    width: 68%;
    background: skyblue;
    .article-wrap {
      padding: 0 24px 16px;
      background: #fff;
      margin-bottom: 8px;
      .article-header {
        .article-title {
          font-size: 24px;
          word-wrap: break-word;
          color: rgb(112, 110, 110);
        }
        .article-info {
          color: #858585;
          width: 88%;
          line-height: 26px;
          margin-top: 8px;
          & > * {
            margin-right: 20px;
          }
          a {
            color: #78a5f1;
            cursor: pointer;
            &:hover {
              text-decoration-line: underline;
            }
          }
          .collection {
            color: #ff700a;
            cursor: pointer;
          }
        }
      }
      .reply {
        .reply-wrap {
          p {
            margin-top: 8px;
            display: flex;
            justify-content: flex-end;
            span {
              font-size: 12px;
              color: #999;
              line-height: 40px;
              margin-right: 16px;
            }
          }
        }
      }
    }
  }
  .right {
    width: 24%;
    margin-right: 10%;
    // background: pink;
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
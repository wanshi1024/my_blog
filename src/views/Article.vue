<template>
  <div class="article-container">
    <div class="left">
      <div class="article-wrap">
        <div class="article-header">
          <h4 class="article-title">{{article.articleTitle}}</h4>
          <p class="article-info">
            作者:
            <a>{{article.username}}</a>
            <span class="time">最后发表于 {{article.publishDate}}</span>
            <span class="read-count">阅读数 {{article.readCount}}</span>
            <span
              class="collection"
              @click.once="handlerCollectFn"
              title="防止频繁点击,每次只能点击一次事件,刷新后才能继续点击"
            >
              <i :class="{'el-icon-star-off':!collected, 'el-icon-star-on':collected}"></i>
              {{collected?'已收藏':'点击收藏'}}
            </span>
          </p>
        </div>
        <el-divider></el-divider>
        <article v-html="article.articleContent"></article>
        <el-divider></el-divider>
        <div class="labels">
          <ArticleLabel v-for="(item, index) in articleLabelComputed" :key="index" :name="item" />
        </div>
        <el-divider></el-divider>
        <div class="reply">
          <p v-if="false">没有登录</p>
          <div v-else class="reply-wrap">
            <el-input
              type="textarea"
              v-model="comment1Content"
              maxlength="200"
              :autosize="{ minRows: 2, maxRows: 6 }"
            ></el-input>
            <p>
              <span v-if="wordCount>0">还能输入 {{wordCount}} 个字符</span>
              <span v-else style="color:red">字数已满,您不能再输入啦</span>
              <el-button type="primary" size="small" class="reply-btn" @click="submitComment1">发表评论</el-button>
            </p>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="comment">
          <Comment
            :comment1Data="comment1Data"
            @submitComment2="submitComment2"
            :articleTitle="article.articleTitle"
          />
          <el-pagination
            style="margin-top:2em"
            background
            layout="total,prev, pager, next"
            :total="comment1Data.total"
            :page-size="5"
            :current-page.sync="current"
            @current-change="currentChange"
            :hide-on-single-page="comment1Data.total==0"
          ></el-pagination>
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
import formatDate from "@/util/formatDate";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      article: {},
      articleId: this.$route.params.articleId,
      collected: false,
      comment1Content: "",
      comment1Data: {}, //一级评论数据 total:Number commentList:Array
      current: 1
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
    this.findIsCollected();
    this.getComment1List(1);
  },
  computed: {
    articleLabelComputed() {
      let str = this.article.articleLabel || "";
      return str.split(",");
    },
    ...mapState({
      userInfo: state => state.userInfo
    }),
    wordCount() {
      return 200 - this.comment1Content.length;
    }
  },
  methods: {
    /**
     * 获取文章数据
     */
    getArticleData() {
      Http.get(`/api/article/findArticleById?id=${this.articleId}`).then(
        res => {
          let { article } = res.data;
          this.article = article;
          // console.log(article);
          
        }
      );
    },
    // 查找是否已收藏
    findIsCollected() {
      Http.get(
        `/api/article/findIsCollected?userId=${this.userInfo.id}&articleId=${this.articleId}`
      ).then(res => {
        let { code, message } = res.data;
        if (code == 1) {
          this.collected = true;
        }
      });
    },
    //收藏文章
    collectArticle() {
      Http.post(`/api/article/collectArticle`, {
        userId: this.userInfo.id,
        articleId: this.articleId
      }).then(res => {
        let { code, message } = res.data;
        if (code == 1) {
          this.collected = true;
          this.$message.success(message);
        } else {
          this.$message.error(message);
        }
      });
    },
    //取消收藏
    cancelCollectArticle() {
      Http.post(`/api/article/cancelCollectArticle`, {
        userId: this.userInfo.id,
        articleId: this.articleId
      }).then(res => {
        let { code, message } = res.data;
        if (code == 1) {
          this.collected = false;
          this.$message.success(message);
        } else {
          this.$message.error(message);
        }
      });
    },
    //收藏函数中转
    handlerCollectFn() {
      if (this.collected) {
        this.cancelCollectArticle();
      } else {
        this.collectArticle();
      }
    },
    //发布一级评论
    submitComment1() {
      if (this.comment1Content.length == 0) {
        this.$message.warning(`请输入回复内容`);
        return;
      }
      let data = {
        userId: this.userInfo.id,
        articleId: this.articleId,
        commentContent: this.comment1Content,
        commentDate: formatDate(new Date(), "{y}-{m}-{d} {h}:{i}:{s}"),
        commentUserName: this.userInfo.username,
        articleTitle: this.article.articleTitle,
        toUserId:this.article.userId
      };
      Http.post(`/api/comment/addComment1`, data).then(res => {
        let { code, message } = res.data;
        if (code == 1) {
          this.$message.success(message);
          this.comment1Content = "";
          this.getComment1List(this.current);
        } else {
          this.$message.error(message);
        }
      });
    },
    //获取一级评论列表
    getComment1List(v) {
      Http.get(
        `/api/comment/comment1List?articleId=${this.articleId}&current=${v}&size=5`
      ).then(res => {
        this.comment1Data = res.data;
        // console.log(this.comment1Data);
      });
    },
    // 分页下标改变事件
    currentChange(v) {
      this.getComment1List(v);
    },
    submitComment2() {
      this.getComment1List(this.current);
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
    // background: skyblue;
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
          .collection-actived {
            background: #ff700a;
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
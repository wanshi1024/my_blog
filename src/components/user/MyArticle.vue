<template>
  <div class="my-article-container">
    <ul>
      <li v-for="(item, index) in articleList" :key="index">
        <p class="title">
          <a @click="$router.push(`/article/${item.id}`)">{{item.articleTitle}}</a>
        </p>
        <div class="bottom">
          <!-- 阅读量 -->
          <span class="read-num">
            <a>
              <i class="el-icon-view"></i>
              <span class="num">{{item.readCount}}</span>
            </a>
          </span>
          <div class="line"></div>
          <!-- 评论数 -->
          <span class="common-num">
            <a>
              <i class="el-icon-chat-dot-square"></i>
              <span class="num">{{item.commentCount}}</span>
            </a>
          </span>
          <div class="line"></div>
          <!-- 日期 -->
          <span class="publish-date">
            <a>
              <span>{{item.publishDate}}</span>
            </a>
          </span>
          <div class="line"></div>
          <span class="handler">
            <a class="editor" @click="editArticle(item.id)">编辑</a>
            <a class="delete" @click="deleteArticle(item.id)">删除</a>
          </span>
        </div>
      </li>
    </ul>
    <el-pagination
      background
      layout="total,prev, pager, next"
      :total="total"
      :page-size="10"
      :current-page.sync="current"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<script>
import Http from "@/util/Http";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      total: 0,
      articleList: [],
      current: 1
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  created() {
    this.getArticleList(1);
  },
  methods: {
    getArticleList(v) {
      Http.get(
        `/api/article/findMyArticle?current=${v}&size=10&id=${this.userInfo.id}`
      ).then(res => {
        let { articleList, total } = res.data;
        this.total = total;
        this.articleList = articleList;
      });
    },
    currentChange(v) {
      this.getArticleList(v);
    },
    editArticle(articleId) {
      this.$router.push({
        name: "publish",
        params: {
          articleId
        }
      });
    },
    deleteArticle(articleId) {
      this.$confirm("您确定要删除此文章吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        Http.post("/api/article/deleteArticleById", { id: articleId }).then(
          res => {
            let { code, message } = res.data;
            if (code == 1) {
              this.$message.success(message);
              this.getArticleList(this.current);
            } else {
              this.$message.error(message);
            }
          }
        );
      });
    }
  }
};
</script>

<style lang="less" scoped>
.my-article-container {
  ul {
    li {
      margin: 0 1em 1em 1em;
      border-bottom: 1px dotted #ddd;

      .title {
        a {
          font-size: 16px;
          color: #4d4d4d;
          letter-spacing: 1px;
          cursor: pointer;
          line-height: 2em;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .bottom {
        font-size: 14px;
        display: flex;
        padding-right: 10em;
        color: #999;
        .read-num,
        .common-num {
          a {
            span {
              margin-left: 4px;
            }
          }
        }
        .handler {
          transform: translateY(-2px);
          a {
            margin-left: 5px;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          .editor {
            color: #1e9fff;
          }
          .delete {
            color: #ca0c16;
          }
        }

        .line {
          float: left;
          width: 1px;
          height: 12px;
          border-radius: 50%;
          background-color: #e0e0e0;
          margin-top: 3px;
          margin-left: 10px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
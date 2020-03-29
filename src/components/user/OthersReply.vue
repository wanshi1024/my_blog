<template>
  <div class="my-reply-container">
    <div class="msg-info">
      <span class="unread">未读回复: 16</span>
      <span class="handler">
        <a class="mark-all-read">全部标记为已读</a>
        <!-- <b class="line"></b>
        <a class="empty-all-msg">清空所有消息</a>-->
      </span>
    </div>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <p class="top">
          <span>
            <a>用户</a>
            <b>{{item.fromCommentUserName}}</b>
            <a>的回复</a>
          </span>
          <span class="date">{{item.commentDate}}</span>
          <span
            :class="{active:item.readState,readState:!item.readState}"
          >{{item.readState == 0 ? "未读":"已读"}}</span>
        </p>
        <p class="reply-content">{{item.commentContent}}</p>
        <p class="reply-article">
          <b>来自:</b>
          <a
            class="article-link"
            @click="goArticle(item.articleId,item.id)"
            title="点击查看文章"
          >{{item.articleTitle}}</a>
        </p>
      </li>
    </ul>
    <el-pagination
      background
      layout="total,prev,pager,next"
      :total="total"
      :page-size="5"
      :current-page.sync="current"
      @current-change="changeCurrent"
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
      list: [],
      current: 1
    };
  },
  created() {
    this.getList(1);
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  methods: {
    getList(v) {
      Http.get(
        `/api/comment/otherReplyMyComment?userId=${this.userInfo.id}&current=${v}&size=5`
      ).then(res => {
        let { total, list } = res.data;
        this.list = list;
        this.total = total;
      });
    },
    changeCurrent(v) {
      this.getList(v);
    },
    // 跳转文章页面
    goArticle(articleId, id) {
      Http.post(`/api/comment/updateReadState/${id}`).then(res => {
        let { code } = res.data;
        if (code == 1) {
          this.$router.push(`/article/${articleId}`);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.my-reply-container {
  margin: 0 1em;
  font-size: 14px;
  .msg-info {
    color: #3d3d3d;
    display: flex;
    justify-content: space-between;
    .unread {
      font-size: 14px;
      color: #3d3d3d;
    }
    .handler {
      .line {
        display: inline-block;
        height: 12px;
        margin: -1px 12px;
        border-right: 1px solid #979797;
      }
      a {
        color: #4a90e2;
      }
    }
  }
  ul {
    li {
      padding: 10px 0;
      border-bottom: 1px dotted #ddd;
      p {
        line-height: 1.5em;
      }
      .top {
        b {
          color: #999;
          margin: 0 1em;
        }
        .date {
          margin-left: 2em;
          color: #999;
        }
        .readState {
          margin-left: 2em;
          color: #ca0c16;
        }
        .active {
          margin-left: 2em;
          color: green;
        }
      }
      .reply-content {
        color: #4d4d4d;
        text-indent: 2em;
        line-height: 2em;
      }
      .reply-article {
        b {
          font-size: 16px;
          font-weight: normal;
          margin-right: 4px;
        }
        .article-link {
          font-size: 16px;
          color: #3399ea;
          letter-spacing: 1px;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="my-reply-container">
    <div class="msg-info">
      <span class="unread">未读回复: 16</span>
      <span class="handler">
        <a class="mark-all-read">全部标记为已读</a>
        <b class="line"></b>
        <a class="empty-all-msg">清空所有消息</a>
      </span>
    </div>
    <ul>
      <li>
        <p class="top">
          <span>
            <a>张三</a>
            <b>回复</b>
            <a>顽石mua</a>
          </span>
          <span class="date">2020-02-23 18:15:25</span>
          <span class="read-state">未读</span>
        </p>
        <p class="reply-content">我是回复的内容...</p>
        <p class="reply-article">
          <b>来自:</b>
          <a class="article-link">文章标题哈哈哈哈</a>
        </p>
      </li>
      <li>
        <p class="top">
          <span>
            <a>张三</a>
            <b>回复</b>
            <a>顽石mua</a>
          </span>
          <span class="date">2020-02-23 18:15:25</span>
          <span class="read-state">未读</span>
        </p>
        <p class="reply-content">我是回复的内容...</p>
        <p class="reply-article">
          <b>来自:</b>
          <a class="article-link">文章标题哈哈哈哈</a>
        </p>
      </li>
    </ul>
     <el-pagination background layout="prev, pager, next" :total="50"></el-pagination>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
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
        .read-state{
          margin-left: 2em;
          color: #ca0c16;
        }
      }
      .reply-content {
        color: #4d4d4d;
        text-indent: 2em;
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
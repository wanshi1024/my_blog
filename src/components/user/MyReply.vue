<template>
  <div class="my-reply-container">
    <ul>
      <li>
        <p class="top">
          <span>
            <a>顽石mua</a>
            <b>回复</b>
            <a>张三</a>
          </span>
          <span class="date">2020-02-23 18:15:25</span>
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
            <a>顽石mua</a>
            <b>回复</b>
            <a>张三</a>
          </span>
          <span class="date">2020-02-23 18:15:25</span>
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
        .read-state {
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
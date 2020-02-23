<template>
  <div class="my-article-container">
    <ul>
      <li>
        <p class="title">
          <a>ES6语法基础知识总结2之数组新增方法</a>
        </p>
        <div class="bottom">
          <!-- 阅读量 -->
          <span class="read-num">
            <a>
              <i class="el-icon-view"></i>
              <span class="num">10</span>
            </a>
          </span>
          <div class="line"></div>
          <!-- 评论数 -->
          <span class="common-num">
            <a>
              <i class="el-icon-chat-dot-square"></i>
              <span class="num">10</span>
            </a>
          </span>
          <div class="line"></div>
          <!-- 日期 -->
          <span class="publish-date">
            <a>
              <span>2019-04-14 21:26:36</span>
            </a>
          </span>
          <div class="line"></div>
          <span class="handler">
            <a class="editor">编辑</a>
            <a class="delete">删除</a>
          </span>
        </div>
      </li>
      <li>
        <p class="title">
          <a>ES6语法基础知识总结2之数组新增方法</a>
        </p>
        <div class="bottom">
          <!-- 阅读量 -->
          <span class="read-num">
            <a>
              <i class="el-icon-view"></i>
              <span class="num">10</span>
            </a>
          </span>
          <div class="line"></div>
          <!-- 评论数 -->
          <span class="common-num">
            <a>
              <i class="el-icon-chat-dot-square"></i>
              <span class="num">10</span>
            </a>
          </span>
          <div class="line"></div>
          <!-- 日期 -->
          <span class="publish-date">
            <a>
              <span>2019-04-14 21:26:36</span>
            </a>
          </span>
          <div class="line"></div>
          <span class="handler">
            <a class="editor">编辑</a>
            <a class="delete">删除</a>
          </span>
        </div>
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
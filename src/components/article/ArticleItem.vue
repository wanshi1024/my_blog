<template>
  <div class="article-container">
    <el-card class="item" shadow="hover">
      <h2>
        <a class="title" @click="$router.push(`/article/${articleId}`)">Pyhton 实现黑客帝国字符雨</a>
      </h2>
      <div class="desc">
        本项目中，需要用到文件库“pygame”对于没有字体ttf的小伙伴，也不必担心，可以去这个链接下载：
        里面是我整理的字体文件，有30+ 种，完全能够满足你的平日使用需求；
      </div>
      <dl class="userbar-list">
        <dt class="user">
          <a>
            <img src="/img/logo.png" alt />
            <span class="username">第一个作者</span>
          </a>
        </dt>

        <div class="interactive">
          <!-- 点赞 -->
          <!-- <dd class="click-hands">
            <a>
              <i class="el-icon-apple"></i>
              <span class="num">10000</span>
            </a>
          </dd>-->

          <!-- 阅读量 -->
          <dd class="read-num">
            <a>
              <i class="el-icon-view"></i>
              <span class="num">10</span>
            </a>
          </dd>
          <div class="line"></div>
          <!-- 评论数 -->
          <dd class="common-num">
            <a>
              <i class="el-icon-chat-dot-square"></i>
              <span class="num">10</span>
            </a>
          </dd>
          <div class="line"></div>
          <dd class="publish-date">
            <a>
              <span>2020-02-20 17:22</span>
            </a>
          </dd>
        </div>
      </dl>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    articleId: {
      type: Number,
      required:true
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.article-container {
  //   width: 98%;
  .item {
    // width: 98%;
    height: 120px;
    margin: 0 auto;
    h2 {
      .title {
        // max-width: 98%;
        font-size: 18px;
        color: #3d3d3d;
        display: block;
        line-height: 24px;
        height: 24px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        cursor: pointer;
      }
      .title:hover {
        text-decoration-line: underline;
      }
    }
    .desc {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 24px;
      margin-bottom: 4px;
      color: #8a8a8a;
      font-size: 14px;
      margin-top: 0.5em;
    }
    dl.userbar-list {
      height: 24px;
      line-height: 24px;
      dt.user {
        float: left;
        margin: 0 6px 0 0;
        cursor: pointer;
        img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid #ddd;
          // border-radius: 4px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.075);
        }
        .username {
          font-size: 14px;
          color: #8a8a8a;
          line-height: 24px;
          vertical-align: 9px;
          margin-left: 6px;
        }
        &:hover {
          text-decoration-line: underline;
        }
      }

      .interactive {
        line-height: 24px;
        float: right;
        display: flex;
        justify-content: space-between;
        .line {
          float: left;
          width: 1px;
          height: 12px;
          border-radius: 50%;
          background-color: #e0e0e0;
          margin-top: 6px;
          margin-left: 10px;
          margin-right: 10px;
        }
        dd {
          a {
            // cursor: pointer;
            span {
              color: #349edf;
              margin-left: 4px;
            }
            i {
              fill: #6b6b6b;
            }
          }
        }
        @media only screen and (max-width: 750px) {
          .line:last-of-type,
          dd.publish-date {
            display: none;
          }
        }
      }
    }
  }
}
</style>
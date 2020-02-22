<template>
  <div class="comment-container">
    <h4 class="comment-count">10 个回复</h4>
    <div class="comment-wrap">
      <!-- 父评论 -->
      <div class="comment-level-1">
        <p class="top">
          <a class="user-info">
            <el-avatar class="user-img" shape="square" size="small" :src="`/img/logo.png`"></el-avatar>
            <span class="user-name">顽石mua</span>
            <span class="comment-date">2020-02-22 17:39:22</span>
          </a>

          <a class="dianzan">
            <span class="reply">
              <a class="reply-btn">回复</a>
              <a class="readreply" @click="isShow=!isShow">查看回复(5)</a>
            </span>
            <i class="el-icon-apple">666</i>
          </a>
        </p>
        <p class="comment-content">我是一级评论</p>

        <!-- 子评论 -->
        <div class="comment-level-2" v-show="isShow">
          <div class="item">
            <p class="top">
              <a class="user-info">
                <el-avatar class="user-img" shape="square" size="small" :src="`/img/logo.png`"></el-avatar>
                <span class="user-name">顽石mua</span>
                <span class="text">回复</span>
                <span class="target-name">张三</span>
                <span class="comment-date">2020-02-22 17:39:22</span>
              </a>
              <a class="dianzan">
                <span class="reply">
                  <a class="reply-btn">回复</a>
                </span>
                <i class="el-icon-apple">666</i>
              </a>
            </p>
            <p class="comment-content">我是二级评论</p>
          </div>
        </div>
        <div class="input">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <el-button class="btn" type="success">评论</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      isShow: true,
      input: ""
    };
  }
};
</script>

<style lang="less" scoped>
.comment-container {
  h4.comment-count {
    font-size: 18px;
    font-weight: normal;
    margin: 10px 0;
  }
  .comment-wrap {
    .comment-level-1 {
      margin-top: 12px;
      border-bottom: 1px dashed #e0e0e0;
      p.top {
        display: flex;
        justify-content: space-between;
        a.user-info {
          .user-name {
            margin-left: 10px;
            vertical-align: 8px;
          }
          .comment-date {
            font-size: 14px;
            color: #999;
            vertical-align: 8px;
            margin-left: 2em;
          }
        }
        .dianzan {
          .reply {
            color: #79a5e5;
            font-size: 14px;
            // float: right;
            a {
              margin-left: 1em;
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
            }
          }
          i {
            cursor: pointer;
            margin-left: 1em;
          }
        }
        // 最大宽度数值下 屏幕显示的
        @media only screen and (max-width: 750px) {
          .reply,
          .dianzan {
            display: none;
          }
        }
      }
      p.comment-content {
        text-indent: 3em;
        color: #4d4d4d;
        font-size: 14px;
        line-height: 2em;
        margin-bottom: 4px;
        word-wrap: break-word;
      }

      .comment-level-2 {
        border-radius: 5px;
        margin-top: 10px;
        border: 1px solid #eee;
        padding: 15px;
        margin-bottom: 15px;
        width: 92%;
        transform: translateX(5%);

        .item {
          .top {
            .user-info {
              .text,
              .target-name {
                margin-left: 10px;
                vertical-align: 8px;
              }
              .text {
                color: #999;
              }
            }
          }
        }
      }
      .input {
        border-radius: 5px;
        margin-top: 10px;
        border: 1px solid #eee;
        padding: 15px;
        margin-bottom: 15px;
        width: 92%;
        transform: translateX(5%);
        text-align: right;
        .btn {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
<template>
  <div class="comment-container">
    <h4 class="comment-count">{{comment1Data.total}} 个回复</h4>
    <div class="comment-wrap">
      <!-- 父评论 -->
      <div class="comment-level-1" v-for="(item, index) in comment1List" :key="index">
        <p class="top">
          <a class="user-info">
            <el-avatar class="user-img" shape="square" size="small" :src="item.avatar"></el-avatar>
            <span class="user-name">{{item.username}}</span>
            <span class="comment-date">{{item.commentDate}}</span>
          </a>
          <a class="dianzan">
            <span class="reply">
              <a
                class="reply-btn"
                @click="showReplyInput(item,index)"
                v-if="item.userId != userInfo.id"
              >回复</a>
              <a
                class="readreply"
                @click="isShow=!isShow"
                v-if="item.subLevelCommentCount>=1"
              >查看回复( {{item.subLevelCommentCount}} )</a>
            </span>
            <i class="el-icon-apple">{{item.complimentCount}}</i>
          </a>
        </p>
        <p class="comment-content">{{item.commentContent}}</p>

        <!-- 子评论 -->
        <div class="comment-level-2" v-if="false">
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
        <el-collapse-transition>
          <div class="input" v-if="item.flag==1">
            <el-input v-model="item.input" placeholder="请输入内容"></el-input>
            <el-button class="btn" type="success" @click="submitComment2(item,index)">评论</el-button>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script>
import Http from "@/util/Http";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  props: ["comment1Data"],
  data() {
    return {
      isShow: true,
      input: "",
      comment1List: this.comment1Data.commentList
    };
  },

  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  watch: {
    comment1Data(v) {
      this.comment1List = v.commentList;
    }
  },
  methods: {
    //子评论回复模块的隐藏和显示控制
    showReplyInput(item, index) {
      if (item.flag == 0) this.$set(this.comment1List[index], "flag", 1);
      else this.$set(this.comment1List[index], "flag", 0);
    },
    // 发布二级评论
    submitComment2(item, index) {
      console.log(item.input);
      this.$set(this.comment1List[index], "input", "");
    }
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
          .user-img {
            border: 1px #dddddd solid;
          }
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
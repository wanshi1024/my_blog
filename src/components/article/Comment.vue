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
              <!-- 回复 -->
              <a
                class="reply-btn"
                @click="showReplyInput(item,index,item.userId)"
                v-if="item.userId != userInfo.id"
              >回复</a>
              <a
                class="readreply"
                @click="showSubComment(item,index)"
                v-if="item.comment2List.length >= 1"
              >查看回复( {{item.comment2List.length}} )</a>
            </span>
            <!-- 点赞 -->
            <i
              class="el-icon-apple"
              :class="{active:item.compliment}"
              @click.once="addCompliment1(item,index)"
            >{{item.complimentCount}}</i>
          </a>
        </p>
        <p class="comment-content">{{item.commentContent}}</p>

        <!-- 子评论 -->
        <el-collapse-transition>
          <div class="comment-level-2" v-if="item.flag1==1">
            <div class="item" v-for="(item2, index2) in item.comment2List" :key="index2">
              <p class="top">
                <a class="user-info">
                  <el-avatar class="user-img" shape="square" size="small" :src="item2.fromAvatar"></el-avatar>
                  <span class="user-name">{{item2.fromUserName}}</span>
                  <span class="text">回复</span>
                  <span class="target-name">{{item2.toUserName}}</span>
                  <span class="comment-date">{{item2.commentDate}}</span>
                </a>
                <a class="dianzan">
                  <span class="reply">
                    <a
                      class="reply-btn"
                      v-if="item2.fromUserId != userInfo.id"
                      @click="showReplyInput(item,index,item2.fromUserId)"
                    >回复</a>
                  </span>
                  <!-- 点赞 -->
                  <i
                    class="el-icon-apple"
                    :class="{active:item2.compliment}"
                    @click.once="addCompliment2(item2,index,index2)"
                  >{{item2.complimentCount}}</i>
                </a>
              </p>
              <p class="comment-content">{{item2.commentContent}}</p>
            </div>
          </div>
        </el-collapse-transition>
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
import formatDate from "@/util/formatDate";
export default {
  props: ["comment1Data", "articleTitle"],
  data() {
    return {
      isShow: true,
      input: "",
      comment1List: [],
      toUserId: 0
    };
  },
  created() {
    this.comment1List = this.comment1Data.comment1List;
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  watch: {
    comment1Data(v) {
      this.comment1List = v.comment1List;
    }
  },
  methods: {
    //评论回复模块的隐藏和显示控制
    showReplyInput(item, index, toUserId) {
      if(!this.userInfo.id) {
        this.$message(`请先登录`)
        return;
      }
      if (item.flag == 0) {
        this.$set(this.comment1List[index], "flag", 1);
        this.toUserId = toUserId;
      } else {
        this.$set(this.comment1List[index], "flag", 0);
      }
    },
    // 子评论模块显示与隐藏
    showSubComment(item, index) {
      if (item.flag1 == 0) this.$set(this.comment1List[index], "flag1", 1);
      else this.$set(this.comment1List[index], "flag1", 0);
    },
    // 发布二级评论
    submitComment2(item, index) {
      // console.log(item);
      if (item.input.length == 0) {
        this.$message.warning(`不能为空`);
        return;
      }
      let data = {
        fromUserId: this.userInfo.id,
        toUserId: this.toUserId,
        parentCommentId: item.id,
        commentContent: item.input,
        commentDate: formatDate(new Date(), "{y}-{m}-{d} {h}:{i}:{s}"),
        commentUserName: this.userInfo.username,
        articleTitle: this.articleTitle,
        articleId: this.$route.params.articleId
      };

      Http.post(`/api/comment/addComment2`, data).then(res => {
        let { code, message } = res.data;
        if (code == 1) {
          this.$set(this.comment1List[index], "input", "");
          this.$message.success(message);
          this.$emit("submitComment2");
        } else {
          this.$message.error(message);
        }
      });
    },
    // 一级评论点赞
    addCompliment1(item, index) {
      Http.post(`/api/comment/addCompliment/${1}/${item.id}`).then(res => {
        let { code, message } = res.data;
        if (code == 1) {
          this.$message.success(message);
          this.$set(this.comment1List[index], "compliment", true);
          this.$set(
            this.comment1List[index],
            "complimentCount",
            ++item.complimentCount
          );
        } else {
          this.$message.error(message);
        }
      });
    },
    // 二级评论点赞
    addCompliment2(item2, index, index2) {
      Http.post(`/api/comment/addCompliment/${2}/${item2.id}`).then(res => {
        let { code, message } = res.data;
        if (code == 1) {
          this.$message.success(message);
          this.$set(
            this.comment1List[index].comment2List[index2],
            "compliment",
            true
          );
          this.$set(
            this.comment1List[index].comment2List[index2],
            "complimentCount",
            ++item2.complimentCount
          );
        } else {
          this.$message.error(message);
        }
      });
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
          .active {
            color: red;
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
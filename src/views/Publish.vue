<template>
  <div class="publish-container">
    <div class="left">
      <div class="top">
        <span>标题:</span>
        <el-input
          class="title-input"
          clearable
          maxlength="100"
          v-model="articleTitle"
          placeholder="输入文章标题,100字数以内"
        />
        <el-button type="success" v-if="editBtnIsShow" @click="submitEditArticle">确认修改</el-button>
        <el-button type="success" v-else @click="submitPublishArticle">发布文章</el-button>
      </div>
      <div id="editor" ref="editor" style="background: white;"></div>
      <div class="labels">
        <div class="labels-input-wrap">
          <span>标签:</span>
          <p class="labels-input">
            <el-tag
              type="success"
              effect="dark"
              v-for="tag in computedTags"
              :key="tag"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
              class="tab-item"
            >{{tag}}</el-tag>
            <span class="tip" v-show="tags.length==0">请选择文章归类标签,最少选择一条,最多选择三条</span>
          </p>
        </div>
        <div class="labels-checkebox">
          <el-checkbox-group v-model="checkList" :max="3">
            <!-- ---------------------- -->
            <el-tabs v-model="activeName">
              <el-tab-pane
                v-for="(x, y) in articleLabels"
                :key="y"
                :label="x.classifyName"
                :name="(y+1)+``"
              >
                <el-checkbox
                  v-for="(i, j) in x.labelList"
                  :key="j"
                  :label="i"
                  border
                  style="margin-top:10px;margin-left:0;"
                >{{i.labelName}}</el-checkbox>
              </el-tab-pane>
            </el-tabs>
            <!-- ----------------------------- -->
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="right">
      <ZZWX />
      <el-card>
        <p>内容暂定</p>
      </el-card>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
import ZZWX from "@/components/ZZWX";
import $ from "jquery";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import Http from "@/util/Http";
import formatDate from "@/util/formatDate";

export default {
  name: "",
  data() {
    return {
      articleContent: "", //文章内容
      articleTitle: "", //文章标题
      checkList: [],
      activeName: "1",
      tags: [], // 选中的标签
      editBtnIsShow: false
    };
  },
  components: { ZZWX },
  computed: {
    ...mapState({
      articleLabels: state => state.articleLabels,
      userInfo: state => state.userInfo
    }),
    computedTags() {
      return this.tags.map(v => {
        return v.labelName;
      });
    }
  },
  created() {
    // vuex 里请求并且暂存了标签 如果请求过一次 不需要再次请求
    if (this.articleLabels.length > 0) return;
    this.setArticleLabels();
  },

  watch: {
    checkList(v) {
      this.tags = v;
    },
    tags(v) {
      this.checkList = v;
    }
  },
  methods: {
    // 重置字段
    resetData() {
      this.articleTitle = "";
      this.articleContent = "";
      this.checkList = [];
      this.tags = [];
    },
    ...mapActions({
      setArticleLabels: "setArticleLabels"
    }),
    // 删除标签
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    //发布文章
    submitPublishArticle() {
      //判断是否为空
      if (
        this.articleTitle == "" ||
        this.articleContent == "" ||
        this.tags.length == 0
      ) {
        this.$message.warning(`文章标题 | 文章内容 | 文章标签 不能为空`);
        return;
      }

      let article = {
        articleLabel: this.tags.map(v => v.labelName).join(","),
        articleTitle: this.articleTitle,
        articleContent: this.articleContent,
        userId: this.userInfo.id,
        publishDate: formatDate(new Date(), "{y}-{m}-{d} {h}:{i}")
      };
      console.log(article);
      
      Http.post("/api/article/addArticle", article).then(res => {
        let { code, message } = res.data;
        if (code == 1) {
          this.$message.success(message);
          this.resetData();
          this.$router.push("/");
        } else {
          this.$message.error(message);
        }
      });
    },
    // 修改文章 保存
    submitEditArticle() {
      //判断是否为空
      if (
        this.articleTitle == "" ||
        this.articleContent == "" ||
        this.tags.length == 0
      ) {
        this.$message.warning(`文章标题 | 文章内容 | 文章标签 不能为空`);
        return;
      }

      let article = {
        id: this.$route.params.articleId,
        articleLabel: this.tags.map(v => v.id).join(","),
        articleTitle: this.articleTitle,
        articleContent: this.articleContent,
        // userId: this.userInfo.id,
        publishDate: formatDate(new Date(), "{y}-{m}-{d} {h}:{i}")
      };
      Http.post("/api/article/updateArticle", article).then(res => {
        let { code, message } = res.data;
        if (code == 1) {
          this.$message.success(message);
          this.resetData();
          this.$router.push(`article/${article.id}`);
        } else {
          this.$message.error(message);
        }
      });
    }
  },
  mounted() {
    var editor = new E(this.$refs.editor);
    editor.customConfig.onchange = html => {
      this.articleContent = html;
    };
    editor.customConfig.customUploadImg = function(files, insert) {
      var file = files[0];
      var formData = new FormData();
      formData.append("file", file);
      $.ajax({
        type: "post",
        url: "http://123.56.23.25:1111/upload",
        data: formData,
        contentType: false, //为了让浏览器根据传入的formdata来判断contentType
        processData: false, //同上
        success: function(res) {
          let { code, imgURL } = { ...res };
          if (code == 200) {
            insert(imgURL);
          }
        }
      });
    };

    // 修改文章 接收文章id
    let articleId = this.$route.params.articleId;
    if (articleId != undefined) {
      this.editBtnIsShow = true;
      Http.get(`api/article/findArticleByIdForEdit?id=${articleId}`).then(
        res => {
          let { articlelabelArr, article } = res.data;
          this.tags = articlelabelArr;
          this.articleContent = article.articleContent;
          // 将文章内容设置到编辑器里
          editor.txt.html(article.articleContent);
          this.articleTitle = article.articleTitle;
        }
      );
    }
    
    editor.create(); //编辑器创建
  }
};
</script>

<style lang="less" scoped>
.publish-container {
  display: flex;
  justify-content: center;
  max-width: 1500px;
  margin: 0 auto;
  height: 100%;
  padding-top: 20px;
  .left {
    width: 68%;
    height: 100%;
    padding-right: 5px;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .title-input {
        width: 84%;
      }
    }
    .labels {
      .labels-input-wrap {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 40px;
        margin-top: 10px;
        .labels-input {
          margin-left: 12px;
          .tab-item {
            margin-right: 10px;
          }
          .tip {
            color: #b5adad;
          }
        }
      }
      .labels-checkebox {
        margin-top: 10px;
        & > * {
          padding-left: 5%;
        }
      }
    }
  }
  .right {
    width: 24%;
    // margin-right: 10%;
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
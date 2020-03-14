<template>
  <div class="publish-container">
    <div class="left">
      <div class="top">
        <span>标题:</span>
        <el-input class="title-input" v-model="editorTitle" placeholder="输入文章标题" />
        <el-button type="success">发布文章</el-button>
      </div>
      <div id="editor" ref="editor" style="background: white;"></div>
      <!-- <button v-on:click="getContent">查看内容</button> -->
      <div class="labels">
        <div class="labels-input-wrap">
          <span>标签:</span>
          <p class="labels-input">
            <el-tag
              type="success"
              effect="dark"
              v-for="tag in tags"
              :key="tag.labelName"
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
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane
                v-for="(x, y) in articleLabels"
                :key="y"
                :label="x.classifyName"
                :name="(y+1)+``"
              >
                <p>
                  <el-checkbox v-for="(i, j) in x.labelList" :key="j" :label="i.labelName" border
                  
                  style="margin-top:10px;margin-left:0;"
                  ></el-checkbox>
                </p>
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
export default {
  name: "",
  data() {
    return {
      editorContent: "",
      editorTitle: "",
      checkList: [],
      activeName: "1",
      tags: []
    };
  },
  components: { ZZWX },
  computed: {
    ...mapState({
      articleLabels: state => state.articleLabels
    })
  },
  created() {
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
    ...mapActions({
      setArticleLabels: "setArticleLabels"
    }),
    getContent: function() {
      alert(this.editorContent);
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    }
  },
  mounted() {
    var editor = new E(this.$refs.editor);
    editor.customConfig.onchange = html => {
      this.editorContent = html;
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
    editor.create();
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
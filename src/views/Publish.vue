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
          <el-input class="labels-input" readonly v-model="editorLabels" />
        </div>
        <div class="labels-checkebox">
          <el-checkbox-group v-model="checkList" :max="3">
            <el-checkbox label="复选框 A" border></el-checkbox>
            <el-checkbox label="复选框 B" border></el-checkbox>
            <el-checkbox label="复选框 C" border></el-checkbox>
            <el-checkbox label="禁用" border></el-checkbox>
            <el-checkbox label="选中且禁用" border></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="right">
        <ZZWX />
        <el-card><p>内容暂定</p></el-card>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
import ZZWX from "@/components/ZZWX";
export default {
  name: "",
  data() {
    return {
      editorContent: "",
      editorTitle: "",
      editorLabels: "",
      checkList: []
    };
  },
  components:{ZZWX},
  watch: {
    checkList(v) {
      this.editorLabels = v.join(",");
    }
  },
  methods: {
    getContent: function() {
      alert(this.editorContent);
    }
  },
  mounted() {
    var editor = new E(this.$refs.editor);
    editor.customConfig.onchange = html => {
      this.editorContent = html;
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
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        .labels-input {
          width: 95%;
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
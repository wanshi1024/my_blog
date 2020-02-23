<template>
  <div class="user-container">
    <div class="left">
      <el-tabs tab-position="left" type="card" @tab-click="tabClick" v-model="tabName">
        <el-tab-pane label="我的文章" name="0">
          <MyArticle />
        </el-tab-pane>
        <el-tab-pane label="我的收藏" name="1">
          <ArticleList />
        </el-tab-pane>
        <el-tab-pane label="我的回复" name="2">
           <MyReply />
        </el-tab-pane>
        <el-tab-pane label="别人回复" name="3">
            <OthersReply />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="right">
        <ZZWX /> <HotLabel />
    </div>
  </div>
</template>

<script>
import MyArticle from "@/components/user/MyArticle";
import ArticleList from "@/components/article/ArticleList";
import OthersReply from '@/components/user/OthersReply';
import MyReply from '@/components/user/MyReply';
import ZZWX from "@/components/ZZWX";
import HotLabel from "@/components/HotLabel";

export default {
  name: "",
  data() {
    return { tabName: "2" };
  },
  components: { MyArticle, ArticleList,OthersReply,MyReply,ZZWX,HotLabel },
  methods: {
    tabClick(tab) {
      console.log(tab.index);
    }
  }
};
</script>

<style lang="less" scoped>
.user-container {
  display: flex;
  justify-content: space-between;
  max-width: 1500px;
  margin: 0 auto;
  height: 100%;
  //   background: white;
  padding-top: 20px;
  .left {
    width: 68%;
    height: 100%;
    // background: white;
  }
  .right {
    width: 24%;
    margin-right: 10%;
    // background: pink;
  }
}
</style>
<template>
  <div class="user-container">
    <div class="left">
      <el-tabs tab-position="left" type="card" @tab-click="tabClick" v-model="tabName">
        <el-tab-pane label="我的文章" name="1">
          <MyArticle />
        </el-tab-pane>
        <el-tab-pane label="我的收藏" name="2">
          <MyCollection />
        </el-tab-pane>
        <el-tab-pane label="我的回复" name="3">
           <MyReply />
        </el-tab-pane>
        <el-tab-pane label="别人回复" name="4">
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
import MyCollection from "@/components/user/MyCollection";
import OthersReply from '@/components/user/OthersReply';
import MyReply from '@/components/user/MyReply';
import ZZWX from "@/components/ZZWX";
import HotLabel from "@/components/HotLabel";

export default {
  name: "",
  data() {
    return { tabName: "1" };
  },
  components: { MyArticle, MyCollection,OthersReply,MyReply,ZZWX,HotLabel },
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
  @media only screen and (max-width: 750px){
    .right{
      display: none
    }
    .left{
      width: 100%;
    }
    
  }
}
</style>
<template>
  <el-card class="hot-label-container">
    <h4>热门标签</h4>
    <div class="labels">
      <ArticleLabel v-for="(item,index) in 10"  :key="index"/>
    </div>
  </el-card>
</template>

<script>
import ArticleLabel from '@/components/article/ArticleLabel'
export default {
  name: "",
  data() {
    return {};
  },
  components:{
      ArticleLabel 
  }
};
</script>

<style lang="less" scoped>
.hot-label-container {
  h4 {
    font-size: 18px;
    font-weight: normal;
  }
  .labels { 
      margin-top: 10px;
    a {
      text-decoration-line: none;
      cursor: pointer;
      display: inline-block;
      height: 20px;
      line-height: 20px;
      padding: 2px 5px;
      background-color: #99cfff;
      font-size: 12px;
      color: #fff;
      border-radius: 4px;
      margin: 4px;
    }
    a:hover {
      background-color: #339dff;
      color: #fff;
    }
  }
}
</style>
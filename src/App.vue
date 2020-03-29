<template>
  <div id="app">
    <Header />
    <router-view />
    <el-backtop :bottom="100">
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >
        <i class="el-icon-top"></i>
      </div>
    </el-backtop>
  </div>
</template>
<script>
import Header from "@/views/Header";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  components: {
    Header
  },
  created() {},
  computed: {
    ...mapState({
      articleLabels: state => state.articleLabels
    })
  },
  methods: {}
};
</script>
<style lang="less" scope>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
html,
body {
  // background: #f2f2f2;
  height: 100%;
  padding-bottom: 5%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // height: 100%;
}
.w-e-text-container {
  height: 40vh !important;
}
</style>

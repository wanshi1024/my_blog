<template>
  <div class="notice">
    <i class="el-icon-s-opportunity"></i>
    <span>公告:</span>
    <p>欢迎来到我的博客</p>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.notice {
  // width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background: #fff;
  font-size: 16px;
  color: #666666;
  line-height: 50px;
  padding-left: 40px;
  & > * {
    display: inline-block;
  }

  i {
    color: #1e9fff;
    padding-right: 10px;
  }
  p {
    padding-left: 10px;
  }
}
</style>
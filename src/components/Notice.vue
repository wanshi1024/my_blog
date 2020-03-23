<template>
  <div class="notice">
    <i class="el-icon-s-opportunity"></i>
    <span>公 告 :</span>
    <p>欢迎来到我的博客,您有3条回复未处理哦哥哥GV看吧看吧看v </p>
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
  span {
    font-weight: bold;
  }
  i {
    color: #1e9fff;
    padding-right: 10px;
  }
  p {
    padding-left: 10px;
    letter-spacing: 2px;
    overflow: hidden;
  }
}
@media only screen and (max-width: 750px) {
  .notice {
    padding-left: 0;
    display: flex;
    align-items:center;
    p{
      width: 18em;
      padding-left: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    i{
      padding-left: 2px;
    }
  }
}
</style>
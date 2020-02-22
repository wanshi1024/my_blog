<template>
  <el-card class="related-container">
    <h4>相关文章</h4>
    <ul class="article-list">
      <li>
        <a>MySQL 5.6不再支持Flyway社区版是怎么回事?</a>
      </li>
       <li>
        <a>MySQL 5.6不再支持Flyway社区版是怎么回事?</a>
      </li>
       <li>
        <a>MySQL 5.6不再支持Flyway社区版是怎么回事?</a>
      </li>
       <li>
        <a>MySQL 5.6不再支持Flyway社区版是怎么回事?</a>
      </li>
       <li>
        <a>MySQL 5.6不再支持Flyway社区版是怎么回事?</a>
      </li>
    </ul>
  </el-card>
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
.related-container {
  h4 {
    font-size: 18px;
    font-weight: normal;
  }
  .article-list {
    margin-top: 10px;
    li {
        padding: 4px 0;
      a {
        color: #6795b5;
        cursor: pointer;
        font-size: 14px
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
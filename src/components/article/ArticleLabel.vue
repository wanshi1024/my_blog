<template>
  <a >{{name}}</a>
</template>

<script>
export default {
  props:["name"],
  data() {
    return {};
  },
  methods:{
   
  }
};
</script>

<style lang="less" scoped>
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

</style>
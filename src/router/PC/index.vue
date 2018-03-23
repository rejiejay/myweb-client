<template>
  <div class="PC">
    <h1>暂未开发手机端, 敬请期待</h1>
    <div v-on:click="jumpToMobile" >
    <a>> 点我跳转到移动端</a>
      <!-- <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button> -->
    </div>
  </div>
</template>

<script>

// import Vue from 'vue';
// import { Button } from 'element-ui';
// import 'element-ui/lib/theme-chalk/button.css';

// Vue.use(Button);

export default {
  name: 'PC',
  components: {  },
  methods: {
    jumpToMobile() {
      this.$router.push({ path: '/Mobile' })
    }
  }
}

</script>

<style scoped lang="less">
.PC {
  padding: 25px;

  a {
    color: blue;
    text-decoration: underline;
  }
}
</style>

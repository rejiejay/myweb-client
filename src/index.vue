<template>
  <router-view/>
</template>

<script>

export default {
  name: 'Index',
  mounted: function () {
		this.$store.dispatch('verifyLogIn');
  }
}

</script>

<style lang="less">
// vux 初始化样式
@import '~vux/src/styles/reset.less';

</style>

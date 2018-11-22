<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
    // 获取地址栏中授权ID存入session;
  created(){
    let URLparam = this.$utils.getUrlParam();
    if(URLparam.member_token){
      sessionStorage.setItem("member_token",URLparam.member_token)
    }
  },
}
</script>

<style lang="less">

</style>

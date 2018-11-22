<template>
    <div style="height:100%">
        <div class="header">
            <mt-navbar v-model="selected">
                <mt-tab-item id="offenBuy">常购记录</mt-tab-item>
                <mt-tab-item id="meConcern">关注</mt-tab-item>
            </mt-navbar>
        </div>
        <div class="main">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </div>
        
    </div>
</template>
<script>
export default {
  data() {
    return {
      selected: "offenBuy"
    };
  },
   watch:{
    selected(curVal,oldVal){
        
        if(curVal=="offenBuy"){
            this.$router.push("/concern/offenBuy")
        }else if(curVal=="meConcern"){
            this.$router.push("/concern/meConcern")
        }
      
    }
   }
};
</script>
<style lang="less" scoped>
.header{
    height: 7.8%;
    .mint-tab-item-label{
        font-size: 18px;
    }
}
.main{
    height: 92%;
}
    
</style>



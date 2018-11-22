<template>
  <div class="box">
    <div class="container" :class="{isAll:!hasTabbar}">
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <mt-tabbar v-if="hasTabbar"  v-model="selected">
      <mt-tab-item id="home">
        <div class="iconfont" :class="[this.choiceGroup.home ?'icon-shouyexuanzhong':'icon-shouyeweixuanzhong']"></div>
        首页
      </mt-tab-item>
      <mt-tab-item id="search">
        <div class="iconfont" :class="[this.choiceGroup.search ?'icon-fenleixuanzhong':'icon-fenleiweixuanzhong']"></div>
        分类
      </mt-tab-item>
      <mt-tab-item id="concern">
        <div class="iconfont" :class="this.choiceGroup.concern ?'icon-guanzhuxuanzhong':'icon-guanzhuweixuanzhong'"></div>
        关注
      </mt-tab-item>
      <mt-tab-item id="car">
        <div class="iconfont" :class="this.choiceGroup.car ?'icon-gouwuchexuanzhong':'icon-gouwucheweixuanzhong'"></div>
        购物车<span v-if="buycarNumb" class="redPoint">{{buycarNumb}}</span>
      </mt-tab-item>
       <mt-tab-item id="me">
        <div class="iconfont" :class="this.choiceGroup.me ?'icon-wodexuanzhong':'icon-wodeweixuanzhong'"></div>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { mapActions ,mapGetters } from "vuex";
export default {
  name: 'Box',
  components: {
    
  },
  data () {
    return {
      // tabBar选中项
      selected:"home",
      isShopMan:true,//是否不是业务员 true为不是
      // 底部字体图标展示库
      choiceGroup:{
        home:true,
        search:false,
        concern:false,
        car:false,
        me:false
      },
      tabBar:["home","search","concern","car","me"]
    }
  },
  methods:{
    ...mapActions(["saveCustomerType", "saveCustomerTypes","getCarNumb"]),
  },
  beforeCreate () {
   
  },
  computed: {
    ...mapGetters(["buycarNumb","showTabbar"]),
     routerName(){
      return (this.$route.path=="/"?"/home":this.$route.path).split("/")[1]
    },
    hasTabbar(){
      if(this.isShopMan){
        return this.showTabbar
      }else{
        return false;
      }
    }
  },
  watch:{
    selected(curVal,oldVal){
      this.choiceGroup[curVal]=true;
      this.choiceGroup[oldVal]=false;
        if(curVal=="search"){
          this.$utils.goUrl("/search","#/buyer/buy")
        }else if(curVal=="car"){
          this.$utils.goUrl("/car","#/buyer/car")
        }else{
          if(this.tabBar.indexOf(curVal)>-1){
            this.$router.replace(`/${curVal}`)
          }
        }
        
    },
    routerName(curVal,oldVal){
      if(this.tabBar.indexOf(curVal)>-1){
        this.selected=curVal;
      }
    }
  },

  created(){
  // 授权后的路由跳转，参数名是hashName
    let URLparam  = this.$utils.getUrlParam();
    if(URLparam.hashName){
      this.$router.replace(URLparam.hashName)
    }
    // 避免不进首页
    this.$http
      .getIndexData()
      .then(res => {
        // 保存店铺类型状态
        this.saveCustomerType(res.data.customer_type);
        // this.saveCustomerTypes(res.data.customer_types);
      })
      .catch(error => {});
    this.$http
      .getAllShopLists()
      .then(res => {
        // 保存店铺类型状态
        this.saveCustomerTypes(res.data.data);
      })
      .catch(error => {});
    this.$http
      .getRole()
      .then(res => {
       if(res.data.state!=3){
         this.isShopMan=false;
       }
        
      })
      .catch(error => {});
      
  },
  mounted() {
    let routerName = (this.$route.path=="/"?"/index":this.$route.path).split("/")[1]
    if(this.tabBar.indexOf(routerName)>-1){
      this.selected=routerName;
    }
    this.getCarNumb()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 .box{
   height: 100%;
   .container{
    //  height: cale(100% - 50px);
    height: 92%;
    &.isAll{
      height: 100%;
    }
   }
   .mint-tabbar{
     height: 50px;
     z-index: 5;
   }
   
   .mint-tab-item{
      position: relative;
     color: #a0a0a0;
     padding: 0.8rem 0;
     background: #fff;
      padding: 0.4rem 0;
     &.is-selected{
       color:#FF7146;
      //  color:#FF7146;
      // background: -webkit-linear-gradient(bottom right ,  #fc501d ,#fe8c6b);
      // -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
     }
    .mint-tab-item-label{
      font-size: 1.6rem;
     
      .redPoint{
        position: absolute;
        color: #fff;
        height: 14px;
        width: 14px;
        border-radius: 8px;
        background-color: #f00;
        right: 1.2rem;
        top: 0.2rem;
      }
    }
    .iconfont{
      font-size: 1.6rem;
    }
   }
 }

  
</style>
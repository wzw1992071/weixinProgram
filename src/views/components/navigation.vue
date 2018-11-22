
import { create } from 'domain';
<template>
    <div>
        <transition name="fade">
            <div class="navigationBox" :class="{open:openState}">
                <div class="navBtn" @click="openState=false" v-if="openState"><span class="iconfont icon-shuangjiantouxiangyou"></span>收起</div>
                <div class="navBtn" @click="openState=true" v-else><span class="iconfont icon-shuangjiantouxiangzuo"></span>导航</div>
                <div class="navigation" >
                    <div @click="$utils.goRouter('/',$router)">
                        <div class="iconfont icon-shouyeweixuanzhong"></div>
                        <div>首页</div>
                    </div>
                    <div @click="$utils.goUrl(`${newUrl('/order')}`)">
                        <div class="iconfont icon-dingdan"></div>
                        <div>订单</div>
                    </div>
                    <div @click="$utils.goRouter('concern',$router)">
                        <div class="iconfont icon-xinxing"></div>
                        <div>常购</div>
                    </div>
                    <div class="buyCar"  @click="$utils.goUrl(`${newUrl('/car')}`)">
                        <div class="iconfont icon-gouwucheweixuanzhong"></div>
                        <div >购物车</div>
                        <span v-if="buycarNumb" class="red">{{buycarNumb}}</span>
                    </div>
                    <div @click="$utils.goRouter('me',$router)">
                        <div class="iconfont icon-wodeweixuanzhong"></div>
                        <div>我的</div>
                    </div>
                    <div>
                        <div class="iconfont icon-zixun"></div>
                        <div>反馈</div>
                    </div>
                    <div>
                        <div class="iconfont icon-shuben"></div>
                        <div>帮助</div>
                    </div>
                </div>
                
            </div>
        </transition>
        
        <div v-if="openState" class="shadow"></div>
    </div>
    
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Navigation",
  data() {
    return {
      openState: false
    };
  },
  computed: {
    ...mapGetters(["buycarNumb"])
  },
  methods:{
    newUrl(url){
      return location.origin+url
    },
    goRouter(url){
      location.href=url
    }
  },
  created(){
  }
};
</script>


<style lang="less" scoped>
.iconfont {
  width: 16px;
  font-size: 12px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.navigationBox {
  display: flex;
  position: fixed;
  color: #666;
  bottom: 25%;
  z-index: 2000;
  right:-200px;
  transition:right 0.8s;
  &.open{
    right:0px;
    
  }
  .navigation {
    width: 200px;
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    border-radius: 3px;
    div {
      width: 44px;
      text-align: center;
      margin: 4px 2px;
      font-size: 12px;
      div {
        width: 100%;
      }
    }
  }
  .navBtn{
      color: #fff;
      background: #303030;
      height: 30px;
      line-height: 30px;
      border-radius: 3px;
      font-size: 12px;
      padding:3px 5px;
      margin-top: 30px
  }
  .buyCar{
    position: relative;
    span{
      position: absolute;
      border: 1px solid #f00;
      display: inline-block;
      transform:scale(0.8);
      text-align: center;
      width:16px;
      height: 16px;
      line-height: 16px;
      border-radius: 9px;
      right: -1px;
      top:-1px;
    }
  }
}
.shadow {
  position: fixed;
  background: rgba(0, 0, 0, 0.1);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1999;
}
</style>

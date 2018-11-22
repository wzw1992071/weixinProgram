// 收货地址列表
<template>
    <div  class="box">
        <ul>
            <li v-for="(item,index) in userInfo.shipping_addresses" :key="index">
                <div>
                    <p>{{item.receiver}} {{item.mobile}}</p>
                    <p><span class="red" v-if="item.default">(默认)</span>{{item.shipping_address}}</p>
                </div>
                <div @click="$utils.goRouter('editAdress',$router,{index:index})">编辑</div>
            </li>
        </ul>
        <div class="addOne" @click="$utils.goRouter('editAdress',$router)">添加地址</div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data(){
    return {
      
    }
  },
  computed:{
    ...mapGetters(["userInfo"]),
  },
  methods:{
    ...mapActions(["saveUserInfo"]),
    
  },
  mounted(){
    if (Object.keys(this.userInfo).length==0) {
      this.$http
        .getUserInfo()
        .then(res => {
          this.saveUserInfo(res.data);
        })
        .catch(error => {});
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f5;
  z-index: 10;
  .addOne {
    text-align: center;
    background-color: #f60;
    color: #fff;
    width: 100%;
    font-size: 1.2rem;
    height: 3rem;
    line-height: 3rem;
    position: absolute;
    bottom: 0;
  }
  ul {
    padding: 0.5rem 5%;
    li {
      padding: 0.8rem 0;
      display: flex;
      justify-content: space-between;
      font-size: 1rem;
       border-bottom: 1px solid #ccc;
      div {
       font-weight: 350;
       
        p {
          width: 18rem;
          font-size: 1rem;
          margin-bottom: 0.4rem;
          font-weight: 350;
          span{
            
            margin-right: 0.6rem;
          }
        }

        &:nth-of-type(1) {
        }
        &:nth-of-type(2) {
        }
      }
    }
  }
}
</style>



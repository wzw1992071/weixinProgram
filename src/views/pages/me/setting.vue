<template>
    <div  class="box">
        <div class="oneGroup">
            <div class="firstLine" v-cloak>
                <img :src="userInfo.wechat_avatar" alt="">
                <div>{{userInfo.shop_name}}</div>
            </div>
            <div class="oneLine"  @click="$utils.goRouter('adressList',$router)">
                <div class="text">我的收货地址</div>
                <p></p>
                <span>></span>
            </div>
        </div>
         
        <div class="oneGroup">
            <div class="oneLine"  @click="changePhone">
                <div class="text">手机号</div>
                <p v-cloak>{{phoneNumb}}</p>
                <span>></span>
            </div>
            <div class="oneLine" @click="pickerShow=!pickerShow">
                <div class="text">店铺类型</div>
                <p v-cloak>{{shop_type}}</p>
                <span>></span>
            </div>
            <div class="oneLine" @click="contactShop">
                <div class="text">联系我们</div>
                <p v-cloak>{{myPhone}}</p>
                <span class="iconfont icon-iconfontdianhua3"></span>
            </div>
        </div>
        
          <!-- <mt-popup
            v-model="changePhone"
            :closeOnClickModal=false
            position="bottom"
            >
            <div class="title">修改电话</div>
            <div class="changeContant">
                <div>电话号：</div>
                <input type="text">
            </div>
            <div class="btnGroup">
             <span>确定</span>
             <span>取消</span>
            </div>
          
        </mt-popup> -->
       <NewPicker
        v-if="pickerShow"
        :togglePicker="pickerShow"
        :pickDatas="customer_types"
        :initDataID="customer_type"
        @commitData="commitData"
       ></NewPicker>
    </div>
</template>

<script>
import NewPicker from "../../components/newPicker";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      pickerShow: false, //是否显示修改店铺类型模块
      myPhone:""
    };
  },
  computed: {
    ...mapGetters(["fileBaseUrl", "customer_types", "userInfo","customer_type"]),
    phoneNumb() {
      return this.userInfo.mobile;
    },
    shop_type() {
      return this.userInfo.shop_type;
    }
  },
  components: {
    NewPicker
  },
  methods: {
    ...mapActions(["saveUserInfo", "saveCustomerType", "saveCustomerTypes"]),
    // 修改电话
    changePhone(){
      this.$messagebox.prompt('请输入电话',"").then(({ value, action }) => {
        console.log(value)
         let isPhone =  /^0?1[3|4|5|8|9][0-9]\d{8}$/;
        if(isPhone.test(value)){
          this.$http
          .changePhone({tel:value}).then((res=>{
              this.$toast("修改电话成功！")
              this.getPageData();
          })).catch();
        }else{
          this.$toast("请输入正确的电话号！")
        }
      });
    },
    // 修改店铺类型
    commitData(data){
      this.pickerShow=false;
      // console.log(data.data[0].id)
      if(data.type){
        this.$http
        .changeShopType({type:data.data.id}).then((res=>{
              this.$toast("修改店铺类型成功！")
              this.getPageData();
          })).catch();
      }
    },
    // 联系店铺
    contactShop() {
      this.$http
        .contactShop()
        .then(res => {
          location.href = "tel:" + res.data.mobile;
        })
        .catch();
    },
    
    // 重新获取个人信息
    getPageData(){
      this.$http
        .getUserInfo()
        .then(res => {
          this.saveUserInfo(res.data);
        })
        .catch(error => {});
    }

  },
  mounted() {
    // this.pickSlots=this.customer_types;this.$http
    if (Object.keys(this.userInfo).length==0) {
      this.getPageData();
    }
     this.$http
        .contactShop()
        .then(res => {
          // location.href = "tel:" + res.data.mobile;
          this.myPhone=res.data.mobile;
        })
        .catch();
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
  .oneGroup {
    background: #fff;
    margin-bottom: 1.2rem;
    .oneLine {
      padding: 0.4rem 5%;
      display: flex;
      justify-content: space-between;
      height: 2.4rem;
      line-height: 2.4rem;
      font-size: 1rem;
      border-bottom: 1px solid #ccc;
      & > div {
        font-size: 1rem;
        width: 30%;
      }
      & > p {
        font-size: 1rem;
        width: 55%;
        border: 0;
      }
      & > span {
        width: 5%;
      }
    }
    .firstLine{
      height: 4rem;
      display: flex;
      padding: 0.6rem 5%;
      border-bottom: 1px solid #ccc;
      img{
        width: 4rem;
      }
      div{
        height: 4rem;
        line-height: 4rem;
        margin-left: 1rem;
      }
    }
  }
  .mint-popup {
    width: 100%;
    padding: 0.8rem;
    .title {
      margin: 0 5%;
      padding-bottom: 1rem;
      text-align: center;
      border-bottom: 1px solid #eee;
      font-size: 1.2rem;
    }
    .changeContant {
      padding: 0 5%;
      display: flex;
      font-size: 1.2rem;
      line-height: 2rem;
      margin: 1rem 0;
      color: #666;
      input {
        line-height: 2rem;
        font-size: 1.2rem;
        border: 1px solid #aaa;
        border-radius: 0.4rem;
        padding: 0.1rem 0.5rem;
        color: #666;
      }
    }
    .btnGroup {
      padding: 0 5%;
      text-align: center;

      span {
        display: inline-block;
        padding: 0.4rem 2rem;
        color: #fff;
        background: #4fb0f7;
      }
    }
  }
  
}
</style>


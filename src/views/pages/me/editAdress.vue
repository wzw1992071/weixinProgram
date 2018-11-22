// 修改收货地址
<template>
    <div  class="box">
        <div class="infoForm">
            <div>
                <div class="infoName">店铺名称:</div>
                <input type="text" v-model="receiver">
            </div>
            <div>
                <div class="infoName">手机号:</div>
                <input type="text" v-model="mobile">
            </div>
            <div @click="togglePicker=!togglePicker">
                <div class="infoName">地区:</div>
                <div>{{area.provinceName}} - {{area.cityName}} - {{area.countyName}}</div>
            </div>
            <div>
                <div class="infoName">详细地址:</div>
                <input type="text" v-model="address">
            </div>
            <div id="switch">
                <div class="infoName heighter">默认地址:</div>
                <mt-switch  v-model="isDefault"></mt-switch>
            </div> 
        </div>
        <div class="red delete" v-if="addressIndex>=0" @click="delAddress">
            删除收货地址
        </div>
        <div class="save" @click="saveAdress">保存</div>
        <AreaPick
            v-if="togglePicker"
            :togglePicker="togglePicker"
            :area="area"
            @commitData="closePicker"
        ></AreaPick>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AreaPick from "../../components/areaPick";
export default {
  data() {
    return {
      togglePicker: false, //是否显示省市县3级联动模块
      address: "", //详细地址
      mobile: "", //电话
      receiver: "", //店铺名
      addressIndex: -1, //本地址在地址列表序号
      isDefault: false, //本地址是否为默认地址
      area: {
        province_id: "",
        city_id: "",
        county_id: "",
        provinceName: "",
        cityName: "",
        countyName: ""
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  components: {
    AreaPick
  },
  methods: {
    ...mapActions(["saveUserInfo"]),
    // 数据填充
    getInfo() {
      if (this.addressIndex >= 0) {
        this.address = this.userInfo.shipping_addresses[
          this.addressIndex
        ].shipping_address;
        this.mobile = this.userInfo.shipping_addresses[
          this.addressIndex
        ].mobile;
        this.receiver = this.userInfo.shipping_addresses[
          this.addressIndex
        ].receiver;
        this.isDefault = this.userInfo.shipping_addresses[
          this.addressIndex
        ].default;
        this.area.province_id = this.userInfo.shipping_addresses[
          this.addressIndex
        ].province_id;
        this.area.provinceName = this.userInfo.shipping_addresses[
          this.addressIndex
        ].province;
        this.area.city_id = this.userInfo.shipping_addresses[
          this.addressIndex
        ].city_id;
        this.area.cityName = this.userInfo.shipping_addresses[
          this.addressIndex
        ].city;
        this.area.county_id = this.userInfo.shipping_addresses[
          this.addressIndex
        ].county_id;
        this.area.countyName = this.userInfo.shipping_addresses[
          this.addressIndex
        ].county;
      }
    },
    // 保存地址
    saveAdress() {
      if (!this.address) {
        return false;
      }
      if (!this.mobile) {
        return false;
      }
      if (!this.receiver) {
        return false;
      }
      if (this.area.province_id && this.area.city_id && this.area.county_id) {
      } else {
        return false;
      }
      let sendParam={
        receiver:this.receiver,
        mobile:this.mobile,
        address:this.address,
        is_default:this.isDefault,
        province_id:this.area.province_id,
        city_id:this.area.city_id,
        county_id:this.area.county_id,
      }
      if (this.addressIndex >= 0) {
        //   原有数据修改
        sendParam.id=this.userInfo.shipping_addresses[this.addressIndex].address_id
        this.$http.updateAddress(sendParam).then(res=>{
            this.$toast("修改成功")
            this.reGetInfo();
            this.$router.go(-1);
        });
      } else {
        //   新数据新增
         this.$http.AddAddress(sendParam).then(res=>{
             this.$toast("添加成功")
            this.reGetInfo();
            this.$router.go(-1);
        });

      }
     
    },
    // 删除地址
    delAddress() {
      this.$messagebox({
        title: "提示",
        message: "确定执行此操作?",
        showCancelButton: true
      }).then(action => {
        this.$http
          .delAddress({
            id: this.userInfo.shipping_addresses[this.addressIndex].address_id
          })
          .then(res => {
            this.reGetInfo();
            this.$router.go(-1);
          })
          .catch();
      });
    },
    // 重新拉取数据存在仓库
    reGetInfo() {
      this.$http
        .getUserInfo()
        .then(res => {
          this.saveUserInfo(res.data);
        })
        .catch(error => {});
    },
    // 关闭选择框
    closePicker(data) {
      if (data.type) {
        this.area = {
          province_id: data.data.province.id,
          city_id: data.data.city.id,
          county_id: data.data.county.id,
          provinceName: data.data.province.name,
          cityName: data.data.city.name,
          countyName: data.data.county.name
        };
      }

      this.togglePicker = false;
    }
  },
  mounted() {
    this.addressIndex = this.$route.query.index;
    if (Object.keys(this.userInfo).length == 0) {
      this.$http
        .getUserInfo()
        .then(res => {
          this.saveUserInfo(res.data);
          this.getInfo();
        })
        .catch(error => {});
    } else {
      this.getInfo();
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
  .save {
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
  .infoForm {
    & > div {
      margin: 0rem 5%;
      padding: 1rem 0;
      display: flex;
      border-bottom: 1px solid #ccc;
      .infoName {
        width: 25%;
        &.heighter {
          line-height: 32px;
        }
      }
      input {
        width: 75%;
        border: 0;
        background: #f5f5f5;
      }
    }
    input {
      font-size: 1rem;
    }
  }
  .delete {
    padding: 1rem 5%;
  }
  .mint-msgbox {
    .mint-msgbox-cancel {
      width: 49.9%;
    }
  }
  

}
</style>
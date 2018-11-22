<template>
    <div class="componentsBox">
        <div class="addCar">
            <div class="title">
                加入进货单
            </div>
            <div class="goods" v-if="goodsInfo">
                <div class="goodImg" >   
                    <img :src="fileBaseUrl+goodsInfo.images[0].img_path" class="avatar" alt="">
                </div>
                <div class="goodText">
                    <div class="goodsName">{{goodsInfo.title}}</div>
                </div>
            </div>
            <div class="option">
                请输入您要购买的数量
                <span class="opBtn" @click="changeNub(-1)">-</span>
                <input class="addNum" type="text" v-model="addNumber">
                <span class="opBtn" @click="changeNub(1)">+</span>
            </div>
        </div>
        <div class="btnGroup">
            <div class="cencal" @click="cencal">取消</div>
            <div class="sure" @click="sure">确定</div>
        </div>
    </div>
   
</template>
<script>
import {mapActions, mapGetters } from "vuex";
export default {
  name: "AddCar",
  data() {
    return {
      addNumber: 1
    };
  },
  props: ["goodsInfo"],
  computed: {
    ...mapGetters(["fileBaseUrl"])
  },
  methods: {
    ...mapActions(["changeShowTabbar","getCarNumb"]),
    changeNub(number) {
      this.addNumber += number;
      if (this.addNumber <= 0) this.addNumber = 1;
    },
    sure() {
      this.$http
        .addCar({
          buy_num: this.addNumber,
          sku_id: this.goodsInfo.sku_id
        })
        .then(res => {
          this.getCarNumb()
          this.$toast("添加成功");
          this.cencal();
        })
        .catch(err => {
          this.$toast("添加失败");
        });
    },
    cencal() {
      this.changeShowTabbar()
      this.$emit("closePop");
    }
  },
  created(){
    this.changeShowTabbar()
  }
};
</script>
<style lang="less" scoped>
.addCar {
  text-align: center;
  color: #5d5f6a;
  padding: 1rem 0.6rem 0;
  .title {
    padding-bottom: 1rem;
  }

    .goods {
      border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
      padding: 0.3rem 0;
      display: flex;
      height: 6rem;
      border-top: 1px solid #f5f5f5;
      .goodImg {
        width: 36%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goodText {
        text-align: left;
        padding: 0rem 0.6rem;
        width: 100%;
        .goodsName {
          height: 3rem;
          color: #000;
          font-weight: bolder;
          font-size: 1rem;
        }
      }
    
  }
  .option {
    margin: 2rem 0;
    text-align: center;
    .addNum {
      text-align: center;
      height: 1.6rem;
      line-height: 1.6rem;
      font-size: 1.5rem;
      width: 3rem;
      border: 0;
      border-bottom: 1px solid #ccc;
    }
    .opBtn {
      font-size: 24px;
      width: 1.6rem;
      height: 1.6rem;
      text-align: center;
      line-height: 1.4rem;
      border-radius: 0.8rem;
      display: inline-block;
      color: #fff;
      background-color: #f60;
      &:nth-of-type(1) {
        margin-left: 1rem;
      }
    }
  }
}
.btnGroup {
  text-align: center;
  display: flex;
  height: 3rem;
  line-height: 3rem;
  div {
    width: 50%;
    &.cencal {
      background: #f5f5f5;
      color: #5d5f6a;
    }
    &.sure {
      background: #f2582a;
      color: #fff;
    }
  }
}
</style>



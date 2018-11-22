// 传参示例/orderDetail?orderNum=123456
<template>
    <div class="box">
        <div class="goodList">
            <div class="orderNum" >订单编号: {{orderNum}}</div>
            <div class="copy"
                v-clipboard:copy="orderNum"
                v-clipboard:success="onCopy">
                复制编号</div>
        </div>
        <div >
            <div class="orderHead">
               <p>订单创建：   {{orderInfo.created_at}}</p>
            </div>
            <ul v-if="orderInfo.order_goods">
                <li v-for="(item,index) in orderInfo.order_goods">
                    <div class="goodsPic">
                      <img :src="item.goods_info.goods_picture[0]?(fileBaseUrl+item.goods_info.goods_picture[0].ypic_path):''" width="100%" alt="">
                    </div>
                    <div class="goodsInfo">
                        <p>{{item.goods_info.gname}}</p>
                        <!-- <span class="discount">满100减50</span> -->
                    </div>
                   
                    <div class="goodsPrice">
                        <p>￥{{item.goods_info.goods_price}}</p>
                        <p>x{{item.goods_info.buy_num}}</p>
                    </div>
                </li>
                <!-- <li>
                    <div class="goodsPic"></div>
                    <div class="goodsInfo">
                        <p>鲁班 净 重10kg</p>
                        <span class="discount">满100减50</span>
                    </div>
                   
                    <div class="goodsPrice">
                        <p>￥200.00</p>
                        <p>x5</p>
                    </div>
                </li> -->
            </ul>
            <div class="total">
                <p>共{{orderInfo.buy_count}}件商品</p>
                <!-- <p>优惠10元</p> -->
                <p>合计：<span class="orange">￥{{orderInfo.order_amount}}</span>元</p>
            </div>
        </div>
        <div>
            
            <p>支付方式：   {{orderInfo.paymentName}}</p>
            <p>收货方式：   {{orderInfo.deliveryName}}</p>
        </div>
        <div>
           <div class="iconfont icon-dizhi"></div>
           <div class="buyerInfo" v-if="orderInfo.consignee_info">
               <div><span>{{orderInfo.consignee_info.receiver}}</span><span class="phoneNum">{{orderInfo.consignee_info.mobile}}</span></div>
               <div>{{orderInfo.consignee_info.address}}</div>
           </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      orderNum: "",
      orderInfo: {}
    };
  },
  computed: {
    ...mapGetters(["fileBaseUrl"])
  },
  methods: {
    onCopy() {
      this.$toast("复制成功！");
    },
    getOrderInfo() {
      this.$http
        .getOrderInfo({ order_id: this.orderNum })
        .then(res => {
          this.orderInfo = res.data;
          // console.log(res.data)

          // 判断付款方式
          if (this.orderInfo.payment == 1) {
            this.orderInfo.paymentName = "货到付款";
          } else if (this.orderInfo.payment == 2) {
            this.orderInfo.paymentName = "微信支付";
          }
          if (this.orderInfo.delivery == 1) {
            this.orderInfo.deliveryName = "买家找车";
          } else if (this.orderInfo.delivery == 2) {
            this.orderInfo.deliveryName = "卖家找车";
          }
          this.orderInfo.consignee_info=JSON.parse(this.orderInfo.consignee_info)
          this.orderInfo.order_goods.forEach((item,index) => {
            // console.log(JSON.parse(item.goods_info))
            item.goods_info=JSON.parse(item.goods_info)
          });
          console.log(this.orderInfo)
          // console.log(this.orderInfo.order_goods[0].goods_info.goods_picture[0].ypic_path)
        })
        .catch(err => {});
    }
  },
  created() {
    this.orderNum = this.$utils.getUrlParam().orderNum;
    this.getOrderInfo();
    
  }
};
</script>
 <style lang="less" scoped>
.box {
  background: #f5f5f5;
  & > div {
    background: #fff;
    padding: 0 2% 3%;
    margin-bottom: 2%;
    &.goodList {
      padding-top: 2%;
      display: flex;
      justify-content: space-between;
      .orderNum {
        line-height: 2rem;
      }
      .copy {
        border: 1px solid #f60;
        padding: 0.2rem 0.6rem;
        border-radius: 1rem;
        color: #f60;
      }
    }
    &:nth-of-type(2) {
      padding-top: 2%;
      .orderHead {
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        padding: 1% 0 3%;
        p {
          font-size: 0.8rem;
          font-weight: 350;
          .iconfont {
            font-size: 0.8rem;
            color: #f60;
            margin-right: 0.2rem;
          }
        }
      }
      ul {
        li {
          height: 6rem;
          display: flex;
          border-bottom: 1px solid #eee;
          .goodsPic {
            width: 25%;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .goodsInfo {
            width: 50%;
            padding-left: 10px;
            p {
              font-weight: 350;
              font-size: 1rem;
              padding: 0.4rem 0;
              margin-bottom: 0.2rem;
            }
            .discount {
              border: 1px solid #f60;
              padding: 0.2rem 0.6rem;
              border-radius: 1rem;
              color: #f60;
            }
          }
          .goodsPrice {
            margin-top: 0.4rem;
            width: 25%;
            text-align: right;
            p {
              &:nth-of-type(1) {
                font-size: 1rem;
                font-weight: 350;
              }
              &:nth-of-type(2) {
                font-size: 0.8rem;
                color: #aaa;
              }
            }
          }
        }
      }
      .total {
        margin-top: 0.4rem;
        text-align: right;
        p {
          margin-bottom: 0.4rem;
          font-size: 0.8rem;
          font-weight: 350;
          .orange {
            font-weight: bolder;
            font-size: 1rem;
          }
        }
      }
    }
    &:nth-of-type(3) {
      padding-top: 0.4rem;
      padding-bottom: 0.2rem;
      p {
        font-weight: 350;
        font-size: 0.9rem;
        margin: 0.4rem 0;
      }
    }
    &:nth-of-type(4) {
      padding-top: 0.6rem;
      display: flex;
      .iconfont {
        font-size: 2rem;
        padding-top: 0.5rem;
        background: -webkit-linear-gradient(bottom right, #fc501d, #fe8c6b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-right: 1rem;
      }
      .buyerInfo {
        div {
          font-weight: 500;
          margin-bottom: 0.4rem;
          .phoneNum {
            font-size: 0.8rem;
            font-weight: 350;
            margin-left: 2rem;
          }
        }
      }
    }
  }
}
</style>
 

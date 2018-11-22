<template>
    <div class="box" ref="viewBox" v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
        <div class="searchBox" :class="{ transparent: searchStyle }">
            <div class="search">
                <div class="bgColor"></div>
                <span class="iconfont icon-sousuo"></span>
                <input type="text" placeholder="请输入商品名" @click="$utils.goUrl('/search','#/buyer/buy')">
            </div>
        </div>
        <div class="banner">
            <mt-swipe :auto="2000">
                <mt-swipe-item v-for="(item,index) in bannerList" :key="index" class="swpierMain">
                    <img :src="fileBaseUrl+item.img_path+'?r='+Math.random()" class="avatar" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="typeBox">
            <div class="shopTyPe" v-for="(item,index) in typeData" :key="index" >
                <!-- <div class="img" :class="getClass(index)" @click="changeType(item)">
                    <span class="iconfont" :class="item.icon"></span>
                </div> -->
                <div class="img"  @click="changeType(item)">
                  <!-- 本地测试 -->
                  <!-- <img :src="'/static/img/iconbg'+index+'.png'" alt="" width="100%"> -->
                  <!-- 线上 -->
                   <img :src="'Public/service-provider/vue/home/static/img/iconbg'+index+'.png'" alt="" width="100%">
                  <span class="iconfont" :class="item.icon"></span>
                </div>
                <div class="text">{{item.type_name}}</div>
            </div>
 
            
        </div>
        <div class="recommend">
            <div class="content">
      
                <div class="guessLike" @click="$utils.goRouter('guessLike',$router)">
                    <div>猜你喜欢</div>
                </div>
               
                <div class="shopRecommend" @click="$utils.goRouter('bossRecommend',$router)">
                    <div>热门推荐</div>
                </div>
            </div>
        </div>
        <div class="shopList">
            <div class="title">
                ──<span><label class="iconfont icon-huoyan"></label>热销商品</span>──
            </div>
                <ul >
                  <li class="goods" v-for="(item,index) in goodsList" :key="index" @click="$utils.goGoodUrl(item.sku_id)">
                      <div class="goodImg">   
                          <img :src="fileBaseUrl+item.images[0].img_path" class="avatar" alt="">
                      </div>
                      <div class="goodText">
                          <div class="goodsName">{{item.title}}</div>
                          <!-- <span class="discount">满50减5元</span> -->
                          <div class="price">
                              <div>￥<b>{{item.price}}</b>/{{item.unit}}</div>
                              <div>已售{{item.sales_volume}}</div>
                          </div>
                      </div>
                  </li>
              </ul>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      isloading: false,
      // 获取商品列表参数
      params: {
        page: 1,
        page_size: 10
      },
      // banner列表
      bannerList:[],
      // 店铺类型列表
      typeData: [],
      // 商品列表
      goodsList: [],
      searchStyle: false //搜索框是否不透明
    };
  },
  computed: {
    ...mapGetters(["fileBaseUrl"])
  },
  methods: {
    ...mapActions(["saveCustomerType", "saveCustomerTypes"]),
    //   下划刷新
    loadMore() {
      // this.params.page += 1;
      // this.getData();
    },
    // 滚动条事件
    handleScroll() {
      // let scrollTop = this.$refs.viewBox.scrollTop;
      // this.searchStyle = scrollTop > 180;
    },
    // 获取首页商品列表数据
    getData() {
      this.isloading = true;
      this.$http
        .getIndexData({
          hots:this.params
        })
        .then(res => {
          this.goodsList = this.goodsList.concat(res.data.lists);
          this.isloading = false;
        })
        .catch(error => {
          this.isloading = false;
        });
    },
    // 转换店铺类型重新获取数据
    changeType(type) {
      this.$router.push({
        path:"/typeRecommend",
        query:{
          name:type.type_name,
          shopType:type.id
        }
      })
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   if (this.$refs.viewBox) {
    //     this.$refs.viewBox.addEventListener("scroll", this.handleScroll);
    //   }
    // });
  },
  created() {
    this.$http
      .getIndexData()
      .then(res => {
        this.typeData=res.data.customer_types
        this.typeData.forEach((item, index) => {
          if (item.shopType == res.data.customer_type) {
            let a = this.typeData[index];
            this.typeData[index] = this.typeData[0];
            this.typeData[0] = a;
          }
        });
        // this.changeType(res.data.customer_type);
        this.goodsList=res.data.hots;

      })
      .catch(error => {});
      
      this.$http
      .getBanner().then(res=>{
        console.log(res)
        this.bannerList=res.data;
      }).catch(error => {});
  }
};
</script>

<style lang="less" scoped>
.box {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  position: relative;
  .banner {
    height: 10rem;
    .swpierMain {
      // background: #f60;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .searchBox {
    width: 100%;
    position: fixed;
    top: 0rem;
    z-index: 9999;
    display: flex;
    justify-content: space-around;
    .search {
      position: relative;
      padding: 0.8rem;
      height: 1.6rem;
      border-radius: 2rem;
      width: 90%;
      div {
        height: 1.8rem;
        background-color: #d6d4d4;
        opacity: 0.5;
        border-radius: 1rem;
      }
      span {
        top: 1.1rem;
        left: 1.2rem;
        color: #fff;
        position: absolute;
      }
      input {
        top: 1.1rem;
        margin-left: 2rem;
        width: 70%;
        position: absolute;
        background-color: transparent;
        border: transparent;

        &::-webkit-input-placeholder {
          /* WebKit browsers */
          color: #fff;
        }
      }
    }
    &.transparent {
      background-color: #fff;
      .search {
        span {
          color: #666;
        }
        input {
          &::-webkit-input-placeholder {
            /* WebKit browsers */
            color: #666;
          }
        }
      }
    }
  }
  .typeBox {
    margin-top: -0.7rem;
    width: 100%;
    position: relative;
    min-height: 12rem;
    background-image: url(../../../assets/img/bg1.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    .shopTyPe {
      width: 20%;
      // height: 5rem;
      margin: 5px 0;
      .text {
        font-size: 0.8rem;
        color: #333;
      }
      .img {
        padding: 8px 14px;
        position: relative;
        .iconfont{
          position: absolute;
          color: #fff;
          font-size: 30px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        
        // background-repeat: no-repeat;
        // background-position: center;
        // background-size: 60% 70%;
        // height: 4rem;
        // width: 100%;
        // .iconfont {
        //   color: #fff;
        //   line-height: 4rem;
        //   font-size: 2rem;
        // }
        
      }
    }
  }
  .recommend {
    // margin-top: 12rem;
    height: 6.4rem;
    background-color: #f5f5f5;
    padding: 0.5rem 0;
    .content {
      height: 6.4rem;
      background-color: #fff;
      display: flex;
      justify-content: space-around;
      & > div {
        height: 5.9rem;
        width: 49%;
        margin: 0.25rem 1.2%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        &.guessLike {
          background-image: url(../../../assets/img/cainixihuan.png);
        }
        &.shopRecommend {
          background-image: url(../../../assets/img/zhangguituijian.png);
        }
        & > div {
          color: #fff;
          margin-top: 0.2rem;
          margin-left: 0.4rem;
        }
      }
    }
  }
  .shopList {
    text-align: center;
    padding: 0.5rem 1%;
    .title {
      color: #666;
      margin-bottom: 0.4rem;
      span {
        padding: 0 1rem;
        label {
          color: #fa0f11;
        }
      }
    }
    .goods {
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
          height: 4rem;
          color: #000;
          font-weight: bolder;
          font-size: 1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
        .discount {
          display: inline-block;
          height: 1rem;
          line-height: 1rem;
          border: 1px solid #f60;
          color: #f60;
          padding: 0.1rem 0.2rem;
          border-radius: 0.6rem;
        }
        .price {
          display: flex;
          justify-content: space-between;
          height: 2rem;
          line-height: 2rem;
          font-size: 1.2rem;
          & > div {
            &:nth-of-type(1) {
              color: #f60;
            }
            &:nth-of-type(2) {
              color: #ccc;
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
}
</style>





<template>
    <div class="box"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <ul class="goodsList">
            <li v-for="(item,index) in goodsList" :key="index">
                <div>
                    <img :src="fileBaseUrl+item.images[0].img_path" alt="">
                </div>
                <div>
                    <div class="title"  @click="$utils.goGoodUrl(item.sku_id)">{{item.title}}</div>
                    <div class="red">￥{{item.price}}</b>/{{item.unit}}</div>
                </div>
                <div>
                    <div class="sellNub">已售：{{item.sales_volume}}件</div>
                   <div class="addbtn orange" @click="addGoodsCar(item)">
                        加入购物车
                    </div>
                </div>
            </li>
              <!-- <li>
                <div>
                    <img src="" alt="">
                </div>
                <div>
                    <div class="title">商品名称商品名称商品名称商品名称</div>
                    <div class="btn">￥231/件</div>
                </div>
                <div>
                    <div class="sellNub">已售：500件</div>
                    <div class="addbtn orange" >
                        加入购物车
                    </div>
                </div>
            </li> -->
            
        </ul>
          <div class="noGoodTip" v-if="goodsList.length==0&&pageInit">
              <div>暂无数据</div> 
              <div class="regetBtn" @click="getData(1)">请重新加载</div>
          </div>
        <mt-popup
            v-model="toggleAddCar"
            :closeOnClickModal=false
            position="bottom"
            >
            <AddCar
            v-if="toggleAddCar"
            :goodsInfo="AddgoodsInfo"
            @closePop="toggleAddCar=!toggleAddCar"
            ></AddCar>
        </mt-popup>
    </div>
</template>

<script>
import AddCar from "../../components/addCar";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      param: {
        page: 1,
        page_size: 10
      },
      goodsList: [],
      isEnd:false,//数据是否加载完全
      loading:false,//是否正在加载
      toggleAddCar:false,
      AddgoodsInfo:{},//加入购物车的商品信息
      pageInit:false
    };
  },
  components: {
    AddCar
  },
  computed: {
    ...mapGetters(["fileBaseUrl"])
  },
  methods:{
    loadMore() {
      if(this.isEnd) return false;
      if(this.goodsList.length==0) return false;
      this.param.page++;
      this.getData();
    },
    getData(flag=0) {
      this.loading = true;
      this.$http
        .getGuessLikeData(this.param)
        .then(res => {
          if(res.data.lists.length<10){
            this.isEnd=true;
          }
          if(flag){
            this.goodsList=res.data.lists
          }else{
            this.goodsList = this.goodsList.concat(res.data.lists);
          }
          this.loading = false;
          this.pageInit = true;
        })
        .catch(error => {
          this.loading = false;
        });
    },
    // 加入购物车
    addGoodsCar(item){
         this.toggleAddCar = true;
      this.AddgoodsInfo = item;
    }
  },
  created() {
       this.getData();
  },
};
</script>
<style lang="less" scoped>
.box {
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .goodsList {
    padding-top: 0.4rem;
    li {
      background-color: #f5f5f5;
      padding: 0rem 1%;
      margin-bottom: 0.6rem;
      display: flex;
      height: 7rem;
      font-size: 0.9rem;
      //   background-color: #fff;
      & > div {
        &:nth-of-type(1) {
          width: 25%;
          img{
            width: 100%;
            height: 90%;
            padding-top: 6%;
          }
        }
        &:nth-of-type(2) {
          padding: 0.4rem 1rem;
          width: 50%;
          font-weight: 350;
          color: #333;
          .title {
            height: 5rem;
          }
        }
        &:nth-of-type(3) {
          padding: 0.4rem 0;
          font-size: 0.8rem;
          width: 25%;
          .sellNub {
            font-weight: bolder;
            padding-top: 1.7rem;
            height: 3rem;
          }
          .addbtn {
            border: 1px solid #f60;
            padding: 0.1rem 0.4rem;
            border-radius: 1rem;
          }
        }
      }
    }
  }
  .mint-popup {
    width: 100%;
  }
  .noGoodTip {
    color: #aaa;
    text-align: center;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    .regetBtn {
      margin-top: 1rem;
      padding: 0.4rem 0.8rem;
      border: 1px solid #aaa;
    }
  }
}
</style>



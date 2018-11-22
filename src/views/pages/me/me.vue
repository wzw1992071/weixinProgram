// 我的页面
<template>
    <div class="box">
        <div class="head">
            <div class="headContant">
                <div class="headpic">
                    <img :src="pagedata.wechat_avatar" width="100%" alt="">
                </div>
                <div class="headText">
                    <p class="username">{{pagedata.shop_name}}</p>
                    <p > <span class="iconfont icon-leixing"></span> {{pagedata.shop_type}}</p>
                    <p > <span class="iconfont icon-phone"></span> {{pagedata.mobile}}</p>
                </div>
                <div class="" @click="$utils.goRouter('setting',$router)">设置</div>
            </div>
        </div>
        <div class="contant">
            <div class="orderBox">
                <div class="orderHead">
                    <div>我的订单</div>
                    <div @click="$utils.goUrl(`${newUrl('/order')}`)" >查看全部订单 ></div>
                </div>
                <div class="orderPic">
                    <div @click="$utils.goUrl(`${newUrl('/order?sta=1')}`)">
                        <div class="Badge orange" v-if="Badge.weifukuan">{{Badge.weifukuan}}</div>
                        <div class="iconfont icon-weifukuan">
                        </div>
                        <p>待付款</p>
                    </div>
                    <div @click="$utils.goUrl(`${newUrl('/order?sta=2')}`)">
                        <div class="Badge orange" v-if="Badge.daifahuo">{{Badge.daifahuo}}</div>
                        <div class="iconfont icon-daifahuo">
                        </div>
                        <p>待发货</p>
                    </div>
                    <div @click="$utils.goUrl(`${newUrl('/order?sta=3')}`)">
                        <div class="Badge orange" v-if="Badge.daishouhuo">{{Badge.daishouhuo}}</div>
                        <div class="iconfont icon-daishouhuo">
                        </div>
                        <p>待收货</p>
                    </div>
                    <!-- <div @click="$utils.goUrl('http://wovgzg.test.dongpin.me/order')">
                        <div class="Badge orange" v-if="Badge.tuihuotuikuan">{{Badge.tuihuotuikuan}}</div>
                        <div class="iconfont icon-tuihuotuikuan">
                        </div>
                        <p>退款退货</p>
                    </div> -->
                </div>
            </div>
            <div class="more">
                <div>
                    <div class="iconfont icon-bangzhuzhongxin">
                    </div>
                    <p>帮助中心</p>
                </div>
                <div>
                    <div class="iconfont icon-wentifankui"  @click="$utils.goUrl('http://wovgzg.test.dongpin.me/feedback.html')">
                    </div>
                    <p>问题反馈</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    data(){
        return {
            pagedata:{

            },
            
        }
    },
    computed: {
        ...mapGetters(["Badge"])
    },
    methods:{
        ...mapActions(["saveUserInfo"]),
        newUrl(url){
            return location.origin+url
        }
    },
    created(){
        this.$http
        .getUserInfo()
        .then(res => {
          this.saveUserInfo(res.data);
          this.pagedata=res.data;
        })
        .catch(error => {});
       
    }
}
</script>

<style lang="less" scoped>
.box{
    .head{
        height: 7rem;
        background: linear-gradient(top right, #fc501d,#fd7046);
        padding: 1.5rem 3% 0;
        .headContant{
            color: #fff;
            display: flex;
            justify-content: space-between;
            div:last-child{
                text-align: right;
                padding-right: 5%;
            }
            .headpic{
                width: 24%;
            }
            .headText{
                width: 50%;
                padding-left: 0.4rem;
                p{
                    font-size:0.8rem;
                    padding-bottom: 0.4rem;
                    &.username{
                        font-size: 1.4rem;
                        padding: 0rem 0 0.8rem;
                        font-weight:bolder; 
                    }
                }
            }
            
        } 
    }
    .contant{
        height:80%;
        background: #f5f5f5;
        position: relative;
        .orderBox{
            background: #fff;
            width: 90%;
            height: 7rem;
            position: absolute;
            left: 2%;
            top: -5%;
            border-radius:7px; 
            padding: 0 3%;
            .orderHead{
                padding: 3% 0;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                div{
                    &:nth-of-type(1){
                        font-weight: bolder;
                    }
                    &:nth-of-type(2){
                        font-size: 0.8rem;
                        color: #666;
                    }
                }
            }
            .orderPic{
                display:flex;
                justify-content: space-around;
                text-align: center;
                padding-top: 4%;
                &>div{
                    position: relative;
                    .Badge{
                        position: absolute;
                        right: -0.1rem;
                        top: -0.2rem;
                        border: 1px solid #f60;
                        background: #fff;
                        width: 1rem;
                        height: 1rem;
                        border-radius:1rem; 
                        text-align: center;
                        line-height: 1rem;
                        font-size: 0.6rem;
                    }
                }
                p{
                    font-size: 0.8rem;
                    font-weight: 350;
                }
                .iconfont{
                    font-size: 1.8rem; 
                    background: -webkit-linear-gradient(bottom right ,  #fc501d ,#fe8c6b);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
            
        }
        .more{
            background: #fff;
            width: 90%;
            height: 20%;
            position: absolute;
            left: 2%;
            top: 22%;
            border-radius:7px; 
            padding: 10% 3%;
            display: flex;
            justify-content: space-around;
            text-align: center;
            .iconfont{
                font-size: 4rem;
                &.icon-bangzhuzhongxin{
                    background: -webkit-linear-gradient(bottom right ,   #fdb903 ,#faed98);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                &.icon-wentifankui{
                    background: -webkit-linear-gradient(bottom right ,   #41aefb ,#abddfa);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
            p{
                font-size: 1rem;
                font-weight: 350;
            }
        }
    }
}
</style>



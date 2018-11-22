export default {
    SAVECUSTOMERTYPE:function(states,type){
        states.customer_type=type;
    } ,
    SAVECUSTOMERTYPES:function(states,types){
        states.customer_types=types;
    } ,
    SAVEUSERINFO:function(states,info){
        states.userInfo=info;
    },
    GETCARNUMB:function(states,data){
        states.buycarNumb=data.shop_cart;
        states.Badge.daifahuo= data.undelivered
        states.Badge.daishouhuo= data.delivering
    },
    CHANGESHOWTABBAR:function(states){
        states.showTabbar=!states.showTabbar;
    },
}
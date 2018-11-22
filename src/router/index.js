import Vue from "vue";
import Router from "vue-router";

const _import = file => () => import("@/views/" + file + ".vue");

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: "/",
      name: "Box",
      component: _import("index"),
      children: [
        // 首页路由
        {
          alias: "/",
          path: "/home",
          component: _import("pages/index/index"),
          meta: {
            keepAlive: true,
            title: '冻品商城'
          }
        },
        // 店铺类型推荐
        {
          path: "/typeRecommend",
          component: _import("pages/index/typeRecommend"),
          meta: {
            title: '掌柜推荐'
          }
        
        },
         // 猜你喜欢
        {
          path: "/guessLike",
          component: _import("pages/include/guessLike"),
          meta: {
            title: '猜你喜欢'
          }
        },
        // 热门推荐
        {
          path: "/bossRecommend",
          component: _import("pages/include/bossRecommend"),
          meta: {
            title: '热门推荐'
          }
        },
        // 我的
        {
          path: "/setting",
          component: _import("pages/me/setting"),
        },
        // 设置个人信息
        {
          path: "/me",
          component: _import("pages/me/me"),
          meta: {
            title: '个人信息'
          }
        },
        // 收货列表
        {
          path: "/adressList",
          component: _import("pages/me/adressList")
        },
         // 修改收货列表
         {
          path: "/editAdress",
          component: _import("pages/me/editAdress")
        },
        // 订单详情
        {
          path: "/orderDetail",
          component: _import("pages/orderDetail/orderDetail"),
          meta: {
            title: '订单详情'
          }
        },
        // 关注
        {
          path: "/concern",
          component: _import("pages/concern/concern"),
          children: [
            {
              alias: "/",
              path: "offenBuy",
              component: _import("pages/concern/offenBuy"),
              meta: {
                keepAlive: true,
                title: '我的关注'
              }
            },
            {
              path: "meConcern",
              component: _import("pages/concern/meConcern"),
              meta: {
                keepAlive: true
              }
            },
          ]
          
        },
       
        
        
      ]
    }
  ]
  
});

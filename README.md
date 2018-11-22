# my-vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

代理设置：
在/config/index.js  中dev下面proxyTable下的target 改为代理地址
在/src/views/index.vue  mounted里模拟登陆获取token
拿取线上数据操作
使用微信调试工具，打开线上接口，在session去去找PHPSESSID，并复制到/src/api/http.js 27行处数据
登陆页面在#前面加上唯一表示作为参数（在公众号地址栏去复制）
例：
http://localhost:8080/member_token=59bab95a79108ab2cd98ee1b5b188678#/


包括功能：首页，关注，我的以及订单详情页面
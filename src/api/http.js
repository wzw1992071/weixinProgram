// 引入饿了么UI组件库中的message和load
import {Toast  ,Indicator } from 'mint-ui'
import Axios from 'axios'

let BaseUrl = ""
if(process.env.NODE_ENV=='development'){
  BaseUrl = "/api2"
}else if((process.env.NODE_ENV=='production')){
  BaseUrl = ""
}

var axios = Axios.create({
  baseURL: BaseUrl,
  timeout: 30000,
  headers: {
  }
});

axios.defaults.withCredentials = true;

function setCookie(name, value) {
  var exp = new Date();
  exp.setTime(exp.getTime() + 2*60*1000);
  document.cookie = name + '='+ escape (value) + ';expires=' + exp.toGMTString();
}

setCookie('PHPSESSID', 'ah5ufvu80cmg136ephhs7ccj44');

var loadinginstace
//添加一个请求拦截器
axios.interceptors.request.use(function(config){
  //在请求发出之前进行一些操作
  // loadinginstace = Loading.service({ fullscreen: true })  
   // 发起请求前统一加用户认证码
  if(sessionStorage.getItem("member_token")){
    if(config.params){
      config.params.member_token=sessionStorage.getItem("member_token")
    }else{
      config.params={
        member_token:sessionStorage.getItem("member_token")
      }
    }
  }
 
  
  Indicator.open({
    text: '加载中..',
  });
  return config;
},function(err){
  //Do something with request error
    Indicator.close();
    Toast({
      message: '请求超时',
      position: 'bottom',
      duration: 1000
    });
  return Promise.reject(error);
});
//添加一个响应拦截器
axios.interceptors.response.use(function(res){
  //在这里对返回的数据进行处理
  Indicator.close();
  if(res.data.code > 0){
    Toast({
      message: `请求失败${res.data.message}`,
      position: 'bottom',
      duration: 1000
    });
    console.log(`请求失败:${res.data.message}`)
    return Promise.reject();
  }

  return res.data;
},function(err){
  //Do something with response error
    console.log(err)
    Indicator.close();
    Toast({
      message: '请求失败',
      position: 'bottom',
      duration: 1000
    });
  return Promise.reject(err);
})

export default axios
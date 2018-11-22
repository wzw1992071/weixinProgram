export default {
  goRouter(url, router, param = {}) {
    router.push({ path: url, query: param });
  },
  // 跳转外部链接
  goUrl(url, param = "") {
    let newUrl = "";
    newUrl =
      url.indexOf("?") > -1
        ? `${url}&member_token=${sessionStorage.getItem("member_token")}`
        : `${url}?member_token=${sessionStorage.getItem("member_token")}`;
    // console.log(newUrl)
    // console.log(newUrl+param)
    location.href = `${newUrl + param}`;
  },
  // 跳转商品详情
  goGoodUrl(id) {
    location.href = `/search?g_id=${id}&member_token=${sessionStorage.getItem("member_token")}`;
  },
  // 获取路由上的搜索参数
  getUrlParam() {
    let searchParam = {};
    if (location.href.indexOf("?") != -1) {
      let strArr = location.search.slice(1).split("&");
      strArr.forEach((item, index) => {
        searchParam[item.split("=")[0]] = item.split("=")[1];
      });
    }
    return searchParam;
  }
};

const getters={
    fileBaseUrl:()=> 'http://img.idongpin.com/',
    customer_type:state => state.customer_type,
    customer_types:state => state.customer_types,
    userInfo:state => state.userInfo,
    buycarNumb:state => state.buycarNumb,
    Badge:state => state.Badge,
    showTabbar:state => state.showTabbar,
}

export default getters;

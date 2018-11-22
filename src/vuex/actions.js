
import http from "src/api/Allhttp";
import * as $http from "src/api/Allhttp"

let actions={
    saveCustomerType({ commit }, type) {
        commit('SAVECUSTOMERTYPE',type)
    },
    saveCustomerTypes({ commit }, type) {
        commit('SAVECUSTOMERTYPES',type)
    },
    saveUserInfo({ commit }, info) {
        commit('SAVEUSERINFO',info)
    },
    getCarNumb({ commit }) {
        $http.getOrderNunber().then(res=>{
            commit('GETCARNUMB',res.data)
        }).catch(error => {});
        
    },
    changeShowTabbar({ commit }) {
        commit('CHANGESHOWTABBAR')
        
    },
}
export default actions
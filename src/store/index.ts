import { createStore } from "vuex"

const state = {
  userInfo: {},
  msg: 'test'
}
const mutations = {
  setUserInfo(state: { userInfo: any }, data: any) {
    state.userInfo = data
  }  
}
export default createStore({
  state,
  mutations,
  actions: {
    
  },
  modules: {
  },
})
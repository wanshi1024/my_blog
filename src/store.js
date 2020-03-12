import Vue from 'vue';
import vuex from 'vuex';

Vue.use(vuex)

export default new vuex.Store({
  state: {
    userInfo: null
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    }

  },
  mutations: {
    _setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: {
    setUserInfo({commit},payload) {
      commit("_setUserInfo",payload)
    }
  }
})
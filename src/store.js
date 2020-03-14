import Vue from 'vue';
import vuex from 'vuex';
import Http from '@/util/Http'
Vue.use(vuex)

export default new vuex.Store({
  state: {
    userInfo: {},
    articleLabels: []
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    }

  },
  mutations: {
    _setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    _setArticleLabels(state) {
      Http.get('/api/articleLabel/getAllLabel')
        .then(res => {
          let data = res.data;
          state.articleLabels = data;
        })

    }
  },
  actions: {
    setUserInfo(content, payload) {
      content.commit("_setUserInfo", payload)
    },
    setArticleLabels:  (content) => {
      return new Promise((resolve, reject) => {
         content.commit("_setArticleLabels");
        resolve()
      })

    }
  }
})
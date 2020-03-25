import Vue from 'vue';
import vuex from 'vuex';
import Http from '@/util/Http'
Vue.use(vuex)

export default new vuex.Store({
  state: {
    userInfo: {},
    articleLabels: [],
    articleListData: {},
    findArticleCondition: {
      current: 1,
      size: 5,
      articleTitle: '',
      articleLabel: ''
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    }

  },
  mutations: {
    //设置用户信息
    _setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    //设置文章标签
    _setArticleLabels(state) {
      Http.get('/api/articleLabel/getAllLabel')
        .then(res => {
          let data = res.data;
          state.articleLabels = data;
        })
    },
    // 设置文章列表
    _setArticleListData(state, condition) {
      Http.get(`/api/article/articleList`, {
        params: condition
      }).then(res => {
        state.articleListData = res.data;
      });
    },
    // 设置 查询文章条件
    _setFindArticleCondition(state, condition) {
      state.findArticleCondition = condition
    }
  },
  actions: {
    setUserInfo(content, payload) {
      content.commit("_setUserInfo", payload)
    },
    setArticleLabels(content) {
      return new Promise((resolve, reject) => {
        content.commit("_setArticleLabels");
        resolve()
      })
    },
    setArticleListData(content, payload) {
      return new Promise((resolve, reject) => {
        content.commit("_setArticleListData", payload);
        resolve()
      })
    },
    setFindArticleCondition(content, payload) {
      return new Promise((resolve, reject) => {
        content.commit("_setFindArticleCondition", payload);
        resolve()
      })
    }
  }
})
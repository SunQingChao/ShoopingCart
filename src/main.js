import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
//路由
import Routers from './router';
import VueRouter from 'vue-router';

//商品数据
import product_data from '../product'
//引入基础css
import '../style.css'

//Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(Vuex);

// 路由配置
const RouterConfig = {
  // 使用 HTML5 的 History 路由模式
  mode: 'history',
  routes: Routers
};

const router = new VueRouter(RouterConfig);


router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});

//指定默认滚动条位置x，y
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

//数组去重复
function getfilterArray(array) {
  const res = [];
  const json = {};
  for (let i = 0; i < array.length; i++) {
    const _self = array[i];
    if (!json[_self]) {
      res.push(_self);
      json[_self] = 1;
    }
  }
  return res
}

const store = new Vuex.Store({
  state: {
    productlist: [],
    cartlist: []
  },
  getters: {
    colors: state => {
      const colors = state.productlist.map(item => item.color);
      return getfilterArray(colors);
    },
    brands: state => {
      const brands = state.productlist.map(item => item.brand);
      const arr = getfilterArray(brands);
      return arr;
    }
  },
  mutations: {
    //添加商品列表
    setproductlist(state, data) {
      state.productlist = data;
    },
    //添加购物车
    addcart(state, id) {
      const isadded = state.cartlist.find(item => item.id === id);
      if (isadded) {
        isadded.count++;
      } else {
        state.cartlist.push({
          id: id,
          count: 1
        })
      }
    },
    //修改商品数量
    editcartcount(state, payload) {
      const product = state.cartlist.find(item => item.id === payload.id);
      product.count += payload.count;
      // for (let i = 0; i < state.cartlist.length; i++) {
      //   if (state.cartlist[i].id === payload.id) {
      //     state.cartlist[i].count += payload.count;
      //   }
      // }
    },
    //删除商品
    deletecart(state, id) {
      const indexid = state.cartlist.findIndex(item => item.id === id);
      state.cartlist.splice(indexid, 1);
    },
    //清空购物车
    emplycart(state) {
      state.cartlist = []
    }
  },
  actions: {
    //请求商品列表
    getproductlist(context) {
      //真是环境通过ajax获取数据，现在使用异步模拟
      setTimeout(() => {
        context.commit('setproductlist', product_data)
      }, 500)
    },
    buy(context) {
      //真是环境通过ajax提交购买请求后再清空购物车
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit('emplycart');
          resolve();
        }, 500)
      })
    }
  }
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => {
    return h(App)
  }
  // components: {
  //   App
  // },
  //template: '<App/>'
})

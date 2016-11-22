import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import Vuex from 'vuex'
// 引入静态资源
require('./assets/css/style.css')
require('./assets/Font-Awesome-3.2.1/css/font-awesome.min.css')

import 'jquery'
// 引入组件
import App from './App'

Vue.use(VueRouter)
Vue.use(vueResource)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    playing: true,
    currentTime: 0,
    duration: 0,
    index: 0,
    coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003RMaRI1iFoYd.jpg?max_age=2592000',
    song: {
      id: '107192078',
      mid: '003OUlho2HcRHC',
      name: '告白气球',
      singer: '周杰伦'
    },
    playList: [{
      id: '107192078',
      mid: '003OUlho2HcRHC',
      name: '告白气球',
      singer: '周杰伦'
    }]
  },
  mutations: {
    setPlayList (state, playList) {
      state.playList = playList.list
      state.index = playList.index
      state.song = state.playList[state.index]
      console.log(state.song, state.song.id)
      state.dataUrl = 'http://ws.stream.qqmusic.qq.com//' + state.song.id + '.m4a?fromtag=46'
      console.log(state.dataUrl)
    }
  }
})

const routes = [
  {path: '/', name: 'index', component: App}
]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能

const routerApp = new Vue({
  router,
  store
}).$mount('#app')

export default routerApp

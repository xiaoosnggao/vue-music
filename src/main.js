import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import Vuex from 'vuex'
// 引入静态资源
require('./assets/css/style.css')
require('./assets/js/sherd.js')
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
    playMode: 2,
    index: 0,
    coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003RMaRI1iFoYd.jpg?max_age=2592000',
    song: {
      id: '102636799',
      mid: '001Qu4I30eVFYb',
      name: '演员',
      singer: '薛之谦'
    },
    playList: [{
      id: '102636799',
      mid: '001Qu4I30eVFYb',
      name: '演员',
      singer: '薛之谦'
    }],
    count: [],
    countlist: []
  },
  mutations: {
    setPlayList (state, playList) {
      state.index = playList.index
      if (playList.list[playList.index].data) {
        state.playList.push({
          'id': playList.list[state.index].data.songid,
          'mid': playList.list[state.index].data.songmid,
          'name': playList.list[state.index].data.songname,
          'singer': playList.list[state.index].data.singer[0].name
        })
      } else {
        state.playList.push(playList.list[state.index])
      }
      state.song = state.playList[state.playList.length - 1]
    },
    isCount (state, is) {
      state.isCount = is.isCount
    },
    isRecommendedShow (state, is) {
      state.isRecommendedShow = is.isRecommendedShow
    },
    isAudioShow (state, is) {
      state.isAudioShow = is.isAudioShow
    },
    setCountList (state, countList) {
      state.count = countList.list
      state.countlist = countList.countlist
    },
    addToPlayList (state, item) {
      state.playList.push(item.list)
      console.log(state.playList)
    },
    updateDuration (state, time) {
      state.duration = time
    },
    updateCurrentTime (state, time) {
      state.currentTime = time
    },
    play (state) {
      state.playing = true
    },
    pause (state) {
      state.playing = false
    },
    playFront (state) {
      state.index = (state.index - 1 + state.playList.length) % state.playList.length
      state.song = state.playList[state.index]
    },
    playNext (state) {
      state.index = (state.index + 1) % state.playList.length
      state.song = state.playList[state.index]
    },
    playContinue (state) {
      console.log(state.playMode)
      switch (state.playMode) {
        case 1:
          break
        case 2:
          state.index = (state.index + 1) % state.playList.length
          state.song = state.playList[state.index]
          break
        case 3:
          state.index = Math.floor(Math.random() * state.playList.length)
          state.song = state.playList[state.index]
          break
      }
    },
    changePlayMode (state) {
      state.playMode = (state.playMode + 1) % 3
    }
  },
  getters: {
    currentTime: state => {
      return parseInt(state.currentTime / 60) + ':' + (Array(2).join(0) + (state.currentTime % 60)).slice(-2)
    },
    duration: state => {
      return parseInt(state.duration / 60) + ':' + (Array(2).join(0) + (state.duration % 60)).slice(-2)
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

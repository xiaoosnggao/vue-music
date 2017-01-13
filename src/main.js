import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import Vuex from 'vuex'

// 引入静态资源
require('./assets/css/style.css')
require('./assets/css/animate.css')
require('./assets/js/sherd.js')

// 引入组件
import App from './App'
import SearchList from './components/SearchList'
import Singer from './components/Singer'
import Album from './components/Album'
import Audio from './components/Audio'
import Recommended from './components/Recommended'
import Count from './components/Count'

Vue.use(VueRouter)
Vue.use(vueResource)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    playing: false,
    currentTime: 0,
    duration: 0,
    playMode: 2,
    index: 0,
    isLoop: false,
    coverImgUrl: null,
    song: {
      id: null,
      mid: null,
      name: null,
      singer: null
    },
    lyric: null,
    playList: [],
    count: [],
    countList: [],
    searchRes: null,
    searchAlbumData: null,
    isShowInput: false
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
      } else if (playList.list[playList.index].musicData) {
        state.playList.push({
          'id': playList.list[state.index].musicData.songid,
          'mid': playList.list[state.index].musicData.songmid,
          'name': playList.list[state.index].musicData.songname,
          'singer': playList.list[state.index].musicData.singer[0].name
        })
      } else if (playList.list[playList.index].belongCD) {
        state.playList.push({
          'id': playList.list[state.index].songid,
          'mid': playList.list[state.index].songmid,
          'name': playList.list[state.index].songname,
          'singer': playList.list[state.index].singer[0].name
        })
      } else {
        state.playList.push(playList.list[state.index])
      }
      state.song = state.playList[state.playList.length - 1]
    },
    getPlayList (state, index) {
      state.index = index.index
      state.song = state.playList[state.index]
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
      state.countList = countList.countList
    },
    addToPlayList (state, item) {
      state.playList.push({'id': item.list.songid, 'mid': item.list.songmid, 'name': item.list.songname, 'singer': item.list.singer[0].name})
    },
    removeToPlayList (state, item) {
      state.playList.splice(item.index, 1)
      if (item.index <= 0) {
        state.index = 0
      }
      state.song = state.playList[state.index]
      if (typeof state.song === 'undefined') {
        state.song = {
          id: null,
          mid: null,
          name: null,
          singer: null
        }
        state.coverImgUrl = null
        state.playing = false
      }
    },
    updateDuration (state, time) {
      state.duration = time
    },
    updateCurrentTime (state, time) {
      state.currentTime = time
    },
    play (state) {
      if (state.song.id !== null) {
        state.playing = true
      }
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
  },
  actions: {
    playContinue ({commit, state}) {
      if (state.playList.length <= 1) {
        document.getElementById('music').currentTime = 0
        commit('updateCurrentTime', 0)
        state.song = state.playList[0]
        return
      }
      if (state.playMode === 1) {
      } else if (state.playMode === 2) {
        state.index = (state.index + 1) % state.playList.length
        state.song = state.playList[state.index]
      } else {
        state.index = Math.floor(Math.random() * state.playList.length)
        state.song = state.playList[state.index]
        console.log(state.playList, state.playMode, state.index)
      }
    }
  }
})


const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/recommended',
    component: App,
    children: [
      {
        path: 'searchList',
        component: SearchList
      }, {
        path: 'singer',
        component: Singer
      },
      {
        path: 'album',
        component: Album
      },
      {
        path: 'audio',
        component: Audio
      },
      {
        path: 'recommended',
        component: Recommended
      },
      {
        path: 'count',
        component: Count
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
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

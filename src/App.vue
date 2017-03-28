<template>
  <div class="gxs-vh">
    <transition name="custom-classes-transition" enter-active-class="animated bounceInRight"
                leave-active-class="animated bounceOutRight">
      <router-view></router-view>
    </transition>

    <transition name="custom-classes-transition" enter-active-class="animated slideInDown fast"
                leave-active-class="animated slideOutUp" mode="out-in">
      <search v-if="isSearch"></search>
    </transition>

    <transition name="custom-classes-transition" enter-active-class="animated slideInUp fast"
                leave-active-class="animated slideOutDown" mode="out-in">
      <audio-box v-show="isAudioShow"></audio-box>
    </transition>

    <transition name="custom-classes-transition" enter-active-class="animated slideInUp"
                leave-active-class="animated slideOutDown" mode="out-in">
      <audio-nav v-if="isAudioNav" v-on:play="tapButton()"></audio-nav>
    </transition>

    <transition name="custom-classes-transition" enter-active-class="animated slideInUp fast"
                leave-active-class="animated slideOutDown" mode="out-in">
      <list-meng v-if="isListMeng" v-bind:ListMeng="isListMeng" v-bind:coIndex="countIndex"></list-meng>
    </transition>

    <transition name="custom-classes-transition" enter-active-class="animated slideInUp fast"
                leave-active-class="animated slideOutDown" mode="out-in">
      <play-list v-if="isPlayList"></play-list>
    </transition>

  </div>
</template>
<script type="text/ecmascript-6">
  import Search from './components/Search'
  import Recommended from './components/Recommended'
  import AudioBox from './components/Audio'
  import AudioNav from './components/AudioNav'
  import Count from './components/Count'
  import SearchList from './components/SearchList'
  import Singer from './components/Singer'
  import ListMeng from './components/ListMeng'
  import PlayList from './components/PlayList'
  import Album from './components/Album'
  import {mapMutations, mapState} from 'vuex'

  export default {
    data () {
      return {
        topList: null,
        isAudioShow: false,
        isAudioNav: true,
        isSearch: true,
        isListMeng: false,
        isPlayList: false,
        countIndex: null
      }
    },
    components: {
      Search, Recommended, AudioBox, AudioNav, Count, SearchList, Singer, ListMeng, PlayList, Album
    },
    methods: {
      ...mapMutations([
        'play', 'pause', 'playContinue'
      ]),
      tapButton () {
        if (!this.playing) {
          this.play()
          document.getElementById('music').play()
        } else {
          this.pause()
          document.getElementById('music').pause()
        }
      }
    },
    mounted () {
      this.$http.jsonp('http://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', {
        params: {
          g_tk: 5381,
          uin: 0,
          format: 'jsonp',
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'h5',
          needNewCode: 1,
          _: new Date().getTime()
        },
        jsonp: 'jsonpCallback'
      }).then(function (response) {
        this.topList = response.data.data.topList
      })
    },
    computed: {
      ...mapState([
        'playing', 'song', 'coverImgUrl'
      ])
    }
  }
</script>

<style>

</style>

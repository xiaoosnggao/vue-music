<template>
    <div class="gxs-vh">
        <div class="gxs-header">
            <search></search>
        </div>
        <div class="gxs-body">
            <transition name="custom-classes-transition" enter-active-class="animated slideInUp" leave-active-class="animated zoomOut" mode="out-in">
                <audio-box v-show="isAudioShow"></audio-box>
            </transition>
            <transition name="custom-classes-transition" enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
                <recommended v-bind:top="topList" v-if="isRecommendedShow"></recommended>
            </transition>
            <transition name="custom-classes-transition" enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight"
                        mode="out-in">
                <count v-if="isCount"></count>
            </transition>
            <transition name="custom-classes-transition" enter-active-class="animated bounceIn" leave-active-class="animated bounceOut" mode="out-in">
                <search-list v-if="isSearch" v-bind:searchListData="searchRes"></search-list>
            </transition>
        </div>
        <div class="gxs-footer">
            <transition name="custom-classes-transition" enter-active-class="animated bounceIn" leave-active-class="animated bounceOut" mode="out-in">
                <audio-nav v-if="isAudioNav" v-on:play="tapButton()"></audio-nav>
            </transition>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import Search from './components/Search'
  import Recommended from './components/Recommended'
  import AudioBox from './components/Audio'
  import AudioNav from './components/AudioNav'
  import Count from './components/Count'
  import SearchList from './components/SearchList.vue'
  import {mapMutations, mapState} from 'vuex'

  export default {
    data () {
      return {
        topList: null,
        isCount: false,
        isAudioShow: false,
        isRecommendedShow: true,
        isAudioNav: true,
        isSearch: false,
        searchRes: null
      }
    },
    props: ['top', 'searchListData'],
    components: {
      Search, Recommended, AudioBox, AudioNav, Count, SearchList
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
    },
    watch: {
      song (song) {
        this.$http.jsonp('http://120.27.93.97/weappserver/get_music_image.php', {
          params: {
            mid: song.mid
          },
          jsonp: 'callback'
        }).then(function (response) {
          console.log(1)
          this.$store.state['coverImgUrl'] = response.data.url
        })
      }
    }
  }
</script>

<style>

</style>

<template>
  <div class="gxs-vh">
    <div class="gxs-header">
      <search></search>
    </div>
    <div class="gxs-body">
      <recommended v-bind:top="topList" v-show="isRecommendedShow"></recommended>
      <transition name="fade">
        <audio-box v-show="isAudioShow"></audio-box>
      </transition>
      <transition name="fade">
        <count v-if="isCount"></count>
      </transition>
    </div>
    <div class="gxs-footer">
      <audio-nav v-on:play="tapButton()"></audio-nav>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Search from './components/Search'
  import Recommended from './components/Recommended'
  import AudioBox from './components/Audio'
  import AudioNav from './components/AudioNav'
  import Count from './components/Count'
  import {mapMutations, mapState} from 'vuex'

  export default {
    data () {
      return {
        topList: null,
        isCount: false,
        isAudioShow: false,
        isRecommendedShow: true
      }
    },
    props: ['top'],
    components: {
      Search, Recommended, AudioBox, AudioNav, Count
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
        console.log(song)
        this.$http.jsonp('http://120.27.93.97/weappserver/get_music_image.php', {
          params: {
            mid: song.mid
          },
          jsonp: 'callback'
        }).then(function (response) {
          this.$store.state['coverImgUrl'] = response.data.url
        })
      }
    }
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transform: translate(0px, 0px);
    transition: all .3s;
  }

  .fade-enter, .fade-leave-active {
    transform: translate(100%, 0px);
  }
</style>

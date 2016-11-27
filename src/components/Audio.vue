<template>
  <div class="audio-warp">
    <div class="audio-box-bg" v-bind:style="{backgroundImage: 'url('+ coverImgUrl +')'}"></div>
    <div class="audio-box">
      <div class="audio-head">
        <div class="audio-bank" v-on:click="bank()">
          <i class="icon-chevron-left"></i>
        </div>
        <div class="audio-title">
          <p class="song-name">{{song.name}} <span class="singer-name">{{song.singer}}</span></p>
        </div>
      </div>
      <audio id="music" v-bind:src="dataUrl" v-on:timeupdate="updateTime" v-on:ended="playContinue" autoplay="autoplay" v-bind:loop="isLoop"></audio>
      <div class="audio-box-img">
        <div class="audio-box-img-after"></div>
        <img v-bind:src="coverImgUrl" alt="">
      </div>
    </div>
    <div class="audio-nav">
      <div class="audio-progress-warp">
        <div class="audio-progress" v-on:click="touchSit($event)">
          <div class="audio-progress-box" v-bind:style="{width:indicatorPosition+'%'}">
            <div class="audio-progress-touch"></div>
          </div>
        </div>
        <div class="audio-progress-text">
          <p>{{currentTime}}</p>
          <p>{{duration}}</p>
        </div>
      </div>
      <div class="audio-nav-button">
        <div class="audio-play-order">
          <i v-bind:class="getPlayModeClass" v-on:click="changePlayMode"></i>
        </div>
        <div class="audio-nav-btn">
          <i class="audio-l icon-step-backward icon-2x" v-on:click="playFront"></i>
          <i class="audio-c icon-2x" v-bind:class="!playing?PlayClass:pauseClass" v-on:click="$parent.tapButton"></i>
          <i class="audio-r icon-step-forward icon-2x" v-on:click="playNext"></i>
        </div>
        <div class="audio-list">
          <i class="icon-reorder" v-on:click="showPlayList"></i>
        </div>
      </div>
    </div>
    <transition name="fade">
      <play-list v-if="isPlayList" v-on:clonePlayList="clonePlayList"></play-list>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import PlayList from './PlayList'
  import {mapMutations, mapGetters, mapState} from 'vuex'
  export default {
    name: 'Search',
    data () {
      return {
        searchRes: null,
        searchInfo: '',
        isSearch: false,
        isMid: null,
        isId: null,
        pauseClass: 'icon-pause',
        PlayClass: 'icon-play',
        isPlayList: false,
        playModeClass: null
      }
    },
    components: {
      PlayList
    },
    methods: {
      bank () {
        this.$parent.isAudioShow = false
      },
      updateTime () {
        this.$store.commit('updateCurrentTime', parseInt(document.getElementById('music').currentTime))
        this.$store.commit('updateDuration', parseInt(document.getElementById('music').duration))
      },
      clonePlayList () {
        this.isPlayList = false
      },
      showPlayList () {
        this.isPlayList = true
      },
      touchSit (event) {
        document.getElementById('music').currentTime = parseInt(document.getElementById('music').duration) * ((event.pageX - 25) / event.toElement.clientWidth)
        this.$store.commit('updateCurrentTime', parseInt(document.getElementById('music').duration) * ((event.pageX - 25) / event.toElement.clientWidth))
        event.preventDefault()
      },
      ...mapMutations([
        'playNext', 'playFront', 'changePlayMode', 'playContinue'
      ])
    },
    computed: {
      getPlayModeClass () {
        let playModeClass = ''
        if (this.playMode === 1) {
          playModeClass = 'icon-retweet'
        } else if (this.playMode === 2) {
          playModeClass = 'icon-exchange'
        } else {
          playModeClass = 'icon-random'
        }
        return playModeClass
      },
      ...mapState({
        dataUrl (state) {
          if (typeof state.song.id === 'undefined') {
            this.isId = state.song.data.songid
          } else {
            this.isId = state.song.id
          }
          return 'http://ws.stream.qqmusic.qq.com//' + this.isId + '.m4a?fromtag=46'
        }
      }),
      ...mapGetters([
        'currentTime', 'duration'
      ]),
      ...mapState([
        'playing', 'song', 'coverImgUrl', 'playList', 'playMode', 'isLoop'
      ]),
      ...mapState({
        indicatorPosition (state) {
          return state.currentTime / state.duration * 100
        }
      })
    },
    watch: {}
  }
</script>
<style type="text/css">

</style>

<template>
  <div class="audio-warp">
    <div class="audio-box-bg" v-bind:style="{backgroundImage: 'url('+ coverImgUrl +')'}"></div>
    <div class="audio-box">
      <div class="audio-head">
        <div class="audio-bank" v-on:click="bank()">
          <i class="icon-chevron-left"></i>
        </div>
        <div class="audio-title"><p class="song-name">{{songName}}</p>
          <p class="singer-name">{{singerName}}</p></div>
      </div>
      <audio id="music" v-bind:src="dataUrl" autoplay="autoplay"></audio>
      <div class="audio-box-img">
        <img v-bind:src="coverImgUrl" alt="">
      </div>
    </div>
    <div class="audio-nav">
      <div class="audio-progress-warp">
        <div class="audio-progress">
          <div class="audio-progress-box"></div>
        </div>
        <div class="audio-progress-text">
          <p>1:22</p>
          <p>4:55</p>
        </div>
      </div>
      <div class="audio-nav-button">
        <div class="audio-play-order">
          <i class="icon-random"></i>
        </div>
        <div class="audio-nav-btn">
          <i class="audio-l icon-step-backward icon-2x"></i>
          <i class="audio-c icon-pause icon-2x"></i>
          <i class="audio-r icon-step-forward icon-2x"></i>
        </div>
        <div class="audio-list">
          <i class="icon-reorder"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'

  export default {
    name: 'Search',
    data () {
      return {
        searchRes: null,
        searchInfo: '',
        isSearch: false,
        isMid: null,
        isId: this.$store.state.song.id,
        songName: this.$store.state.song.name,
        singerName: this.$store.state.song.singer
      }
    },
    methods: {
      bank () {
        this.$store.commit('tabs', {
          isRecommendedShow: true,
          isAudioShow: false
        })
      }
    },
    computed: {
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
      ...mapState([
        'playing', 'song', 'coverImgUrl'
      ])
    },
    watch: {
      song (song) {
        if (typeof song.mid === 'undefined') {
          this.isMid = song.data.strMediaMid
          this.singerName = song.data.singer[0].name
          this.songName = song.data.songname
        } else {
          this.isMid = song.mid
          this.singerName = song.singer
          this.songName = song.name
        }
        this.$http.jsonp('http://120.27.93.97/weappserver/get_music_image.php', {
          params: {
            mid: this.isMid
          },
          jsonp: 'callback'
        }).then((response) => {
          this.$store.state['coverImgUrl'] = response.data.url
        })
      }
    }
  }
</script>
<style type="text/css">

</style>

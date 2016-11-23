<template>
  <div class="audio-nav">
    <div class="audio-img" v-on:click="showAudio">
      <img v-bind:src="coverImgUrl" alt="">
    </div>
    <div class="audio-name">
      <p>{{songName}}</p>
    </div>
    <div class="audio-nav-button">
      <i class="audio-l icon-step-backward icon-2x"></i>
      <i class="audio-c icon-pause icon-2x"></i>
      <i class="audio-r icon-step-forward icon-2x"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  export default {
    name: 'Search',
    data () {
      return {
        isMid: null,
        isId: null,
        songName: this.$store.state.song.name,
        singerName: null,
        coverImgUrl: null
      }
    },
    computed: {
      ...mapState([
        'playing', 'song', 'coverImgUrl'
      ])
    },
    methods: {
      showAudio () {
        console.log(1)
        this.$store.commit('tabs', {
          isRecommendedShow: false,
          isAudioShow: true
        })
      }
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
      }
    }
  }
</script>
<style type="text/css">

</style>

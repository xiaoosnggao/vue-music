<template>
  <div class="audio-warp">
    <div class="audio-box-bg" v-bind:style="{backgroundImage: 'url('+ coverImgUrl +')'}"></div>
    <div class="audio-box">
      <audio id="music" v-bind:src="dataUrl" autoplay="autoplay"></audio>
      <div class="audio-box-img" >
        <img v-bind:src="coverImgUrl" alt="">
      </div>
    </div>
    <div class="audio-nav">
      <div class="audio-play-order">
        <i class="icon-random icon-2x"></i>
      </div>
      <div class="audio-nav-btn">
        <i class="audio-l icon-step-backward icon-2x"></i>
        <i class="audio-c icon-pause icon-2x"></i>
        <i class="audio-r icon-step-forward icon-2x"></i>
      </div>
      <div class="audio-list">
        <i class="icon-reorder icon-2x"></i>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'Search',
    data () {
      return {
        searchRes: null,
        searchInfo: '',
        isSearch: false
      }
    },
    methods: {
      ...mapMutations([
        'play', 'pause', 'playContinue'
      ])
    },
    computed: {
      ...mapState({
        dataUrl (state) {
          return 'http://ws.stream.qqmusic.qq.com//' + state.song.id + '.m4a?fromtag=46'
        }
      }),
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
        }).then((response) => {
          this.$store.state['coverImgUrl'] = response.data.url
        })
      }
    }
  }
</script>
<style type="text/css">

</style>

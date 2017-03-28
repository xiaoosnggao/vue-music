<template>
  <div class="audio-nav gxs-footer" v-if="song.name">
    <div class="audio-name" v-on:click="showAudio">
      <p class="song-name">{{song.name}}</p>
      <p class="song-singer">{{song.singer}}</p>
    </div>
    <div class="audio-nav-button">
      <i class="audio-l" v-on:click="playFront"><img src="../assets/images/icon-step-backward.png" alt=""></i>
      <i class="audio-c" v-bind:class="playing ? 'gxs-playClass' : 'gxs-pauseClass'" v-on:click="$parent.tapButton"></i>
      <i class="audio-r" v-on:click="playNext"><img src="../assets/images/icon-icon-step-forward.png" alt=""></i>
    </div>
    <div class="audio-progress-warp">
      <div class="audio-progress" v-on:click="touchSit($event)">
        <div class="audio-progress-box" v-bind:style="{width:indicatorPosition+'%'}">
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapGetters, mapMutations, mapState} from 'vuex'
  export default {
    name: 'Search',
    data () {
      return {
        isMid: null,
        isId: null,
        pauseClass: 'icon-pause',
        PlayClass: 'icon-play'
      }
    },
    computed: {
      ...mapState([
        'playing', 'song', 'coverImgUrl'
      ]),
      ...mapGetters([
        'currentTime', 'duration'
      ]),
      ...mapState({
        indicatorPosition (state) {
          return state.currentTime / state.duration * 100
        }
      })
    },
    methods: {
      ...mapMutations([
        'playNext', 'playFront'
      ]),
      showAudio () {
        this.$parent.isAudioShow = true
      },
      updateTime () {
        this.$store.commit('updateCurrentTime', parseInt(document.getElementById('music').currentTime))
        this.$store.commit('updateDuration', parseInt(document.getElementById('music').duration))
      },
      touchSit (event) {
        document.getElementById('music').currentTime = parseInt(document.getElementById('music').duration) * ((event.pageX - 25) / event.toElement.clientWidth)
        this.$store.commit('updateCurrentTime', parseInt(document.getElementById('music').duration) * ((event.pageX - 25) / event.toElement.clientWidth))
        event.preventDefault()
      }
    }
  }
</script>
<style type="text/css">

</style>

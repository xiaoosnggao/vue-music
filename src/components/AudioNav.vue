<template>
  <div class="audio-nav">
    <div class="audio-img" v-on:click="showAudio">
      <img v-bind:src="coverImgUrl" alt="">
    </div>
    <div class="audio-name">
      <p>{{song.name}} - {{song.singer}}</p>
    </div>
    <div class="audio-nav-button">
      <i class="audio-l icon-step-backward icon-2x" v-on:click="playFront"></i>
      <i class="audio-c icon-2x" v-bind:class="!playing?PlayClass:pauseClass" v-on:click="$parent.tapButton"></i>
      <i class="audio-r icon-step-forward icon-2x" v-on:click="playNext"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapMutations, mapState} from 'vuex'
  export default {
    name: 'Search',
    data () {
      return {
        isMid: null,
        isId: null,
        coverImgUrl: null,
        pauseClass: 'icon-pause',
        PlayClass: 'icon-play'
      }
    },
    computed: {
      ...mapState([
        'playing', 'song', 'coverImgUrl'
      ])
    },
    methods: {
      ...mapMutations([
        'playNext', 'playFront'
      ]),
      showAudio () {
        this.$parent.isAudioShow = true
      }
    }
  }
</script>
<style type="text/css">

</style>

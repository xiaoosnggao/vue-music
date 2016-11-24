<template>
  <div class="list-warp play-list-warp count-warp">
    <div class="audio-head count-head">
      <div class="audio-bank" v-on:click="clonePlayList">
        <i class="icon-chevron-left"></i>
      </div>
      <div class="audio-title"><p class="song-name">播放列表</p></div>
    </div>
    <div class="list play-list">
      <div class="count-box" v-for="(item,index) in playList" v-on:click="play(index,playList)">
        <div class="count-box-index">{{index+1}}</div>
        <div class="count-box-info"><p class="count-box-title">{{item.name}}</p>
          <p class="count-box-name">{{item.singer}}</p></div>
        <div class="count-box-button"><i class="icon-angle-down"></i></div>
      </div>
    </div>
    <div class="list-bg" v-on:click="clonePlayList"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  export default {
    data () {
      return {}
    },
    computed: {
      ...mapState([
        'playing', 'song', 'coverImgUrl', 'count', 'playList'
      ])
    },
    mounted () {
    },
    methods: {
      clonePlayList () {
        this.$emit('clonePlayList')
      },
      play (index, playList) {
        this.$store.commit('setPlayList', {
          index: index,
          list: playList
        })
        this.clonePlayList()
      }
    },
    watch: {}
  }
</script>
<style type="text/css">

</style>

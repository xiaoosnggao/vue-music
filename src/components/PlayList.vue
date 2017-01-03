<template>
  <div class="list-warp play-list-warp count-warp">
    <div class="audio-head header">
      <div class="search-bank">
        <i class="gxs-icon" v-on:click="bank($event)"><img src="../assets/images/icon-back.png" alt=""></i>
      </div>
      <div class="audio-title"><p class="song-name">播放列表</p></div>
    </div>
    <div class="list play-list">
      <div class="count-box" v-for="(item,index) in playList">
        <div class="count-box-index">{{index+1}}</div>
        <div class="count-box-info" v-on:click="play(index)">
          <p class="count-box-title">{{item.name}}</p>
          <p class="count-box-name">{{item.singer}}</p>
        </div>
        <div class="count-box-button" v-on:click="list(index)"><i class="icon-angle-down"></i></div>
      </div>
    </div>
    <div class="list-bg" v-on:click="bank($event)"></div>
    <transition name="fade">
      <play-list-meng v-if="isPlayListMeng" v-bind:ListMeng="isPlayListMeng" v-bind:index="playListIndex" v-bind:clickPlayList="playListNew"></play-list-meng>
    </transition>
  </div>
</template>
<script type="text/javascript">
  import PlayListMeng from './PlayListMeng'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        isPlayListMeng: false,
        playListNew: null,
        playListIndex: null
      }
    },
    computed: {
      ...mapState([
        'playing', 'song', 'coverImgUrl', 'count', 'playList'
      ])
    },
    components: {
      PlayListMeng
    },
    props: ['ListMeng', 'index'],
    mounted () {
    },
    methods: {
      bank () {
        this.$parent.isPlayList = false
      },
      play (index) {
        this.$store.state['playing'] = true
        this.$store.commit('getPlayList', {
          index: index
        })
        this.bank()
      },
      list (index) {
        this.isPlayListMeng = true
        this.playListNew = this.playList[index]
        this.playListIndex = index
      }
    },
    watch: {}
  }
</script>
<style type="text/css">

</style>

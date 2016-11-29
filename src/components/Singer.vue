<template>
  <div class="count-warp">
    <div class="header">
      <div class="search-bank">
        <i class="gxs-icon" v-on:click="bank($event)"><img src="../assets/images/icon-back.png" alt=""></i>
      </div>
    </div>
    <div class="count-touch">
      <div class="count-box-hd">
        <img v-bind:src="imgurl(searchSingerData)" alt="">
        <div class="count-info">
          <div class="count-title">{{searchSingerData.singer_name}}</div>
          <div class="count-date">粉丝：{{searchSingerData.fans}}</div>
        </div>
      </div>
      <div class="count-box" v-for="(item,index) in searchSingerData.list">
        <div class="count-box-index">{{index+1}}</div>
        <div class="count-box-info" v-on:click="play(index)">
          <p class="count-box-title">{{item.musicData.songorig}}</p>
          <p class="count-box-name">{{item.musicData.songname}}</p>
        </div>
        <div class="count-box-button" v-on:click="list(index)">
          <i class="icon-angle-down"></i>
        </div>
      </div>
      <div class="count-box">
        <p class="count-box-infoDesc">{{searchSingerData.SingerDesc}}</p>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['searchSingerData'],
    methods: {
      imgurl (searchSingerData) {
        return 'http://y.gtimg.cn/music/photo_new/T001R300x300M000' + searchSingerData.singer_mid + '.jpg?max_age=2592000'
      },
      play (index) {
        this.$store.state['playing'] = true
        this.$store.commit('setPlayList', {
          index: index,
          list: this.searchSingerData.list
        })
        this.$parent.isAudioShow = true
      },
      bank () {
        this.$parent.isSinger = false
        this.$parent.isSearch = true
        this.$parent.isSearchList = true
      },
      list (index) {
        this.$parent.isListMeng = true
        this.$parent.countIndex = this.searchSingerData.list[index].musicData
      }
    }
  }
</script>

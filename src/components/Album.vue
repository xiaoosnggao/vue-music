<template>
  <div class="count-warp">
    <div class="header">
      <div class="search-bank">
        <i class="gxs-icon" v-on:click="bank($event)"><img src="../assets/images/icon-back.png" alt=""></i>
      </div>
    </div>
    <div class="count-touch">
      <div class="count-box-hd">
        <img v-bind:src="imgurl(searchAlbumData)" alt="">
        <div class="count-info">
          <div class="count-title">{{searchAlbumData.name}}</div>
          <div class="count-date">歌手：{{searchAlbumData.singername}}</div>
          <div class="count-date">发行公司：{{searchAlbumData.company}}</div>
          <div class="count-date">发行时间：{{searchAlbumData.aDate}}</div>
        </div>
      </div>
      <div class="count-box" v-for="(item,index) in searchAlbumData.list">
        <div class="count-box-index" v-if="item">{{index+1}}</div>
        <div class="count-box-info" v-on:click="play(index)">
          <p class="count-box-title">{{item.songname}}</p>
          <p class="count-box-name">{{item.songname}}</p>
        </div>
        <div class="count-box-button" v-on:click="list(index)">
          <i class="icon-angle-down"></i>
        </div>
      </div>
      <div class="count-box">
        <p class="count-box-infoDesc">{{searchAlbumData.desc}}</p>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['searchAlbumData'],
    methods: {
      imgurl (searchAlbumData) {
        console.log(searchAlbumData.mid)
        return 'http://y.gtimg.cn/music/photo_new/T002R300x300M000' + searchAlbumData.mid + '.jpg?max_age=2592000'
      },
      play (index) {
        this.$store.state['playing'] = true
        this.$store.commit('setPlayList', {
          index: index,
          list: this.searchAlbumData.list
        })
        this.$parent.isAudioShow = true
      },
      bank () {
        this.$parent.isAlbum = false
        this.$parent.isSearch = true
        this.$parent.isSearchList = true
      },
      list (index) {
        this.$parent.isListMeng = true
        this.$parent.countIndex = this.searchAlbumData.list[index]
      }
    }
  }
</script>

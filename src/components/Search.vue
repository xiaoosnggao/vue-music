<template>
  <div class="search-warp">
    <div class="search">
      <div class="search-icon">
        <i class=" icon-reorder"></i>
      </div>
      <div class="search-input">
        <input class="gxs-input" type="text" v-model="searchInfo">
      </div>
      <div class="search-button">
        <i class="icon-search" v-on:click="key($event)"></i>
      </div>
    </div>
    <div class="search-res" v-if="isSearch">
      <div class="search-res-box" v-for="(item,index) in searchRes.album.itemlist" v-on:click="play(index)">
        <div class="search-res-img">
          <img v-bind:src="item.pic" alt="">
        </div>
        <div class="search-res-text">
          <div class="search-res-name">{{item.name}}</div>
          <div class="search-res-singer">{{item.singer}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
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
      key (event) {
        this.$http.jsonp('http://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg', {
          params: {
            is_xml: 0,
            format: 'jsonp',
            key: this.searchInfo,
            g_tk: 5381,
            loginUin: 0,
            hostUin: 0,
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0
          },
          jsonp: 'jsonpCallback'
        }).then((response) => {
          this.searchRes = response.data.data
          console.log(this.searchRes)
          this.isSearch = true
        })
      },
      play: function (index) {
        console.log(this.$store.state.dataUrl)
        this.$store.commit('setPlayList', {
          index: index,
          list: this.searchRes.song.itemlist
        })
        console.log(this.$store.state.dataUrl)
      }
    },
    mounted () {

    }
  }
</script>
<style type="text/css">

</style>

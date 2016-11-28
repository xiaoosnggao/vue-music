<template>
  <div class="search-warp">
    <div class="search">
      <div class="search-bank">
        <i class="gxs-icon" v-on:click="bank($event)"><img src="../assets/images/icon-back.png" alt=""></i>
      </div>
      <div class="search-input">
        <input class="gxs-input" v-show="isShowInput" type="text" v-model="searchInfo">
      </div>
      <div class="search-button">
        <i class="gxs-icon" v-on:click="key($event)"><img src="../assets/images/icon-search.png" alt=""></i>
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
        isShowInput: false
      }
    },
    methods: {
      key (event) {
        if (this.isShowInput === true) {
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
            this.$parent.searchRes = response.data.data
            this.$parent.isCount = false
            this.$parent.isAudioShow = false
            this.$parent.isRecommendedShow = false
            this.$parent.isSearch = true
            this.$parent.isAudioNav = true
          })
        } else {
          this.isShowInput = true
        }
      },
      bank () {
        this.$parent.isCount = false
        this.$parent.isAudioShow = false
        this.$parent.isRecommendedShow = true
        this.$parent.isAudioNav = true
        this.$parent.isSearch = false
      },
      play (index) {
        this.isSearch = false
        this.$parent.isAudioShow = true
        this.$store.commit('setPlayList', {
          index: index,
          list: this.searchRes.song.itemlist
        })
      }
    },
    mounted () {

    }
  }
</script>
<style type="text/css">

</style>

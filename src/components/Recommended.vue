<template>
  <div class="recommended-warp">
    <div class="recommended-bd">
      <div class="audio-item" v-for="(item, index) in top" v-on:click="play(item.id)">
        <div class="topList-img">
          <div class="recommended-box-img">
            <img v-bind:src="item.picUrl" alt="">
          </div>
        </div>
        <div class="topList-list">
          <div class="recommended-title">{{item.topTitle}}</div>
          <div class="recommended-box" v-for="(item, index) in item.songList">
            <p class="recommended-info">
              <span class="song-index">{{index + 1}}</span><span class="song-name">{{item.songname}}</span><span class="album-name">{{item.singername}}</span>
            </p>
          </div>
          <div class="song-listenCount">
            <i class="gxs-icon gxs-icon-listenCount"><img src="../assets/images/icon-song-listenCount.png" alt=""></i>
            <div class="listenCount">{{item.listenCount | listenCount}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'Recommended',
    props: ['top'],
    data () {
      return {
        recommendedRes: null,
        list: null
      }
    },
    methods: {
      play (id) {
        this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
          params: {
            topid: id,
            format: 'jsonp',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0
          },
          jsonp: 'jsonpCallback'
        }).then(function (response) {
          this.list = response.data.songlist
          this.$store.commit('setCountList', {
            list: this.list,
            countlist: response.data
          })
          this.$parent.isSearch = false
          this.$parent.isCount = true
          this.$parent.isRecommendedShow = false
        })
      }
    },
    filters: {
      listenCount: num => {
        return Math.round(num / 1000) / 10 + '万'
      }
    }
  }
</script>
<style type="text/css">

</style>

<template>
  <div class="recommended-warp">
    <div class="recommended-hd gxs-cell">
      <div class="gxs-cell-hd"><i class="icon-list-alt"></i></div>
      <div class="gxs-cell-bd recommended-title">推荐歌单</div>
    </div>
    <div class="recommended-bd">
      <div class="audio-item" v-for="(item, index) in top" v-on:click="play(item.id)">
        <div class="topList-img">
          <div class="recommended-box-img">
            <img v-bind:src="item.picUrl" alt="">
          </div>
        </div>
        <div class="topList-list">
          <div class="recommended-box" v-for="(item, index) in item.songList">
            <p class="recommended-info">
              {{item.songname}}<span class="album-name">{{item.singername}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'Recommended',
    props: ['top'],
    data () {
      return {
        recommendedRes: null,
        isRecommendedShow: true,
        list: null
      }
    },
    methods: {
      play (id) {
        this.$store.commit('tabs', {
          isCount: true
        })
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
        }).then((response) => {
          this.list = response.data.songlist
          this.$store.commit('setCountList', {
            list: this.list
          })
        })
      }
    }
  }
</script>
<style type="text/css">

</style>

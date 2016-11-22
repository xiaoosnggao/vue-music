<template>
  <div class="recommended-warp">
    <div class="recommended-hd gxs-cell">
      <div class="gxs-cell-hd"><i class="icon-list-alt"></i></div>
      <div class="gxs-cell-bd recommended-title">推荐歌单</div>
      <div class="gxs-cell-ft recommended-more">更多></div>
    </div>
    <div class="recommended-bd">
      <div class="recommended-box">

      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'Recommended',
    data () {
      return {
        searchRes: null
      }
    },
    mounted () {
      this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
        params: {
          topid: 26,
          format: 'jsonp',
          inCharset: 'utf8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'yqq',
          needNewCode: 0
        },
        jsonp: 'jsonpCallback'
      }).then((response) => {
        this.searchRes = response.data.songlist
        console.log(this.searchRes)
      })
    }
  }

</script>
<style type="text/css">

</style>

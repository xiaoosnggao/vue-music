<template>
  <div class="search-res">
    <div class="search-res-song">
      <div class="search-res-title">单曲</div>
      <div class="search-res-box" v-for="(item,index) in searchListData.song.itemlist" v-on:click="play(index)">
        <div class="search-res-text">
          <p><span class="search-res-index">{{index+1}}</span><span class="search-res-name">{{item.name}}</span><span class="search-res-singer">{{item.singer}}</span></p>
        </div>
      </div>
    </div>
    <div class="search-res-singer" v-if="searchListData.singer">
      <div class="search-res-title">{{searchListData.singer.name}}</div>
      <div class="search-res-box" v-for="(item,index) in searchListData.singer.itemlist" v-on:click="getSinger(item.mid)">
        <div class="search-res-img"><img v-bind:src="item.pic" alt=""></div>
        <div class="search-res-text">
          <p><span class="search-res-name">{{item.name}}</span></p>
        </div>
      </div>
    </div>
    <div class="search-res-album">
      <div class="search-res-title">{{searchListData.album.name}}</div>
      <div class="search-res-box" v-for="(item,index) in searchListData.album.itemlist" v-on:click="getAlbum(item.mid)">
        <div class="search-res-img"><img v-bind:src="item.pic" alt=""></div>
        <div class="search-res-text">
          <p><span class="search-res-name">{{item.name}}</span><span class="search-res-singer">{{item.singer}}</span></p>
        </div>
      </div>
    </div>
    <div class="search-res-mv">
      <div class="search-res-title">{{searchListData.mv.name}}</div>
      <div class="search-res-box" v-for="(item,index) in searchListData.mv.itemlist" v-on:click="play(index)">
        <div class="search-res-text">
          <p><span class="search-res-index">{{index+1}}</span><span class="search-res-name">{{item.name}}</span><span class="search-res-singer">{{item.singer}}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['searchListData'],
    methods: {
      play (index) {
        this.$parent.isAudioShow = true
        this.$store.commit('setPlayList', {
          index: index,
          list: this.$parent.searchRes.song.itemlist
        })
      },
      getSinger (mid) {
        this.$http.jsonp('http://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg', {
          params: {
            order: 'listen',
            begin: 0,
            num: 8,
            singermid: mid,
            g_tk: 5381,
            uin: 0,
            format: 'jsonp',
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'h5page',
            needNewCode: 1,
            from: 'h5',
            _: new Date().getTime()
          },
          jsonp: 'jsonpCallback'
        }).then((response) => {
          this.$parent.searchSinger = response.data.data
          this.$parent.isSinger = true
          this.$parent.isSearchList = false
          this.$parent.isSearch = false
        })
      },
      getAlbum (mid) {
        this.$http.jsonp('http://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg', {
          params: {
            albummid: mid,
            g_tk: 5381,
            loginUin: 0,
            hostUin: 0,
            format: 'jsonp',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0
          },
          jsonp: 'jsonpCallback'
        }).then((response) => {
          this.$parent.searchAlbum = response.data.data
          this.$parent.isAlbum = true
          this.$parent.isSearchList = false
          this.$parent.isSearch = false
          console.log(response.data.data)
        })
      }
    }
  }
</script>

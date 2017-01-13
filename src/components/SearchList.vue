<template>
  <div class="search-res" v-if="searchRes">
    <div class="search-res-song" v-if="searchRes.song">
      <div class="search-res-title">{{searchRes.song.name}}</div>
      <div class="search-res-box" v-for="(item,index) in searchRes.song.itemlist" v-on:click="play(index)">
        <div class="search-res-text">
          <p><span class="search-res-index">{{index+1}}</span><span class="search-res-name">{{item.name}}</span><span class="search-res-singer">{{item.singer}}</span></p>
        </div>
      </div>
    </div>
    <div class="search-res-singer" v-if="searchRes.singer">
      <div class="search-res-title">{{searchRes.singer.name}}</div>
      <div class="search-res-box" v-for="(item,index) in searchRes.singer.itemlist" v-on:click="getSinger(item.mid)">
        <div class="search-res-img"><img v-bind:src="item.pic" alt=""></div>
        <div class="search-res-text">
          <p><span class="search-res-name">{{item.name}}</span></p>
        </div>
      </div>
    </div>
    <div class="search-res-album" v-if="searchRes.album">
      <div class="search-res-title">{{searchRes.album.name}}</div>
      <div class="search-res-box" v-for="(item,index) in searchRes.album.itemlist" v-on:click="getAlbum(item.mid)">
        <div class="search-res-img"><img v-bind:src="item.pic" alt=""></div>
        <div class="search-res-text">
          <p><span class="search-res-name">{{item.name}}</span><span class="search-res-singer">{{item.singer}}</span></p>
        </div>
      </div>
    </div>
    <div class="search-res-mv" v-if="searchRes.mv">
      <div class="search-res-title">{{searchRes.mv.name}}</div>
      <div class="search-res-box" v-for="(item,index) in searchRes.mv.itemlist" v-on:click="play(index)">
        <div class="search-res-text">
          <p><span class="search-res-index">{{index+1}}</span><span class="search-res-name">{{item.name}}</span><span class="search-res-singer">{{item.singer}}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState([
        'searchRes'
      ])
    },
    beforeMount () {
      this.getData()
    },
    methods: {
      getData () {
        this.$store.state['isShowInput'] = true
        this.$http.jsonp('http://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg', {
          params: {
            is_xml: 0,
            format: 'jsonp',
            key: this.$route.query.search,
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
          this.$store.state['searchRes'] = response.data.data
        })
      },
      play (index) {
        this.$parent.isAudioShow = true
        this.$store.state['playing'] = true
        this.$store.commit('setPlayList', {
          index: index,
          list: this.searchRes.song.itemlist
        })
      },
      getSinger (mid) {
        this.$parent.isSearch = false
        this.$router.push({path: '/singer', query: {search: mid}})
      },
      getAlbum (mid) {
        this.$router.push({path: '/album', query: {search: mid}})
      }
    },
    watch: {
      $route () {
        this.getData()
      }
    }
  }
</script>

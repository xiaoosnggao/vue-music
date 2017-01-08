<template>
  <transition name="custom-classes-transition" enter-active-class="animated zoomIn fast" leave-active-class="animated zoomOutUp" mode="out-in">
    <div class="search-warp">
      <div class="header">
        <div class="search-bank" v-if="isShowInput">
          <i class="gxs-icon" v-on:click="bank($event)"><img src="../assets/images/icon-back.png" alt=""></i>
        </div>
        <div class="search-menu" v-if="!isShowInput">
          <i class="gxs-icon" v-on:click=""><img src="../assets/images/icon-menuH.png" alt=""></i>
        </div>
        <div class="search-input">
          <transition name="custom-classes-transition" enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight" mode="out-in">
            <input class="gxs-input" v-on:click="keyUp($event,searchInfo)" type="text" v-model="searchInfo" placeholder="搜索 歌曲/专辑/歌手">
          </transition>
        </div>
        <div class="search-button">
          <i class="gxs-icon" v-on:click="key($event,searchInfo)"><img src="../assets/images/icon-search.png" alt=""></i>
        </div>
      </div>
      <transition name="custom-classes-transition" enter-active-class="animated fadeInUp fast" leave-active-class="animated fadeOutDown" mode="out-in">
        <div class="search-hot" v-if="isSearchHot">
          <div class="search-res-box" v-for="(item,index) in searchHot.hotkey" v-on:click="key($event,item.k)">
            <div class="search-res-text">
              <p><span class="search-res-index">{{index+1}}</span><span class="search-res-name">{{item.k}}</span><span class="search-res-singer">{{item.n}}</span></p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  export default {
    name: 'Search',
    data () {
      return {
        searchList: null,
        searchInfo: '',
        searchHot: null,
        isSearchHot: false
      }
    },
    beforeMount () {
      if (this.$route.query.search) {
        this.searchInfo = this.$route.query.search
      }
    },
    computed: {
      ...mapState([
        'searchRes', 'isShowInput'
      ])
    },
    methods: {
      keyUp (event, val) {
        if (val === '') {
          this.$http.jsonp('http://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg', {
            params: {
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
            this.searchHot = response.data.data
            this.$store.state['isShowInput'] = true
            this.$parent.isSearchList = false
            this.isSearchHot = true
          })
        }
      },
      key (event, val) {
        if (val === '') {
          return
        }
        this.$parent.isSearch = true
        this.isSearchHot = false
        this.$parent.isSearchList = true
        this.searchInfo = val
        this.$router.push({path: '/searchList', query: {search: val}})
      },
      bank () {
        this.isSearchHot = false
        this.$store.state['isShowInput'] = false
        this.$router.push({path: '/'})
      },
      play (index) {
        this.isSearch = false
        this.$parent.isAudioShow = true
        this.$store.commit('setPlayList', {
          index: index,
          list: this.$parent.searchRes.song.itemlist
        })
      }
    }
  }
</script>
<style type="text/css">

</style>

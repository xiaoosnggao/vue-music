<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInRightBig fast" leave-active-class="animated fadeOutRightBig" mode="out-in">
    <div class="count-warp">
      <div class="header">
        <div class="search-bank">
          <i class="gxs-icon" v-on:click="bank($event)"><img src="../assets/images/icon-back.png" alt=""></i>
        </div>
      </div>
      <div class="count-touch" v-if="countList.topinfo">
        <div class="count-box-hd">
          <img v-bind:src="countList.topinfo.pic_h5" alt="">
          <div class="count-info">
            <div class="count-title">{{countList.topinfo.ListName}}</div>
            <div class="count-date">{{countList.date}}</div>
          </div>
        </div>
        <div class="count-box" v-for="(item,index) in count">
          <div class="count-box-index">{{index+1}}</div>
          <div class="count-box-info" v-on:click="play(index)">
            <p class="count-box-title">{{item.data.songname}}</p>
            <p class="count-box-name">{{item.data.singer[0].name}}-{{item.data.albumname}}</p>
          </div>
          <div class="count-box-button" v-on:click="list(index)">
            <i class="icon-angle-down"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import ListMeng from './ListMeng'
  import {mapState} from 'vuex'
  export default {
    name: 'Search',
    data () {
      return {
        countIndex: null,
        isListMeng: false
      }
    },
    components: {
      ListMeng
    },
    props: ['coIndex', 'ListMeng'],
    computed: {
      ...mapState([
        'count', 'countList'
      ])
    },
    beforeMount () {
      this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
        params: {
          topid: this.$route.query.id,
          format: 'jsonp',
          inCharset: 'utf8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'yqq',
          needNewCode: 0
        },
        jsonp: 'jsonpCallback'
      }).then(function (response) {
        this.$store.commit('setCountList', {
          list: response.data.songlist,
          countList: response.data
        })
      })
    },
    mounted () {
      this.$parent.isSearch = false
    },
    methods: {
      play (index) {
        this.$parent.tapButton()
        this.$store.state['playing'] = true
        this.$store.commit('setPlayList', {
          index: index,
          list: this.count
        })
        this.$parent.isAudioShow = true
      },
      bank () {
        this.$parent.isSearch = true
        this.$router.push('/')
      },
      list (index) {
        this.$parent.isListMeng = true
        this.$parent.countIndex = this.count[index].data
      }
    }
  }
</script>
<style type="text/css">

</style>

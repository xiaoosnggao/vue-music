<template>
  <transition name="custom-classes-transition" enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutLeft">
      <div class="recommended-warp">
        <slider></slider>
        <div class="recommended-bd">
          <router-link class="audio-item" v-for="(item, index) in list" v-on:click="play(item.id)" :to="{ path: '/count', query: { id: item.id }}">
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
          </router-link>
        </div>
      </div>
  </transition>
</template>
<script type="text/javascript">
  import Slider from './Slider'

  export default {
    name: 'Recommended',
    components: {
      Slider
    },
    data () {
      return {
        recommendedRes: null,
        list: null
      }
    },
    mounted () {
      this.$http.jsonp('http://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', {
        params: {
          g_tk: 5381,
          uin: 0,
          format: 'jsonp',
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'h5',
          needNewCode: 1,
          _: new Date().getTime()
        },
        jsonp: 'jsonpCallback'
      }).then(function (response) {
        this.list = response.data.data.topList
      })
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
          this.$store.commit('setCountList', {
            list: response.data.songlist,
            countList: response.data
          })
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

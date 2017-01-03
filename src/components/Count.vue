<template>
  <div class="count-warp">
    <div class="header">
      <div class="search-bank">
        <i class="gxs-icon" v-on:click="bank($event)"><img src="../assets/images/icon-back.png" alt=""></i>
      </div>
    </div>
    <div class="count-touch">
      <div class="count-box-hd">
        <img v-bind:src="countlist.topinfo.pic_h5" alt="">
        <div class="count-info">
          <div class="count-title">{{countlist.topinfo.ListName}}</div>
          <div class="count-date">{{countlist.date}}</div>
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
</template>
<script type="text/javascript">
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
        'song', 'coverImgUrl', 'count', 'countlist'
      ])
    },
    methods: {
      play (index) {
        this.$store.state['playing'] = true
        this.$store.commit('setPlayList', {
          index: index,
          list: this.count
        })
        this.$parent.isAudioShow = true
      },
      bank () {
        this.$parent.isCount = false
        this.$parent.isAudioNav = true
        this.$parent.isRecommendedShow = true
        this.$parent.isSearch = true
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

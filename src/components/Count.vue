<template>
  <div class="count-warp">
    <div class="audio-head count-head ">
      <div class="audio-bank" v-on:click="bank()">
        <i class="icon-chevron-left"></i>
      </div>
      <div class="audio-title"><p class="song-name">{{countlist.topinfo.ListName}}</p></div>
    </div>
    <div class="count-touch">
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
    <transition name="fade">
      <list-meng v-if="isListMeng" v-bind:ListMeng="isListMeng" v-bind:coIndex="countIndex"></list-meng>
    </transition>
  </div>
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
        this.bank()
        this.$parent.isAudioShow = true
      },
      bank () {
        this.$parent.isCount = false
      },
      list (index) {
        this.isListMeng = true
        this.countIndex = this.count[index].data
      }
    }
  }
</script>
<style type="text/css">

</style>

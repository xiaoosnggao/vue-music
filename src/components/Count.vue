<template>
  <div class="count-warp">
    <div class="count-box" v-for="(item,index) in count" v-on:click="play(index)">
      <div class="count-box-index">{{index+1}}</div>
      <div class="count-box-info">
        <p class="count-box-title">{{item.data.songname}}</p>
        <p class="count-box-name">{{item.data.singer[0].name}}-{{item.data.albumname}}</p>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  export default {
    name: 'Search',
    data () {
      return {}
    },
    computed: {
      ...mapState([
        'song', 'coverImgUrl', 'count'
      ])
    },
    methods: {
      play (index) {
        this.$store.commit('setPlayList', {
          index: index,
          list: this.$store.state.count
        })
      }
    },
    mounted () {

    }
  }
</script>
<style type="text/css">

</style>

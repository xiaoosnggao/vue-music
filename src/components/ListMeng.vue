<template>
  <div class="list-warp">
    <div class="list">
      <div class="list-box list-box-audio">
        <p class="audio-songName">{{coIndex.songname}}</p>
        <p class="audio-singerName">{{coIndex.singer[0].name}}</p>
      </div>
      <div class="list-box" v-on:click="addPlayList(coIndex)">加入播放列表</div>
    </div>
    <div class="list-bg" v-on:click="cloneListMeng(isListMeng)"></div>
  </div>
</template>
<script type="text/javascript">
  import {mapState} from 'vuex'
  export default {
    name: 'Search',
    props: ['coIndex', 'ListMeng'],
    data () {
      return {
        isMid: null,
        isId: null,
        coverImgUrl: null,
        isPlayClass: 'icon-pause',
        isListMeng: false
      }
    },
    computed: {
      ...mapState([
        'playing', 'song', 'coverImgUrl', 'count', 'playList'
      ])
    },
    mounted () {
    },
    methods: {
      addPlayList (coIndex) {
        this.$store.commit('addToPlayList', {
          list: coIndex
        })
        this.cloneListMeng()
      },
      cloneListMeng (isListMeng) {
        this.$parent.isListMeng = false
      }
    },
    watch: {}
  }
</script>
<style type="text/css">

</style>

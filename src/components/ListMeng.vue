<template>
  <div class="list-warp">
    <div class="list">
      <div class="list-box list-box-audio">
        <p class="audio-songName">{{coIndex.songname}}</p>
        <p class="audio-singerName">{{coIndex.singer[0].name}}</p>
      </div>
      <div class="list-box">下一首播放</div>
      <div class="list-box" v-on:click="addPlayList(coIndex)">加入播放列表</div>
    </div>
    <div class="list-bg" v-on:click="cloneListMeng(isListMeng)"></div>
  </div>
</template>
<script type="text/ecmascript-6">
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
          list: {'id': coIndex.albumid, 'mid': coIndex.albummid, 'name': coIndex.songname, 'singer': coIndex.singer[0].name}
        })
        this.cloneListMeng()
      },
      cloneListMeng (isListMeng) {
        isListMeng = false
        this.$emit('cloneListMeng')
      }
    },
    watch: {}
  }
</script>
<style type="text/css">

</style>

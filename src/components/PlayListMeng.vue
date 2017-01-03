<template>
  <div class="list-warp">
    <div class="list">
      <div class="list-box list-box-audio">
        <p class="audio-songName">{{clickPlayList.name}}</p>
        <p class="audio-singerName">{{clickPlayList.singer}}</p>
      </div>
      <div class="list-box" v-on:click="removePlayList(index)">从播放列表中删除</div>
    </div>
    <div class="list-bg" v-on:click="cloneListMeng(isPlayListMeng)"></div>
  </div>
</template>
<script type="text/javascript">
  import {mapState} from 'vuex'
  export default {
    name: 'Search',
    props: ['ListMeng', 'index', 'clickPlayList'],
    data () {
      return {
        isMid: null,
        isId: null,
        coverImgUrl: null,
        isPlayClass: 'icon-pause',
        isPlayListMeng: false
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
      removePlayList (index) {
        console.log(index)
        this.$store.commit('removeToPlayList', {
          index: index
        })
        this.$parent.isPlayListMeng = false
      },
      cloneListMeng (isPlayListMeng) {
        this.$parent.isPlayListMeng = false
      }
    },
    watch: {}
  }
</script>
<style type="text/css">

</style>

<template>
  <div class="gxs-vh">
    <div class="gxs-header">
      <search></search>
    </div>
    <div class="gxs-body">
      <audio id="music" v-bind:src="dataUrl" autoplay="autoplay"></audio>
    </div>
    <div class="gxs-footer"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Search from './components/template/Search'
  import {mapState} from 'vuex'

  export default {
    data () {
      return {}
    },
    components: {
      Search
    },
    methods: {},
    computed: {
      ...mapState({
        dataUrl (state) {
          return 'http://ws.stream.qqmusic.qq.com//' + state.song.id + '.m4a?fromtag=46'
        }
      })
    }
  }
</script>


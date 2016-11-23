<template>
  <div class="gxs-vh">
    <div class="gxs-header">
      <search></search>
    </div>
    <div class="gxs-body">
      <recommended v-bind:top="topList" v-show="isRecommendedShow"></recommended>
      <transition name="fade">
        <audioBox v-show="isAudioShow"></audioBox>
      </transition>
      <transition name="fade">
        <count v-show="isCount"></count>
      </transition>
    </div>
    <div class="gxs-footer">
      <audio-nav></audio-nav>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Search from './components/Search'
  import Recommended from './components/Recommended'
  import AudioBox from './components/Audio'
  import AudioNav from './components/AudioNav'
  import Count from './components/Count'
  import {mapMutations, mapState} from 'vuex'

  export default {
    data () {
      return {
        topList: null
      }
    },
    props: ['top'],
    components: {
      Search, Recommended, AudioBox, AudioNav, Count
    },
    methods: {},
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
      }).then((response) => {
        this.topList = response.data.data.topList
      })
    },
    computed: {
      ...mapState({
        isCount (state) {
          return state.isCount
        },
        isAudioShow (state) {
          return state.isAudioShow
        },
        isRecommendedShow (state) {
          return state.isRecommendedShow
        }
      }),
      ...mapMutations([
        'play', 'pause', 'playContinue'
      ])
    }
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transform: translate(0px, 0px);
    transition: all .5s;
  }

  .fade-enter, .fade-leave-active {
    transform: translate(100%, 0px);
  }
</style>

<template>
  <slider-template :pages="sliderData" :sliderinit="sliderinit" @slide='slide'></slider-template>
</template>
<script>
  import SliderTemplate from './SliderTemplate'
  export default {
    data () {
      return {
        sliderData: [],
        sliderinit: {
          currentPage: 1,
          start: {},
          end: {},
          tracking: false,
          thresholdTime: 500,
          thresholdDistance: 100,
          loop: true
        }
      }
    },
    beforeMount () {
      this.$http.jsonp('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', {
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
        for (let i = 0; i < response.data.data.slider.length; i++) {
          this.sliderData.push({src: response.data.data.slider[i].picUrl, alt: '1'})
        }
      })
    },
    components: {
      SliderTemplate
    },
    methods: {
      slide (pagenum) {
      }
    }
  }
</script>

<template>
  <div class="gxs-vh">
    <div class="gxs-header">
      <search></search>
    </div>
    <div class="gxs-body">
      <audioBox></audioBox>
    </div>
    <div class="gxs-footer"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Search from './components/template/Search'
  import AudioBox from './components/template/Audio'

  export default {
    data () {
      return {}
    },
    components: {
      Search, AudioBox
    },
    methods: {},
    computed: {

    }
  }
</script>


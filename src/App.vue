<template>
  <div class="gxs-vh">
    <div class="gxs-header">
      <search></search>
    </div>
    <div class="gxs-body">
      <recommended></recommended>
    </div>
    <div class="gxs-footer"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Search from './components/Search'
  import Recommended from './components/Recommended'

  export default {
    data () {
      return {}
    },
    components: {
      Search, Recommended
    },
    methods: {},
    computed: {

    }
  }
</script>


<template>
  <div>
    <div class="wxc-copyright-bg"></div>
    <div class="wxc-nav">
      <div class="wxc-copyright-footer">
        <router-link v-bind:to="'/'" class="skong-nav-home wxc-nav-content"><i class="wxc-icon wxc-icon-home" v-bind:class="{'hot': $route.path==='/'}"></i>首页</router-link>
        <router-link v-bind:to="'/case'" class="skong-nav-home wxc-nav-content"><i class="wxc-icon wxc-icon-case" v-bind:class="{'hot': $route.path==='/case'}"></i>案例</router-link>
        <router-link v-bind:to="'/designer'" class="skong-nav-home wxc-nav-content"><i class="wxc-icon wxc-icon-designer" v-bind:class="{'hot': $route.path==='/designer'}"></i>设计师</router-link>
        <router-link v-bind:to="'/tribal'" class="skong-nav-home wxc-nav-content"><i class="wxc-icon wxc-icon-tribal" v-bind:class="{'hot': $route.path==='/tribal'}"></i>部落</router-link>
        <div class="skong-nav-home wxc-nav-content"><i class="wxc-icon wxc-icon-me"></i>我的</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'footer',
  data () {
    return {
      fileUrl: ''
    }
  },
  mounted () {
    console.log(this)
    this._data.fileUrl = this.$route.fullPath
  }
}
</script>

<template>
  <div class="search-res">
    <div class="search-res-title">单曲</div>
    <div class="search-res-box" v-for="(item,index) in searchListData.song.itemlist" v-on:click="play(index)">
      <div class="search-res-text">
        <p><span class="search-res-index">{{index+1}}</span><span class="search-res-name">{{item.name}}</span><span class="search-res-singer">{{item.singer}}</span></p>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['searchListData']
  }
</script>

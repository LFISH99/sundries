<template>
  <div id="app">
    <wm-header></wm-header>
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import wmHeader from './components/Header.vue'

export default {
  name: 'app',
  components: {wmHeader},
}
</script>

<style>
  @import "style/commom.scss";
</style>

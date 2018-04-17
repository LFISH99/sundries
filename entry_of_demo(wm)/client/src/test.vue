<template>
  <div>
    <div id="map-view" class="map-v"></div>
    <button @click="aaa">123</button>
  </div>
</template>

<script>
  import {Map} from './config/map'

  export default {
    data(){
      return {
        map: null,
        BMap: null
      }
    },
    mounted () {
      this.$nextTick(function(){
        Map('gdQqTNMXz82QGStsTtX0OCvlrnvK1bv4').then(BMap => {
          let map = {};
          function myFun(result){
            let cityName = result.name;
            map = new BMap.Map("map-view");
            map.centerAndZoom(cityName, 12);
          }

          let myCity = new BMap.LocalCity();
          myCity.get(myFun);

          this.BMap = BMap;
//          this.map = map;
        });
      })
    },
    methods: {
      aaa () {
        console.log(this)
      }
    }
  }
</script>

<style>
  #map-view {
    width: 100%;
    height: 500px;
  }
</style>

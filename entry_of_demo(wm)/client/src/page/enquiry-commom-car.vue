<template>
    <div class="ui-flex">
      <div class="enquiry flex-1">
        <form>
          <div class="box">
            <h2 class="font1">提货地</h2>
            <wm-input-box
              :map="map"
              v-model="text1"
              :verify="verify"
              @on-select="setStartMarker"></wm-input-box>
          </div>
          <div class="box">
            <h2 class="font1">送货地</h2>
            <wm-input-box
              :map="map"
              v-model="text2"
              :verify="verify"
              @on-select="setEndMarker"></wm-input-box>
          </div>
          <div class="box">
            <h2 class="font1">货物信息<span>（选填）</span></h2>
            <div class="wm-input-box">
              <div class="ui-flex wm-input-wrapper sty1">
                <el-input  placeholder="总体积(cbm)"></el-input>
                <el-input  placeholder="总重量(kgs)"></el-input>
                <el-input  placeholder="总件数(pkg)"></el-input>
              </div>
              <div class="msg"></div>
            </div>
          </div>
          <div class="box" v-if="distance">
            <p class="t1">匹配公里数（约）：<span>{{ distance }}km</span></p>
          </div>
          <div class="box">
            <button type="button" class="wm-btn wm-btn-long" :class="{'active':distance }"
                    @submit.prevent
                    @click="submit">查询报价</button>
          </div>
        </form>
      </div>
      <div class="ui-map" style="margin-top: 60px;">
        <div id="map-common-car" style="width: 452px; height: 338px;"></div>
      </div>
    </div>
</template>

<script>
//  import {address} from '../config/api'
  import WmInputBox from '../components/WmInputBox.vue'

  export default {
    name: 'commom-car',
    components: {WmInputBox},
    mounted () {
      P_BMap.then(BMap => {
        const local = (result)  => {
          let cityName = result.name;

          this.map = new BMap.Map("map-common-car");
          this.map.centerAndZoom(cityName, 12);
          this.map.enableScrollWheelZoom();

          this.map.wmMarker = {};

          this.map.driving = new BMap.DrivingRoute(this.map, {
            renderOptions:{
              map: this.map,
              autoViewport: true
            }
          });
          this.map.driving.setPolicy('BMAP_DRIVING_POLICY_LEAST_DISTANCE');

          this.map.driving.setSearchCompleteCallback((results) => {
            this.distance = (results.getPlan(0).getDistance(false) / 1000).toFixed(2);
          });
          this.map.driving.setMarkersSetCallback((results) => {
            for(let i = 0, len = results.length; i < len; i++){
              this.map.removeOverlay(results[i].marker);
            }
          });
        }

        let myCity = new BMap.LocalCity();
        myCity.get(local);
      });
    },
    data(){
      return {
        map: null,
        text1:'',
        text2:'',
        verify: 0,
        distance: undefined,
      }
    },
    watch:{

    },
    methods: {
      renderHighlight(data = [], key = '', name='value') {
        function highlightText(text = '', text_key) {
          return text.split(text_key).join(`<span class="keyword">${text_key}</span>`);
        }
        for(let i=0, len = data.length; i < len; i++){
          data[i]['highlight'] = data[i][name]
            .split(key)
            .join('<span class="keyword">' + key + '</span>');
        }
        return data;
      },
      setMarker(point, id, site = 'start'){
        this.map.driving.clearResults();
        this.distance = undefined;
        this.map.removeOverlay(this.map.wmMarker[site]);
        delete this.map.wmMarker[site];

        if(point){
          if(!this.map.wmMarker[site]){
            this.map.wmMarker[site] = new BMap.Marker(point, {
              icon: new BMap.Icon(`../../static/${site}.png`, new BMap.Size(24,35)),
              offset: new BMap.Size(0,-16)
            });
            this.map.addOverlay(this.map.wmMarker[site]);
          }else{
            this.map.wmMarker[site].setPosition(point);
          }

          let arrv = [];
          for(let o in this.map.wmMarker){
            arrv.push(this.map.wmMarker[o].getPosition());
          }
          this.map.setViewport(arrv);
          if(2===arrv.length){
            this.getDrivingRoute();
          }
        }
      },
      setStartMarker(item, id){
        this.setMarker(item.point, id)
      },
      setEndMarker(item, id){
        this.setMarker(item.point, id, 'end');
      },
      getDrivingRoute(){
        let marker = this.map.wmMarker;
        this.map.driving.search(marker['start'], marker['end']);
      },
      submit(){
      }
    }
  }
</script>

<style>
  .enquiry .wm-list-view{
    right: 0;
    position: absolute;
    width: 286px;
    top: 55px;
    z-index: 3;
    /*display: none;*/
  }
</style>

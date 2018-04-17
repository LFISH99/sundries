<template>
  <div class="enquiry-commom-car">
    <div class="enquiry">
      <form>
        <p class="msg msg-error" style="display: none;"></p>
        <div class="box">
          <h2>提货地</h2>
          <Icon type="plus-circled" />
          <div class="box-input-sty1">
            <div class="sub-box">
              <Input placeholder="包括省市区及详细地址"
                     v-model="input1"
                     @on-change="editAddress('1')"
                     @on-blur="closeView('select1')"></Input>
              <a href="javascript:;" class="button" @click="openView('address')">常用地址</a>

              <div class="wm-input-select-view"
                   ref="select1"
                   :class="{padd:selectList1.length}">
                <div class="wm-list sty1">
                  <ul>
                    <li class="icon-location"
                        v-for="item in selectList1"
                        @click="setAddress(item, '1')">
                      <span v-html="item.show"></span>
                      <span class="sub-text" v-text="item.remark"></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="msg"></div>
          </div>
        </div>
        <div class="box">
          <h2>送货地</h2>
          <Icon type="plus-circled" />
          <div class="box-input-sty1">
            <div class="sub-box">
              <Input placeholder="包括省市区及详细地址"
                     v-model="input2"
                     @on-change="editAddress('2')"
                     @on-blur="closeView('select2')"
                     @click.stop="closeView('select2')"></Input>
              <a href="javascript:;" class="button" @click="openView('address2')">常用地址</a>
              <div class="wm-input-select-view"
                   ref="select2"
                   :class="{padd:selectList1.length}">
                <div class="wm-list sty1">
                  <ul>
                    <li class="icon-location"
                        v-for="item in selectList1"
                        @click="setAddress(item, '2')">
                      <span v-html="item.show"></span>
                      <span class="sub-text" v-text="item.remark"></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="msg"></div>
          </div>
        </div>
        <div class="box">
          <h2>货物信息<span>（选填）</span></h2>
          <div class="box-input-sty1 box-input-sty2"  style="padding: 10px 31px 0;">
            <div class="sub-box">
              <Input placeholder="总体积(cbm)"></Input>
              <Input placeholder="总重量(kgs)"></Input>
              <Input placeholder="总件数(pkg)"></Input>
            </div>
            <div class="msg"></div>
          </div>
        </div>
        <div class="box">
          <p>匹配公里数（约）：<span>{{ distance }}km</span></p>
          <button type="" class="wm-btn wm-btn-long"
                  @submit.prevent
                  @click="getDrivingRoute">查询报价</button>
        </div>
      </form>
      <div class="wm-list-view" ref="view" style="display: none;">
        <div class="wm-view-header">
          <h2>常用地址</h2>
          <div @click="closeView('view')">
            <Icon type="ios-close-empty"/>
          </div>
        </div>
        <div class="wm-view-body">
          <form>
            <Input icon="ios-search"
                   placeholder="输入地址"
                   v-model="input_addr" @input="searchKeyword"></Input>
            <div class="wm-list">
              <h2>地址</h2>
              <ul>
                <li v-for="addr in address" v-html="addr"></li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="map">
      <div id="map-view" style="width: 452px; height: 338px;"></div>
    </div>
  </div>
</template>

<script>
  import {Map} from '../../config/map'
  import {address} from '../../config/api'
  import WmInput from '../../components/Input01.vue'

  export default {
    name: 'car',
    components: {WmInput},
    data(){
      return {
        map: null,
        BMap: null,
        address: [],
        oldAddress: [],
        input_addr: '',
        input1: '',
        selectList1: [],
        input2: '',
        selectList2: [],
        distance: 0,

        subListData: {
          header: ['地址']
        },
        resultsData: [],
        loading: false
      }
    },
    mounted () {
      P_BMap.then(BMap => {
        this.BMap = BMap;

        const myFun = (result)  => {
          let cityName = result.name;
          this.map = new BMap.Map("map-view");
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
//          this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);

        }

        let myCity = new BMap.LocalCity();
        myCity.get(myFun);
      });

    },
    methods: {
      closeView(name) {
        let view = this.$refs[name];

        switch (name){
          case 'view':
            view.style.display = 'none';
            this.address = [];
            this.input_addr = '';
            break;
          case 'select1':
          case 'select2':
//            view.style.display = 'none';
            break;
        }
      },
      openView(url) {
        let view = this.$refs['view'];

        if(view.style.display == 'block') return 0;

        address(url).then(data => {
          this.address = data.address;
          this.oldAddress = JSON.stringify(data.address);
        })
        view.style.display = 'block';
      },
      renderList(data = [], key = '', name) {
        let results = [];
        if(name){
          for(let i=0, len = data.length; i < len; i++){
            data[i]['show'] = data[i][name]
              .split(key)
              .join('<span class="keyword">' + key + '</span>');
          }
        }else {
          for(let i=0, len = data.length; i < len; i++){
            results[i] = data[i]
              .split(key)
              .join('<span class="keyword">' + key + '</span>');
          }
        }
        return data;
      },
      setMarker(point, mName) {
//        const mName = [`marker${selName}`];

        if(!this.map.wmMarker[mName]){
          this.map.wmMarker[mName] = new BMap.Marker(point);
          this.map.addOverlay(this.map.wmMarker[mName]);
        }else{
          this.map.wmMarker[mName].setPosition(point);
        }
      },
      getDrivingRoute() {
        let marker = this.map.wmMarker;
        this.map.driving.search(marker['1'], marker['2']);

//        this.map.driving.clearResults();
//        console.log(this.map.driving)

      },
      searchKeyword() {
        console.log(this, arguments)
        let key = this.input_addr.trim();
        let addr = JSON.parse(this.oldAddress);

        this.address = key ? this.renderList(addr, key) : addr;
//        function renderList(data = [], key = '') {
//          for(let i=0, len = data.length; i < len; i++){
//            data[i] = data[i]
//              .split(key)
//              .join('<span class="keyword">' + key + '</span>');
//          }
//          return data;
//        }
      },
      editAddress(selName) {
//        this.$refs[[`select${selName}`]].style.display = 'none';
//        this[[`input${selName}`]] = value;
        let key = this[[`input${selName}`]];
        let view = this.$refs[[`select${selName}`]];
        let map = this.map;

//        console.log(key, view)

        let isOnce = true;
//        view.style.display = 'none';

        let local = new BMap.LocalSearch('全国', {pageCapacity: 20});
        local.setSearchCompleteCallback((results) => {
          if(results){
            if(results.suggestions.length){
              key = results.suggestions[0] || key;
              local.search(key);
            }else if(!results.getCurrentNumPois() && isOnce){
              isOnce = false;
              local.setLocation(map);
              local.search(key);
            }

            let r = local.getResults();
            let arr = [];
            for(let i=0, len=r.getCurrentNumPois(); i< len; i++){
              let addr = r.getPoi(i);
              arr.push({
                text: addr.title,
                remark: addr.address,
                point: addr.point
              })
            }
            this.selectList1 = arr;
            if(this.selectList1.length){
              this.selectList1 = this.renderList(this.selectList1, key, 'text');
              view.style.display = 'block';
            }
          }else{
            view.style.display = 'none';
          }
        });
        local.search(key);
      },
      setAddress(value, selName) {
        this.$refs[[`select${selName}`]].style.display = 'none';
        this[[`input${selName}`]] = value.text;
        this.setMarker(value.point, selName);
      },
      searchTest(keyword){
        if(keyword.trim()){
          this.loading = true;
          let map = this.map;
          let isOnce = true;

          let local = new BMap.LocalSearch('全国', {pageCapacity: 20});
          local.setSearchCompleteCallback((results) => {
            if(results){
              if(results.suggestions.length){
                keyword = results.suggestions[0] || keyword;
                local.search(keyword);
              }else if(!results.getCurrentNumPois() && isOnce){
                isOnce = false;
                local.setLocation(map);
                local.search(keyword);
              }

              let r = local.getResults();
              let arr = [];
              for(let i=0, len=r.getCurrentNumPois(); i< len; i++){
                let addr = r.getPoi(i);
                arr.push({
                  text: addr.title,
                  remark: addr.address,
                  point: addr.point
                })
              }
//            this.resultsData = arr;
//            console.log(this.renderList(arr, keyword, 'name'))
//            if(this.resultsData.length){
//              this.resultsData = this.renderList(this.resultsData, keyword, 'name');
//            }
              this.resultsData = arr;
              if(arr.length){
                this.resultsData = this.renderList(this.resultsData, keyword, 'text');
              }
              this.loading = false;
            }
          });
          local.search(keyword);
        }
      }
    }
  }
</script>

<style>
  .enquiry-commom-car{
    display: flex;
  }
  .enquiry{
    padding-right: 10px;
    position: relative;
  }
  /*.box h2{*/
    /*color: #333333;*/
    /*text-align: left;*/
    /*font-size: 2rem;*/
    /*margin-bottom: 10px;*/
    /*line-height: 1em;*/
  /*}*/
  /*.box h2>span{*/
    /*font-size: 1.4rem;*/
    /*color: #cccccc;*/
    /*font-weight: initial;*/
  /*}*/

  .map{
    margin-top: 60px;
  }

  .box{
    margin-top: 30px;
    position: relative;
    padding-right: 30px;
  }

  .box .ivu-icon-plus-circled{
    position: absolute;
    font-size: 2rem;
    color: #d3d3d3;
    right: 0;
    top: 48px;
    cursor: pointer;
  }
  .enquiry .box-input-sty1{
    width: 490px;
  }

  .enquiry .wm-list-view{
    right: 0;
    position: absolute;
    width: 286px;
    top: 55px;
    z-index: 2;
    /*display: none;*/
  }


</style>

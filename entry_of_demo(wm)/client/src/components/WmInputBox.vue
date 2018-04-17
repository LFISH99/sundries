<template>
  <div class="wm-input-box">
    <wm-auto-complete
      v-model="text"
      placeholder="包括省市区及详细地址"
      :list-data="searchList"
      @on-search="search"
      @on-select="select"
      @on-sub-buttton="handleClick"
      @on-verify="verifyInput"
      :verify="verify1"
      @on-input="change"
    >常用地址
    </wm-auto-complete>
    <div class="wm-input-box-extra">
      <div class="msg">
        <span class="error" v-if="msg1">提货地不能为空</span>
        <div class="edit" v-if="edit">
          <span class="site flex-1">{{ siteMsg }}</span>
          <span class="other">
            定位区域不对？
            <a href="javascript:void(0);" @click="updateSite">点击修改</a>
          </span>
        </div>
      </div>
    </div>

    <wm-list-view
      placeholder="输入地址"
      v-model="openView"
      :data="ldata"
      @on-select="selectA"
    >常用地址
    </wm-list-view>

    <div class="panle" v-show="showp">
      <div @click="closeP">
        <Icon type="ios-close-empty i-close"/>
      </div>
      <div class="header">
        <p class="font1 icon-i">定位不到地点！</p>
        <p class="font2">在输入框中回删地址，选择附近地址即可(地址仅用于定位，不会覆盖您的地址,请放心回删)</p>
      </div>
      <div class="body">
        <div class="wm-input">
          <div class="wm-input-wrapper">
            <el-autocomplete
              v-model="texte"
              popper-class="wm-list"
              icon="circle-cross"
              :trigger-on-focus="false"
              :fetch-suggestions="search1"
              :on-icon-click="clean"
              custom-item="wm-item"
              @select="select"
            ></el-autocomplete>
          </div>
        </div>
      </div>
    </div>

    <div class="panle" v-if="showu">
      <div @click="closeP">
        <Icon type="ios-close-empty i-close"/>
      </div>
      <div class="header">
        <p class="font1 icon-i">修改定位</p>
      </div>
      <div class="body">
        <div class="wm-list-wm wm-list">
        <ul>
          <li v-for="item in showuData" @click="selectB(item)">
            <span class="item-value">{{ item.value }}</span>
            <span class="item-remark">{{ item.remark }}</span>
          </li>
        </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import WmAutoComplete from './WmAutoComplete.vue'
  import WmListView from './ListView.vue'
  import { address } from '../config/api'

  export default {
    name: 'wm-input-box',
    components: {WmAutoComplete, WmListView},
    props: {
      map: {
        validator (value) {
          return null !== value
        }
      },
      value: {
        type: String,
        default: ''
      },
      verify: ''
    },
    mounted () {
      let isShow = this.showp || this.showu;
      window.bg.style.display = isShow ? 'block' : 'none';
      this.$el.getElementsByTagName('input')[0].onblur = this.blur
    },
    data () {
      return {
        local: null,
        searchList: [],
        text: this.value,
        verify1: this.verify,
        msg1: false,
        edit: false,
        dataa: null,
        showp: false,
        texte: '',
        ldata: {header: ['地址'], list: []},
        openView: false,
        isSelect: false,
        siteMsg:'',
        inpuText:'',
        showu: false,
        showuData: []
      }
    },
    watch: {
      value (val) {
        this.text = val
      },
      verify (val) {
        this.verify1 = val
      },
      showp (bool) {
        window.bg.style.display = bool ? 'block' : 'none';
      },
      showu (bool) {
        window.bg.style.display = bool ? 'block' : 'none';
      }
    },
    methods: {
      renderHighlight (data = [], key = '', name = 'value') {
        function highlightText (text = '', text_key) {
          return text.split(text_key).join(`<span class="keyword">${text_key}</span>`)
        }

        for (let i = 0, len = data.length; i < len; i++) {
          data[i]['highlight'] = data[i][name]
            .split(key)
            .join('<span class="keyword">' + key + '</span>')
        }
        return data
      },
      search (query, callback) {
        let local = new BMap.LocalSearch(this.map, {pageCapacity: 30})

        local.setSearchCompleteCallback((results) => {
          if (results) {
            if (!results.getCurrentNumPois()) {
              callback([])
              this.showp = true
              this.$el
                .getElementsByClassName('panle')[0]
                .getElementsByTagName('input')[0].autofocus = true
              this.texte = query
            } else {
              if (results.suggestions.length) {
                query = results.suggestions[0] || query
                local.search(query)
                return
              }

              let resultsArray = []
              for (let i = 0, len = results.getCurrentNumPois(); i < len; i++) {
                let temp = results.getPoi(i)
                resultsArray.push({
                  value: temp.address,
                  value1: temp.title,
                  remark: temp.address,
                  point: temp.point,
                  data: temp
                })
              }
              this.searchList = this.renderHighlight(resultsArray, query, 'value1')
              callback(this.searchList)
            }
          }
        })
        local.search(query)
      },
      select (item) {
        this.showp = false;

        this.openView = false;
        this.isSelect = true;
        this.$emit('on-select', item, this._uid);
      },

      //list-view
      handleClick (event) {
        address('address').then(data => {
          let arr = data.address
          for (let i = 0, len = arr.length; i < len; i++) {
            arr[i]['highlight'] = arr[i].value
            this.ldata.list = arr
            this.openView = true
          }
        })
      },
      selectA (item) {
        this.text = item.value + (item.value1 || '');
        this.verify1++
        this.select(item);
      },

//    showp
      search1 (query, callback) {
        let local = new BMap.LocalSearch(this.map, {pageCapacity: 30})
        local.setSearchCompleteCallback((results) => {
          if (results) {
            if (results.suggestions.length) {
              query = results.suggestions[0] || query
              local.search(query)
              return
            }

            let resultsArray = []
            for (let i = 0, len = results.getCurrentNumPois(); i < len; i++) {
              let temp = results.getPoi(i)
              resultsArray.push({
                value: temp.title,
                value1: temp.title,
                remark: temp.address,
                point: temp.point,
                data: temp
              })
            }
            callback(this.renderHighlight(resultsArray, query))
          }
        })
        local.search(query)
      },
      closeP () {
        this.showu = false;
        this.showp = false;
      },
      clean () {
        this.texte = ''
//        this.$children[0].$children[1]
//          .$el.getElementsByClassName('el-scrollbar')[0].style.display = 'none';
      },


//    showu
      updateSite(){
        this.showu = true;
        console.log(this.inpuText)
        let local = new BMap.LocalSearch(this.map, {pageCapacity: 30})

        local.setSearchCompleteCallback((results) => {
          if (results) {

            if (results.suggestions.length) {
              local.search(results.suggestions[0]);
              return;
            }

            this.showuData = [];
            for (let i = 0, len = results.getCurrentNumPois(); i < len; i++) {
              let temp = results.getPoi(i)
              this.showuData.push({
                value: temp.title,
                remark: temp.address,
                point: temp.point,
                data: temp
              })
            }
            console.log(this.showuData)
          }
        })
        local.search(this.inpuText)
      },
      selectB (item) {
        this.edit = false;
        this.showu = false;
        this.select(item);
      },

      verifyInput (v) {
        this.msg1 = !v
      },
      blur (event) {
        this.verify1++
        if (this.inpuText.trim()) {
          let local = new BMap.LocalSearch(this.map, {pageCapacity: 2})

          local.setSearchCompleteCallback((results) => {
            if (!this.isSelect) {
              if(results.getCurrentNumPois()){
                this.edit = true;
                let addr = results.getPoi(0);
                this.siteMsg = addr.province + addr.city;
                this.select({
                  value: addr.address,
                  value1: addr.title,
                  remark: addr.address,
                  point: addr.point,
                  data: addr
                });
              }
            }
            this.isSelect = false;
          });
          local.search(this.inpuText);
        }
        this.edit = false;
      },
      change(v){
        this.inpuText = v;
        this.$emit('on-select', {point:null}, this._uid);
      }
    }
  }
</script>

<style>
</style>

<template>
  <div class="wm-input-box">
    <wm-auto-complete
      placeholder="包括省市区及详细地址"
      :list-data="searchList"
      @on-search="searchAddress"
    >常用地址</wm-auto-complete>
    <div class="wm-input-box-extra">
      <p class="msg"></p>
    </div>
  </div>
</template>

<script>
  import WmAutoComplete from './WmAutoComplete.vue'
  export default {
    name: 'wm-input-box',
    components: { WmAutoComplete },
    props: {
      map: {
        validator (value) {
          return null !== value;
        }
      }
    },
    mounted() {
    },
    data() {
      return {
        local: null,
        searchList: [],
      }
    },
    methods: {
      searchAddress(query) {
        let local = new BMap.LocalSearch(this.map, {pageCapacity: 30});

        local.setSearchCompleteCallback((results) => {
          if(results) {
            if (results.suggestions.length) {
              query = results.suggestions[0] || query;
              local.search(query);
              return;
            }

            let resultsArray = [];
            for(let i=0, len=results.getCurrentNumPois(); i< len; i++){
              let temp = results.getPoi(i);
              resultsArray.push({
                text: temp.title,
                remark: temp.address,
                point: temp.point
              })
            }
            this.searchList = resultsArray;
          }
        });
        local.search(query);
      }
    }
  }
</script>

<style>
</style>

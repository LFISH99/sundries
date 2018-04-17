<template>
  <div class="wm-input">
    <div class="wm-input-wrapper sty1">
      <span class="sub-input"
            @click.self="openLView = true"><slot></slot></span>

      <AutoComplete
        :placeholder="placeholder"
        :clearable="true"
        v-model="text"
        @on-search="search"
      >
        <Option v-for="(item, index) in data" :value="index" :key="item.text">
          <!--<span v-html="item.show"></span>-->
          <span class="sub-text" v-text="item.remark"></span>
        </Option>
      </AutoComplete>
    </div>
  </div>
</template>

<script>
  import {oneOf} from '../utils/assist'

  export default {
    name: 'wm-auto-complete',
    props: {
      placeholder: {
        type: String,
        default: '请输入'
      },
      listData: {
        type: Array,
        default() {
          return [];
        }
      },
    },
    data () {
      return {
        data: this.listData,
        text: '',
      }
    },
    computed: {
//      _listData() {
//        return this.listData;
//      }
    },
    watch: {
      listData(arr) {
        console.log('a1')
        if(Array.isArray(arr)){
          console.log('a',arr)
          this.data = arr;
        }
      }
    },
    methods: {
      search(query) {
        console.log(query)
        this.$emit('on-search', query)
        console.log(this.data)
      }
    }
  }
</script>

<style>
  .wm-input .wm-list-view{
    right: 0;
    position: absolute;
    width: 286px;
    top: 55px;
    z-index: 2;
  }
</style>

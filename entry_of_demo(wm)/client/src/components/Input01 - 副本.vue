<template>
  <div class="wm-input">
    <div class="wm-input-wrapper sty1">
      <AutoComplete
        :placeholder="placeholder"
        :clearable="true"
        v-model="text"
        @on-search="search"
      >
        <Option v-for="item in data" :value="item.text" :key="item.text">
          <span v-html="item.show"></span>
          <span class="sub-text" v-text="item.remark"></span>
        </Option>
      </AutoComplete>


      <span class="sub-input"
            @click.self="openLView = true">{{ subInputButtonName }}</span>

      <!--<wm-list-view-->
        <!--v-if="hasLView"-->
        <!--:tittle="subInputButtonName"-->
        <!--:placeholder="lView_placeholder"-->
        <!--:data="lView_Data"-->
        <!--v-model="openLView"-->
      <!--&gt;-->
      <!--</wm-list-view>-->
    </div>
  </div>
</template>

<script>
  import {oneOf} from '../utils/assist'
  import WmListView from './ListView'

  export default {
    name: 'wm-input-01',
    components: {WmListView},
    props: {
      type: {
        validator (value) {
          return oneOf(value, ['input', 'select']);
        },
        default: 'input'
      },
      placeholder: {
        type: String,
        default: '请输入'
      },
      subInputButtonName: {
        type: String,
        default: '常用'
      },
      inputData: {
        type: Array,
        default() {
          return [];
        }
      },


      hasLView: {
        type: Boolean,
        default: false
      },
      lView_placeholder: {
        type: String,
        default: '请输入'
      },
      lView_Data: {}
    },
    data () {
      return {
        listValue: '',
        openLView: false,


        data: this.inputData,
        text: ''
      }
    },
    computer: {
    },
    watch: {
      inputData(arr) {
        if(Array.isArray(arr)){
        console.log(arr)
        this.data = arr;
        }
      },
      text() {
        if(!this.text.trim()){
          this.data = [];
        }
      }
    },
    methods: {
      search(event) {
        this.$emit('on-input', this.text, event);
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

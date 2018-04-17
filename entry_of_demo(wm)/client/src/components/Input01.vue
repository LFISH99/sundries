<template>
  <div class="wm-input">
    <div class="wm-input-wrapper sty1">
      <!--<Select-->
        <!--:placeholder="placeholder"-->
        <!--v-model="text"-->
        <!--filterable-->
        <!--remote-->
        <!--:remote-method="fun"-->
        <!--@on-query-change="search"-->
        <!--:loading="loading">-->
        <!--&lt;!&ndash;<Option v-for="(option, index) in data" :value="data.value" :key="index">&ndash;&gt;-->
          <!--&lt;!&ndash;{{option.label}}</Option>&ndash;&gt;-->
        <!--<Option v-for="(item, index) in data" :value="index" :key="index" :label="item.text">-->
          <!--<span v-text="item.text"></span>-->
          <!--<span v-html="item.show"></span>-->
          <!--<span class="sub-text" v-text="item.remark"></span>-->
        <!--</Option>-->
      <!--</Select>-->
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
      lView_Data: {},


      fun: {
        type: Function,
        default(){
          return function () {

          };
        }
      },
      isloading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        listValue: '',
        openLView: false,


        data: this.inputData,
        text: '',
        loading: false
      }
    },
    computer: {
    },
    watch: {
      inputData(arr) {
        if(Array.isArray(arr)){
        this.data = arr;
        }
      },
      text(val) {
        console.log(val)
//        if(!val.trim()){
//          this.data = [];
//        }
      },
      isloading(val) {
        this.loading = val;
      }
    },
    methods: {
      search(query) {
//        this.loading = true;
//        console.log(arguments)
//        if (query !== '') {
//          this.loading1 = true;
//          setTimeout(() => {
//            this.loading1 = false;
//            const list = this.list.map(item => {
//              return {
//                value: item,
//                label: item
//              };
//            });
//            this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
//          }, 200);
//        } else {
//          this.options1 = [];
//        }
        this.$emit('on-input', this.text, query);
      },
      search1(query) {
//        console.log('========',arguments)
//        if (query !== '') {
//          this.loading1 = true;
//          setTimeout(() => {
//            this.loading1 = false;
//            const list = this.list.map(item => {
//              return {
//                value: item,
//                label: item
//              };
//            });
//            this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
//          }, 200);
//        } else {
//          this.options1 = [];
//        }
//        this.$emit('on-input', this.text, event);
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

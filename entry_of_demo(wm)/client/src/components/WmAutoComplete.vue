<template>
  <div class="wm-input">
    <div class="wm-input-wrapper">
      <span class="sub-input"
            @click.self="handleClick"><slot></slot></span>
      <el-autocomplete
        v-model="text"
        popper-class="wm-list"
        icon="circle-cross"
        :trigger-on-focus="false"
        :placeholder="placeholder"
        :fetch-suggestions="search"
        :on-icon-click="clean"
        custom-item="wm-item"
        @select="select"
        @input="input"
      ></el-autocomplete>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

//  自定义下拉框
  Vue.component('wm-item', {
    functional: true,
    render: function (h, ctx) {
      var item = ctx.props.item;
      return h('li', ctx.data, [
        h('span', {
          attrs: { class: 'item-highlight' },
          domProps: { innerHTML: item.highlight }
        }),
        h('span', { attrs: { class: 'item-remark' } }, [item.remark])
      ]);
    },
    props: {
      item: { type: Object, required: true }
    }
  });

  export default {
    name: 'wm-auto-complete',
    props: {
      placeholder: {
        type: String,
        default: '请输入'
      },
      value: {
        type: String,
        default: ''
      },
      listData:{
        type: Array,
        default: []
      },
      verify: ''
    },
    mounted() {
    },
    data () {
      return {
        data: this.listData,
        text: this.value,
        selfData: null
      }
    },
    watch:{
      value(val){
        this.text = val;
      },
      verify(val){
        let v = !!this.text.trim();
        this.$el.classList[v?'remove':'add']('red');
        this.$emit('on-verify', v);
      }
    },
    methods: {
      clean() {
        this.text = '';
        this.$children[0].$children[1]
          .$el.getElementsByClassName('el-scrollbar')[0].style.display = 'none';

          this.selfData = null;
        this.$emit('update', null);
      },
      search(query, callback) {
        this.$children[0].$children[1]
          .$el.getElementsByClassName('el-scrollbar')[0].style.display = 'block';
        this.$emit('on-search', query, callback);
      },
      select(item){
        console.log(item)
        this.text = item.value + (item.value1 || '');
        this.selfData = item;
        this.$emit('update', item);
        this.$emit('on-select', item);
      },
      handleClick(event){
        this.$emit('on-sub-buttton', event);
      },
      input(event){
        this.$emit('on-input', event);
      }
    }
  }
</script>

<style>

</style>

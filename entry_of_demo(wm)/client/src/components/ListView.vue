<template>
  <div class="wm-list-view" v-if="visible">
    <div class="wm-view-header">
      <h2><slot></slot></h2>
      <div @click="openOrCloseView(false)">
        <Icon type="ios-close-empty"/>
      </div>
    </div>
    <div class="wm-view-body">
      <Input icon="mv-search"
             :placeholder="placeholder"
             v-model="inputValue"
             @input="search"></Input>
      <div class="wm-list">
        <div class="wm-list-header">
          <p class="col" v-for="item in listData.header">{{ item }}</p>
        </div>
        <ul>
          <li v-for="item in listData.list" @click="select(item)">
            <p v-html="item.highlight"></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wm-list-view',
    props: {
      placeholder: {
        type: String,
        default: '请输入'
      },
      tittle: {
        type: String,
        default: '标题'
      },
      data: {
        type: Object,
        default() {
          return {
            header: ['名称'],
            list: []
          }
        }
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        inputValue: '',
        visible: this.value,
        listData: this.data
      }
    },
    watch: {
      value(val) {
        this.visible = val;
      },
      data(val) {
        this.listData = val;
      },
    },
    methods: {
      openOrCloseView(isOpen) {
        this.visible = isOpen;
        this.inputValue = '';
        isOpen || this.$emit('input', false);
      },
      search() {
        for(let i=0, len = this.listData.list.length; i < len; i++){
          this.listData.list[i]['highlight'] = this.listData.list[i]['value']
            .split(this.inputValue)
            .join('<span class="keyword">' + this.inputValue + '</span>');
        }
//        return data;
//
//
//        for(let i=0, len = this.listData.list.length; i < len; i++){
//          this.listData.list[i]['highlight'] = this.listData.list[i]['highlight']
//            .split(this.inputValue)
//            .join('<span class="keyword">' + this.inputValue + '</span>');
//        }
      },
      select(item){
        this.$emit('on-select', item);
      }
    }
  }
</script>

<style>
</style>

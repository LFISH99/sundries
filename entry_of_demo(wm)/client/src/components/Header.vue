<template>
  <div class="header">
    <div class="sub-header">
      <div class="logo"></div>
      <ul class="menu level-1">
        <li class="level-1" v-for="level1 in menu" :class="{active: level1.path == currentTag}">
          <p @click="activeTag(level1.path)">
            <router-link :to="level1.path">{{ level1.title }}</router-link>
          </p>
          <ul class="level-2">
            <li v-for="level2 in level1.children">
              <router-link :to='level2.path'>{{ level2.title }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header',
    data() {
      return {
        currentTag: '/enquiry',
        menu: [
          {
            title: '询价下单',
            path: '/enquiry',
            children: [
              {title: '实时询价', path: '/enquiry'},
              {title: '普通车下单', path: '/en'},
              {title: '监管车下单', path: '/#'},
              {title: '报价表下单（合作）', path: '/#'}
            ]
          },
          {
            title: '我的订单',
            path: '/test',
            children: [
              {title: '实时询价', path: '/test'},
              {title: '普通车下单', path: '/#'},
              {title: '监管车下单', path: '/#'},
            ]
          },
          {
            title: '公司管理',
            path: '/1',
            children: [
              {title: '实时询价', path: '/#'},
              {title: '报价表下单（合作）', path: '/#'}
            ]
          },
          {
            title: '帮助中心',
            path: '/2',
            children: [
              {title: '实时询价', path: '/#'},
              {title: '普通车下单', path: '/#'},
              {title: '监管车下单', path: '/#'},
            ]
          },
        ]
      }
    },
    mounted() {
      this.currentTag = this.$route.meta.menu;
    },
    methods: {
      activeTag(activeTag) {
        this.currentTag = activeTag;
      }
    }
  }
</script>

<style scoped="">
  .header{
    width: 100%;
  }
  .header:after{
    content: '';
    display: block;
    width: 100%;
    height: 60px;
    background: #08AFB9;
    box-shadow: 0 4px 6px 0 rgba(102,102,102,.2);
  }
  .sub-header{
    width: 1010px;
    display: flex;
    padding: 15px 0;
    align-items: stretch;
  }
  .logo{
    background: url("../assets/logo.png") center no-repeat;
    width: 206px;
    height: 40px;
    flex-shrink: 0;
    margin-right: 60px;
  }
  .menu{
    flex: 1;
    font-size: 2rem;
    position: relative;
  }
  .menu > .level-1{
    line-height: 40px;
    float: left;
    margin-right: 50px;
  }
  .menu > .level-1{
    color: #666;
  }
  .menu > .level-1 a:hover, .menu > .level-1.active {
    color: #08afb9;
  }
  .menu > .level-1 > .level-2{
    position: absolute;
    bottom: -72px;
    display: none;
    left: 0;
  }
  .menu > .active p{
    position: relative;
  }
  .menu > .active p:after{
    content: '';
    position: absolute;
    border-color: transparent transparent #08AFB9 transparent;
    border-style: solid;
    border-width: 15px 8px;
    bottom: -15px;
    left: 50%;
    margin-left: -4px;
  }
  .menu > .active > .level-2{
    display: block;
    width: 100%;
    line-height: 60px;
  }
  .menu > .level-1 > .level-2 a{
    transition: none;
    color: #fff;
    padding: .2em 0;
  }
  .menu > .level-1 > .level-2 a:hover,
  .menu > .level-1 > .level-2 .router-link-active{
    border-bottom: 2px #fff solid;
  }
  .menu > .level-1 > .level-2 > li{
    float: left;
    margin-right: 50px;
  }
</style>

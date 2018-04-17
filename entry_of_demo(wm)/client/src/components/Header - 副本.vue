<template>
  <div class="header">
    <div class="sub-header">
      <div class="logo"></div>
      <ul class="menu level-1">
        <li class="level-1 active">
          <p><router-link to="/enquiry">询价下单</router-link></p>
          <ul class="level-2">
            <li><router-link to="/enquiry">实时询价</router-link></li>
            <li><router-link to="/en">普通车下单</router-link></li>
            <li><router-link to="">监管车下单</router-link></li>
            <li><router-link to="/">报价表下单（合作）</router-link></li>
          </ul>
        </li>
        <li class="level-1">
          <p><router-link to="/en">我的订单</router-link></p>
          <ul class="level-2">
            <li><router-link to="/">实时询价</router-link></li>
            <li><router-link to="/">普通车下单</router-link></li>
            <li><router-link to="/">监管车下单</router-link></li>
            <li><router-link to="/">报价表下单（合作）</router-link></li>
          </ul>
        </li>
        <li class="level-1">
          <p><a href="#">公司管理</a></p>
          <ul class="level-2">
            <li>实时询价</li>
            <li>报价表下单（合作）</li>
          </ul>
        </li>
        <li class="level-1">
          <p><a href="#">帮助中心</a></p>
          <ul class="level-2">
            <li>实时询价</li>
            <li>普通车下单</li>
            <li>监管车下单</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        menu: [
          {
            title: '询价下单',
            children: [
              {title: '实时询价', path: '/enquiry'}
              {title: '普通车下单', path: '/enquiry'}
              {title: '监管车下单', path: '/enquiry'}
            ]
          }
        ]
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
    /*display: flex;*/
    flex: 1;
    /*width: 800px;*/
    /*text-align: center;*/
    font-size: 2rem;
    position: relative;
    /*justify-content:flex-start;*/
  }
  .menu > .level-1{
    /*flex: 1;*/
    /*flex-shrink: 0;*/
    line-height: 40px;
    float: left;
    margin-right: 50px;
  }
  .menu > .level-1{
    color: #666;
    /*position: relative;*/
  }
  .menu > .level-1 a:hover, .menu > .level-1.active {
    color: #08afb9;
  }

  .menu > .level-1 > .level-2{
    position: absolute;
    /*display: flex;*/
    bottom: -72px;
    display: none;
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
    /*flex: 1;*/
    float: left;
    margin-right: 50px;
  }

</style>

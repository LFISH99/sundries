<template>
  <div class="enquiry-content">
    <Tabs type="card" :animated="false">
      <TabPane label="普通车询价">
        <!--<car></car>-->
        <commom-car></commom-car>
      </TabPane>
      <TabPane label="监管车询价">标签二的内容</TabPane>
    </Tabs>
  </div>
</template>

<script>
  import commomCar from './enquiry-commom-car.vue'
  import Car from './enquiry/car.vue'
  import {Map} from '../config/map'

  export default {
    components: {Car, commomCar},
    beforeCreate () {
      if(!window.BMap){
        window.P_BMap = Map();
      }
    },
  }
</script>

<style scoped="">
  .enquiry-content{
    margin-top: 16px;
  }

</style>

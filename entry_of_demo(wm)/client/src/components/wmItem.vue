<template>
  <li class="icon-location">
    <span v-html="item.show"></span>
    <span class="sub-text" v-text="item.remark"></span>
  </li>
</template>

<script>
  export default {
    name: 'wm-item',
    props: {
      item: { type: Object, required: true }
    }
  }
</script>

<style>
</style>

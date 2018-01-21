<template>
  <div class="">
    <ul>
      <li v-for="(item,index) in tabs" :class="{active:index == num}" @click="tab(index)">{{item}}</li>
    </ul>
    <div class="tabCon">
        <div v-for='(itemCon,index) in tabContents' v-show=" index == num">{{itemCon}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        tabs: ["标题一", "标题二","标题三"],
        tabContents: ["内容一", "内容二","内容三"],
        num: 1
      }
    },
    created: function () {

    },
    methods: {
      tab(index) {
        this.num = index
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>

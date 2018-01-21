<template>
  <div class="tabWrapper">
    <div class="tab">
      <ul class="tabUl">
        <li v-for="(item,index) in tabs" :class="{selectTab:index == num}" @click="tab(index)">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      tabs: {
        type: Array
      }
    },
    data () {
      return {
        num: 0
      }
    },
    methods: {
      tab (index) {
        console.log('getIndex', index)
        this.num = index
        this.$emit('getIndex', this.num)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .tabWrapper {
    .tabUl{
      width:100%;
      display: -webkit-box;
      display: -moz-box;
      display:box;
      li {
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        box-flex:1;
        text-align:center;
        height:40px;
        line-height:40px;
        color:#ccc;
        font-size:16px;
      }
      li.selectTab{
        border-bottom: 0.08rem solid #4f77aa;
        color: #4f77aa;
      }
    }
    .tabCon li {
      background-color: white;
      padding: 0.266667rem;
      margin-top: 0.133333rem;
    }
  }

</style>

<template>
  <div class="">
    <ul class="noWorkUl">
      <li v-for='item in mobileList' @click="stayDetail()">
        <p><em :class="iconImg(item.flag)"></em><span>{{item.name}}</span><i class="date">{{item.date | formatDateNew}}</i></p>
        <p class="txt">{{item.txt}}</p>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDateNew} from '@/js/common'
  export default {
    props: {
      mobileList: {
        type: Array
      }
    },
    data () {
      return {
        className: ''
      }
    },
    filters: {
      formatDateNew (time) {
        return formatDateNew(time)
      }
    },
    methods: {
      iconImg (flag) {
        return 'icon' + (Number(flag) + 1)
      },
      stayDetail () {
        this.$router.push({path: '/purchaseInvoice'})
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .noWorkUl li{
    padding: 10px 0;
    background-color:white;
    margin-bottom:5px;
    overflow: hidden;
    position: relative;
  }
  .noWorkUl em{
    display: inline-block;
    background: url(../../assets/icons.png) no-repeat;
    background-size: auto 16px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    text-indent: -9999px;
    margin: 0 5px 0 10px;
  }
  .noWorkUl span{
    font-size: 14px;
    color: #101010;
    font-weight: bold;
  }
  .noWorkUl i{
    background: none;
    text-indent: 0;
    position: absolute;
    top: 10px;
    right: 10px;
    color: #666;
    font-size: 12px;
    white-space: nowrap;
    font-style: normal;
  }
  .noWorkUl p.txt{
    margin: 10px 0 0 30px;
    font-size:14px;
    color: #666;
  }
  .noWorkUl em.icon2{
    background-position: -19px 0;
  }
  .noWorkUl em.icon3{
    background-position: -41px 0;
  }
  .noWorkUl em.icon4{
    background-position: -61px 0;
  }
  .noWorkUl em.icon5{
    background-position: -82px 0;
  }
  .noWorkUl em.icon6{
    background-position: -102px 0;
  }
</style>

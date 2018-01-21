<template>
  <div class="">
    <table class="purchaseListDetail">
      <tr>
        <td>采购品名称：</td><td>1231231331313</td>
      </tr>
      <tr>
        <td>规格型号：</td><td>1231231331313</td>
      </tr>
      <tr>
        <td>需求机构：</td><td>1231231331313</td>
      </tr>
      <tr>
        <td>需求部门：</td><td>1231231331313</td>
      </tr>
      <tr>
        <td>预算机构：</td><td>1231231331313</td>
      </tr>
      <tr>
        <td>申请类型：</td><td>1231231331313</td>
      </tr>
      <tr>
        <td>申请项目：</td><td>1231231331313</td>
      </tr>
      <tr>
        <td>费用项目：</td><td>1231231331313</td>
      </tr>
      <tr>
        <td>订单数量：</td><td>1231231331313</td>
      </tr>
      <tr>
        <td>单位：</td><td>1231231331313</td>
      </tr>
      <tr>
        <td>单价：</td><td>1231231331313</td>
      </tr>
      <tr>
        <td>订单金额：</td><td>1231231331313</td>
      </tr>
      <tr>
        <td>本次报账数量：</td><td>1231231331313</td>
      </tr>
      <tr>
        <td>本次报账金额：</td><td>1231231331313</td>
      </tr>
    </table>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDateNew} from '@/js/common'

  export default {
    data () {
      return {
      }
    },
    methods: {
    },
    created: function () {
      document.title = '发票明细'
    },
    filters: {
      formatDateNew (time) {
        return formatDateNew(time)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .purchaseListDetail{
    width:100%;
    padding:10px 0px;
    font-size:14px;
    background:white;
  }
  .purchaseListDetail>tr>td{
    padding:10px;
  }
  .purchaseListDetail>tr>td:first-child{
    color:#99989d;
    width:40%;
  }
  .purchaseListDetail>tr>td:last-child{
    color:#17161d;
    width:60%;
  }
</style>

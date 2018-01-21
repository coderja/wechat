<template>
  <div class="">
    <div class="detailArea">
      <div class="detailDiv">
        <table class="detailList">
          <tr><td>需求机构：</td><td>洗衣粉</td></tr>
          <tr><td>需求部门：</td><td>洗衣粉</td></tr>
          <tr><td>预算机构：</td><td>洗衣粉</td></tr>
          <tr><td>预算部门：</td><td>洗衣粉</td></tr>
          <tr><td>本次订购数量：</td><td>洗衣粉</td></tr>
          <tr><td>本次订购金额：</td><td>洗衣粉</td></tr>
        </table>
      </div>
    </div>
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
      document.title = '采购订单明细'
    },
    filters: {
      formatDateNew (time) {
        return formatDateNew(time)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../less/detailArea.less';
</style>

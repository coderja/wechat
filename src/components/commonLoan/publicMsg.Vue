<template>
  <div class="detailArea">
    <div class="detailDiv">
      <table class="detailList">
        <tr><td>股东信息：</td><td>{{suggestsList.name}}</td></tr>
        <tr><td>规格型号：</td><td>return</td></tr>
       <!-- <tr><td>股东信息：</td><td>{{suggestsList.CLIENT_NAME}}</td></tr>
        <tr><td>规格型号：</td><td>{{msg.name1}}</td></tr>
        <tr><td>单价：</td><td>{{msg.name2}}</td></tr>
        <tr><td>数量：</td><td>{{msg.name3}}</td></tr>
        <tr><td>金额：</td><td>{{msg.name4}}</td></tr>
        <tr><td>备注：</td><td>{{msg.name5}}</td></tr>-->
      </table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      suggestsList: {
        type: Object
      }
    },
    methods: {
    },
    created: function () {
      console.log('//', this.msgLists)
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../less/sendButtonArea.less';
  @import '../../less/approvalArea.less';
  @import '../../less/detailArea.less';
  @import '../../less/invoiceListArea.less';
</style>

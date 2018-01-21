<template>
  <div class="">
    <ul class="orderUl">
      <li @click="toggleOrderParticulars()">
        <div :class="orderParticularsShow === true ? 'perTopDiv' : 'perDiv'">
          <p class="perTitle">订单详情</p>
        </div>
      </li>
      <table v-show="orderParticularsShow" class="purchaseList">
        <tr>
          <td>单据编号：</td><td>1231231331313</td>
        </tr>
        <tr>
          <td>订单类型：</td><td>1231231331313</td>
        </tr>
        <tr>
          <td>订单日期：</td><td>1231231331313</td>
        </tr>
        <tr>
          <td>订单状态：</td><td>1231231331313</td>
        </tr>
        <tr>
          <td>机构：</td><td>1231231331313</td>
        </tr>
        <tr>
          <td>创建人：</td><td>1231231331313</td>
        </tr>
        <tr>
          <td>岗位：</td><td>1231231331313</td>
        </tr>
        <tr>
          <td>部门：</td><td>1231231331313</td>
        </tr>
        <tr>
          <td>供应商名称：</td><td>1231231331313</td>
        </tr>
        <tr>
          <td>币种：</td><td>1231231331313</td>
        </tr>
        <tr>
          <td>总金额：</td><td>1231231331313</td>
        </tr>
        <tr>
          <td>附件数：</td><td>1231231331313</td>
        </tr>
        <tr>
          <td>管理部门：</td><td>1231231331313</td>
        </tr>
        <tr>
          <td>交货日期：</td><td>1231231331313</td>
        </tr>
        <tr>
          <td>采购合同：</td><td>1231231331313</td>
        </tr>
        <tr>
          <td>说明：</td><td>1231231331313</td>
        </tr>
        <tr class="btnOneTr">
          <td colspan="2">
            <input type="button" value="影像查看" @click="imageViewShowFun()"/>
          </td>
        </tr>
      </table>
      <li @click="toggleOrderDetail()">
        <div :class="orderDetailShow === true ? 'perTopDiv' : 'perDiv'">
          <p class="perTitle">明细</p>
        </div>
      </li>
      <ul class="orderDetailUl">
        <li>
          <div class="detailDiv" @click="jumpPurchaseOrderDetail()">
            <table class="purchaseList detailList detailListTrigger">
              <tr><td>采购品名称：</td><td>洗衣粉</td></tr>
              <tr><td>规格型号：</td><td>洗衣粉</td></tr>
              <tr><td>单价：</td><td>洗衣粉</td></tr>
              <tr><td>数量：</td><td>洗衣粉</td></tr>
              <tr><td>金额：</td><td>洗衣粉</td></tr>
              <tr><td>已报销金额：</td><td>洗衣粉</td></tr>
              <tr><td>已报销数量：</td><td>洗衣粉</td></tr>
              <tr><td>备注：</td><td>洗衣粉</td></tr>
            </table>
          </div>
        </li>
        <li>
          <div class="detailDiv">
            <table class="purchaseList detailList detailListTrigger">
              <tr><td>采购品名称：</td><td>洗衣粉</td></tr>
              <tr><td>规格型号：</td><td>洗衣粉</td></tr>
              <tr><td>单价：</td><td>洗衣粉</td></tr>
              <tr><td>数量：</td><td>洗衣粉</td></tr>
              <tr><td>金额：</td><td>洗衣粉</td></tr>
              <tr><td>已报销金额：</td><td>洗衣粉</td></tr>
              <tr><td>已报销数量：</td><td>洗衣粉</td></tr>
              <tr><td>备注：</td><td>洗衣粉</td></tr>
            </table>
          </div>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDateNew} from '@/js/common'

  export default {
    data () {
      return {
        orderParticularsShow: false,
        orderDetailShow: false
      }
    },
    methods: {
      toggleOrderParticulars: function () {
        this.orderParticularsShow = !this.orderParticularsShow
      },
      toggleOrderDetail: function () {
        this.orderDetailShow = !this.orderDetailShow
      },
      jumpPurchaseOrderDetail: function () {
        this.$router.push({path: '/purchaseOrderDetail'})
      }
    },
    created: function () {
      document.title = '来源订单'
    },
    filters: {
      formatDateNew (time) {
        return formatDateNew(time)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .purchaseList{
    width:355px;
    margin-left:10px;
    font-size:14px;
  }
  .purchaseList>tr:not(:last-child){
    border-bottom:2px solid #e8e7ed;
  }
  .purchaseList>tr>td{
    padding:10px 0px;
  }
  .purchaseList>tr>td:first-child{
    color:#99989d;
    width:40%;
  }
  .purchaseList>tr>td:last-child{
    color:#17161d;
    width:60%;
  }
  .orderUl>li{
    background:white;
    padding:10px;
    border-bottom:1px solid #e9e9e9;
  }
  .orderUl>li .perDiv{
    background:url(../../assets/zk@2x.png) no-repeat center right;
    background-size:16px 16px;
  }
  .orderUl>li .perTopDiv{
    background:url(../../assets/sq@2x.png) no-repeat center right;
    background-size:16px 16px;
  }
  .perTitle{
    font-size:16px;
    color:#4a4a4a;
  }
  .btnOneTr>td>input[type=button]{
    width:98%;
    background:#f89033;
    color:white;
    border-radius:5px;
    padding:10px 0px;
    text-align:center;
    outline:none;
    margin-left:1%;
  }
  .detailDiv{
    width:94%;
    margin:10px 3%;
    border-radius:10px;
    background:white;
    box-sizing:border-box;
  }
  .detailListTrigger{
    width:94%;
    background:white url(../../assets/jt@2x.png) no-repeat center right;
    background-size:16px 16px;
  }
  .detailList>tr{
    border-bottom:none !important;
  }
</style>

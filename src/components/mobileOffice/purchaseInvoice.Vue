<template>
  <div :class="wholeBtm === true ? 'wholdTwoDiv' : 'wholdDiv'">
    <!--发票列表区域开始-->
    <div class="invoiceListArea">
      <ul class="purchaseUl">
        <li @click="togglePurchase()">
          <div :class="purchaseShow === true ? 'perTopDiv' : 'perDiv'">
            <p class="contentP">采购应付发票———总额900元</p>
            <p>2017.07.12 10:00</p>
          </div>
        </li>
        <table v-show="purchaseShow" class="purchaseList">
          <tr>
            <td>单据编号：</td><td>1231231331313</td>
          </tr>
          <tr>
            <td>单据类型：</td><td>1231231331313</td>
          </tr>
          <tr>
            <td>报销日期：</td><td>1231231331313</td>
          </tr>
          <tr>
            <td>结算机构：</td><td>1231231331313</td>
          </tr>
          <tr>
            <td>部门：</td><td>1231231331313</td>
          </tr>
          <tr>
            <td>收款对象：</td><td>1231231331313</td>
          </tr>
          <tr>
            <td>收款方：</td><td>1231231331313</td>
          </tr>
          <tr>
            <td>报销人：</td><td>1231231331313</td>
          </tr>
          <tr>
            <td>币种：</td><td>1231231331313</td>
          </tr>
          <tr>
            <td>总金额：</td><td>1231231331313</td>
          </tr>
          <tr>
            <td>岗位：</td><td>1231231331313</td>
          </tr>
          <tr>
            <td>来源订单：</td><td>1231231331313</td>
          </tr>
          <tr>
            <td>附件数：</td><td>1231231331313</td>
          </tr>
          <tr>
            <td>收货/服务确认：</td><td>1231231331313</td>
          </tr>
          <tr>
            <td>描述：</td><td>1231231331313</td>
          </tr>
          <tr class="imageViewTr" v-show="imageViewShow">
            <td colspan="2">
              <div class="imageViewDiv">
                <table class="imageView">
                  <tr>
                    <td>DCIM001.jpg</td><td>190KB</td>
                  </tr>
                  <tr>
                    <td>DCIM001.jpg</td><td>190KB</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          <tr class="btnTr">
            <td colspan="2">
              <input type="button" value="影像查看" @click="imageViewShowFun()"/><input type="button" value="发票明细" @click="jumpDetailFun()"/><input type="button" value="来源订单" @click="jumpSourceOrderFun()"/>
            </td>
          </tr>
        </table>
          <li @click="toggleDetail()">
          <div :class="detailShow === true ? 'perTopDiv' : 'perDiv'">
            <p class="perTitle">明细</p>
          </div>
        </li>
        <!--明细区域开始-->
        <div class="detailArea">
          <div class="detailDiv" v-show="detailShow">
            <table class="detailList">
              <tr><td>采购品：</td><td>洗衣粉</td></tr>
              <tr><td>规格型号：</td><td>洗衣粉</td></tr>
              <tr><td>单价：</td><td>洗衣粉</td></tr>
              <tr><td>数量：</td><td>洗衣粉</td></tr>
              <tr><td>金额：</td><td>洗衣粉</td></tr>
              <tr><td>备注：</td><td>洗衣粉</td></tr>
            </table>
          </div>
        </div>
        <!--明细区域结束-->
        <li @click="toggleQuestion()">
          <div :class="questionShow === true ? 'perTopDiv' : 'perDiv'">
            <p class="perTitle">审批意见<span class="colorRed">2</span></p>
          </div>
        </li>
        <!--审批意见区域开始-->
        <div class="approvalArea">
          <ul class="questionUl" v-show="questionShow">
            <li>
              <div class="fl headImg">任</div>
              <div class="fl contentWord">
                <p><span>花建瑞</span><span>2017-11-10 12:21:33</span></p>
                <p>审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送</p>
              </div>
            </li>
            <li>
              <div class="fl headImg">任</div>
              <div class="fl contentWord">
                <p><span>花建瑞</span><span>2017-11-10 12:21:33</span></p>
                <p>审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送</p>
              </div>
            </li>
          </ul>
        </div>
        <!--审批意见区域结束-->
      </ul>
    </div>
    <!--发票列表区域结束-->
    <reply :btnList = "btnList" :ideaList="ideaList" v-on:getVal="getVal" v-on:getKey="getKey"></reply>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDateNew} from '@/js/common'
  import reply from '../commonComponent/reply'
  export default {
    data () {
      return {
        purchaseShow: false,
        detailShow: false,
        questionShow: false,
        imageViewShow: false,
        wholeBtm: false,
        showBtnContent: false,
        btnList: [],
        ideaList: [],
        selectBtn: false,
        selectKey: '',
        questionValue: '',
        suggestVal: '',
        val: ''
      }
    },
    components: {
      reply
    },
    methods: {
      togglePurchase: function () {
        this.purchaseShow = !this.purchaseShow
      },
      toggleDetail: function () {
        this.detailShow = !this.detailShow
      },
      toggleQuestion: function () {
        this.questionShow = !this.questionShow
      },
      imageViewShowFun: function () {
        this.imageViewShow = true
      },
      jumpDetailFun: function () {
        // this.$router.push({path: '/invoiceDetail', query: { MEE_ID: item.MEE_ID }})
        this.$router.push({path: '/invoiceDetail'})
      },
      jumpSourceOrderFun: function () {
        this.$router.push({path: '/sourceOrder'})
      },
      showBtn: function () {
        // 将下面按钮展示则总体距底部更高
        this.wholeBtm = true
        this.showBtnContent = true
      },
      selectFun: function (item) {
        this.selectKey = item.key
        this.questionValue = item.text
        console.log('////////', this.selectKey)
      },
      getVal (data) {
        if (data === '同意') {
          console.log('222')
        } else {
          console.log('11')
        }
      },
      getKey (key) {
        if (key === '0') {
          console.log('征求意见 ')
        } else {
          console.log('返回')
        }
      }
    },
    created: function () {
      document.title = '采购应付发票'
      this.btnList = [{key: '0', text: '同意'}, {key: '2', text: '不同意'}]
      this.ideaList = [{key: '1', text: '发送', src: require('../../assets/yijian@2x.png')}, {key: '0', text: '征求意见', src: require('../../assets/yijian@2x.png')}, {key: '2', text: '退回', src: require('../../assets/tuihui@2x.png')}]
    },
    filters: {
      formatDateNew (time) {
        return formatDateNew(time)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../less/sendButtonArea.less';
  @import '../../less/approvalArea.less';
  @import '../../less/detailArea.less';
  @import '../../less/invoiceListArea.less';
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
  .btnTr>td>input[type=button]{
    width:30%;
    background:#f89033;
    color:white;
    border-radius:5px;
    padding:10px 0px;
    text-align:center;
    outline:none;
    margin-right:5%;
  }
  .btnTr>td>input[type=button]:last-child{
    margin-right:0%;
  }
  .imageViewDiv{
    background:white;
    width:100%;
    border:2px solid #e9e9e9;
    border-radius:5px;
    box-sizing:border-box;
  }
  .imageView{
    width:100%;
  }
  .imageView>tr>td:first-child{
    color:#4f77aa;
    padding:10px;
  }
  .imageView>tr>td:last-child{
    color:#666666;
    text-align:right;
    padding:10px;
  }
  .imageViewTr{
    border:none !important;
  }
  .imageViewTr>td{
    padding-bottom:0px !important;
  }
  .btnContent{
    overflow:hidden;
    border-top:1px solid #cccccc;
  }
  .btnContent>div{
    width:45%;
    float:left;
    height:40px;
    line-height:40px;
    text-align:center;
    border-radius:5px;
    box-sizing:border-box;
    margin-top:10px;
    font-size:16px;
  }
  .btnContent>div>img{
    width:14px;
    height:14px;
    margin-right:15px;
  }
  .btnContent>div:first-child{
    background:#4f77aa;
    color:white;
    margin-right:10%;
  }
  .btnContent>div:nth-child(2){
    background:#ff784b;
    color:white;
  }
  .btnContent>div:nth-child(3){
    background:white;
    color:#4f77aa;
    margin-right:10%;
    border:1px solid #4f77aa;
  }
  .btnContent>div:nth-child(4){
    background:white;
    color:#ff784b;
    border:1px solid #ff784b;
  }
  .wholdDiv{
    margin-bottom:70px;
  }
  .wholdTwoDiv{
    margin-bottom:200px;
  }
</style>

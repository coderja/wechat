<template>
  <div  :class="[wholeBtm === true ? 'wholdTwoDiv' : 'wholdDiv','overflowX']">
    <!--发票列表区域开始-->
    <div class="invoiceListArea">
      <ul class="purchaseUl">
        <li @click="togglePurchase()">
          <div  :class="purchaseShow ==false ? 'perTopDiv':'perDiv'">
            <p class="contentP">采购应付发票———总额900元</p>
            <em class='icon3'></em>
            <p class="disInlieBlock">{{'20171110122133' | formatDateNew}}</p>
          </div>
        </li>
        <!--明细区域开始-->
        <div  v-if="!purchaseShow" class="detailArea">
          <div>
            <table class="detailList">
              <tr><td>标题：</td><td>采购应付发票———总额900元</td></tr>
              <tr><td>创建者：</td><td>张小琴</td></tr>
              <tr><td>创建时间：</td><td>{{'20171110122133' | formatDateNew}}</td></tr>
              <tr><td>内容：</td><td><a @click.preventDefault="alertPreview()" class="btn_link">点击预览>></a></td></tr>
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
                <p><span>花建瑞</span><span>{{'20171110122133' | formatDateNew}}</span></p>
                <p>审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送</p>
              </div>
            </li>
            <li>
              <div class="fl headImg">任</div>
              <div class="fl contentWord">
                <p><span>花建瑞</span><span>{{'20171110122133' | formatDateNew}}</span></p>
                <p>审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送审批发送</p>
              </div>
            </li>
          </ul>
        </div>
        <!--审批意见区域结束-->
      </ul>
    </div>
    <!--发票列表区域结束-->
    <reply :btnList = "btnList" :ideaList="ideaList" @getKey="rsvMsg" @getVal="getVal"></reply>
    <alertBox2btn  :alertContent="alertContent"   @getAlertKey="rsvAlertmsg" v-show="isAlert"></alertBox2btn>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
  import {formatDateNew} from '@/js/common'
  import reply from '../commonComponent/reply'
  import alertBox2btn from '../popUpBox/alertBox2btn'
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
        val: '',
        isAlert:false,
        isSureBack:false,
        alertContent:{}

      }
    },
   
    components: {
      reply,
      alertBox2btn
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
      rsvMsg (key) {
        if(key==2){
          this.isAlert=true
          this.alertContent = {'alertImg': 'background:url("./src/assets/oops@2x.png") no-repeat; background-size: 100% 100%;', 'title': '温馨提示', 'content': '确定退回？','btnWord': '确定', 'btnfail':'取消'}
        }
      },
      rsvAlertmsg (key) {
          if(key==0){
            this.isAlert = false
          }else{
            this.isSureBack = true;
            this.isAlert = false;
          }
      },
      jumpDetailFun: function () {
        // this.$router.push({path: '/invoiceDetail', query: { MEE_ID: item.MEE_ID }})
        this.$router.push({path: '/invoiceDetail'})
      },
      jumpSourceOrderFun: function () {
        this.$router.push({path: '/sourceOrder'})
      },
      alertPreview: function () {
        this.$router.push('/innerSiteNewPreview');
      },
      showBtn: function () {
        // 将下面按钮展示则总体距底部更高
        this.wholeBtm = true
        this.showBtnContent = true
      },
      selectFun: function (item) {
        this.selectKey = item.key
        this.questionValue = item.text
      },
      getVal (data) {
        if (data === '同意') {
          //console.log('222')
        } else {
          //console.log('11')
        }
      }
    },
    filters:{
      formatDateNew(str){
        return formatDateNew(str)
      }
    },
    created: function () {
      document.title = '采购应付发票'
      this.btnList = [{key: '0', text: '同意'}, {key: '2', text: '不同意'}]
      this.ideaList = [{key: '0', text: '征求意见', src: require('../../assets/yijian@2x.png')}, {key: '2', text: '退回', src: require('../../assets/tuihui@2x.png')}]
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
  
  .overflowX{
    overflow-x:hidden;
  }
  .disInlieBlock{
      display:inline-block;
  }
  em.icon3{
     background-position: -41px 0;
   }
  em{
    display: inline-block;
    background: url(../../assets/icons.png) no-repeat;
    background-size: auto 16px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    text-indent: -9999px;
    margin: 0 5px 0 10px;
  }
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
    -o-border-radius:5px;
    -ms-border-radius:5px;
    -moz-border-radius:5px;
    -webkit-box-sizing:border-box;
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
    font-weight:bold;
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
  .detailList tr td{
    border-bottom:1px solid #ddd;
  }
  table.detailList{
    width:94%;
  }
  .detailList .btn_link{
      cursor:pointer;
      color:#4F77AA;
      text-decoration:underline;
      outline:none;
      font-size:16px;
  }
  /*.purchaseUl,.invoiceListArea .purchaseUl > li {
      background:#F5F4F9 !important;
  }*/
</style>

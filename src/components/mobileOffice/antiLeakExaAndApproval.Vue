<template>
  <div :class="wholeBtm === true ? 'wholdTwoDiv' : 'wholdDiv'">
    <!--发票列表区域开始-->
    <div class="invoiceListArea">
      <ul class="purchaseUl">
        <li @click="togglePurchase()">
          <div :class="purchaseShow === true ? 'perTopDiv' : 'perDiv'">
            <p class="contentP">陈树鹏发起的泄密文件审批申请</p>
            <p>2017.07.12 10:00</p>
          </div>
        </li>
        <div v-show="purchaseShow">
          <table class="purchaseList">
            <tr>
              <td>标题：</td><td>1231231331313</td>
            </tr>
            <tr>
              <td>审批单号：</td><td>1231231331313</td>
            </tr>
            <tr>
              <td>审批类型：</td><td>1231231331313</td>
            </tr>
            <tr>
              <td>审批提交人：</td><td>1231231331313</td>
            </tr>
            <tr>
              <td>审批提交时间：</td><td>1231231331313</td>
            </tr>
            <tr>
              <td class="unique_td">审批结果：</td>
              <td>
                <ul class="radioUl">
                  <li v-for="item in radioCells" @click="setCheckValue(item)">
                    <button :class="checkKey === item.key ? 'opionion_radioSelect' : 'opionion_radioUnSelect'"></button>
                    <span class="opionion_span">{{item.text}}</span>
                  </li>
                </ul>
              </td>
            </tr>
          </table>
          <!--附件区域开始-->
          <div class="annexArea">
            <div class="newPre_Div">
              <div class="newPre_imgDiv"><img src="../../assets/file@2x.png" class="newPre_imgSize"/><span class="newPre_imgSpan"><span>3</span>个附件</span></div>
              <ul class="newPre_Ul">
                <li><a>LIST0001.jpg</a><span>(<span>300KB</span>)</span></li>
                <li><a>LIST0001.jpg</a><span>(<span>300KB</span>)</span></li>
                <li><a>LIST0001.jpg</a><span>(<span>300KB</span>)</span></li>
              </ul>
            </div>
          </div>
          <!--附件区域结束-->
        </div>
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
    <div class="sendButtonArea">
      <div class="sendMessage">
        <div class="send_btnDiv">
          <img src="../../assets/btn@2x.png" class="addImgSize" @click="showBtn()"/>
          <input type="text" class="questionInp" placeholder="回复..."/>
          <input type="button" value="发送" class="sendBtn"/>
        </div>
        <div class="btnContent" v-show="showBtnContent">
          <ul class="btnUl">
            <li class="selectBtnLi">同意</li>
            <li>已阅</li>
            <li>不同意</li>
            <li>同意请尽快办理</li>
            <li>同意reere</li>
          </ul>
          <ul class="jumpUl">
            <li><img src="../../assets/zhuanban@2x.png"/><span>转办</span></li>
            <li><img src="../../assets/yijian@2x.png"/><span>征求意见</span></li>
            <li class="selectJumpLi"><img src="../../assets/tuihui@2x.png"/><span>退回</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDateNew} from '@/js/common'
  export default {
    data () {
      return {
        purchaseShow: false,
        detailShow: false,
        questionShow: false,
        imageViewShow: false,
        wholeBtm: false,
        showBtnContent: false,
        radioCells: [],
        checkKey: '0'
      }
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
      setCheckValue: function (item) {
        this.checkKey = item.key
      }
    },
    created: function () {
      document.title = '采购应付发票'
      this.radioCells = [{key: '0', text: '同意'}, {key: '1', text: '不同意'}]
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
  @import '../../less/invoiceListArea.less';
  @import '../../less/annexArea.less';
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
  .ml0{
    margin-left:0px !important;
  }
  .opionion_radioSelect{
    background:url(../../assets/select_sel@2x.png);
    background-size:18px 18px;
    width:18px;
    height:18px;
    outline:none;
    border:none;
    position:relative;
    top:1px;
    margin-left:15px;
  }
  .opionion_radioUnSelect{
    background:url(../../assets/select_def@2x.png);
    background-size:18px 18px;
    width:18px;
    height:18px;
    outline:none;
    border:none;
    position:relative;
    top:1px;
    margin-left:15px;
  }
  .opionion_span{
    font-size:14px;
    margin-left:6px;
    position:relative;
    top:-2px;
  }
  .unique_td{
    position:relative;
    top:-0.1px;
  }
  .radioUl>li{
    float:left;
  }
  .radioUl>li:first-child>button{
    margin-left:0px;
  }
</style>

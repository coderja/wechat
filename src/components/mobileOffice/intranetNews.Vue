<template>
  <div :class="wholeBtm === true ? 'wholdTwoDiv' : 'wholdDiv'">
    <div class="invoiceListArea">
      <ul class="purchaseUl">
        <li @click="togglePurchase()">
          <div :class="purchaseShow === true ? 'perTopDiv' : 'perDiv'">
            <p class="contentP">苏行爱心捐款活动新闻</p>
            <p>2017.07.12 10:00</p>
          </div>
        </li>
        <table v-show="purchaseShow" class="purchaseList">
          <tr>
            <td>标题：</td><td>1231231331313</td>
          </tr>
          <tr>
            <td>创建者：</td><td>1231231331313</td>
          </tr>
          <tr>
            <td>创建时间：</td><td>1231231331313</td>
          </tr>
          <tr>
            <td>内容：</td><td><a href="" class="clickPreview">点击预览 >></a></td>
          </tr>
        </table>
        <li @click="toggleQuestion()">
          <div :class="questionShow === true ? 'perTopDiv' : 'perDiv'">
            <p class="perTitle">审批意见<span class="colorRed">2</span></p>
          </div>
        </li>
        <div v-show="questionShow" class="handoverListWord">
          <ul class="questionUl">
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
      </ul>
    </div>
    <!--按钮区域开始-->
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
            <li class="selectJumpLi"><img src="../../assets/zhuanban@2x.png"/><span>转办</span></li>
            <li><img src="../../assets/yijian@2x.png"/><span>征求意见</span></li>
            <li><img src="../../assets/tuihui@2x.png"/><span>退回</span></li>
          </ul>
        </div>
      </div>
    </div>
    <!--按钮区域结束-->
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDateNew} from '@/js/common'
  export default {
    data () {
      return {
        purchaseShow: false,
        questionShow: false,
        wholeBtm: false,
        showBtnContent: false
      }
    },
    methods: {
      togglePurchase: function () {
        this.purchaseShow = !this.purchaseShow
      },
      toggleQuestion: function () {
        this.questionShow = !this.questionShow
      },
      showBtn: function () {
        // 将下面按钮展示则总体距底部更高
        this.wholeBtm = true
        this.showBtnContent = true
      }
    },
    created: function () {
      document.title = '采购应付发票'
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
  @import '../../less/invoiceListArea.less';
  @import '../../less/handoverListWord.less';
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
  .detailList{
    width:100%;
  }
  .detailList>tr{
    border:none !important;
  }
  .detailDiv{
    width:94%;
    margin:10px 3%;
    border-radius:10px;
    border:2px solid #e7e6ea;
    background:white;
    box-sizing:border-box;
  }
  .wholdDiv{
    margin-bottom:70px;
  }
  .wholdTwoDiv{
    margin-bottom:200px;
  }
  a.clickPreview{
    color: #4f77aa;
    text-decoration: underline;
  }
</style>

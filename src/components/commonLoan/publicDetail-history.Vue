<template>
  <div>
    <!--发票列表区域开始-->
    <div class="invoiceListArea">
      <ul class="purchaseUl">
        <li @click="togglePurchase()">
          <div :class="purchaseShow === true ? 'perTopDiv' : 'perDiv'">
            <p class="contentP">关于印发《做好当前部分领域风险防控工作专项行动落实方案》的通告</p>
            <p>2017.07.12 10:00</p>
          </div>
        </li>
        <!--审批意见区域结束-->
        <div v-show="purchaseShow">
          <table class="purchaseList">
            <tr>
              <td>文本标题：</td><td>1231231331313</td>
            </tr>
            <tr>
              <td>公文文号：</td><td>1231231331313</td>
            </tr>
            <tr>
              <td>文件类型：</td><td>1231231331313</td>
            </tr>
            <tr>
              <td>传阅日期：</td><td>1231231331313</td>
            </tr>
            <tr>
              <td>传阅分发人：</td><td>1231231331313</td>
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
          <div class="docCir_btn">
            <button @click="alert()">查看正文</button><button @click="originalDetail">原审批单</button>
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
      </ul>
    </div>
    <!--回复组件-->
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDateNew} from '@/js/common'

  export default {
    data () {
      return {
        purchaseShow: false,
        questionShow: false,
        btnList: [],
        ideaList: []
      }
    },
    components: {
    },
    methods: {
      togglePurchase: function () {
        this.purchaseShow = !this.purchaseShow
      },
      toggleQuestion: function () {
        this.questionShow = !this.questionShow
      },
      originalDetail () {
        this.$router.push({path: '/documentCirculated/approvalSheetDetail'})
      },
      alert () {
        alert('下载附件')
      }
    },
    created: function () {
    },
    filters: {
      formatDateNew (time) {
        return formatDateNew(time)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
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
  .docCir_btn{
    width:351px;
    padding:12px;
  }
  .docCir_btn button{
    width:169px;
    height:36px;
    line-height:36px;
    margin-right:13px;
    text-align:center;
    background-image: linear-gradient(-180deg, #FAD961 0%, #F76B1C 100%);
    border-radius: 4px;
    color:#ffffff;
    font-size: 14px;
    outline:none;
    border:none;
  }
  .docCir_btn button:last-child{
    margin-right:0px;
  }
</style>

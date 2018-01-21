<template>
  <div :class="wholeBtm === true ? 'wholdTwoDiv' : 'wholdDiv'">
    <div class="sendButtonArea">
      <div class="sendMessage">
        <div class="send_btnDiv" v-for="(item, index) in ideaList" v-if="index==0">
          <img src="../../assets/btn@2x.png" class="addImgSize" @click="showBtn()"/>
          <input type="text" class="questionInp" placeholder="回复..." v-model="questionValue"/>
          <input type="button" v-model="item.text" class="sendBtn" @click="suggest(item.key)"/>
        </div>
        <div class="btnContent" v-show="showBtnContent">
          <ul class="btnUl">
            <li v-for="item in btnList" @click="selectFun(item)" :class="selectKey === item.key ? 'selectBtnLi' : ''">{{item.text}}</li>
          </ul>
          <ul class="jumpUl">
            <li v-show="index !== 0" v-for="(item, index) in ideaList"  @click="suggest(item.key)"><img :src="item.src"/><span>{{item.text}}</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable */
  import {formatDateNew} from '@/js/common'

  export default {
    props: {
      btnList: {
        type: Array
      },
      ideaList: {
        type: Array
      }
    },
    data () {
      return {
        purchaseShow: false,
        detailShow: false,
        questionShow: false,
        imageViewShow: false,
        wholeBtm: false,
        showBtnContent: false,
        selectBtn: false,
        selectKey: '',
        questionValue: '',
        suggestVal: '',
        sendVal: '发送',
        isShow: true
        //  btnList: [{key: '0', text: '同意'}, {key: '2', text: '不同意'}]
        // ideaList: [{key: '0', text: '征求意见', src: require('../../assets/yijian@2x.png')}, {key: '2', text: '退回', src: require('../../assets/tuihui@2x.png')}]
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
        this.wholeBtm = !this.wholeBtm
        this.showBtnContent = !this.showBtnContent
      },
      selectFun: function (item) {
        this.selectKey = item.key
        this.questionValue = item.text
      },
      suggest (key) {
        this.suggestVal = key
        this.$emit('getKey', this.suggestVal);
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
  .purchaseList>tr>td{padding:10px 0px;
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

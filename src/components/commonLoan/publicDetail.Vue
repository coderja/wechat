<template>
  <div>
    <!--发票列表区域开始-->
    <div class="invoiceListArea">
      <ul class="purchaseUl">
        <li @click="title()">
          <div :class="titleShow === true ? 'perTopDiv' : 'perDiv'">
            <p class="contentP">{{titleMsg}}</p>
            <p v-for="(item) in approveLists">{{item.END_TIMEP}}</p>
          </div>
        </li>
        <!--审批意见区域结束-->
        <!--<div v-show="titleShow" v-for="(CLIENT_NAME, BRANCH_NAME, RATE_LEVEL, CREDIT_TYPE ) in suggestsList">-->
        <div v-show="titleShow">
          <!--<public-msg :suggestsList="suggestsList"></public-msg>-->
          <table class="purchaseList" >
            <tr>
              <td>申请机构：</td><td>{{suggestsList.CLIENT_NAME}}</td>
            </tr>
            <tr>
              <td>客户名称：</td><td>{{suggestsList.BRANCH_NAME}}</td>
            </tr>
            <tr>
              <td>内部评级：</td><td>{{suggestsList.RATE_LEVEL}}</td>
            </tr>
            <tr>
              <td>授信类型：</td><td>{{suggestsList.CREDIT_TYPE}}</td>
            </tr>
            <tr>
              <td>币种：</td><td>{{suggestsList.CCY_NAME}}</td>
            </tr>
            <tr>
              <td>金额：</td><td>{{suggestsList.AMOUNT}}</td>
            </tr>
            <tr>
              <td>授信期限：</td><td>{{suggestsList.AUTH_TERM}}</td>
            </tr>
            <tr>
              <td>客户经理：</td><td>{{suggestsList.CUST_MANAGER_NAME}}</td>
            </tr>
            <tr>
              <td>法人代表：</td><td>{{suggestsList.LEGAL_CLIENT_NAME}}</td>
            </tr>
          </table>
          <div class="docCir_btn">
            <button @click="alert()">查看正文</button><button @click="originalDetail">原审批单</button>
          </div>
        </div>
        <!--明细区域结束-->
        <!--股东信息-->
        <li @click="guDong()">
          <div :class="titleShow === true ? 'perTopDiv' : 'perDiv'">
            <p class="contentP">股东信息</p>
          </div>
        </li>
        <div class="detailArea" v-show="guDongShow">
          <div class="detailDiv" v-for="stocker in stockerInfo">
            <table class="detailList">
              <tr><td>股东名称：</td><td>{{stocker.STOCKER_NAME}}</td></tr>
              <tr><td>持股比例：</td><td>{{stocker.HOLD_STOCK_PER}}</td></tr>
              <tr><td>投资类型：</td><td>{{stocker.INVEST_TYPE}}</td></tr>
              <tr><td>应出资金额：</td><td>{{stocker.OUGHT_INVEST_AMT}}</td></tr>
              <tr><td>实际投资金额：</td><td>{{stocker.ACTUAL_INVEST_AMT}}</td></tr>
            </table>
          </div>
        </div>
        <!--股东信息结束-->
        <!--授信产品-->
        <li @click="shouXin()">
          <div :class="titleShow === true ? 'perTopDiv' : 'perDiv'">
            <p class="contentP">授信产品</p>
          </div>
        </li>
        <div class="detailArea" v-show="shouXinShow">
          <div class="detailDiv" v-for="pro in proList">
            <table class="detailList">
              <tr><td>授信产品：</td><td>{{pro.CREDIT_PRODUCT}}</td></tr>
              <tr><td>金额：</td><td>{{pro.AMOUNT}}</td></tr>
              <tr><td>额度属性：</td><td>{{pro.LIMIT_ATTRIBUTE}}</td></tr>
              <tr><td>风险等级：</td><td>{{pro.RISK_LEVEL}}</td></tr>
              <tr><td>保证金比例：</td><td>{{pro.GUARANTEE_PER}}</td></tr>
              <tr><td>最高可用额度：</td><td>{{pro.HIGHEST_AVAIL_LIMIT}}</td></tr>
            </table>
          </div>
        </div>
        <!--授信产品结束-->
        <!--担保信息-->
        <li @click="danBao()">
          <div :class="titleShow === true ? 'perTopDiv' : 'perDiv'">
            <p class="contentP">担保信息</p>
          </div>
        </li>
        <div class="detailArea" v-show="danBaoShow">
          <div class="detailDiv" v-for="assure in assureList">
            <table class="detailList">
              <tr><td>担保类型：</td><td>{{assure.ASSURE_TYPE}}</td></tr>
              <tr><td>担保编号：</td><td>{{assure.GUARANTEE_NAME.slice(assure.GUARANTEE_NAME.indexOf(',')+1,assure.GUARANTEE_NAME.lastIndexOf(','))}}</td></tr>
              <tr><td>担保人名称：</td><td>{{assure.GUARANTEE_NAME.slice(0,assure.GUARANTEE_NAME.indexOf(','))}}</td></tr>
              <tr><td>担保额度：</td><td>{{assure.GUARANTEE_AMT}}</td></tr>
              <tr><td>担保追加标识：</td><td>{{assure.ASSURE_ADD_FLAG_NAME}}</td></tr>
            </table>
          </div>
        </div>
        <!--担保信息结束-->
        <!--业务文档-->
        <li @click="yeWu()">
          <div :class="titleShow === true ? 'perTopDiv' : 'perDiv'">
            <p class="contentP">业务文档</p>
          </div>
        </li>
        <!--业务文档结束-->
        <!--审批意见-->
        <li @click="yiJian()">
          <div :class="titleShow === true ? 'perTopDiv' : 'perDiv'">
            <p class="contentP">审批意见({{approveLists.length}})</p>
          </div>
        </li>
        <div class="approvalArea">
          <ul class="questionUl" v-show="yiJianShow">
            <li v-for="(approve) in approveLists">
              <div class="fl headImg">{{approve.USER_NAME.slice(0)}}</div>
              <div class="fl contentWord">
                <p><span>{{approve.USER_NAME}}</span><span>{{approve.END_TIMEP}}</span></p>
                <p>{{approve.APPROVE_SUGGEST}}</p>
              </div>
            </li>
          </ul>
        </div>
        <!--审批意见结束-->
        <!--<li @click="toggleQuestion(item.key)" v-for="(item,index) in tasks">
          <div :class="questionShow === true ? 'perTopDiv' : 'perDiv'">
            <p class="perTitle">{{item.name}}<span class="colorRed">{{item.num}}</span></p>
          </div>
        </li>-->


      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDateNew} from '@/js/common'
  import PublicMsg from '@/components/commonLoan/publicMsg'
  export default {
    props: {
      tasks: {
        type: Array
      },
      titleMsg: {
        type: String
      },
      approveLists: {
        type: Array
      },
      suggestsList: {
        type: Object
      },
      fileList: {
        type: Array
      },
      stockerInfo: {
        type: Array
      },
      proList: {
        type: Array
      },
      assureList: {
        type: Array
      }
    },
    data () {
      return {
        titleShow: true,
        yiJianShow: false,
        guDongShow: false,
        shouXinShow: false,
        danBaoShow: false,
        yeWuShow: false
//        tasks: [{name: '股东信息', key: 0}, {name: '授信产品', key: 1}, {name: '担保信息', key: 2},
//          {name: '业务文档', key: 3}, {name: '审批意见', key: 4}]
      }
    },
    components: {
      'public-msg': PublicMsg
    },
    methods: {
      title: function () {
        this.titleShow = !this.titleShow
      },
      guDong () {
        console.log('gudong')
        this.guDongShow = !this.guDongShow
      },
      shouXin () {
        this.shouXinShow = !this.shouXinShow
      },
      danBao () {
        this.danBaoShow = !this.danBaoShow
      },
      yeWu () {
        this.yeWuShow = !this.yeWuShow
      },
      yiJian () {
        this.yiJianShow = !this.yiJianShow
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

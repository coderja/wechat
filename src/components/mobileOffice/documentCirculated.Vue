<template>
  <div :class="reclyFlag === true ? 'signIn' : ''">
    <!--发票列表区域开始-->
    <div class="invoiceListArea">
      <ul class="purchaseUl">
        <li @click="togglePurchase()">
          <div :class="purchaseShow === true ? 'perTopDiv' : 'perDiv'">
            <p class="contentP">{{oagetDbListItem.title}}</p>
            <p>{{oagetDbListItem.strRecDate}}</p>
          </div>
        </li>
        <!--审批意见区域结束-->
        <div v-show="purchaseShow">
          <table class="purchaseList">
            <tr v-for='item in formDataBase'>
              <td>{{item.key}}</td><td>{{item.text}}</td>
            </tr>
            <tr v-show="this.oagetDbListItem.forwardPage === 'form_zhxz_fxmsp'">
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
          <div class="annexArea" v-show="listOffice.length !== 0">
            <div class="newPre_Div">
              <div class="newPre_imgDiv"><img src="../../assets/file@2x.png" class="newPre_imgSize"/><span class="newPre_imgSpan"><span>{{listOffice.length}}</span>个附件</span></div>
              <ul class="newPre_Ul">
                <li v-for='item in listOffice' @click="seeEnclosure(item)">
                  <a>{{item.title}}</a>
                  <span>(<span>{{item.fileSize}}</span>)</span>
                </li>
              </ul>
            </div>
          </div>
          <!--附件区域结束-->
          <div class="docCir_btnOne" v-show="this.listOffice.length !== 0">
            <button class="signInBtn active" @click="seeText()">查看正文</button>
          </div>
          <div class="docCir_btn">
            <button @click="seeText()">查看正文</button><button @click="originalDetail">原审批单</button>
          </div>
        </div>
        <!--明细区域结束-->
        <li @click="toggleQuestion()">
          <div :class="questionShow === true ? 'perTopDiv' : 'perDiv'">
            <p class="perTitle">审批意见<span class="colorRed">{{traceInfo.length}}</span></p>
          </div>
        </li>
        <!--审批意见区域开始-->
        <div class="approvalArea">
          <ul class="questionUl" v-show="questionShow">
            <li v-for='item in traceInfo'>
              <div class="fl headImg">{{item.userName.substring(0,1)}}</div>
              <div class="fl contentWord">
                <p><span>{{item.userName.substring(item.userName.lastIndexOf('/') + 1)}}</span><span>{{item.receiveDate}}</span></p>
                <p>{{item.userName.substring(0, item.userName.lastIndexOf('/'))}}<span>({{item.linkName}})</span></p>
                <p v-show="num === 1">{{item.userNote}}</p>
              </div>
            </li>
            <p class="noCanShow" v-show="traceInfo.length === 0">暂无符合条件记录</p>
          </ul>
        </div>
      </ul>
    </div>
    <!--回复组件-->
    <reply :btnList = "btnList" :ideaList="ideaList" v-on:getVal="getVal" v-on:getKey="getKey" v-show="num === 0"></reply>
    <!--已办事项收回-->
    <div class="footerBtn" v-show="reclyFlag"><button class="signInBtn active" @click="reclyFun()">收回</button></div>
    <!--confirm弹框-->
    <alertBox2btn :alertContent="alertContent" @getAlertKey="rsvAlertmsg" v-show="isConfirm"></alertBox2btn>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable */
  import {formatDateNew} from '@/js/common'
  import reply from '../commonComponent/reply'
  import axios from 'axios'
  import alertBox2btn from '@/components/popUpBox/alertBox2btn'
  export default {
    data () {
      return {
        purchaseShow: true,
        questionShow: false,
        btnList: [],
        ideaList: [],
        oagetDbListItem: {},
        formDataBase: {},
        reclyFlag: false,
        num: 0,
        isConfirm: false,
        traceInfo: [],
        listOffice: [],
        fileInfo: {},
        radioCells: [],
        checkKey: '0',
        listSelectNote: [],
        alertContent: {}
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
      toggleQuestion: function () {
        this.questionShow = !this.questionShow
      },
      originalDetail () {
        this.$router.push({path: '/documentCirculated/approvalSheetDetail'})
      },
      reclyFun () {
        this.isConfirm = true
        this.alertContent = {'alertImg': 'background:url("./src/assets/oops@2x.png") no-repeat; background-size: 100% 100%;', 'title': '温馨提示', 'content': '确定退回？','btnWord': '确定', 'btnfail':'取消'}
      },
      alert () {
        alert('下载附件')
      },
      getVal (data) {
        if (data === '同意') {
          this.$router.push({path: '/workContactSheet'})
        } else {
          console.log('11')
        }
      },
      getKey (key) {
        // 发送
        if (key === '0') {

        // 转办
        } else if (key === '1') {

        //征求意见
        } else if (key === '2') {

        //退回
        }else if (key === '3') {

        }
      },
      rsvAlertmsg (key) {
        if (key == 0) {
          this.isConfirm = false
        } else {
          // 点击确定调接口
          this.isConfirm = false
        }
      },
      getExaminationApproval (id) {
        var vm = this
        axios.get('/CorpWX/OA10015.do', {
          params: {
            formid: id
          }
        }).then(response => {
          var data = response.data.body
          if (data.errorCode === '0') {
            this.traceInfo = data.traceInfo
            if (vm.num === 1) {
              // 已办显示
              for (var j = 0; j < data.traceInfo.length; j++) {
                var info = data.traceInfo
                if (info[i].userNote === '') {
                  if (info[i].linkName.indexOf('撤销至') != -1) {
                    this.traceInfo.userNote = '收回。'
                  } else if (info[i].taskState.indexOf('结束办理') != -1) {
                    this.traceInfo.userNote = '结束办理。'
                  } else {
                    this.traceInfo.userNote = '正在办理。'
                  }
                }
              }
            }
          } else {
            alert(data.errorMsg)
          }
        }).catch(function (response) {
          alert(response)
        })
      },
      // 查看正文
      seeText () {
        axios.get('/CorpWX/OA10006.do', {
          params: {
            recordId: this.listOffice[0].recordId
          }
        }).then(response => {
          var data = response.data.body
          if (data.errorCode === '0') {

          } else {
            alert(data.errorMsg)
          }
        }).catch(function (response) {
          alert(response)
        })
      },
      seeEnclosure (item) {
        this.fileInfo = item
        axios.get('/CorpWX/OA10007.do', {
          params: {
            fileId: '1481160935907q97bo0ke36znplwpjdbyaz2i2co374hg77su'
          }
        }).then(response => {
          var data = response.data.body
          if (data.errorCode === '0') {

          } else {
            alert(data.errorMsg)
          }
        }).catch(function (response) {
          alert(response)
        })
      },
      setCheckValue: function (item) {
        this.checkKey = item.key
      }
    },
    created: function () {
      this.oagetDbListItem = this.$route.query.oagetDbListItem || {}
      this.reclyFlag = this.$route.query.reclyFlag
      this.num = this.$route.query.num || 0
      this.userId = this.$route.query.userId || ''
      var vm = this
      this.radioCells = [{key: '0', text: '同意'}, {key: '1', text: '不同意'}]
      document.title = '公文传阅'
      axios.get('/CorpWX/OA10003.do', {
        params: {
          userId: vm.userId,
          recid: vm.oagetDbListItem.workitemId
        }
      }).then(response => {
        var data = response.data.body
        if (data.errorCode === '0') {
          vm.listOffice = data.listOffice
          vm.listSelectNote = data.listSelectNote
          // 待办才有回复按钮区域
          if (this.num === 0) {
            for (var i = 0; i < vm.listSelectNote.length; i++) {
              this.btnList.push({key: vm.listSelectNote[i].caption, text: vm.listSelectNote[i].value})
            }
            // 是否发送
            if (data.canNextTask === 'true') {
              this.ideaList.push({key: '0', text: '发送'})
            }
            // 是否转办
            if (data.canTransfer === 'true') {
              this.ideaList.push({key: '1', text: '转办', src: require('../../assets/zhuanban@2x.png')})
            }
            // 是否允许征求意见
            if (data.canCollectNote === 'true') {
              this.ideaList.push({key: '2', text: '征求意见', src: require('../../assets/yijian@2x.png')})
            }
            // 是否退回
            if (data.canSendBack === 'true') {
              this.ideaList.push({key: '3', text: '退回', src: require('../../assets/tuihui@2x.png')})
            }
          }
          if (vm.oagetDbListItem.forwardPage === 'form_fawen') {
            document.title = '总行发文'
            // （附件 查看正文单按钮）
            vm.formDataBase = [{key: '主办单位：', text: data.formDataBase_draftDeptname},
                                 {key: '拟稿人：', text: data.formDataBase_drafterName},
                                 {key: '标题：', text: data.formDataBase_title},
                                 {key: '发文文号：', text: data.formDataBase_wordNo},
                                 {key: '保密期限：', text: data.formDataEntity_secretTime},
                                 {key: '事由：', text: data.formDataEntity_instruction},
                                 {key: '主送：', text: data.formDataEntity_mainsendDept},
                                 {key: '抄报：', text: data.formDataEntity_copyupDept},
                                 {key: '内部发送：', text: data.formDataEntity_innersendDept},
                                 {key: '打印：', text: data.formDataEntity_printNum},
                                 {key: '印发日期：', text: data.formDataEntity_printDate},
                                 {key: '联系人：', text: data.formDataEntity_contactPerson},
                                 {key: '联系电话：', text: data.formDataEntity_contactTel},
                                 {key: '会签部门：', text: data.formDataBase_huiqianDept}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_fawen_cz') {
            // 村镇发文
            vm.formDataBase = [{key: '主办单位：', text: data.formDataBase_draftDeptname},
                                 {key: '拟稿人：', text: data.formDataBase_drafterName},
                                 {key: '缓急：', text: data.formDataBase_priority},
                                 {key: '密级：', text: data.formDataBase_secretLevel},
                                 {key: '标题：', text: data.formDataBase_title},
                                 {key: '发文文号：', text: data.formDataBase_wordNo},
                                 {key: '会签部门：', text: data.formDataBase_huiqianDept},
                                 {key: '保密期限：', text: data.formDataEntity_secretTime},
                                 {key: '事由：', text: data.formDataEntity_instruction},
                                 {key: '主送：', text: data.formDataEntity_mainsendDept},
                                 {key: '抄报：', text: data.formDataEntity_copyupDept},
                                 {key: '内部发送：', text: data.formDataEntity_innersendDept},
                                 {key: '打印份数：', text: data.formDataEntity_printNum},
                                 {key: '印发日期：', text: data.formDataEntity_printDate},
                                 {key: '联系人：', text: data.formDataEntity_contactPerson},
                                 {key: '联系电话：', text: data.formDataEntity_contactTel}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_fawen_zgs') {
            // 子公司发文
            vm.formDataBase = [{key: '主办单位：', text: data.formDataBase_draftDeptname},
                                 {key: '拟稿人：', text: data.formDataBase_drafterName},
                                 {key: '缓急：', text: data.formDataBase_priority},
                                 {key: '密级：', text: data.formDataBase_secretLevel},
                                 {key: '标题：', text: data.formDataBase_title},
                                 {key: '发文文号：', text: data.formDataBase_wordNo},
                                 {key: '保密期限：', text: data.formDataEntity_secretTime},
                                 {key: '事由：', text: data.formDataEntity_instruction},
                                 {key: '主送：', text: data.formDataEntity_mainsendDept},
                                 {key: '抄报：', text: data.formDataEntity_copyupDept},
                                 {key: '内部发送：', text: data.formDataEntity_innersendDept},
                                 {key: '打印份数：', text: data.formDataEntity_printNum},
                                 {key: '印发日期：', text: data.formDataEntity_printDate},
                                 {key: '联系人：', text: data.formDataEntity_contactPerson},
                                 {key: '联系电话：', text: data.formDataEntity_contactTel},
                                 {key: '会签部门：', text: data.formDataBase_huiqianDept}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_fawen_qy' || vm.oagetDbListItem.forwardPage === 'form_fawen_zh') {
            // 区域发文 与总部发文一样
            vm.formDataBase = [{key: '主办单位：', text: data.formDataBase_draftDeptname},
                                 {key: '拟稿人：', text: data.formDataBase_drafterName},
                                 {key: '标题：', text: data.formDataBase_title},
                                 {key: '发文文号：', text: data.formDataBase_wordNo},
                                 {key: '保密期限：', text: data.formDataEntity_secretTime},
                                 {key: '事由：', text: data.formDataEntity_instruction},
                                 {key: '主送：', text: data.formDataEntity_mainsendDept},
                                 {key: '抄报：', text: data.formDataEntity_copyupDept},
                                 {key: '内部发送：', text: data.formDataEntity_innersendDept},
                                 {key: '打印：', text: data.formDataEntity_printNum},
                                 {key: '印发日期：', text: data.formDataEntity_printDate},
                                 {key: '联系人：', text: data.formDataEntity_contactPerson},
                                 {key: '联系电话：', text: data.formDataEntity_contactTel},
                                 {key: '会签部门：', text: data.formDataBase_huiqianDept}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_fwen_nb') {
            // 内部发文
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '编号：', text: data.formDataBase_wordNo},
                                 {key: '拟稿人：', text: data.formDataBase_drafterName},
                                 {key: '事由：', text: data.formDataEntity_reason},
                                 {key: '主送：', text: data.formDataEntity_mainSend},
                                 {key: '抄报：', text: data.formDataEntity_copyReport},
                                 {key: '内部发送：', text: data.formDataEntity_innerSend},
                                 {key: '打印份数：', text: data.formDataEntity_printNum},
                                 {key: '印发日期：', text: data.formDataEntity_printDate},
                                 {key: '联系人：', text: data.formDataEntity_linkPerson},
                                 {key: '联系电话：', text: data.formDataEntity_linkTel}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_gongwenchuanyue') {
            // 总行督办
            this.formDataBase = [{key: '督办登记号：', text: data.formDataBase_wordNo},
                                 {key: '相关文号：', text: data.formDataEntity_relatedNo},
                                 {key: '拟稿时间：', text: data.formDataBase_draftDate},
                                 {key: '拟稿人：', text: data.formDataBase_drafterName},
                                 {key: '督办事项截止日期：', text: data.formDataEntity_endTime},
                                 {key: '事项：', text: data.formDataBase_title}]
          } else if (vm.oagetDbListItem.forwardPage === 'zhxz_zhdaxh') {
            // 总行档案销毁
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '申请部门：', text: data.formDataBase_draftDeptname},
                                 {key: '拟稿日期：', text: data.formDataBase_draftDate},
                                 {key: '拟稿人：', text: data.formDataBase_drafterName},
                                 {key: '事由：', text: data.formDataEntity_instruction}]
          } else if (vm.oagetDbListItem.forwardPage === '') {
            // 总行印章使用申请  （附件 查看正文单按钮）
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '编号：', text: data.formDataBase_wordNo},
                                 {key: '拟稿时间：', text: data.formDataBase_draftDate},
                                 {key: '申请人：', text: data.formDataBase_drafterName},
                                 {key: '申请部门：', text: data.formDataBase_draftDeptname},
                                 {key: '是否已签批：', text: data.formDataEntity_isApprove},
                                 {key: '是否在线盖章：', text: data.formDataEntity_isSealOnline},
                                 {key: '申请印章名称：', text: data.formDataEntity_sealName},
                                 {key: '线下用印说明：', text: data.formDataEntity_sealDetail},
                                 {key: '用印描述：', text: data.formDataEntity_instruction},
                                 {key: '用印材料份数：', text: data.formDataEntity_sealCopy},
                                 {key: '用印次数：', text: data.formDataEntity_useTimes}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_zgs_yzsy') {
            // 子公司用印申请
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '编号：', text: data.formDataBase_wordNo},
                                 {key: '拟稿时间：', text: data.formDataBase_draftDate},
                                 {key: '申请人：', text: data.formDataBase_drafterName},
                                 {key: '申请部门：', text: data.formDataBase_draftDeptname},
                                 {key: '申请印章名称：', text: data.formDataEntity_zgsSealName},
                                 {key: '用印内容：', text: data.formDataEntity_sealDetail},
                                 {key: '使用说明：', text: data.formDataEntity_instruction},
                                 {key: '用印材料份数：', text: data.formDataEntity_sealCopy},
                                 {key: '用印次数：', text: data.formDataEntity_useTimes},
                                 {key: '用印种类：', text: data.formDataEntity_sealKind},
                                 {key: '是否已签批：', text: data.formDataEntity_isApprove}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_zgs_hbhsp') {
            // 子公司行办会议案
            this.formDataBase = [{key: '议案名称：', text: data.formDataBase_title},
                                 {key: '上报单位：', text: data.formDataBase_draftDeptname},
                                 {key: '上报时间：', text: data.formDataBase_draftDate},
                                 {key: '收报时间：', text: data.formDataEntity_getTime}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_zgs_gzsh_hgb') {
            // 子公司规章审核
            this.formDataBase = [{key: '规章名称：', text: data.formDataBase_title},
                                 {key: '审核编号：', text: data.formDataBase_wordNo},
                                 {key: '规章制定需求：', text: data.formDataEntity_rulesMakeneed},
                                 {key: '规章层级：', text: data.formDataEntity_rulesLevel},
                                 {key: '流水号：', text: data.formDataEntity_lwwenhao},
                                 {key: '制定要求：', text: data.formDataEntity_makeRequire},
                                 {key: '规章所涉机构或部门名称：', text: data.formDataEntity_rulesReferdept}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_zbyzsy') {
            // 总部印章使用申请
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '编号：', text: data.formDataBase_wordNo},
                                 {key: '拟稿时间：', text: data.formDataBase_draftDate},
                                 {key: '申请人：', text: data.formDataBase_drafterName},
                                 {key: '申请部门：', text: data.formDataBase_draftDeptname},
                                 {key: '申请印章名称：', text: data.formDataEntity_zbSealName},
                                 {key: '用印内容：', text: data.formDataEntity_sealDetail},
                                 {key: '使用说明：', text: data.formDataEntity_instruction},
                                 {key: '用印材料份数：', text: data.formDataEntity_sealCopy},
                                 {key: '用印次数：', text: data.formDataEntity_useTimes}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_xdck') {
            // 协定存款
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '拟稿时间：', text: data.formDataBase_draftDate},
                                 {key: '拟稿部门：', text: data.formDataBase_draftDeptname},
                                 {key: '工作要求：', text: data.formDataEntity_workRequest}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_tz') {
            // 通知公告
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '发起部门：', text: data.formDataEntity_fqDept},
                                 {key: '拟稿人：', text: data.formDataBase_drafterName},
                                 {key: '拟稿日期：', text: data.formDataBase_draftDate},
                                 {key: '编号：', text: data.formDataBase_wordNo},
                                 {key: '通知类型：', text: data.formDataEntity_tzType},
                                 {key: '是否漂浮：', text: data.formDataEntity_isFloat},
                                 {key: '通告内容：', text: data.formDataEntity_noticeContent},
                                 {key: '查看部门/人员：', text: data.formDataEntity_dispatchName}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_sxsqsp') {
            // 稽核审计部事项申请审批
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '编号：', text: data.formDataBase_wordNo},
                                 {key: '拟稿人：', text: data.formDataBase_drafterName},
                                 {key: '拟稿日期：', text: data.formDataBase_draftDate},
                                 {key: '事项内容：', text: data.formDataEntity_matterContent}]
          } else if (vm.oagetDbListItem.forwardPage === 'zhxz_sjbg') {
            // 稽核审计部审计报告
            this.formDataBase = [{key: '项目名称：', text: data.formDataBase_title},
                                 {key: '项目日期：', text: data.formDataEntity_projectDate},
                                 {key: '编号：', text: data.formDataBase_wordNo},
                                 {key: '审计时间范围：', text: data.formDataEntity_checkTimescope},
                                 {key: '审计方式：', text: data.formDataEntity_checkWay},
                                 {key: '项目审批人：', text: data.formDataEntity_projectApprover},
                                 {key: '审计依据：', text: data.formDataEntity_checkAccording},
                                 {key: '组长：', text: data.formDataEntity_teamLeader},
                                 {key: '主稽人：', text: data.formDataEntity_mainCheckperson},
                                 {key: '组员：', text: data.formDataEntity_teamMember}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_lilv') {
            // 利率审批
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '拟稿部门：', text: data.formDataBase_draftDeptname},
                                 {key: '拟稿时间：', text: data.formDataBase_draftDate},
                                 {key: '审批编号：', text: data.formDataBase_wordNo},
                                 {key: '业务类型：', text: data.formDataEntity_bizType},
                                 {key: '工作要求：', text: data.formDataEntity_workRequest}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_kjxq') {
            // 科技需求申请
            this.formDataBase = [{key: '需求名称：', text: data.formDataBase_title},
                                 {key: '申请部门：', text: data.formDataBase_draftDeptname},
                                 {key: '申请日期：', text: data.formDataBase_draftDate},
                                 {key: '申请人：', text: data.formDataBase_drafterName},
                                 {key: '联系电话：', text: data.formDataEntity_drafterTel},
                                 {key: '是否需要外包协助测试：', text: data.formDataEntity_isOut},
                                 {key: '需求编号：', text: data.formDataEntity_requireNo},
                                 {key: '需求概述：', text: data.formDataEntity_summary},
                                 {key: '工作量分摊信息：', text: data.formDataEntity_workShare},
                                 {key: '需求关联部门及关联人员：', text: data.formDataEntity_relevntInfo},
                                 {key: '测试验收负责人：', text: data.formDataEntity_bsManager},
                                 {key: '测试验收部门：', text: data.formDataEntity_bsManagerDept},
                                 {key: '科技开发负责人：', text: data.formDataEntity_devManager},
                                 {key: '科技开发中心：', text: data.formDataEntity_devManagerDept},
                                 {key: '需求质量管理人：', text: data.formDataEntity_qcManager},
                                 {key: '需求质量中心：', text: data.formDataEntity_qcManagerDept},
                                 {key: '计划上线日期：', text: data.formDataEntity_planOnlineDate}]
          } else if (vm.oagetDbListItem.forwardPage === 'zhxz_hyssysq') {
            // 会务接待申请
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '申请部门：', text: data.formDataBase_draftDeptname},
                                 {key: '申请日期：', text: data.formDataBase_draftDate},
                                 {key: '经办人：', text: data.formDataBase_drafterName},
                                 {key: '手机号：', text: data.formDataEntity_managerTel},
                                 {key: '会议主题：', text: data.formDataEntity_meetingTheme},
                                 {key: '会议人数：', text: data.formDataEntity_meetingPersonnum},
                                 {key: '拟使用会议场所：', text: data.formDataEntity_planusePlace},
                                 {key: '横幅内容：', text: data.formDataEntity_bannerContent},
                                 {key: '横幅位置：', text: data.formDataEntity_bannerLocate},
                                 {key: '主席台座位数：', text: data.formDataEntity_mainstageNum},
                                 {key: '是否需要发言席：', text: data.formDataEntity_isRequirespeak},
                                 {key: '会桌摆放形式：', text: data.formDataEntity_deskForm},
                                 {key: '是否需要视频：', text: data.formDataEntity_isNeedVideo},
                                 {key: '需连接机构：', text: data.formDataEntity_needConnectDept},
                                 {key: '话筒数量：', text: data.formDataEntity_tubeNum},
                                 {key: '是否需要投影仪：', text: data.formDataEntity_isNeedprojector},
                                 {key: '是否需要席位卡：', text: data.formDataEntity_isNeedseatca},
                                 {key: '主席台鲜花数量：', text: data.formDataEntity_mainstageFlowernum},
                                 {key: '摆放位置：', text: data.formDataEntity_putLocate},
                                 {key: '水果份数：', text: data.formDataEntity_fruitNum},
                                 {key: '毛巾份数：', text: data.formDataEntity_troelNum},
                                 {key: '茶水份数：', text: data.formDataEntity_isWater},
                                 {key: '矿泉水份数：', text: data.formDataEntity_waterNum},
                                 {key: '是否就餐：', text: data.formDataEntity_isDinner},
                                 {key: '餐厅类别：', text: data.formDataEntity_ctType},
                                 {key: '是否使用餐券：', text: data.formDataEntity_isUseTicket},
                                 {key: '用餐类别：', text: data.formDataEntity_dinnerType},
                                 {key: '用餐人数：', text: data.formDataEntity_dinnerPersonNum},
                                 {key: '会议时间：', text: data.formDataEntity_startTime},
                                 {key: '需求：', text: data.formDataEntity_remark}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_htba_zh') {
            // 总行合同备案
            this.formDataBase = [{key: '合同名称：', text: data.formDataBase_title},
                                 {key: '合同承办部门：', text: data.formDataEntity_contractManagedept},
                                 {key: '合同承办人：', text: data.formDataEntity_contractManager},
                                 {key: '合同类型：', text: data.formDataEntity_contractKind},
                                 {key: '合同标的额：', text: data.formDataEntity_contractMoney},
                                 {key: '合同相对方：', text: data.formDataEntity_contractOpposite},
                                 {key: '备案申请人：', text: data.formDataEntity_contractThirdperson},
                                 {key: '备案日期：', text: data.formDataEntity_recordDate},
                                 {key: '申请备案日期：', text: data.formDataBase_draftDate},
                                 {key: '备案结果：', text: data.formDataEntity_recordResult},
                                 {key: '编号：', text: data.formDataBase_wordNo}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_htba_qy' || vm.oagetDbListItem.forwardPage === 'form_zhxz_htba_fh') {
            // 区域合同备案  和  总部合同备案
            this.formDataBase = [{key: '合同名称：', text: data.formDataBase_title},
                                 {key: '合同承办部门：', text: data.formDataEntity_contractManagedept},
                                 {key: '合同承办人：', text: data.formDataEntity_contractManager},
                                 {key: '合同类型：', text: data.formDataEntity_contractKind},
                                 {key: '合同标的额：', text: data.formDataEntity_contractMoney},
                                 {key: '合同相对方：', text: data.formDataEntity_contractOpposite},
                                 {key: '备案申请人：', text: data.formDataEntity_contractThirdperson},
                                 {key: '备案日期：', text: data.formDataEntity_recordDate},
                                 {key: '申请备案日期：', text: data.formDataBase_draftDate},
                                 {key: '备案结果：', text: data.formDataEntity_recordResult},
                                 {key: '编号：', text: data.formDataBase_wordNo}]
          } else if (vm.oagetDbListItem.forwardPage === 'zhxz_ht_zh') {
            // 总行合同审核
            this.formDataBase = [{key: '合同名称：', text: data.formDataBase_title},
                                 {key: '合同承办部门：', text: data.formDataBase_draftDeptname},
                                 {key: '合同承办人：', text: data.formDataBase_drafterName},
                                 {key: '合同使用单位：', text: data.formDataEntity_contractUsedept},
                                 {key: '是否需要送审：', text: data.formDataEntity_isSend},
                                 {key: '送审编号：', text: data.formDataEntity_lwwenhao},
                                 {key: '是否是我行的格式合同：', text: data.formDataEntity_isStandardcontract},
                                 {key: '合同相对方：', text: data.formDataEntity_contractOpposite},
                                 {key: '合同标的额：', text: (data.formDataEntity_contractMoney + ' ' + data.formDataEntity_enterTimeHour + '时' + data.formDataEntity_enterTimeMin + '分')},
                                 {key: '审核编号：', text: (data.formDataEntity_wordNo + ' ' + data.formDataEntity_validateHour + '时' + data.formDataEntity_validateMin + '分')},
                                 {key: '合同类型：', text: data.formDataEntity_contractKind},
                                 {key: '送审时间：', text: data.formDataEntity_sendTime},
                                 {key: '完审时间：', text: data.formDataEntity_finishTime},
                                 {key: '合同份数：', text: data.formDataEntity_checkNo},
                                 {key: '合同背景及立项说明：', text: data.formDataEntity_contractsetupStatement}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_ht_qy') {
            // 区域合同审核
            this.formDataBase = [{key: '合同名称：', text: data.formDataBase_title},
                                 {key: '合同承办部门：', text: data.formDataBase_draftDeptname},
                                 {key: '合同承办人：', text: data.formDataBase_drafterName},
                                 {key: '合同使用单位：', text: data.formDataEntity_contractUsedept},
                                 {key: '是否需要送审：', text: data.formDataEntity_isSend},
                                 {key: '送审编号：', text: data.formDataEntity_lwwenhao},
                                 {key: '我行格式的合同：', text: data.formDataEntity_isStandardcontract},
                                 {key: '合同相对方：', text: data.formDataEntity_contractOpposite},
                                 {key: '合同标的额：', text: data.formDataEntity_contractMoney},
                                 {key: '审核编号：', text: data.formDataBase_wordNo},
                                 {key: '合同类型：', text: data.formDataEntity_contractKind},
                                 {key: '送审时间：', text: data.formDataEntity_sendTime},
                                 {key: '完审时间：', text: data.formDataEntity_finishTime},
                                 {key: '送审合同份数：', text: data.formDataEntity_checkNo},
                                 {key: '背景及立项说明：', text: data.formDataEntity_contractsetupStatement},
                                 {key: '会签部门：', text: data.formDataBase_huiqianDept}]
          } else if (vm.oagetDbListItem.forwardPage === 'zhxz_ht_fh') {
            // 总部合同审核
            this.formDataBase = [{key: '合同名称：', text: data.formDataBase_title},
                                 {key: '合同承办部门：', text: data.formDataBase_draftDeptname},
                                 {key: '合同承办人：', text: data.formDataBase_drafterName},
                                 {key: '合同使用单位：', text: data.formDataEntity_contractUsedept},
                                 {key: '是否需要送审：', text: data.formDataEntity_isSend},
                                 {key: '送审编号：', text: data.formDataEntity_lwwenhao},
                                 {key: '是否我行格式的合同：', text: data.formDataEntity_isStandardcontract},
                                 {key: '合同相对方：', text: data.formDataEntity_contractOpposite},
                                 {key: '合同标的额：', text: data.formDataEntity_contractMoney},
                                 {key: '审核编号：', text: data.formDataBase_wordNo},
                                 {key: '合同类型：', text: data.formDataEntity_contractKind},
                                 {key: '送审时间：', text: data.formDataEntity_sendTime},
                                 {key: '完审时间：', text: data.formDataEntity_finishTime},
                                 {key: '送审合同份数：', text: data.formDataEntity_checkNo},
                                 {key: '合同背景及立项说明：', text: data.formDataEntity_contractsetupStatement},
                                 {key: '会签部门：', text: data.formDataBase_huiqianDept}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_gzsh_zh') {
            // 总部规章审核
            this.formDataBase = [{key: '规章名称：', text: data.formDataBase_title},
                                 {key: '审核编号：', text: data.formDataBase_wordNo},
                                 {key: '规章制定需求：', text: data.formDataEntity_rulesMakeneed},
                                 {key: '规章层级：', text: data.formDataEntity_rulesLevel},
                                 {key: '流水号：', text: data.formDataEntity_lwwenhao},
                                 {key: '是否跨事业总部或涉及总行：', text: data.formDataEntity_isSkipDept},
                                 {key: '制定要求：', text: data.formDataEntity_makeRequire},
                                 {key: '规章所涉机构或部门名称：', text: data.formDataEntity_rulesReferdept}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_gzlxd_zb') {
            // 总部工作联系单
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '需求部门：', text: data.formDataBase_draftDeptname},
                                 {key: '经办人：', text: data.formDataBase_drafterName},
                                 {key: '工作要求：', text: data.formDataEntity_requirement}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_gbjssp') {
            // 分支机构干部晋升审批
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '编号：', text: data.formDataBase_wordNo},
                                 {key: '申请机构：', text: data.formDataEntity_rulesMakeneed},
                                 {key: '申请时间：', text: data.formDataEntity_rulesLevel}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_fxmsp') {
            // 防泄密审批  (1同意 2不同意单选框)
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '审批单号：', text: data.formDataEntity_taskId},
                                 {key: '审批类型：', text: data.formDataEntity_taskName},
                                 {key: '审批提交人：', text: data.formDataBase_drafterName},
                                 {key: '审批提交时间：', text: data.formDataEntity_taskTime}]
          } else if (vm.oagetDbListItem.forwardPage === 'zhxz_dzjsx') {
            // 电子介绍信
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '编号：', text: data.formDataBase_wordNo},
                                 {key: '接收机构：', text: data.formDataEntity_receiveInstitute},
                                 {key: '网点名称：', text: data.formDataEntity_websiteName},
                                 {key: '人员名称：', text: data.formDataEntity_personName},
                                 {key: '人员单位：', text: data.formDataEntity_personDept},
                                 {key: '人员数量：', text: data.formDataEntity_personNum},
                                 {key: '进入时间：', text: data.formDataEntity_enterTime},
                                 {key: '有效期：', text: data.formDataEntity_validate},
                                 {key: '身份证号码：', text: data.formDataEntity_identitycardNo},
                                 {key: '事由：', text: data.formDataEntity_reason}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_dyzzgxzj') {
            // 党员组织关系转接
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '编号：', text: data.formDataBase_wordNo},
                                 {key: '接收机构名称：', text: data.formDataEntity_receiveInstitutename},
                                 {key: '党员姓名：', text: data.formDataEntity_outerPersonname},
                                 {key: '拟稿时间：', text: data.formDataBase_draftDate},
                                 {key: '转出党支部名称：', text: data.formDataEntity_outerpartyName},
                                 {key: '转入党支部名称：', text: data.formDataEntity_importpartyName},
                                 {key: '党费缴纳截止年份：', text: data.formDataEntity_year},
                                 {key: '月份：', text: data.formDataEntity_month},
                                 {key: '介绍信有效天数：', text: data.formDataEntity_letterValiddays},
                                 {key: '党员性质：', text: data.formDataEntity_partymemberProperty}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_dyzzgxzc') {
            // 党员组织关系转出
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '编号：', text: data.formDataBase_wordNo},
                                 {key: '接收机构名称：', text: data.formDataEntity_receiveInstitutename},
                                 {key: '转出人姓名：', text: data.formDataEntity_outerPersonname},
                                 {key: '年龄：', text: data.formDataEntity_age},
                                 {key: '民族：', text: data.formDataEntity_nation},
                                 {key: '性别：', text: data.formDataEntity_sex},
                                 {key: '身份证号码：', text: data.formDataEntity_indentitycardNo},
                                 {key: '党员性质：', text: data.formDataEntity_partymemberProperty},
                                 {key: '党费缴纳截止年份：', text: data.formDataEntity_year},
                                 {key: '月份：', text: data.formDataEntity_month},
                                 {key: '介绍信有效天数：', text: data.formDataEntity_letterValiddays},
                                 {key: '发起时间：', text: data.formDataEntity_beginTime},
                                 {key: '党员联系方式：', text: data.formDataEntity_partylinkWay},
                                 {key: '转出机构名称：', text: data.formDataEntity_outerInstituteName},
                                 {key: '转出单位联系电话：', text: data.formDataEntity_outerinstituteTel},
                                 {key: '转出单位传真：', text: data.formDataEntity_outerinstituteFax},
                                 {key: '转出单位邮编：', text: data.formDataEntity_outerinstitutePostcode},
                                 {key: '转出机构党委通讯地址：', text: data.formDataEntity_outerinstituteAddress}]
          } else if (vm.oagetDbListItem.forwardPage === 'zhxz_dajy') {
            // 档案借阅申请
            this.formDataBase = [{key: '编号：', text: data.formDataBase_wordNo},
                                 {key: '借阅单位：', text: data.formDataBase_draftDeptname},
                                 {key: '借阅人：', text: data.formDataBase_drafterName},
                                 {key: '借阅日期：', text: data.formDataBase_draftDate},
                                 {key: '预计归还日期：', text: data.formDataEntity_planReturndate},
                                 {key: '标题：', text: data.formDataBase_title},
                                 {key: '借阅内容：', text: data.formDataEntity_borrowContent},
                                 {key: '借阅用途：', text: data.formDataEntity_borrowUsage},
                                 {key: '档案密级：', text: data.formDataEntity_daSecretLevel},
                                 {key: '保密期限：', text: data.formDataEntity_secretTime},
                                 {key: '借阅形式：', text: data.formDataEntity_borrowWay},
                                 {key: '实际归还日期：', text: data.formDataEntity_factReturndate},
                                 {key: '借阅状态：', text: data.formDataEntity_borrowState},
                                 {key: '纸质档案归还状态：', text: data.formDataEntity_paperReturnstate},
                                 {key: '经办人处理结果：', text: data.formDataEntity_dopersonResult}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_cs') {
            // 测试申请
            this.formDataBase = [{key: '项目名称：', text: data.formDataBase_title},
                                 {key: '需求部门：', text: data.formDataBase_draftDeptname},
                                 {key: '经办人：', text: data.formDataBase_drafterName},
                                 {key: '业务负责人：', text: data.formDataEntity_charger},
                                 {key: 'IT项目经理：', text: data.formDataEntity_itManager},
                                 {key: '预期投产日期：', text: data.formDataEntity_productDate},
                                 {key: '申请原因：', text: data.formDataEntity_reason},
                                 {key: '需求描述：', text: data.formDataEntity_conclusion},
                                 {key: '测试资源申请：', text: data.formDataEntity_detail},
                                 {key: '测试管理人员：', text: data.formDataEntity_itTestManager},
                                 {key: '预算出处：', text: data.formDataEntity_budget},
                                 {key: '测试外包公司：', text: data.formDataEntity_testPerson},
                                 {key: '高级：', text: data.formDataEntity_jrlActual},
                                 {key: '中级：', text: data.formDataEntity_bbtglActual},
                                 {key: '初级：', text: data.formDataEntity_workload},
                                 {key: '每延期一天，产生大约成本：', text: data.formDataEntity_advice}]
          } else if (vm.oagetDbListItem.forwardPage === 'zhxz_hbhsp') {
            // 公文传阅
            this.formDataBase = [{key: '文件标题：', text: data.formDataBase_title},
                                 {key: '公文文号：', text: data.formDataBase_draftDeptname},
                                 {key: '文件类型：', text: data.formDataBase_drafterName},
                                 {key: '传阅日期：', text: data.formDataEntity_charger},
                                 {key: '传阅分发人：', text: data.formDataEntity_itManager}]
          }else if (vm.oagetDbListItem.forwardPage === 'form_heguiduban') {
            // 总行合规督办
            this.formDataBase = [{key: '合规督办登记号：', text: data.formDataBase_title},
                                 {key: '拟稿人：', text: data.formDataBase_draftDeptname},
                                 {key: '拟稿日期：', text: data.formDataBase_drafterName},
                                 {key: '合规督办事项：', text: data.formDataEntity_charger},
                                 {key: '相关文号：', text: data.formDataEntity_itManager},
                                 {key: '合规督办事项截止日期：', text: data.formDataEntity_advice}]
          }else if (vm.oagetDbListItem.forwardPage === 'zhxz_tcyzjht') {
            // 投产申请
            this.formDataBase = [{key: '变更标题：', text: data.SUBJECT},
                                 {key: '变更内容：', text: data.CONTENT},
                                 {key: '变更性质：', text: data.ISPLANCHANGE},
                                 {key: '变更类别：', text: data.CHANGETYPENAME},
                                 {key: '停用服务：', text: data.ISSTOPSERVICE},
                                 {key: '对外公告：', text: data.ISPUBLISH},
                                 {key: '发布操作手册：', text: data.ISPUBLISHMANUALS},
                                 {key: '业务验证人：', text: data.TESTPERSON},
                                 {key: '停用服务开始时间：', text: data.SSBEGINTIME},
                                 {key: '停用服务结束时间：', text: data.SSENDTIME},
                                 {key: '影响数据：', text: data.ISAFFDATA},
                                 {key: '影响业务：', text: data.ISAFFBUSINESS},
                                 {key: '计划开始时间：', text: data.PLANBEGINTIME},
                                 {key: '计划完成时间：', text: data.PLANENDTIME},
                                 {key: '监管报备：', text: data.WATCHCONTENT},
                                 {key: '变更技术说明：', text: data.CHANGESKILLDEC}]
          }
          else if (vm.oagetDbListItem.forwardPage === 'zhxz_clsysq') {
            document.title = '车辆使用申请'
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '用车人：', text: data.formDataBase_drafterName},
                                 {key: '申请部门：', text: data.formDataBase_draftDeptname},
                                 {key: '车号：', text: data.formDataEntity_carNo},
                                 {key: '用车地点：', text: data.formDataEntity_usecarPlace},
                                 {key: '用车日期：', text: data.formDataEntity_usecarDate},
                                 {key: '出车时间：', text: data.formDataEntity_beginTime},
                                 {key: '回车日期：', text: data.formDataEntity_endDate},
                                 {key: '回车时间：', text: data.formDataEntity_endTime},
                                 {key: '对驾驶员满意度测评：', text: data.formDataEntity_driverSatisfact}]
          } else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_cgsq_zc') {
            document.title = '管理人员出国申请'
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '申请人：', text: data.formDataBase_drafterName},
                                 {key: '申请单位：', text: data.formDataBase_draftDeptname},
                                 {key: '申请时间：', text: data.formDataBase_draftDate},
                                 {key: '身份证号：', text: data.formDataEntity_cardNumber},
                                 {key: '职务：', text: data.formDataEntity_duty},
                                 {key: '联系电话：', text: data.formDataEntity_tel},
                                 {key: '家庭住址：', text: data.formDataEntity_homeAdress},
                                 {key: '目的地：', text: data.formDataEntity_aborad},
                                 {key: '申请事由：', text: data.formDataEntity_reason},
                                 {key: '启程日期：', text: data.formDataEntity_startTime},
                                 {key: '返程日期：', text: data.formDataEntity_returnTime}]
          }else if (vm.oagetDbListItem.forwardPage === 'form_qianbao_fh') {
            document.title = '总部签报'
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '拟稿日期：', text: data.formDataBase_drafterName},
                                 {key: '拟稿部门：', text: data.formDataBase_draftDeptname},
                                 {key: '文件类型：', text: data.formDataBase_fileType},
                                 {key: '内容摘要：', text: data.formDataEntity_contents},
                                 {key: '主送：', text: data.formDataEntity_mainsendDept},
                                 {key: '抄报：', text: data.formDataEntity_copyupDept},
                                 {key: '内部发送：', text: data.formDataEntity_innersendDept},
                                 {key: '主题词：', text: data.formDataEntity_keyWords}]
          }else if (vm.oagetDbListItem.forwardPage === 'form_qianbao_zgs') {
            document.title = '子公司签报'
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '缓急：', text: data.formDataBase_priority},
                                 {key: '密级：', text: data.formDataBase_secretLevel},
                                 {key: '拟稿日期：', text: data.formDataBase_draftDate},
                                 {key: '拟稿部门：', text: data.formDataBase_draftDeptname},
                                 {key: '文件类型：', text: data.formDataBase_fileType},
                                 {key: '内容摘要：', text: data.formDataEntity_contents},
                                 {key: '编号：', text: data.formDataBase_wordNo},
                                 {key: '抄报：', text: data.formDataEntity_mainsendDept},
                                 {key: '主送：', text: data.formDataEntity_copyupDept},
                                 {key: '会签部门：', text: data.formDataBase_huiqianDept}]
          }else if (vm.oagetDbListItem.forwardPage === 'form_qianbao_zh') {
            document.title = '总行签报'
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '拟稿日期：', text: data.formDataBase_drafterName},
                                 {key: '拟稿部门：', text: data.formDataBase_draftDeptname},
                                 {key: '文件类型：', text: data.formDataBase_fileType},
                                 {key: '内容摘要：', text: data.formDataEntity_contents},
                                 {key: '主送：', text: data.formDataEntity_mainsendDept},
                                 {key: '抄报：', text: data.formDataEntity_copyupDept},
                                 {key: '会签部门：', text: data.formDataBase_huiqianDept}]
          }else if (vm.oagetDbListItem.forwardPage === 'form_qianbao_zh') {
            document.title = '区域签报'
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '缓急：', text: data.formDataBase_drafterName},
                                 {key: '密级：', text: data.formDataBase_draftDeptname},
                                 {key: '拟稿日期：', text: data.formDataBase_draftDate},
                                 {key: '拟稿部门：', text: data.formDataEntity_cardNumber},
                                 {key: '文件类型：', text: data.formDataEntity_duty},
                                 {key: '内容摘要：', text: data.formDataEntity_tel},
                                 {key: '编号：', text: data.formDataEntity_homeAdress},
                                 {key: '抄报：', text: data.formDataEntity_mainsendDept},
                                 {key: '主送：', text: data.formDataEntity_copyupDept},
                                 {key: '会签部门：', text: data.formDataBase_huiqianDept}]
          }else if (vm.oagetDbListItem.forwardPage === 'form_fawen') {
            document.title = '总行收文'
            this.formDataBase = [{key: '收文编号：', text: data.formDataBase_wordNo},
                                 {key: '保密期限：', text: data.formDataEntity_secretTime},
                                 {key: '来文标题：', text: data.formDataBase_title},
                                 {key: '来文字号：', text: data.formDataEntity_fromWordno},
                                 {key: '来文单位：', text: data.formDataEntity_fromDept},
                                 {key: '来文日期：', text: data.formDataBase_draftDate},
                                 {key: '办理时限：', text: data.formDataBase_endDate}]
          }else if (vm.oagetDbListItem.forwardPage === 'form_shouwen_qy') {
            document.title = '区域收文'
            this.formDataBase = [{key: '来文标题：', text: data.formDataBase_title},
                                 {key: '来文日期：', text: data.formDataBase_draftDate},
                                 {key: '收文编号：', text: data.formDataBase_wordNo},
                                 {key: '办理时限：', text: data.formDataBase_endDate},
                                 {key: '来文字号：', text: data.formDataEntity_fromWordno},
                                 {key: '来文单位：', text: data.formDataEntity_fromDept},
                                 {key: '保密期限：', text: data.formDataEntity_secretTime},
                                 {key: '备注：', text: data.formDataEntity_remarkNote}]
          }
          else if (vm.oagetDbListItem.forwardPage === 'form_shouwen_zgs') {
            document.title = '子公司收文'
            this.formDataBase = [{key: '收文编号：', text: data.formDataBase_wordNo},
                                 {key: '来文日期：', text: data.formDataBase_draftDate},
                                 {key: '办理时限：', text: data.formDataBase_endDate},
                                 {key: '缓急：', text: data.formDataBase_priority},
                                 {key: '密级：', text: data.formDataBase_secretLevel},
                                 {key: '保密期限：', text: data.formDataEntity_secretTime},
                                 {key: '来文标题：', text: data.formDataBase_title},
                                 {key: '来文字号：', text: data.formDataEntity_fromWordno},
                                 {key: '来文单位：', text: data.formDataEntity_fromDept}]
          }else if (vm.oagetDbListItem.forwardPage === 'form_fawen') {
            document.title = '总部收文'
            this.formDataBase = [{key: '收文编号：', text: data.formDataBase_wordNo},
                                 {key: '保密期限：', text: data.formDataEntity_secretTime},
                                 {key: '来文标题：', text: data.formDataBase_title},
                                 {key: '来文字号：', text: data.formDataEntity_fromWordno},
                                 {key: '来文单位：', text: data.formDataEntity_fromDept},
                                 {key: '来文日期：', text: data.formDataBase_draftDate}]
          }else if (vm.oagetDbListItem.forwardPage === 'form_zgs_cgsq') {
            document.title = '子公司普通员工出国申请'
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '申请人：', text: data.formDataBase_drafterName},
                                 {key: '申请单位：', text: data.formDataBase_draftDeptname},
                                 {key: '申请时间：', text: data.formDataBase_draftDate},
                                 {key: '身份证号：', text: data.formDataEntity_cardNumber},
                                 {key: '职务：', text: data.formDataEntity_duty},
                                 {key: '联系电话：', text: data.formDataEntity_tel},
                                 {key: '家庭住址：', text: data.formDataEntity_homeAdress},
                                 {key: '目的地：', text: data.formDataEntity_aborad},
                                 {key: '申请事由：', text: data.formDataEntity_reason},
                                 {key: '启程日期：', text: data.formDataEntity_startTime},
                                 {key: '返程日期：', text: data.formDataEntity_returnTime}]
          }else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_bdsq') {
            document.title = '盖章文件补打申请'
            this.formDataBase = [{key: '规章名称：', text: data.formDataBase_title},
                                 {key: '申请部门：', text: data.formDataBase_draftDeptname},
                                 {key: '申请人：', text: data.formDataBase_drafterName},
                                 {key: '申请时间：', text: data.formDataBase_draftDate},
                                 {key: '申请份数：', text: data.formDataEntity_sqfs},
                                 {key: '申请原因：', text: data.formDataEntity_sqyy}]
          }else if (vm.oagetDbListItem.forwardPage === 'zhxz_bgyply') {
            document.title = '办公用品及物品领用'
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '领用部门：', text: data.formDataBase_draftDeptname},
                                 {key: '拟稿日期：', text: data.formDataBase_draftDate},
                                 {key: '领用人：', text: data.formDataBase_drafterName}]
          }else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_cghtcq') {
            document.title = '采购合同呈签'
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '呈核案由：', text: data.formDataEntity_reason},
                                 {key: '承办部门：', text: data.formDataBase_draftDeptname},
                                 {key: '申请日期：', text: data.formDataBase_draftDate},
                                 {key: '呈签人：', text: data.formDataBase_drafterName},
                                 {key: '签订方式：', text: data.formDataEntity_signMode},
                                 {key: '请购部门：', text: data.formDataEntity_buyDept},
                                 {key: '使用部门：', text: data.formDataEntity_usedDept},
                                 {key: '供应商：', text: data.formDataEntity_supplier},
                                 {key: '合同金额（万元）：', text: data.formDataEntity_originalAmount},
                                 {key: '谈判记录编号：', text: data.formDataEntity_recordNo},
                                 {key: '案值（万元）：', text: data.formDataEntity_casevalue},
                                 {key: '期限：', text: data.formDataEntity_deadline1},
                                 {key: '实施地：', text: data.formDataEntity_implementation},
                                 {key: '议价综述：', text: data.formDataEntity_overview}]
          }else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_cgsq') {
            document.title = '总行人员出国申请'
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '申请人：', text: data.formDataBase_drafterName},
                                 {key: '申请单位：', text: data.formDataBase_draftDeptname},
                                 {key: '申请时间：', text: data.formDataBase_draftDate},
                                 {key: '身份证号：', text: data.formDataEntity_cardNumber},
                                 {key: '职务：', text: data.formDataEntity_duty},
                                 {key: '联系电话：', text: data.formDataEntity_tel},
                                 {key: '家庭住址：', text: data.formDataEntity_homeAdress},
                                 {key: '目的地：', text: data.formDataEntity_aborad},
                                 {key: '申请事由：', text: data.formDataEntity_reason},
                                 {key: '启程日期：', text: data.formDataEntity_startTime},
                                 {key: '返程日期：', text: data.formDataEntity_returnTime}]
          }else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_cgsq_zb') {
            document.title = '总部人员出国申请'
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '申请人：', text: data.formDataBase_drafterName},
                                 {key: '申请单位：', text: data.formDataBase_draftDeptname},
                                 {key: '申请时间：', text: data.formDataBase_draftDate},
                                 {key: '身份证号：', text: data.formDataEntity_cardNumber},
                                 {key: '职务：', text: data.formDataEntity_duty},
                                 {key: '联系电话：', text: data.formDataEntity_tel},
                                 {key: '家庭住址：', text: data.formDataEntity_homeAdress},
                                 {key: '目的地：', text: data.formDataEntity_aborad},
                                 {key: '申请事由：', text: data.formDataEntity_reason},
                                 {key: '启程日期：', text: data.formDataEntity_startTime},
                                 {key: '返程日期：', text: data.formDataEntity_returnTime}]
          }else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_gzsh') {
            document.title = '总行规章审核'
            this.formDataBase = [{key: '规章名称：', text: data.formDataBase_title},
                                 {key: '审核编号：', text: data.formDataBase_wordNo},
                                 {key: '规章制定需求：', text: data.formDataEntity_rulesMakeneed},
                                 {key: '规章层级：', text: data.formDataEntity_rulesLevel},
                                 {key: '流水号：', text: data.formDataEntity_lwwenhao},
                                 {key: '制定要求：', text: data.formDataEntity_makeRequire},
                                 {key: '规章所涉机构或部门名称：', text: data.formDataEntity_rulesReferdept}]
          }else if (vm.oagetDbListItem.forwardPage === 'form_zhxz_nbgg') {
            document.title = '内部公告'
            this.formDataBase = [{key: '标题：', text: data.formDataBase_title},
                                 {key: '拟稿时间：', text: data.formDataBase_draftDate},
                                 {key: '拟稿单位：', text: data.formDataBase_draftDeptname},
                                 {key: '内容：', text: data.formDataEntity_content}]
          }else if (vm.oagetDbListItem.forwardPage === 'zhxz_tchz') {
            document.title = '科技投产汇总'
            this.formDataBase = [{key: '项目名称：', text: data.formDataBase_title},
                                 {key: '投产编号：', text: data.formDataBase_wordNo},
                                 {key: '投产形式：', text: data.formDataEntity_tcStyle},
                                 {key: '投产日期：', text: data.formDataEntity_otherStyle},
                                 {key: '发布内容及实现功能：', text: data.formDataEntity_detail},
                                 {key: '影响范围：', text: data.formDataEntity_yxScope},
                                 {key: '申请人：', text: data.formDataBase_drafterName},
                                 {key: '申请日期：', text: data.formDataBase_draftDate}]
          }
          // 获取审批意见列表
          this.getExaminationApproval(this.oagetDbListItem.workitemId)
        } else {
          alert(data.errorMsg)
        }
      }).catch(function (response) {
        alert(response)
      })
    },
    filters: {
      formatDateNew (time) {
        return formatDateNew(time)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../less/invoiceListArea.less';
  @import '../../less/annexArea.less';
  @import '../../less/common.less';
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
  .docCir_btnOne{
    width:351px;
    padding:6px 12px;
  }
  .docCir_btn button{
    width:169px;
    height: 44px;
    line-height: 44px;
    background: #D1D1D1;
    border-radius: 5px;
    font-size: 20px;
    color: #FFFFFF;
    margin-right:13px;
    text-align:center;
    background-image: linear-gradient(-180deg, #60ad30 0%, #7bbe4c 100%);
    outline:none;
    border:none;
  }
  .docCir_btn button:last-child{
    margin-right:0px;
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

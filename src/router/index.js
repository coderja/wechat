import Vue from 'vue'
import Router from 'vue-router'
// meeting
import signIn from '@/components/meeting/signIn'
import signInList from '@/components/meeting/signInList'
// meetingManage
import historyMeeting from '@/components/meetingManage/historyMeeting'
import test from '@/components/mobileOffice/test'
import bulletinInfo from '@/components/mobileOffice/bulletinInfo'
import bulletinInfoDetail from '@/components/mobileOffice/bulletinInfoDetail'
import scroll from '@/components/commonComponent/scroll'
import tab from '@/components/commonComponent/tab'
import mobileWork from '@/components/mobileOffice/mobileWork'
import itsm from '@/components/ITSM/itsm'
import OaNowork from '@/components/mobileOffice/OaNowork'
import listStyleOne from '@/components/mobileComponents/listStyleOne'
import financialStandby from '@/components/mobileOffice/financialStandby'
import demo from '@/components/mobileOffice/demo'
import people from '@/components/mobileOffice/people'
import wait from '@/components/popUpBox/wait'
import search from '@/components/commonComponent/search'
import purchaseInvoice from '@/components/mobileOffice/purchaseInvoice'
import invoiceDetail from '@/components/mobileOffice/invoiceDetail'
import sourceOrder from '@/components/mobileOffice/sourceOrder'
import purchaseOrderDetail from '@/components/mobileOffice/purchaseOrderDetail'
import examinationOpinion from '@/components/mobileOffice/examinationOpinion'
import inlineInformation from '@/components/mobileOffice/inlineInformation'
import reply from '@/components/commonComponent/reply'
import newsList from '@/components/commonComponent/newsList'
import newsDetail from '@/components/commonComponent/newsDetail'
import oaList from '@/components/commonComponent/oaList'
// 工作联系单
import workContactSheet from '@/components/mobileOffice/workContactSheet'
// 新闻预览
import newPreview from '@/components/mobileOffice/newPreview'
import downLoadBox from '@/components/popUpBox/downLoadBox'
// 内网新闻审批
import intranetNews from '@/components/mobileOffice/intranetNews'
//  公贷审批
import publicDetail from '@/components/commonLoan/publicDetail'
import publicList from '@/components/commonLoan/publicList'
import msgBox from '@/components/commonLoan/msgBox'
import publicMsg from '@/components/commonLoan/publicMsg'
import disagree from '@/components/commonLoan/disagree'
import agree from '@/components/commonLoan/agree'

import loanList from '@/components/loanApproval/loanList'
import loanListDetail from '@/components/loanApproval/loanListDetail'
import loanDisagree from '@/components/loanApproval/loanDisagree'
import loanAgree from '@/components/loanApproval/loanAgree'

import documentCirculated from '@/components/mobileOffice/documentCirculated'
import approvalSheetDetail from '@/components/mobileOffice/approvalSheetDetail'
import antiLeakExaAndApproval from '@/components/mobileOffice/antiLeakExaAndApproval'
import radio from '@/components/mobileComponents/radio'

// 通讯录
import mailList from '@/components/mobileOffice/mailList'

import innerSiteInterface from '@/components/mobileOffice/innerSiteInterface'
import innerSiteInterfaceProductlist from '@/components/mobileOffice/innerSiteInterfaceProductlist'
import innerSiteNewPreview from '@/components/mobileOffice/innerSiteNewPreview'
import outerSiteInterface from '@/components/mobileOffice/outerSiteInterface'
import outerSiteInterfaceProductlist from '@/components/mobileOffice/outerSiteInterfaceProductlist'
import outerSiteNewPreview from '@/components/mobileOffice/outerSiteNewPreview'

// 通知公告，行内信息详情页面
import announceDetail from '@/components/mobileOffice/announceDetail'
// 通讯录跳转页面，总行发文
import genernalLineAervice from '@/components/mobileOffice/genernalLineAervice'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: '*',
      redirect: '/signIn'
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: signIn
    },
    {
      path: '/historyMeeting',
      name: 'historyMeeting',
      component: historyMeeting
    },
    {
      path: '/signInList',
      name: 'signInList',
      component: signInList
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/bulletinInfo',
      name: 'bulletinInfo',
      component: bulletinInfo
    },
    {
      path: '/bulletinInfoDetail',
      name: 'bulletinInfoDetail',
      component: bulletinInfoDetail
    },
    {
      path: '/innerSiteInterface',
      name: 'innerSiteInterface',
      component: innerSiteInterface
    },
    {
      path: '/innerSiteInterfaceProductlist',
      name: 'innerSiteInterfaceProductlist',
      component: innerSiteInterfaceProductlist
    },
    {
      path: '/innerSiteNewPreview',
      name: 'innerSiteNewPreview',
      component: innerSiteNewPreview
    },
    {
      path: '/outerSiteInterface',
      name: 'outerSiteInterface',
      component: outerSiteInterface
    },
    {
      path: '/outerSiteInterfaceProductlist',
      name: 'outerSiteInterfaceProductlist',
      component: outerSiteInterfaceProductlist
    },
    {
      path: '/outerSiteNewPreview',
      name: 'outerSiteNewPreview',
      component: outerSiteNewPreview
    },
    {
      path: '/scroll',
      name: 'scroll',
      component: scroll
    },
    {
      path: '/tab',
      name: 'tab',
      component: tab
    },
    {
      path: '/newsList',
      name: 'newsList',
      component: newsList
    },
    {
      path: '/newsDetail',
      name: 'newsDetail',
      component: newsDetail
    },
    {
      path: '/oaList',
      name: 'oaList',
      component: oaList
    },
    {
      path: '/mobileWork',
      name: 'mobileWork',
      component: mobileWork
    },
    {
      path: '/itsm',
      name: 'itsm',
      component: itsm
    },
    {
      path: '/loanList',
      name: 'loanList',
      component: loanList
    },
    {
      path: '/loanList/loanListDetail',
      name: 'loanListDetail',
      component: loanListDetail
    },
    {
      path: '/OaNowork',
      name: 'OaNowork',
      component: OaNowork
    },
    {
      path: '/listStyleOne',
      name: 'listStyleOne',
      component: listStyleOne
    },
    {
      path: '/financialStandby',
      name: 'financialStandby',
      component: financialStandby
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    },
    {
      path: '/people',
      name: 'people',
      component: people
    },
    {
      path: '/wait',
      name: 'wait',
      component: wait
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/purchaseInvoice',
      name: 'purchaseInvoice',
      component: purchaseInvoice
    },
    {
      path: '/invoiceDetail',
      name: 'invoiceDetail',
      component: invoiceDetail
    },
    {
      path: '/sourceOrder',
      name: 'sourceOrder',
      component: sourceOrder
    },
    {
      path: '/purchaseOrderDetail',
      name: 'purchaseOrderDetail',
      component: purchaseOrderDetail
    },
    {
      path: '/examinationOpinion',
      name: 'examinationOpinion',
      component: examinationOpinion
    },
    {
      path: '/inlineInformation',
      name: 'inlineInformation',
      component: inlineInformation
    },
    {
      path: '/workContactSheet',
      name: 'workContactSheet',
      component: workContactSheet
    },
    {
      path: '/newPreview',
      name: 'newPreview',
      component: newPreview
    },
    {
      path: '/downLoadBox',
      name: 'downLoadBox',
      component: downLoadBox
    },
    {
      path: '/intranetNews',
      name: 'intranetNews',
      component: intranetNews
    },
    {
      path: '/documentCirculated',
      name: 'documentCirculated',
      component: documentCirculated
    },
    {
      path: '/documentCirculated/approvalSheetDetail',
      name: 'approvalSheetDetail',
      component: approvalSheetDetail
    },
    {
      path: '/antiLeakExaAndApproval',
      name: 'antiLeakExaAndApproval',
      component: antiLeakExaAndApproval
    },
    {
      path: '/radio',
      name: 'radio',
      component: radio
    },
    {
      path: '/mailList',
      name: 'mailList',
      component: mailList
    },
    {
      path: '/reply',
      name: 'reply',
      component: reply
    },
    {
      path: '/publicDetail',
      name: 'publicDetail',
      component: publicDetail
    },
    {
      path: '/publicList',
      name: 'publicList',
      component: publicList
    },
    {
      path: '/msgBox',
      name: 'msgBox',
      component: msgBox
    },
    {
      path: '/publicMsg',
      name: 'publicMsg',
      component: publicMsg
    },
    {
      path: '/announceDetail',
      name: 'announceDetail',
      component: announceDetail
    },
    {
      path: '/genernalLineAervice',
      name: 'genernalLineAervice',
      component: genernalLineAervice
    },
    {
      path: '/agree',
      name: 'agree',
      component: agree
    },
    {
      path: '/loanAgree',
      name: 'loanAgree',
      component: loanAgree
    },
    {
      path: '/loanDisagree',
      name: 'loanDisagree',
      component: loanDisagree
    },
    {
      path: '/disagree',
      name: 'disagree',
      component: disagree
    }
  ]
})

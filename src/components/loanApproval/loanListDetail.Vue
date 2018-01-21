<template>
  <div class="">
    <!--公贷审批列表-->
    <public-detail :titleMsg="titleMsg"
                    :approveLists="approveLists"
                    :fileList="fileList"
                    :stockerInfo="stockerInfo"
                    :proList="proList"
                    :assureList="assureList"
                    :suggestsList="suggestsList">
    </public-detail>
    <msg-box :btnList="btnList"
             v-on:getVal="getVal"
    ></msg-box>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDateNew} from '@/js/common'
  import axios from 'axios'
  import PublicDetail from '@/components/commonLoan/publicDetail'
  import MsgBox from '@/components/commonLoan/msgBox'
  export default {
    data () {
      return {
        num: 0,
        className: '',
        suggestVal: '',
        replyKey: '',
        flag: '',
        oaLists: [],
        lists: [],
        btnList: [],
        titleMsg: '',
        task: '',
        approveLists: [],
        fileList: [],
        stockerInfo: [],
        proList: [],
        assureList: [],
        suggestsList: {},
        applying: {}
      }
    },
    components: {
      'public-detail': PublicDetail,
      'msg-box': MsgBox
    },
    mounted () {
      document.title = '审批列表'
      this.applying = this.$route.query.APPLYING_SEQ_NO || {}
      this.flag = this.$route.query.APPROVAL_TYPE_FLAG || ''
      this.task = this.$route.query.TASK_SEQ_NO || ''
      this.getList()
      this.getApproveList()
    },
    methods: {
      iconImg (flag) {
        return 'icon' + (Number(flag) + 1)
      },
      documentCirculated () {
        this.$router.push({path: '/documentCirculated'})
      },
      //  公贷申请查询
      getList () {
        let vm = this
        axios.get('/CorpWX/CMS0002.do', {
          params: {
            APPLYING_SEQ_NO: vm.applying,
            APPLY_TYPE: vm.flag
          }
        }).then(response => {
          console.log('0024', response)
          console.log('data', response.data.body)
          const data = response.data.body
          console.log('data2', vm.data)
//          if (vm.data.errorCode === '0') {
          vm.titleMsg = data.CLIENT_NAME
          vm.approveLists = data.APPROVE_INFO_ARRAY
          //  申请机构
          vm.suggestsList = data
          vm.fileList = data.FILE_INFO_ARRAY
          vm.stockerInfo = data.STOCKER_INFO_ARRAY
          vm.proList = data.CREDIT_PRODUCT_ARRAY
          vm.assureList = data.ASSURE_ARRAY
          console.log('1', vm.approveLists)
//          }
        }).catch(function (response) {
          alert(response)
        })
      },
      //  审批意见
      getApproveList () {
//        待定
        axios.get('/CorpWX/CMS0004.do', {
          params: {
            TASK_SEQ_NO: '2017032300000474',
            APPROVAL_ACTION: '%E6%8F%90%E4%BA%A4%E5%B0%8F%E4%BC%81%E4%B8%9A%E4%BA%8B%E4%B8%9A%E9%83%A8%E4%BB%BB%E5%8A%A1%E5%88%86%E5%8F%91%E5%B2%97'
          }
        }).then(response => {
          console.log('004', response)
        }).catch(function (response) {
          alert(response)
        })
      },
      getVal (val) {
        const vm = this
        vm.suggestVal = val
        if (vm.suggestVal === '同意') {
          vm.replyKey = '0'
        } else if (vm.suggestVal === '不同意') {
          vm.replyKey = '1'
        }
        if (vm.suggestVal !== '') {
          this.$router.push({path: '/loanDisagree', query: {TASK_SEQ_NO: this.task, replyKey: vm.replyKey}})
        }
      }
    },
    created: function () {
      this.btnList = [{key: '0', text: '同意'}, {key: '2', text: '不同意'}]
    },
    filters: {
      formatDateNew (time) {
        return formatDateNew(time)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../less/handoverListImg.less';
</style>

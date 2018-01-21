<template>
  <div class="">
    <!--公贷审批列表-->
    <v-scroll  style="top:0" :on-refresh="onRefresh" :on-infinite="onInfinite">
      <public-list :loanLists="loanLists"
                   v-on:getFlag="getFlag">
      </public-list>
    </v-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDateNew} from '@/js/common'
  import Scroll from '@/components/commonComponent/scroll'
  import axios from 'axios'
  import publicList from '@/components/commonLoan/publicList'
  export default {
    data () {
      return {
        counter: 1, // 默认已经显示出15条数据 count等于一是让从16条开始加载
        sum: 8,  // 一次显示多少条
        counterTwo: 1, // 默认已经显示出15条数据 count等于一是让从16条开始加载
        sumTwo: 8,  // 一次显示多少条
        num: 0,
        className: '',
        loanLists: [],
        flagLoanLists: [],
        lists: [],
        APPROVAL_TYPE_FLAG: 0,
        APPLYING_SEQ_NO: '',
        TASK_SEQ_NO: ''
      }
    },
    components: {
      'public-list': publicList,
      'v-scroll': Scroll
    },
    mounted () {
      document.title = '公贷审批'
      this.userId = this.$route.query.userId || ''
      this.getList()
    },
    methods: {
      getIndex (index) {
        const that = this
        that.num = index
      },
      getFlag (flag, applying, task) {
        console.log()
        this.APPROVAL_TYPE_FLAG = flag
        this.APPLYING_SEQ_NO = applying
        this.TASK_SEQ_NO = task
        this.$router.push({path: '/loanList/loanListDetail', query: {APPROVAL_TYPE_FLAG: this.APPROVAL_TYPE_FLAG, TASK_SEQ_NO: this.TASK_SEQ_NO, APPLYING_SEQ_NO: this.APPLYING_SEQ_NO}})
      },
      getList () {
        let vm = this
        vm.counter = 1
        vm.$el.querySelector('.load-more').style.display = ''
        axios.get('/CorpWX/CMS0001.do', {
          params: {
            USER_NO: '0023018',
            MESSAGE_REQUEST_TYPE: 0,
            FINISH_FLAG: '1',
            PAGE_ROW_COUNT: 10,
            CURRENT_PAGE: vm.counter
          }
        }).then(response => {
          const data = response.data.body
          console.log('data', data)
          vm.flagLoanLists = data.TASK_INFO_ARRAY
          if (data.errorCode === '0') {
            for (let i = 0; i < vm.flagLoanLists.length; i++) {
              if (vm.flagLoanLists[i].APPROVAL_TYPE_FLAG === '1') {
                vm.loanLists.push({
                  flag: '1',
                  AMOUNT: vm.flagLoanLists[i].AMOUNT,
                  APPLYER_NAME: vm.flagLoanLists[i].APPLYER_NAME,
                  APPLYING_SEQ_NO: vm.flagLoanLists[i].APPLYING_SEQ_NO,
                  APPLY_DATE: vm.flagLoanLists[i].APPLY_DATE,
                  APPROVAL_TYPE_FLAG: '授信审批',
                  CLIENT_NAME: vm.flagLoanLists[i].CLIENT_NAME,
                  CORE_CLIENT_NO: vm.flagLoanLists[i].CORE_CLIENT_NO,
                  GLOBAL_ID: vm.flagLoanLists[i].GLOBAL_ID,
                  PROCESS_NO: vm.flagLoanLists[i].PROCESS_NO,
                  STAGE_NO: vm.flagLoanLists[i].STAGE_NO,
                  TASK_SEQ_NO: vm.flagLoanLists[i].TASK_SEQ_NO
                })
              } else if (vm.flagLoanLists[i].APPROVAL_TYPE_FLAG === '2') {
                vm.loanLists.push({
                  flag: '2',
                  AMOUNT: vm.flagLoanLists[i].AMOUNT,
                  APPLYER_NAME: vm.flagLoanLists[i].APPLYER_NAME,
                  APPLYING_SEQ_NO: vm.flagLoanLists[i].APPLYING_SEQ_NO,
                  APPLY_DATE: vm.flagLoanLists[i].APPLY_DATE,
                  APPROVAL_TYPE_FLAG: '放款审批',
                  CLIENT_NAME: vm.flagLoanLists[i].CLIENT_NAME,
                  CORE_CLIENT_NO: vm.flagLoanLists[i].CORE_CLIENT_NO,
                  GLOBAL_ID: vm.flagLoanLists[i].GLOBAL_ID,
                  PROCESS_NO: vm.flagLoanLists[i].PROCESS_NO,
                  STAGE_NO: vm.flagLoanLists[i].STAGE_NO,
                  TASK_SEQ_NO: vm.flagLoanLists[i].TASK_SEQ_NO
                })
              } else if (vm.flagLoanLists[i].APPROVAL_TYPE_FLAG === '3') {
                vm.loanLists.push({
                  flag: '3',
                  AMOUNT: vm.flagLoanLists[i].AMOUNT,
                  APPLYER_NAME: vm.flagLoanLists[i].APPLYER_NAME,
                  APPLYING_SEQ_NO: vm.flagLoanLists[i].APPLYING_SEQ_NO,
                  APPLY_DATE: vm.flagLoanLists[i].APPLY_DATE,
                  APPROVAL_TYPE_FLAG: '预警认定审批',
                  CLIENT_NAME: vm.flagLoanLists[i].CLIENT_NAME,
                  CORE_CLIENT_NO: vm.flagLoanLists[i].CORE_CLIENT_NO,
                  GLOBAL_ID: vm.flagLoanLists[i].GLOBAL_ID,
                  PROCESS_NO: vm.flagLoanLists[i].PROCESS_NO,
                  STAGE_NO: vm.flagLoanLists[i].STAGE_NO,
                  TASK_SEQ_NO: vm.flagLoanLists[i].TASK_SEQ_NO
                })
              } else if (vm.flagLoanLists[i].APPROVAL_TYPE_FLAG === '4') {
                vm.loanLists.push({
                  flag: '4',
                  AMOUNT: vm.flagLoanLists[i].AMOUNT,
                  APPLYER_NAME: vm.flagLoanLists[i].APPLYER_NAME,
                  APPLYING_SEQ_NO: vm.flagLoanLists[i].APPLYING_SEQ_NO,
                  APPLY_DATE: vm.flagLoanLists[i].APPLY_DATE,
                  APPROVAL_TYPE_FLAG: '预警解除审批',
                  CLIENT_NAME: vm.flagLoanLists[i].CLIENT_NAME,
                  CORE_CLIENT_NO: vm.flagLoanLists[i].CORE_CLIENT_NO,
                  GLOBAL_ID: vm.flagLoanLists[i].GLOBAL_ID,
                  PROCESS_NO: vm.flagLoanLists[i].PROCESS_NO,
                  STAGE_NO: vm.flagLoanLists[i].STAGE_NO,
                  TASK_SEQ_NO: vm.flagLoanLists[i].TASK_SEQ_NO
                })
              }
            }
            if (data.TOTAL_ROW_COUNT <= vm.sum) {
              vm.$el.querySelector('.load-more').style.display = 'none'
            }
          } else {
            alert(data.errorMsg)
          }
        }).catch(function (response) {
          alert(response)
        })
      },
      onRefresh (done) {
        this.getList()
        done()
      },
      onInfinite (done) {
        let vm = this
        vm.counter++
        vm.$el.querySelector('.load-more').style.display = ''
        axios.get('/CorpWX/CMS0001.do', {
          params: {
            USER_NO: '0023018',
            MESSAGE_REQUEST_TYPE: 0,
            FINISH_FLAG: 1,
            PAGE_ROW_COUNT: 10,
            CURRENT_PAGE: vm.counter
          }
        }).then(response => {
          const data = response.data.body
          if (data.errorCode === '0') {
            let len = vm.data.TASK_INFO_ARRAY.length
            if (len === Number(data.TOTAL_ROW_COUNT)) {
              vm.$el.querySelector('.load-more').style.display = 'none'
            }
            done()
          } else {
            alert(data.errorMsg)
          }
        }).catch(function (response) {
          alert(response)
        })
      }
    },
    filters: {
      formatDateNew (time) {
        return formatDateNew(time)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../less/tab.less';
  @import '../../less/handoverListImg.less';
  /*.yo-scroll {*/
  /*top: 0 !important;*/
  /*}*/
</style>

<template>
  <div class="">
    <!--同意回复列表-->
    <v-disagree :checkCells="checkCells"></v-disagree>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDateNew} from '@/js/common'
  import axios from 'axios'
  import Disagree from '@/components/commonLoan/disagree'
  export default {
    data () {
      return {
        checkCells: [],
        flagCheck: [],
        TASK_SEQ_NO: '',
        replyKey: ''
      }
    },
    components: {
      'v-disagree': Disagree
    },
    mounted () {
      document.title = '授信审批'
      this.replyKey = this.$route.query.replyKey || ''
      this.TASK_SEQ_NO = this.$route.query.TASK_SEQ_NO || ''
      this.getApprove()
    },
    methods: {
      getApprove () {
        let vm = this
        axios.get('/CorpWX/CMS0003.do', {
          params: {
            TASK_SEQ_NO: vm.TASK_SEQ_NO
          }
        }).then(response => {
          const data = response.data.body
          console.log('data', data)
          vm.flagCheck = data.APPROVAL_ACTION_INFO_ARRAY
          console.log('003', vm.checkCells)
          if (data.errorCode === '0') {
            console.log('**************')
            for (let i = 0; i < vm.flagCheck.length; i++) {
              vm.checkCells.push({
                key: i,
                flag: false,
                text: vm.flagCheck[i].APPROVAL_ACTION
              })
            }
          }
          console.log('-------', vm.checkCells)
        }).catch(function (response) {
          alert(response)
        })
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
  @import '../../less/handoverListImg.less';
</style>

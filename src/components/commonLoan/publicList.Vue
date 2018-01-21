<template>
  <div class="">
    <div class="tabCon">
      <div v-for='(item,index) in loanLists'>
        <div class="handoverListImg">
          <ul class="noWorkUl">
            <li @click="getFlag(item.flag, item.APPLYING_SEQ_NO, item.TASK_SEQ_NO)">
              <p><em :class="iconImg(item.APPROVAL_TYPE_FLAG)"></em><span>{{item.APPLYER_NAME}}</span><i class="date">{{item.APPLY_DATE}}</i></p>
              <p class="txt">{{item.CLIENT_NAME}}({{item.APPROVAL_TYPE_FLAG}}:金额:{{item.AMOUNT | addComma}})</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDateNew, addComma} from '@/js/common'
  import Tab from '@/components/commonComponent/tab'
  export default {
    props: {
      loanLists: {
        type: Array
      }
    },
    data () {
      return {
//        loanLists: [{'mobileList': [{name: '刘瑞希', date: '20171228101000', txt: '苏州银行股份有限公司2017年Q3财务表基本说明', flag: '0'}, {name: '刘瑞希', date: '20171228101000', txt: '苏州银行股份有限公司2017年Q3财务表基本说明', flag: '0'}, {name: '刘瑞希', date: '20171228101000', txt: '苏州银行股份有限公司2017年Q3财务表基本说明', flag: '0'}, {name: '刘瑞希', date: '20171228101000', txt: '苏州银行股份有限公司2017年Q3财务表基本说明', flag: '0'}]}, {'mobileList': [{name: '刘瑞希', date: '20171228101000', txt: '苏州银行股份有限公司2017年Q3财务表基本说明', flag: '0'}, {name: '刘瑞希', date: '20171228101000', txt: '苏州银行股份有限公司2017年Q3财务表基本说明', flag: '0'}, {name: '刘瑞希', date: '20171228101000', txt: '苏州银行股份有限公司2017年Q3财务表基本说明', flag: '0'}, {name: '刘瑞希', date: '20171228101000', txt: '苏州银行股份有限公司2017年Q3财务表基本说明', flag: '1'}]}],
        num: 0,
        className: '',
        flag: 0,
        task: '',
        APPLYING_SEQ_NO: ''
      }
    },
    components: {
      'tab': Tab
    },
    methods: {
      iconImg (flag) {
        return 'icon' + (Number(flag) + 1)
      },
      getFlag (flag, applying, task) {
        this.flag = flag
        this.applying = applying
        this.task = task
        this.$emit('getFlag', this.flag, this.applying, this.task)
        console.log('flag', flag)
        console.log('applying', applying)
      }
    },
    created: function () {
    },
    filters: {
      formatDateNew (time) {
        return formatDateNew(time)
      },
      addComma (str) {
        return addComma(str)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../less/tab.less';
  @import '../../less/handoverListImg.less';
</style>

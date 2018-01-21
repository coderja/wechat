<template>
  <div class="">
    <div class="tabCon">
      <div v-for='(itemCon,index) in oaLists' v-show="index == num">
        <div class="handoverListImg">
          <ul class="noWorkUl">
            <li v-for='item in itemCon.mobileList' @click="documentCirculated()">
              <p><em :class="iconImg(item.flag)"></em><span>{{item.name}}</span><i class="date">{{item.date | formatDateNew}}</i></p>
              <p class="txt">{{item.txt}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDateNew} from '@/js/common'
  import Tab from '@/components/commonComponent/tab'
  export default {
    props: {
      oaLists: {
        type: Array
      }
    },
    data () {
      return {
//        oaLists: [{'mobileList': [{name: '刘瑞希', date: '20171228101000', txt: '苏州银行股份有限公司2017年Q3财务表基本说明', flag: '0'}, {name: '刘瑞希', date: '20171228101000', txt: '苏州银行股份有限公司2017年Q3财务表基本说明', flag: '0'}, {name: '刘瑞希', date: '20171228101000', txt: '苏州银行股份有限公司2017年Q3财务表基本说明', flag: '0'}, {name: '刘瑞希', date: '20171228101000', txt: '苏州银行股份有限公司2017年Q3财务表基本说明', flag: '0'}]}, {'mobileList': [{name: '刘瑞希', date: '20171228101000', txt: '苏州银行股份有限公司2017年Q3财务表基本说明', flag: '0'}, {name: '刘瑞希', date: '20171228101000', txt: '苏州银行股份有限公司2017年Q3财务表基本说明', flag: '0'}, {name: '刘瑞希', date: '20171228101000', txt: '苏州银行股份有限公司2017年Q3财务表基本说明', flag: '0'}, {name: '刘瑞希', date: '20171228101000', txt: '苏州银行股份有限公司2017年Q3财务表基本说明', flag: '1'}]}],
        num: 0,
        className: ''
      }
    },
    components: {
      'tab': Tab
    },
    methods: {
      iconImg (flag) {
        return 'icon' + (Number(flag) + 1)
      },
      documentCirculated () {
        this.$router.push({path: '/documentCirculated'})
      }
    },
    created: function () {
      document.title = 'OA待办'
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
</style>

<template>
  <div class="">
    <listStyleOne :mobileList = "mobileList"></listStyleOne>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDateNew} from '@/js/common'
  import listStyleOne from '@/components/mobileComponents/listStyleOne'

  export default {
    data () {
      return {
        mobileList: []
      }
    },
    methods: {
      stayDetail () {
        this.$router.push({path: '/purchaseInvoice'})
      }
    },
    created: function () {
      document.title = '财务待办'
      this.mobileList = [{name: '刘瑞希', date: '20171228101000', txt: '苏州银行股份有限公司2017年Q3财务表基本说明', flag: '1'}, {name: '孙磊', date: '20171228101000', txt: '内网登录系统地址表', flag: '1'}, {name: '唐晟', date: '20171228101000', txt: '外网门户地址续租', flag: '1'}]
    },
    filters: {
      formatDateNew (time) {
        return formatDateNew(time)
      }
    },
    components: {
      listStyleOne
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>

<template>
  <div class="">
    <!--同意回复列表-->
    <v-agree></v-agree>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDateNew} from '@/js/common'
  import Agree from '@/components/commonLoan/agree'
  export default {
    data () {
      return {
      }
    },
    components: {
      'v-agree': Agree
    },
    mounted () {
      document.title = '授信审批'
    },
    methods: {
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

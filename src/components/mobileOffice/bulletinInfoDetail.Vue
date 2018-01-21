<template>
  <div class="">
    <news-detail :newsDetailList="newsDetailList"></news-detail>
  </div>
</template>

<script type="text/ecmascript-6">
  import newsDetail from '@/components/commonComponent/newsDetail'
  export default {
    data () {
      return {
        newsDetailList: [],
        id: ''
      }
    },
    components: {
      'news-detail': newsDetail
    },
    methods: {
      infoDetail () {
      }
    },
    created: function () {
      let that = this
      document.title = '详细信息'
      that.newsDetailList = [{title: '我是标题1', date: '2017-10-2', time: '20171115101127', publisher: '张三', content: '11这是详情【苏银】 关于组织投票"金理财"微信评选的通知'}]
      that.id = that.$route.query.id || ''
      console.log('89', that.id)
    },
    filters: {
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../less/tab.less';
  @import '../../less/handoverList.less';
</style>

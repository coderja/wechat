<template>
  <div class="">
    <div v-for="(news, index) in newsDetailList">
      <div class="inlineTnfo_title" >
        <p>{{news.title}}</p>
        <p>发布日期:{{news.time | formatDateNew}} 发布人:{{news.publisher}}</p>
      </div>
      <div class="inlineTnfo_content">
        <p>{{news.content}}</p>
      </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDateNew} from '@/js/common'

  export default {
    props: {
      newsDetailList: {
        type: Array
      }
    },
    data () {
      return {
        //  newsDetailList: [[{title: '1苏州银行昆山分行积极开展“同在蓝天下--慈善一日捐”爱心捐助活动', date: '2014-10-2', time: '10:00', content: '我是内容1'}], [{title: '222苏州银行昆山分行积极开展“同在蓝天下--慈善一日捐”爱心捐助活动', date: '2014-10-2', time: '10:00', content: '我是内容2'}], [{title: '333苏州银行昆山分行积极开展“同在蓝天下--慈善一日捐”爱心捐助活动', date: '2014-10-2', time: '10:00', content: '我是内容3'}]]
        //  newsDetailList: [[{name: '【苏银】 关于组织投票"金理财"微信评选的通知', time: '20171115101127'}, {name: '【苏银】 关于组织投票"金理财"微信评选的通知', time: '20171115101128'}], [{name: '【苏银】 关于组织投票"金理财"微信评选的通知', time: '20171115101129'}, {name: '【苏银】 关于组织投票"金理财"微信评选的通知', time: '20171115101130'}]]
      }
    },
    methods: {
    },
    created: function () {
      document.title = '行内信息'
    },
    filters: {
      formatDateNew (time) {
        return formatDateNew(time)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .inlineTnfo_title{
    width:100%;
    padding:10px;
    box-sizing:border-box;
    background:white;
    border-bottom:1px solid #e9e9e9;
  }
  .inlineTnfo_title>p:first-child{
    font-size:18px;
    line-height:150%;
    margin-bottom:10px;
  }
  .inlineTnfo_title>p:last-child{
    font-size:12px;
    color:#666666;
  }
  .inlineTnfo_content{
    padding:10px;
    width:100%;
    box-sizing:border-box;
  }
  .inlineTnfo_content>p{
    line-height:150%;
    font-size:14px;
    color:#5a5a5a;
  }
</style>

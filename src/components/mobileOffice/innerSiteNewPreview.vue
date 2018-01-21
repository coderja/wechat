<template>
  <div class="">
    <div class="inlineTnfo_title">
      <p>苏州银行昆山分行积极开展“同在蓝天下--慈善一日捐”爱心捐助活动</p>
      <p>{{'20171110122133' | formatDateNew}}</p>
    </div>
    <div class="inlineTnfo_content">
      <p>大家好大家好大家好大家好大家好大家好大家好大家好大家好大家好大家好大家好</p>
      <p>大家好大家好大家好大家好大家好大家好大家好大家好大家好大家好大家好大家好</p>
      <p>大家好大家好大家好大家好大家好大家好大家好大家好大家好大家好</p>
      <p>大家好大家好大家好大家好大家好大家好大家好大家好大家好大家好</p>
      <p>大家好大家好大家好大家好大家好大家好大家好大家好</p>
      <p>大家好大家好大家好大家好大家好大家好大家好大家好</p>
    </div>
    <!--附件区域开始-->
    <div class="annexArea">
      <div class="newPre_Div">
        <div class="newPre_imgDiv"><img src="../../assets/file@2x.png" class="newPre_imgSize"/><span class="newPre_imgSpan">3个附件</span></div>
        <ul class="newPre_Ul">
          <li><a>LIST0001.jpg</a><span>({{10000 | conver}})</span></li>
          <li><a>LIST0001.jpg</a><span>(100kb)</span></li>
          <li><a>LIST0001.jpg</a><span>(100kb)</span></li>
        </ul>
      </div>
    </div>
    <!--附件区域结束-->
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
import { conver } from "@/js/common"
import {formatDateNew} from '@/js/common'
 
  export default {
    data () {
      return {
      }
    },
    methods: {
    },
    created: function () {
      document.title = '新闻预览'
    },
   
    filters:{
        conver (limit) {
          return conver(limit)
        },
        formatDateNew (str) {
          return formatDateNew(str)
        }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../less/annexArea.less';
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
    color:#333;
  }
</style>

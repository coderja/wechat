<template>
  <div class="">
    <div class="inlineTnfo_title">
      <p>{{detailItem.title}}</p>
      <p>发布日期：{{detailItem.releaseDate}} <span class="ml20">发布人：{{detailItem.releaseUsername}}</span></p>
    </div>
    <div class="inlineTnfo_content">
      <p>{{fckeditorContent()}}</p>
      <p class="tr">{{releaseDate}}</p>
    </div>
    <!--附件区域开始-->
    <div class="annexArea" v-show="fileList.length !== 0">
      <div class="newPre_Div">
        <div class="newPre_imgDiv"><img src="../../assets/file@2x.png" class="newPre_imgSize"/><span class="newPre_imgSpan">3个附件</span></div>
        <ul class="newPre_Ul">
          <li v-for="item in fileList"><a>{{item.fileTitle}}</a><span>({{item.fileSize}})</span></li>
        </ul>
      </div>
    </div>
    <!--附件区域结束-->
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable */
  import axios from 'axios'
  export default {
    data () {
      return {
        detailItem: {},
        num: 0,
        userId: '',
        fckeditorContent: '',
        releaseDate: '',
        fileList: []
      }
    },
    methods: {
      fckeditorContent: function () {
        if (this.fckeditorContent) {
          return this.fckeditorContent
        } else {
          return '暂无可用数据'
        }
      }
    },
    created: function () {
      this.detailItem = this.$route.query.detailItem || {}
      this.num = this.$route.query.num || 0
      if (this.num === 0) {
        document.title = '通知公告'
      } else if (this.num === 1) {
        document.title = '行内信息'
      }
      axios.get('/CorpWX/OA10009.do', {
        params: {
          recid: this.detailItem.id,
          userId: this.userId
        }
      }).then(response => {
        var data = response.data.body
        if (data.errorCode === '0') {
          this.fckeditorContent = data.fckeditorContent
          this.releaseDate = data.releaseDate
          this.fileList = data.list1
        } else {
          alert(data.errorMsg)
        }
      }).catch(function (response) {
        alert(response)
      })
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
    color:#5a5a5a;
  }
  .tr{
    text-align:right;
  }
  .ml20{
    margin-left:20px;
  }
</style>

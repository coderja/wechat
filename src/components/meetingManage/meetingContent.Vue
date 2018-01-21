<template>
  <div class="meetingContent">
    <div class="meetingTitle">
      <h2>{{con.MEE_NAME}}</h2>
      <p>会议时间：{{con.MEE_START_TIME | formatDate}}</p>
    </div>
    <div class="meetingIntro">
      <ul>
        <li><div class="leftName">会议名称:</div><div class="rightContent">{{con.MEE_NAME}}</div></li>
        <li>
          <div class="leftName">会议地点:</div>
          <div class="rightContent" v-for="item in this.con.meetAddList">
            <span>{{item.MEEADD_MEETROOM}}</span>
          </div>
        </li>
        <li><div class="leftName">会议时间:</div><div class="rightContent">{{con.MEE_START_TIME | formatDate}}</div></li>
        <li><div class="leftName">会议内容:</div><div class="rightContent">{{con.MEE_DETAILS}}</div></li>
        <li><div class="leftName">会议备注:</div><div class="rightContent">{{con.MEE_REMARK}}</div></li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDate} from '@/js/common'

  export default {
    props: {
      con: {
        type: Object
      },
      meetAddList: {
        type: Array
      }
    },
    data () {
      return {
      }
    },
    created: function () {
    },
    methods: {
      getAddress (item) {
        if (item) {
          var address = ''
          for (var i = 0; i < item.length; i++) {
            if (i === (item.length - 1)) {
              address += item[i].MEEADD_MEETROOM
            } else {
              address += (item[i].MEEADD_MEETROOM + ',')
            }
          }
          return address
        } else {
          return ''
        }
      }
    },
    filters: {
      formatDate (time) {
        return formatDate(time)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../less/common.less';

  .meetingContent{
    background: @commonBgColor;
    .meetingTitle{
      background: #fff;
      padding:7px 12px 0px 12px;
      h2{
        font-size: 18px;
        color: #101010;
        font-weight: bold;
      }
      p{
      margin-top:7px;
      font-size: 12px;
      color: #666666;
      line-height:32px;
      }
    }
    .meetingIntro{
      background-color:#f6f6f6;
      padding:0px 16px;
      border-top: 1px solid #E9E9E9;
      ul{
        padding-bottom:32px;
      }
      li{
        border-bottom: 1px solid #E9E9E9;
        padding:16px 0px;
        overflow:hidden;
      }
    }
  }
  .leftName{
    width:70px;
    font-size: 14px;
    color: #9B9B9B;
    line-height: 16px;
    float:left;
  }
  .rightContent{
    width:245px;
    float:left;
    font-size: 14px;
    color: #4A4A4A;
    line-height: 16px;
  }
</style>

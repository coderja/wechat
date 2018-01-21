<template>
  <div class="signInStaffList">
    <h2>签到人员名单<span v-show="staffListSkip" class="checkDetail" @click="skipToDetail">查看签到详情</span></h2>
    <table class="signTable" :class="isSignOut === true ? 'styleTable' : ''">
      <thead>
        <tr class="theadTr">
          <td>姓名</td>
          <td>部门</td>
          <td :class="isSignOut === true ? '' : 'lastChild'">签到时间</td>
          <td :class="isSignOut === true ? 'lastChild' : ''" v-show="isSignOut">签退时间</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for='item in nameList'>
          <td>{{item.MEE_USER_NAME}}</td>
          <td>{{item.MEE_BRH_NAME}}</td>
          <td :class="isSignOut === true ? '' : 'lastChild'">{{item.MEE_SIGN_TIME | formatDate}}</td>
          <td :class="isSignOut === true ? 'lastChild' : ''" v-show="isSignOut">{{item.MEE_SIGNOUTTIME | formatDate}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDate} from '@/js/common'
  export default {
    props: {
      nameList: {
        type: Array
      },
      meeId: {
        type: String
      },
      userId: {
        type: String
      },
      isSignOut: {
        type: Boolean
      },
      staffListSkip: {
        type: Boolean
      }
    },
    data () {
      return {
      }
    },
    methods: {
      skipToDetail () {
        this.$router.push({path: '/historyMeeting', query: { MEE_ID: this.meeId, userId: this.userId, titleFlag: '1' }})
      }
    },
    created: function () {
      // return this.isSignOut === '0'
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
  .signInStaffList{
    margin-bottom:14px;
    border-top:1px solid #ccc;
    padding-bottom:56px;
    h2{
      font-size: 18px;
      height:36px;
      line-height:36px;
      background-color:#fff;
      padding-left:16px;
      font-size: 14px;
      color: #666666;
      span{
        margin-left:5px;
        font-size: 12px;
        color: #FFD87E;
        line-height: 36px;
        float:right;
        display: inline-block;
        padding-right:16px;
      }
    }
    table.signTable{
      width: 100%;
      text-align:center;
    }
    table.signTable thead tr td{
      background-color:#f6f6f6;
    }
    table.signTable tbody{
      background-color:#fff;
    }
    table.signTable tbody td{
      height:36px;
      line-height:36px;
    }
    table.signTable td{
      width:125px;
    }
    .theadTr{
      height:32px;
      font-size: 10px;
      color: #666666;
      letter-spacing: 0;
      line-height: 32px;
    }
    .signTable td{
      border:1px solid #e1e1e1;
    }
    .signTable tr td:first-child{
      border-left:0px;
    }
    .signTable tr td.lastChild{
      border-right:0px;
    }
  }
  .styleTable td{
    width:25% !important;
  }
</style>

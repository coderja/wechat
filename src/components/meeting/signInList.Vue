<template>
  <div class="signInList">
    <ul>
      <li v-for='item in meetList' :class="{'historyMeetingOp':item.MEE_STATE === '2'}"  @click="jumpTo(item)">
        <h2>{{item.MEE_NAME}}</h2>
        <p><span class="mr5">会议地点：</span><span>{{item.MEEADD_MEETROOMS}}</span></p>
        <p><span class="mr5">会议时间：</span><span>{{item.MEE_START_TIME | formatDate}}</span></p>
      </li>
    </ul>
    <div class="meetShowDiv" v-show='meetShow'>您暂无会议</div>
    <wait :showRun="showRun"></wait>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDate} from '@/js/common'
  import wait from '@/components/popUpBox/wait'
  import axios from 'axios'
  export default {
    data () {
      return {
        meetList: [],
        userId: '',
        code: '',
        state: '',
        meetShow: false,
        showRun: false
      }
    },
    methods: {
      jumpTo (item) {
        this.$router.push({path: '/historyMeeting', query: {MEE_ID: item.MEE_ID, userId: this.userId}})
      }
    },
    created: function () {
      document.title = '我的会议'
      this.showRun = true
      var meetListStorage = JSON.parse(sessionStorage.getItem('meetList'))
      var userIdStorage = sessionStorage.getItem('userId')
      if (meetListStorage && meetListStorage.length !== 0) {
        this.showRun = false
        this.meetList = meetListStorage
        this.userId = userIdStorage
      } else {
        var url = window.location.href
        if (url.indexOf('?') > 0) {
          var arr = url.split('?')[1].split('&')
          this.code = arr[0].split('=')[1]
          this.state = arr[1].split('=')[1]
          axios.get('/CorpWX/WX00001.do', {
            params: {
              code: this.code,
              state: this.state
            }
          }).then(response => {
            var data = response.data.body
            if (data.errorCode === '0') {
              this.userId = data.userId
              sessionStorage.setItem('userId', this.userId)
              axios.get('/CorpWX/WX30004.do', {
                params: {
                  MEE_USER_ID: this.userId
                }
              }).then(response => {
                this.showRun = false
                var data = response.data.body
                if (data.errorCode === '0') {
                  if (data.meetList.length === 0) {
                    this.meetShow = true
                  } else {
                    this.meetShow = false
                    this.meetList = data.meetList
                    sessionStorage.setItem('meetList', JSON.stringify(data.meetList))
                  }
                } else {
                  alert(data.errorMsg)
                }
              }).catch(function (response) {
                this.showRun = false
                alert(response)
              })
            } else {
              alert(data.errorMsg)
            }
          }).catch(function (response) {
            this.showRun = false
            alert(response)
          })
        } else {
          this.showRun = false
        }
      }
    },
    filters: {
      formatDate (time) {
        return formatDate(time)
      }
    },
    components: {
      'wait': wait
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../less/common.less';

  .signInList{
    background: @commonBgColor;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    li{
      padding: 8px 16.3px 10px 12px;
      background: #fff url("../../assets/jt@2x.png") no-repeat 96% center;
      background-size:14px 14px;
      border-bottom: 1px solid rgba(0,0,0,0.08);
      cursor: pointer;
      h2{
        font-size: 16px;
        color: #4A4A4A;
        font-weight:bold;
        margin-bottom:4px;
      }
      p{
        font-size: 12px;
        color: #666666;
        line-height: 20px;
      }
    }
  }
  .historyMeetingOp h2,.historyMeetingOp p{
    opacity: 0.36;
  }
  .meetShowDiv{
    text-align: center;
    margin-top: 50%;
    color:#9C9898;
    font-size:16px;
  }
</style>

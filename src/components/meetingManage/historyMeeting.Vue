<template>
  <div class="historyMeeting">
    <div class="signInDetailCon">
      <meetingContent :con="con"></meetingContent>
      <div class="statisticsList" v-show="isShow">
        <h2>签到人员统计表</h2>
        <table class="signTable">
          <thead>
            <tr class="theadTr">
              <td>签到人数</td>
              <td>迟到人数</td>
              <td>缺席人数</td>
              <td>新增人数</td>
            </tr>
          </thead>
          <tbody>
            <tr :class="canClick === true ? 'blueColor' : ''">
              <td @click="showItem('1')">{{statisticsList.attendNumber}}</td>
              <td @click="showItem('2')">{{statisticsList.beLateNumber}}</td>
              <td @click="showItem('3')">{{statisticsList.absentNumber}}</td>
              <td @click="showItem('4')">{{statisticsList.addNumber}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <signInStaffList v-show="isShow" :nameList="nameList" :isSignOut="isSignOut"></signInStaffList>
      <div class="footerY" v-show="signInBtnShow"><button class="signInBtnY" @click="signIn()">签到</button></div>
    </div>
    <wait :showRun="showRun"></wait>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import meetingContent from '@/components/meetingManage/meetingContent'
  import signInStaffList from '@/components/meeting/signInStaffList'
  import wait from '@/components/popUpBox/wait'
  export default {
    data () {
      return {
        myFlag: '',
        myMeetId: '',
        isShow: false, // 代表非历史会议
        // 传递给子组件的一系列参数
        con: {},
        nameList: [],
        titleFlag: '',
        titleFlagTwo: '',
        showRun: false,
        signInBtnShow: false,
        jumpUrl: '',
        isSignOut: false,
        statisticsList: {},
        userId: '',
        canClick: false,
        wholeList: []
      }
    },
    // 在挂载完成后,将接收到的index赋值给myIndex
    created: function () {
      this.showRun = true
      this.myMeetId = this.$route.query.MEE_ID || ''
      this.userId = this.$route.query.userId || ''
      this.titleFlagTwo = this.myMeetId
      var url = window.location.href
      if (!(this.myMeetId) && url.indexOf('?') > 0) {
        // 从推送消息过来
        var arr = url.split('?')[1].split('&')
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].split('=')[0] === 'state') {
            this.myMeetId = arr[i].split('=')[1].split('#')[0]
          }
        }
      }
      axios.get('/CorpWX/WX30003.do', {
        params: {
          MEE_ID: this.myMeetId,
          userId: this.userId
        }
      }).then(response => {
        this.showRun = false
        var data = response.data.body
        if (data.errorCode === '0') {
          this.nameList = data.meetEmpSignList || ''// 签到人员名单列表
          this.wholeList = data.meetEmpSignList || ''// 签到人员名单列表
          this.statisticsList = {attendNumber: data.attendNumber, beLateNumber: data.beLateNumber, absentNumber: data.absentNumber, addNumber: data.addNumber}// 签到人员统计表
          // this.con = {MEE_NAME: data.MEE_NAME, MEEADD_ADDRESS: data.meetAddList, MEE_START_TIME: data.MEE_START_TIME, MEE_DETAILS: data.MEE_DETAILS, MEE_REMARK: data.MEE_REMARK}
          this.con = data
          this.isSignOut = (data.MEE_ISSIGNOUT === '1')
          this.myFlag = data.MEE_STATE || ''
          this.jumpUrl = data.MEE_TWO_CODE || ''
          var that = this
          if (this.myFlag === '2') {
            // 代表是历史会议
            this.isShow = true
            this.signInBtnShow = false
            if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
              that.setTitle('历史会议')
            } else {
              document.title = '历史会议'
            }
          } else if (this.myFlag === '0') {
            // 代表是提醒会议
            this.isShow = false
            this.signInBtnShow = true
            if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
              that.setTitle('提醒会议')
            } else {
              document.title = '提醒会议'
            }
          } else if (this.myFlag === '1') {
            // 代表进行中会议
            this.isShow = true
            this.signInBtnShow = true
            if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
              that.setTitle('提醒会议')
            } else {
              document.title = '提醒会议'
            }
          }
          if (!(this.titleFlagTwo) && url.indexOf('?') > 0) {
            if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
              that.setTitle('会议详情')
            } else {
              document.title = '会议详情'
            }
            // 从推送过来的
            this.signInBtnShow = true
          }
          this.titleFlag = this.$route.query.titleFlag || ''
          if (this.titleFlag) {
            if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
              that.setTitle('会议签到')
            } else {
              document.title = '会议签到'
            }
            // 从签到成功过来
            this.signInBtnShow = false // 签到过来都不显示签到按钮 流程已经结束
            if (this.myFlag === '0' || this.myFlag === '1') {
              this.isShow = true
            }
          }
          if (this.titleFlag && this.titleFlag === '2') {
            if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
              that.setTitle('会议签退')
            } else {
              document.title = '会议签退'
            }
            // 从会议签退过来
          }
          if (this.userId && (data.MEE_CREATE_USER === this.userId)) {
            this.canClick = true
          } else {
            this.isShow = false
          }
        } else {
          alert(data.errorMsg)
        }
      }).catch(function (response) {
        this.showRun = false
        alert(response)
      })
    },
    components: {
      meetingContent,
      signInStaffList,
      wait
    },
    methods: {
      signIn: function () {
        //  签到
        if (this.jumpUrl) {
          window.location.href = this.jumpUrl.replace(/&amp;/g, '&')
        } else {
          alert('跳转路径为空')
        }
      },
      setTitle: function (str) {
        document.title = str
      },
      showItem: function (num) {
        // 代表可以点击
        if (this.canClick === true) {
          var list = this.wholeList
          var arr = []
          for (var i = 0; i < list.length; i++) {
            // 代表参会人数，迟到人数，缺席人数点击了
            if (num === '1' || num === '2' || num === '3') {
              if (num === '2') {
                if (list[i].MEE_SIGN_STT === num && list[i].MEE_SOURCE_TYPE === '0') {
                  arr.push(list[i])
                }
              } else if (num === '3') {
                if (list[i].MEE_SIGN_STT === num && list[i].MEE_SOURCE_TYPE === '0') {
                  arr.push(list[i])
                }
              } else {
                if (list[i].MEE_SIGN_STT !== '3') {
                  arr.push(list[i])
                }
              }
            // 新增人数点击了
            } else {
              if (list[i].MEE_SOURCE_TYPE === '1') {
                arr.push(list[i])
              }
            }
          }
          this.nameList = arr
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
.footerY{
    width:100%;
    padding:6px 24px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    box-sizing: border-box;
    background-color:#fff;
    z-index:1;
  }
.signInBtnY{
  width: 100%;
  height: 44px;
  line-height: 44px;
  outline: none;
  border: none;
  background: linear-gradient(-180deg, #FFD87E 0%, #FF6039 100%);
  border-radius: 32px;
  font-size: 20px;
  color: #FFFFFF;
}
.statisticsList{
  border-top:1px solid #ccc;
  padding-bottom:20px;
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
      color: #000000;
      line-height: 16px;
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
  .signTable tr td:last-child{
    border-right:0px;
  }
  tr.blueColor{
    color:blue
  }
  .styleTable td{
    width:25%;
  }
}
</style>

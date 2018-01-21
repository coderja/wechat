<template>
  <div class="signIn">
    <div class="innerSignIn">
      <meetingContent :con="con" :meetAddList="meetAddList"></meetingContent>
      <signInStaffList :meeId="meeId" :userId="userId" :staffListSkip="staffListSkip" :isSignOut="isSignOut" v-show="staffList" :nameList="nameList"></signInStaffList>
      <div class="footer">
        <button class="signInBtn" v-show="signInBtnShow" :class="{'active':isActive}" @click="signInClick" >{{signInText}}</button>
      </div>
    </div>
    <div class="extraSignIn" v-show="extraUser">
      <p class="joinMeetSign">参会名单外人员签到</p>
      <div class="signMessage">
        <div class="leftMeetName">姓<span class="noNeed">充字</span>名：</div><div class="rightInputContent"><input type="text" v-model="extraStaffName" class="inputMessage" placeholder="请输入您的姓名" maxlength="50"/></div>
      </div>
      <div class="signMessage">
        <div class="leftMeetName">手机号码：</div><div class="rightInputContent"><input type="text" v-model="extraStaffPhoneNum" class="inputMessage" placeholder="请输入您的手机号码"/></div>
      </div>
    </div>
    <div class="tipMsg" v-show="notIsRange">
      <div class="titleTip">
        <img src="../../assets/absent@2x.png" class="imgAbsentSize"/><span>不在可签到范围内</span>
      </div>
    </div>e
    <div class="tipMsg" v-show="isRange">
      <div class="titleTip">
        <img src="../../assets/within@2x.png" class="imgAbsentSize"/><span class='green'>已进入签到范围：{{signInSite}}</span>
      </div>
    </div>
    <successBox v-show="boxShow" :meeId="meeId"></successBox>
    <signed v-show="signedShow" :meeId="meeId" :userId="userId"></signed>
    <successOut v-show="successOutShow" :meeId="meeId" :userId="userId" :isSignOut="isSignOut"></successOut>
    <errorMsg v-show="errorMsgShow" :errorMsgShow="errorMsgShow" :errorMsgTit="errorMsgTit" :errorMsgInfo="errorMsgInfo" :errorTag="errorTag" @ievent = "ievent"></errorMsg>
    <gpsBox v-show="isGpsShow" :isGpsOpen="isGpsOpen" @closeGpsbox = "closeGpsbox"></gpsBox>
    <wait :showRun="showRun" :getlocalWaitTag="getlocalWaitTag"></wait>
  </div>
</template>

<script type="text/ecmascript-6">
  import wx from 'weixin-js-sdk'
  import axios from 'axios'
  import meetingContent from '@/components/meetingManage/meetingContent'
  import signInStaffList from '@/components/meeting/signInStaffList'
  import successBox from '@/components/popUpBox/successBox'
  import signed from '@/components/popUpBox/signed'
  import successOut from '@/components/popUpBox/successOut'
  import errorMsg from '@/components/popUpBox/errorMsg'
  import wait from '@/components/popUpBox/wait'
  import {trim} from '@/js/common'

  export default {
    data () {
      return {
        boxShow: false,
        con: {},
        isRange: false,
        extraUser: false,
        isActive: false,
        signInText: '签到',
        staffList: false,
        signInBtnShow: true,
        isSignOut: false,
        selflatitude: '', // 自己的纬度
        selflongitude: '', // 自己的经度
        selfspeed: '', // 自己的速度
        selfaccuracy: '', // 自己位置精度
        extraStaffName: '',
        extraStaffPhoneNum: '',
        meeAddId: '',
        isGpsOpen: true,
        isInRang: true,
        meetAddList: [],
        meeFlowId: '',
        nameList: [],
        url: '',
        code: '',
        state: '',
        userId: '',
        meeId: '',
        bgShadeShow: false,
        openId: '',
        successOutShow: false,
        errorMsgShow: false,
        errorMsgTit: '',
        errorMsgInfo: '',
        notIsRange: false,
        errorTag: '',
        signedShow: false,
        staffListSkip: false,
        showRun: false,
        getlocalWaitTag: '1',
        signInTit: '签到',
        signOutTit: '签退',
        signInSite: ''
      }
    },
    components: {
      meetingContent,
      successBox,
      signInStaffList,
      signed,
      successOut,
      errorMsg,
      wait
    },
    created: function () {
      // document.title = '会议' + this.signInTit
      this.$parent.data.titleMsg = '会议' + this.signInTit
      this.wxConfig()
      this.url = window.location.href
      if (this.url.indexOf('?') > 0) {
        this.code = this.url.split('?')[1].split('&')[0].split('=')[1]
        let getState = this.url.split('&')[1].split('#')[0].split('=')[1]
        if (getState.indexOf('%23') > 0) {
          this.state = getState.split('%23')[0]
        } else {
          this.state = getState
        }
        this.meeId = this.state
      } else {
        this.errorMsgTit = ''
        this.errorMsgInfo = '获取用户信息失败'
        this.errorMsgShow = !this.errorMsgShow
      }
      let getUserId = sessionStorage.getItem('getUserId')
      let getOpenId = sessionStorage.getItem('getOpenId')
      let getMeeId = sessionStorage.getItem('getMeeId')
      if ((getMeeId !== '' && getMeeId !== null && getMeeId !== 'null') && ((getUserId !== '' && getUserId !== null && getUserId !== 'null') || (getOpenId !== '' && getOpenId !== null && getOpenId !== 'null'))) {
        this.meeId = getMeeId
        if (getOpenId === undefined || getOpenId === 'undefined') {
          this.openId = ''
        } else {
          this.openId = getOpenId
        }
        if (getUserId === undefined || getUserId === 'undefined') {
          this.userId = ''
        } else {
          this.userId = getUserId
        }
        this.staffListInfo()
        this.isSignIn()
      } else {
        this.staffListInfo()
        this.intoApply()
      }
    },
    computed: {
      startShow () {
        return this.$store.state.startShow
      }
    },
    methods: {
      wxConfig: function () {
        // this.url = window.location.href.split('#')[0]
        this.url = window.location.href
        axios.get('/CorpWX/WX30005.do', {
          params: {
            url: this.url}
        }).then(response => {
          response = response.data.body
          if (response.errorCode === '0') {
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: response.appId, // 必填，公众号的唯一标识
              timestamp: response.timestamp, // 必填，生成签名的时间戳
              nonceStr: response.nonceStr, // 必填，生成签名的随机串
              signature: response.signature, // 必填，签名，见附录1
              jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
          }
        }).catch(function (response) {
          console.log(response)
        })
      },
      signInClick () {
        if (this.extraUser) {
          let myreg = /^1[1|2|3|4|5|6|7|8|9][0-9]{9}$/
          let nameReg = /^[\u4E00-\u9FA5A-Za-z]+$/
          let name = trim(this.extraStaffName)
          let phoneNum = trim(this.extraStaffPhoneNum)
          if (name === '') {
            this.errorMsgTit = ''
            this.errorMsgInfo = '请输入您的姓名'
            this.errorMsgShow = !this.errorMsgShow
            return false
          } else if (!nameReg.test(name)) {
            this.errorMsgTit = ''
            this.errorMsgInfo = '请输入正确的姓名'
            this.errorMsgShow = !this.errorMsgShow
            return false
          }
          if (phoneNum === '') {
            this.errorMsgTit = ''
            this.errorMsgInfo = '请输入您的手机号'
            this.errorMsgShow = !this.errorMsgShow
            return false
          } else if (!myreg.test(phoneNum)) {
            this.errorMsgTit = ''
            this.errorMsgInfo = '请输入正确的手机号码'
            this.errorMsgShow = !this.errorMsgShow
            return false
          }
        }
        // 如果未签到，点击签到
        if (this.isActive) {
          if (this.con.signMeetCount === '0' || this.con.signMeetCount === '') {
            axios({
              method: 'post',
              url: '/CorpWX/signMeetAction.do',
              params: {
                MEE_ID: this.con.MEE_ID,
                MEE_ADD_ID: this.meeAddId,
                MEE_EMP_ID: this.con.MEE_EMP_ID,
                MEE_USER_NAME: this.extraStaffName,
                MEE_MOBILE: this.extraStaffPhoneNum,
                MEE_USER_ID: this.userId,
                openId: this.openId
              },
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              }
            }
            ).then(response => {
              response = response.data.body
              if (response.errorCode === '0') {
                this.isActive = false
                this.boxShow = true
              } else {
                this.errorMsgTit = ''
                this.errorMsgInfo = response.errorMsg
                this.errorMsgShow = !this.errorMsgShow
              }
            }).catch(function (response) {
              alert(response)
            })
          } else {
            // 如果签到，会议有签退，但未签退
            if (this.con.signMeetCount === '1') {
              axios.get('/CorpWX/SM10002.do', {
                params: {
                  MEE_FLOW_ID: this.meeFlowId}
              }
              ).then(response => {
                response = response.data.body
                if (response.errorCode === '0') {
                  this.isActive = false
                  this.successOutShow = true
                } else {
                  this.errorMsgTit = ''
                  this.errorMsgInfo = response.errorMsg
                  this.errorMsgShow = !this.errorMsgShow
                }
              }).catch(function (response) {
                alert(response)
              })
            }
          }
        }
      },
      intoApply () {
        axios.get('/CorpWX/WX00001.do', {
          params: {
            code: this.code}
        }
        ).then(response => {
          response = response.data.body
          if (response.errorCode === '0') {
            this.userId = response.userId
            this.openId = response.MEE_OPENID
            sessionStorage.setItem('getUserId', this.userId)
            sessionStorage.setItem('getOpenId', this.openId)
            sessionStorage.setItem('getMeeId', this.meeId)
            this.isSignIn()
          } else {
            this.errorMsgTit = ''
            this.errorMsgInfo = response.errorMsg
            this.errorMsgShow = !this.errorMsgShow
          }
        }).catch(function (response) {
          this.signInBtnShow = false
          this.errorMsgTit = ''
          this.errorMsgInfo = response.errorMsg
          this.errorMsgShow = !this.errorMsgShow
        })
      },
      isSignIn () {
        this.showRun = true
        axios.get('/CorpWX/MEET10001.do', {
          params: {
            MEE_ID: this.meeId,
            MEE_USER_ID: this.userId,
            MEE_OPENID: this.openId}
        }
        ).then(response => {
          response = response.data.body
          if (response.errorCode === '0') {
            this.con = response
            this.meetAddList = response.meetAddList
            this.isSignOut = response.MEE_ISSIGNOUT === '1'
            this.meeFlowId = response.MEE_FLOW_ID
            let that = this
            wx.getLocation({
              type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function (res) {
                that.showRun = false
                let latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
                let longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
                if (latitude === '' || latitude === null) {
                  latitude = '31.319010'
                }
                if (longitude === '' || longitude === null) {
                  longitude = '120.729060'
                }
                if (that.meetAddList) {
                  that.meetAddList.forEach((item) => {
                    if (item) {
                      let lat = item.MEEADD_POINT.split(';')[0].split(':')[1]
                      let lng = item.MEEADD_POINT.split(';')[1].split(':')[1]
                      if (lat === '' || lat === null || lat === undefined) {
                        lat = '0'
                      }
                      if (lng === '' || lng === null || lng === undefined) {
                        lng = '0'
                      }
                      let length = parseFloat(that.getDistancegetDistance(lat, lng, latitude, longitude))
                      let rang = (item.MEEADD_RANGE) / 1000
                      let dis = length - rang
                      if (dis < 0) {
                        that.signInSite = item.MEEADD_ADDRESS
                        that.isRange = true
                      } else {
                        that.notIsRange = true
                      }
                    }
                  })
                } else {
                  alert('后台没有meetAddList')
                  return false
                }
                // 在签到范围
                if (that.isRange) {
                  // 会议未开始
                  if (that.con.MEE_STATE === '0') {
                    that.isActive = true
                    // 不是参会人
                    if (that.con.resultCount === '0') {
                      that.extraUser = true
                    } else {
                      if (that.con.signMeetCount === '1') {
                        if (that.con.MEE_ISSIGNOUT === '0') {
                          that.$router.push({path: '/historyMeeting', query: { MEE_ID: that.meeId, userId: that.userId, titleFlag: '1' }})
                        } else {
                          that.signInText = '签退'
                        }
                      }
                    }
                  // 会议进行中
                  } else if (that.con.MEE_STATE === '1') {
                    // 不是参会人员
                    if (that.con.resultCount === '0') {
                      that.extraUser = true
                      that.isActive = true
                    } else {
                      // 是参会人员，但是未签到
                      if (that.con.signMeetCount === '0') {
                        that.isActive = true
                      // 是参会人员，但已签到
                      } else if (that.con.signMeetCount === '1') {
                        // that.staffListInfo()
                        that.staffList = true
                        // 无签退
                        if (that.con.MEE_ISSIGNOUT === '0') {
                          that.signedShow = true
                        } else {
                          // document.title = '会议' + that.signOutTit
                          this.$parent.data.titleMsg = '会议' + this.signOutTit
                          that.isRange = false
                          if (that.con.signOutMeetCount === '0') {
                            that.isActive = true
                            that.staffListSkip = true
                            that.staffList = true
                            that.signInText = '签退'
                          } else {
                            that.$router.push({path: '/historyMeeting', query: { MEE_ID: that.meeId, userId: that.userId, titleFlag: '2' }})
                          }
                        }
                      }
                    }
                  // 会议已结束
                  } else if (that.con.MEE_STATE === '2') {
                    that.$router.push({path: '/historyMeeting', query: { MEE_ID: that.meeId, userId: that.userId, titleFlag: '2' }})
                  // 会议已取消
                  } else if (that.con.MEE_STATE === '3') {
                    that.signInBtnShow = false
                  }
                } else {
                  that.isActive = false
                }
              }
            })
          } else {
            this.errorMsgTit = ''
            this.errorTag = '1'
            this.errorMsgInfo = response.errorMsg
            this.errorMsgShow = !this.errorMsgShow
          }
        }).catch(function (response) {
          this.errorMsgTit = ''
          this.errorMsgInfo = response.errorMsg
          this.errorMsgShow = !this.errorMsgShow
        })
      },
      rad (d) {
        return d * Math.PI / 180.0 // 经纬度转换成三角函数中度分表形式。
      },
      // 计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
      getDistancegetDistance (lat1, lng1, lat2, lng2) {
        let radLat1 = this.rad(lat1)
        let radLat2 = this.rad(lat2)
        let a = radLat1 - radLat2
        let b = this.rad(lng1) - this.rad(lng2)
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
        s = s * 6378.137 // EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000 // 输出为公里
        return s
      },
      staffListInfo () {
        axios.get('/CorpWX/WX30003.do', {
          params: {
            MEE_ID: this.meeId}
        }
        ).then(response => {
          response = response.data.body
          if (response.errorCode === '0') {
            this.nameList = response.meetEmpSignList
          } else {
            this.errorMsgTit = ''
            this.errorMsgInfo = response.errorMsg
            this.errorMsgShow = !this.errorMsgShow
          }
        }).catch(function (response) {
          alert(response.errorMsg)
        })
      },
      chargeInRang () {
      },
      ievent (toggleVal) {
        this.errorMsgShow = toggleVal
      },
      closeGpsbox (toggleVal) {
        this.isGpsShow = toggleVal
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../less/common.less';

  .signIn {
    padding-bottom: 86px;
  }
  .footer{
    width:100%;
    padding:6px 24px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    box-sizing: border-box;
    background-color:#fff;
    z-index:1;
  }
  .signIn{
    .innerSignIn{
      .signInBtn{
        width: 100%;
        height: 44px;
        line-height: 44px;
        outline: none;
        border: none;
        background: #D1D1D1;
        border-radius: 5px;
        font-size: 20px;
        color: #FFFFFF;
        &.active{
          background-image: linear-gradient(-180deg, #60ad30 0%, #7bbe4c 100%);
        }
      }
    }
    .extraSignIn{
      background-color:#fff;
      overflow:hidden;
      margin-bottom: 33px;
      .joinMeetSign{
      text-align:center;
      font-size: 14px;
      color: #666666;
      line-height: 16px;
      padding:12px 0px;
      }
    }
  }
  .popUpBox{
    width: 80%;
    height: 280px;
    background: #fff;
    border-radius: 8px;
    position: fixed;
    left: 10%;
    top:10%;
    z-index: 1000;
    .boxCon{
      text-align: center;
      margin-top: 40px;
    }
  }
  .signMessage{
    margin:0px 8px 12px 8px;
    overflow:hidden;
    border:1px solid #EEEEEE;
  }
  .leftMeetName{
    float:left;
    border-right:1px solid #EEEEEE;
    padding:0px 18px 0px 15px;
    line-height:36px;
    font-size: 12px;
    color: #9B9B9B;
  }
  .rightInputContent{
    float:left;
  }
  .inputMessage{
    padding:10px 13px 9px 13px;
    outline:none;
    border:none;
    width:100%;
  }
  input.inputMessage::-webkit-input-placeholder{
    color: #C0C0C0;
    font-size: 12px;
  }
  input.inputMessage::-moz-input-placeholder{
    color: #C0C0C0;
    font-size: 12px;
  }
  input.inputMessage::-ms-input-placeholder{
    color: #C0C0C0;
    font-size: 12px;
  }
  .tipMsg{
    width:100%;
    height:36px;
    position: fixed;
    bottom: 51px;
    left: 0;
    .titleTip{
      width:100%;
      height:36px;
      line-height:36px;
      background-color: #FFFDEB;
      text-align:center;
      margin-bottom:1px;
      img{
        position: relative;
        top: 4px;
      }
      span{
        font-size: 14px;
        color: #FF771A;
        line-height: 16px;
        margin-left:9px;
      }
    }
  }
  .green{
     color: #7ED321 !important
   }
  .imgAbsentSize{
    width:16px;
    height:16px;
  }
  .noNeed{
    visibility:hidden;
  }
  .paddingBtn{
    padding-bottom:86px
  }
</style>

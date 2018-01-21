<template>
  <div class="signIn">
    <div class="innerSignIn">
      <meetingContent :con="con" :meetAddList="meetAddList"></meetingContent>
      <signInStaffList :isSignOut="isSignOut" v-show="staffList" :nameList="nameList"></signInStaffList>
      <div class="footer">
        <button class="signInBtn" v-show="signInBtnShow" :class="{'active':isActive}" @click="signInClick" >{{signInText}}</button>
      </div>
    </div>
    <div class="extraSignIn">
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
    </div>
    <div class="tipMsg" v-show="isRange">
      <div class="titleTip">
        <img src="../../assets/within@2x.png" class="imgAbsentSize"/><span class='green'>已进入签到范围：{{signInSite}}</span>
      </div>
    </div>
    <successBox v-show="boxShow" :meeId="meeId"></successBox>
    <errorMsg v-show="errorMsgShow" :errorMsgShow="errorMsgShow" :errorMsgTit="errorMsgTit" :errorMsgInfo="errorMsgInfo" :errorTag="errorTag" @ievent = "ievent"></errorMsg>
    <gpsBox v-show="isGpsShow" :isGpsOpen="isGpsOpen" @closeGpsbox = "closeGpsbox"></gpsBox>
    <confirmBox :isSignOut="isSignOut" :meeFlowId="meeFlowId" :meeId="meeId" :confirmBox="confirmBox" @confirmBoxclick="confirmBoxclick"></confirmBox>
    <wait :showRun="showRun" :getlocalWaitTag="getlocalWaitTag"></wait>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import meetingContent from '@/components/meetingManage/meetingContent'
  import signInStaffList from '@/components/meeting/signInStaffList'
  import confirmBox from '@/components/popUpBox/confirmBox'
  import errorMsg from '@/components/popUpBox/errorMsg'
  import successBox from '@/components/popUpBox/successBox'
  import wait from '@/components/popUpBox/wait'
  import {trim} from '@/js/common'

  export default {
    data () {
      return {
        boxShow: false,
        con: {},
        isRange: false,
        isActive: true,
        signInText: '签到',
        staffList: false,
        signInBtnShow: true,
        isSignOut: '',
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
        isGpsShow: false,
        confirmBox: false,
        selflatitude: '', // 自己的纬度
        selflongitude: '', // 自己的经度
        selfspeed: '', // 自己的速度
        selfaccuracy: '', // 自己位置精度
        showRun: false,
        getlocalWaitTag: '1',
        signInSite: ''
      }
    },
    components: {
      meetingContent,
      signInStaffList,
      errorMsg,
      confirmBox,
      successBox,
      wait
    },
    created: function () {
      this.meeId = window.location.href.split('state=')[1].split('&')[0]
      document.title = '会议' + this.signInText
      this.isSignIn()
      window.addEventListener('popstate', function () {
        window.opener = null
        window.open('about:blank', '_self', '').close()
      }, false)
    },
    computed: {
      startShow () {
        return this.$store.state.startShow
      }
    },
    methods: {
      signInClick () {
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
        // 如果未签到，点击签到
        if (this.isActive) {
          axios({
            method: 'post',
            url: '/CorpWX/signMeetAction.do',
            params: {
              MEE_ID: this.meeId,
              MEE_ADD_ID: this.meeAddId,
              MEE_USER_NAME: this.extraStaffName,
              MEE_MOBILE: this.extraStaffPhoneNum
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          }
          ).then(response => {
            response = response.data.body
            if (response.errorCode === '0') {
              this.isActive = false
              this.meeFlowId = response.MEE_FLOW_ID
              this.boxShow = true
            } else if (response.errorCode === '000002') {
              this.meeFlowId = response.MEE_FLOW_ID
              if (this.isSignOut === '1') {
                this.confirmBox = true
              } else {
                this.errorMsgInfo = ''
                this.errorMsgInfo = response.errorMsg
                this.errorMsgShow = !this.errorMsgShow
              }
            } else {
              this.errorMsgTit = ''
              this.errorMsgInfo = response.errorMsg
              this.errorMsgShow = !this.errorMsgShow
            }
          }).catch(function (response) {
            alert(response)
          })
        }
      },
      isSignIn () {
        this.showRun = true
        axios.get('/CorpWX/MEET10002.do', {
          params: {
            MEE_ID: this.meeId}
        }
        ).then(response => {
          response = response.data.body
          if (response.errorCode === '0') {
            this.con = response
            this.meetAddList = response.meetAddList
            this.isSignOut = response.MEE_ISSIGNOUT
            let that = this
            var geolocation = new qq.maps.Geolocation('ZSLBZ-GLBCS-TWVOX-6FSVB-FG2OV-F7FE7', 'getlocation')
            geolocation.getLocation(function (position) {
              that.showRun = false
              that.selflatitude = position.lat
              that.selflongitude = position.lng
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
                    let length = parseFloat(that.getDistancegetDistance(lat, lng, that.selflatitude, that.selflongitude))
                    let rang = (item.MEEADD_RANGE) / 1000
                    let dis = length - rang
                    if (dis < 0) {
                      that.isRange = true
                    } else {
                      that.notIsRange = true
                    }
                  }
                })
                if (that.isRange) {
                  that.isActive = true
                  if (that.con.MEE_STT === '1') {
                    that.errorMsgTit = ''
                    that.errorTag = '1'
                    that.errorMsgInfo = '对不起，该会议已删除'
                    that.errorMsgShow = !that.errorMsgShow
                  }
                  if (that.con.MEE_STATE === '3') {
                    that.errorMsgTit = ''
                    that.errorTag = '1'
                    that.errorMsgInfo = '对不起，该会议已取消'
                    that.errorMsgShow = !that.errorMsgShow
                  } else if (that.con.MEE_STATE === '2') {
                    that.errorMsgTit = ''
                    that.errorTag = '1'
                    that.errorMsgInfo = '对不起，该会议已结束'
                    that.errorMsgShow = !that.errorMsgShow
                  }
                } else {
                  that.isActive = false
                }
              } else {
                alert('后台没有meetAddList')
                return false
              }
            }, function () {
              that.showRun = false
              alert('获取地理位置失败')
              that.selflatitude = '31.319010'
              that.selflongitude = '120.729060'
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
                    let length = parseFloat(that.getDistancegetDistance(lat, lng, that.selflatitude, that.selflongitude))
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
                if (that.isRange) {
                  that.isActive = true
                  if (that.con.MEE_STT === '1') {
                    that.errorMsgTit = ''
                    that.errorTag = '1'
                    that.errorMsgInfo = '对不起，该会议已删除'
                    that.errorMsgShow = !that.errorMsgShow
                  }
                  if (that.con.MEE_STATE === '3') {
                    that.errorMsgTit = ''
                    that.errorTag = '1'
                    that.errorMsgInfo = '对不起，该会议已取消'
                    that.errorMsgShow = !that.errorMsgShow
                  } else if (that.con.MEE_STATE === '2') {
                    that.errorMsgTit = ''
                    that.errorTag = '1'
                    that.errorMsgInfo = '对不起，该会议已结束'
                    that.errorMsgShow = !that.errorMsgShow
                  }
                } else {
                  that.isActive = false
                }
              } else {
                alert('后台没有meetAddList')
                return false
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
      confirmBoxclick (toggleVal) {
        this.confirmBox = toggleVal
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
        border-radius: 32px;
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

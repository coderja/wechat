<template>
  <div>
    <div v-show="confirmBox">
      <div class="bgShade">
        <div class="confirmBox">
          <div class="boxCon">
            <em class="littlePic"></em>
            <h2 ref="title">您已签到，是否签退</h2>
            <div class="btnBox">
              <button class="signInSuccessBtn btn confirm" v-show="isSignOut==='1'" @click="signOutClick">确定</button>
              <button class="signInSuccessBtn btn cancel" @click="iclick">取消</button>
            </div>
          </div>
          </div>
      </div>
    </div>
    <successOut v-show="successOutShow" :meeId="meeId" :successOutShow="successOutShow" @successOutclick="successOutclick"></successOut>
  </div>
</template>

<script type="text/ecmascript-6">
  import successOut from '@/components/popUpBox/successOut'
  import axios from 'axios'

  export default {
    data () {
      return {
        successOutShow: false
      }
    },
    props: {
      meeId: {
        type: String
      },
      confirmBox: {
        type: Boolean
      },
      isSignOut: {
        type: String
      },
      meeFlowId: {
        type: String
      }
    },
    components: {
      successOut
    },
    created: function () {
    },
    methods: {
      iclick () {
        this.confirmBox = false
        this.$emit('confirmBoxclick', this.confirmBox)
      },
      signOutClick () {
        this.confirmBox = false
        this.$emit('confirmBoxclick', this.confirmBox)
        axios.get('/CorpWX/SM10002.do', {
          params: {
            MEE_FLOW_ID: this.meeFlowId}
        }
        ).then(response => {
          response = response.data.body
          if (response.errorCode === '0') {
            this.successOutShow = true
          } else {
            this.errorMsgTit = ''
            this.errorMsgInfo = response.errorMsg
            this.errorMsgShow = !this.errorMsgShow
          }
        }).catch(function (response) {
          alert(response)
        })
      },
      successOutclick (toggleVal) {
        this.successOutShow = toggleVal
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .confirmBox{
    width: 287px;
    height: 349px;
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.12), 0 12px 8px 0 rgba(0,0,0,0.16);
    border-radius: 12px;
    position: absolute;
    top:50px;
    left: 44px;
    z-index: 1000;
    .boxCon{
      text-align: center;
      .littlePic{
        width: 83px;
        height: 83px;
        display: inline-block;
        background: url("../../assets/repet@2x.png") no-repeat;
        background-size: 100% 100%;
        margin-top: 66px;
      }
      .btn{
        border:none
      }
      h2{
        font-size: 18px;
        color: #666666;
        line-height: 16px;
        margin: 30px 0 18px 0;
      }
      p{
        font-size: 14px;
        color: #9B9B9B;
        line-height: 16px;
      }
      .signInSuccessBtn{
        width:90px
      }
      .cancel{
        margin-left:30px
      }
    }
  }
</style>

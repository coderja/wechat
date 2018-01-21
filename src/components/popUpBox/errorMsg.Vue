<template>
  <div class="bgShade">
    <div class="errorMsg">
      <div class="boxCon">
        <em class="littlePic"></em>
        <h2 ref="title">{{errorMsgTit}}</h2>
        <p>{{errorMsgInfo}}</p>
        <div class="signInSuccessBtn btn" @click="iclick">确定</div>
      </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import wx from 'weixin-js-sdk'

  export default {
    props: {
      meeId: {
        type: String
      },
      isSignOut: {
        type: Boolean
      },
      errorMsgShow: {
        type: Boolean
      },
      errorMsgInfo: {
        type: String
      },
      errorMsgTit: {
        type: String
      },
      errorTag: {
        type: String
      }
    },
    computed: {
    },
    created: function () {
    },
    methods: {
      iclick () {
        if (this.errorTag === '1') {
          window.close()
          wx.closeWindow()
        } else {
          this.errorMsgShow = false
          this.$emit('ievent', this.errorMsgShow)
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .errorMsg{
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
        background: url("../../assets/tishi.png") no-repeat;
        background-size: 100% 100%;
        margin-top: 66px;
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
    }
  }
</style>

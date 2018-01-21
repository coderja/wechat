<template>
  <div class="bgShade">
    <div class="successBox">
      <div class="boxCon">
        <em class="littlePic"></em>
        <h2>定位未开启</h2>
        <p>请开启GPS定位，再进行签到</p>
        <router-link class="signInSuccessBtn btn" to="/signInDetail">确定</router-link>
      </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="less" rel="stylesheet/less">
  .successBox{
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
        background: url("../../assets/GPS@2x.png") no-repeat;
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

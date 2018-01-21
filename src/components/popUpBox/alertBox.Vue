<template>
  <div class="mongoliaLayer">
    <div class="alertBox">
      <div class="boxCon">
        <em class="littlePic" :style="alertContent.alertImg"></em>
        <h2 ref="title">{{alertContent.title}}</h2>
        <p>{{alertContent.content}}</p>
        <div class="signInSuccessBtn btn" @click="closeAlertFun()">{{alertContent.btnWord}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      alertContent: {
        type: Object
      },
      closeAlert: {
        type: Function
      }
    },
    computed: {
    },
    methods: {
      closeAlertFun: function () {
        this.closeAlert()
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .mongoliaLayer{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    background: rgba(0, 0, 0, 0.2);
    z-index:999;
  }
  .alertBox{
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

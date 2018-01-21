<template>
  <div class="hideDiv" align="center" v-show="showRun">
    <div class="imgRun">
      <img src="../../assets/wait.gif" class="waitImgSize"/>
      <h2 class="getlocalWait" v-show="getlocalWaitTag === '1'">正在获取地理位置，请稍后。。。</h2>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      showRun: {
        type: Boolean
      },
      getlocalWaitTag: {
        type: String
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .hideDiv{
    height:100%;
    width:100%;
    background:#ccc;
    position:fixed;
    top:0px;
    left:0px;
    opacity: 0.6;
    z-index:90;
  }
  .imgRun{
    width:100%;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    z-index:100;
  }
  .waitImgSize{
    width:64px;
    height:64px;
  }
  .getlocalWait{
    margin-top: 20px;
  }
</style>

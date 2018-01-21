<template>
  <div class="mongoliaLayer">
    <div class="successBox">
      <div class="boxCon">
        <h2 ref="title">下载附件</h2>
        <p><span>{{perSize}}</span><span>{{perSizeDW}}</span>/<span>{{totalSize}}</span><span>{{totalDW}}</span></p>
        <div class="sideBarDiv">
          <div class="sideBarIn" :style="{width: sideWidth + '%'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        totalSize: '',
        perSize: '0',
        perSizeDW: 'KB',
        totalDW: 'KB',
        sideWidth: '',
        timer: ''
      }
    },
    props: {
    },
    mounted: function () {
      var sideWidth = 10
      var totalSize = 100
      var perSize = 10
      this.totalSize = totalSize
      this.perSize = perSize
      this.sideWidth = sideWidth
      let that = this
      this.timer = setInterval(function () {
        perSize = perSize + totalSize / 10
        sideWidth = sideWidth + 10
        that.perSize = perSize
        that.sideWidth = sideWidth
        if (sideWidth === 100) {
          clearInterval(that.timer)
        }
      }, 1000)
    },
    methods: {
    },
    computed: {
    },
    beforeDestroy: function () {
      clearInterval(this.timer)
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
  .successBox{
    width: 287px;
    height: 150px;
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.12), 0 12px 8px 0 rgba(0,0,0,0.16);
    border-radius: 12px;
    position: absolute;
    top:50%;
    margin-top:-75px;
    left: 50%;
    margin-left:-143.5px;
    z-index: 1000;
    .boxCon{
      text-align: center;
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
  .sideBarDiv{
    width:80%;
    margin:20px auto;
    background:#fafafa;
    height:20px;
    border-radius:10px;
    border:1px solid #eeeeee;
    position:relative;
  }
  .sideBarIn{
    position:absolute;
    left:0;
    top:0;
    background:#1795ff;
    height:20px;
    border-radius:10px;
    border:1px solid #1795ff;
    // box-shadow: 5px 0px 5px #0484ff;
  }
</style>

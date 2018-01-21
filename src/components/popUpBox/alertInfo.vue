<template>
  <div class='model'>
	  <div class='dialog'>
	     <div>
		   <h4 class="pa">温馨提示</h4>
		   <p class="borderBottom pa">确认退回?</p>
		   <div class="marginBottom">
		      <span @click='sendAlertKey(0)' class="ConfirmColor pdl">取消</span>
		      <span @click='sendAlertKey(1)' class="ConfirmColor pdr">确定</span>
		   </div>
		 </div>
	  </div>
	</div>
</template>

<script type='text/ecmascript-6'>
/* eslint-disable */
     export default {
        data:function(){
            return {

            }
        },
        methods: {
            sendAlertKey (key) {
                this.$emit('getAlertKey',key)
            }
        }
     }
</script>

<style lang="less" type="stylesheet/less">
    h4.pa{
	      padding:20px 0 10px; 
        font-weight:bold;
	  }
	  .model{
	     width:100%;
		 height:100%;
		 position:fixed;
		 left:0;
		 top:0;
		 background:rgba(0,0,0,.2)
	  }
	  .dialog{
        overflow:hidden;
	    box-sizing:border-box;
	    background:#f5f5f5;
	     width:250px;
		 height:130px;
		 text-align:center;
		 border-radius:8px;
		 position:absolute;
         margin:auto;
		 left:0;
		 right:0;
		 top:0;
		 bottom:0;
	  }
	  .borderBottom{
	    border-bottom:1px solid #ddd;
		padding-bottom:16px;
		padding:14px;
	  }
      .marginBottom{
        overflow:hidden;          
      }
	  .marginBottom:after{
	      content:'';
		  display:block;
		  clear:both;
	  }
	  .pdl{
	    box-sizing:border-box;
		padding-right:10px;
	    float:left;
		border-right:1px solid #ddd;
		width:120px;
		height:46px;
		line-height:44px;
	  }
	  .pdr{
	    box-sizing:border-box;
		padding-left:10px;
		float:right;
		width:124px;
		height:46px;
		line-height:44px;
	  }
	  .ConfirmColor{
	     color:#3af;
	  }
</style>
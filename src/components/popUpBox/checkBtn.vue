<template>
   <div>
     <button class="checkBtn">{{sendToCheckBtn}}</button>
   </div> 
</template>
<script type="text/ecmascript-6">
    export default {
         /* eslint-disable */
         props:{
             sendToCheckBtn:{
                 type:String
             }
         },
         data:function(){
             return {

             }
         }
    }
</script>
<style lang="less" type="stylesheet/less">
    .checkBtn{
        color:#eee;
        background:rgba(0,0,0,0.9);
        box-shadow:5px 5px 10px 5px  rgba(0,0,0,0.3);
        width:100px;
        text-align:center;
        border-radius:10px;
        -webkit-border-radius:10px;
        -moz-border-radius:10px;
        -o-border-radius:10px;
        height:34px;
        line-height:34px;
        position:relative;
        left:50%;
        margin-left:-50px;
        border:0;
        font-size:14px;
    }
</style>

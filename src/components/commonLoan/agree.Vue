<template>
  <div class="opinion_btm">
    <p class="opinion_titleP">请部署意见</p>
    <textarea rows="6" class="opinion_contentText" placeholder="请输入内容"></textarea>
  <!--  <p class="opinion_titleP">请选择退回的任务</p>
    <ul class="opinion_chooseUl">
      <li @click="toggleSelectShow()"><button :class="radioChoose === true ? 'radioSelect' : 'radioUnSelect'"></button><span class="opionion_span">ADMIN-超级管理员-终止流程</span></li>
      <li><button class="radioUnSelect"></button><span class="opionion_span">ADMIN-超级管理员-终止流程</span></li>
    </ul>-->
    <div class="opionion_footer">
      <button class="opionion_sureBtn" @click="opionion_sureFun()">确定</button>
    </div>
    <alertBox v-show="opionion_sureAlert" :alertContent="alertContent" :closeAlert="closeAlert"></alertBox>
  </div>
</template>

<script type="text/ecmascript-6">
  import alertBox from '@/components/popUpBox/alertBox'
  export default {
    data () {
      return {
        radioChoose: false,
        opionion_sureAlert: false,
        alertContent: {}
      }
    },
    methods: {
      toggleSelectShow: function () {
        this.radioChoose = !this.radioChoose
      },
      opionion_sureFun: function () {
//        this.opinion_contentText
//        this.alertContent = {'alertImg': 'background:url("./src/assets/oops@2x.png") no-repeat; background-size: 100% 100%;', 'title': '未选择节点', 'content': '无法进行下一步操作', 'btnWord': '确定'}
//        this.opionion_sureAlert = true
      },
      closeAlert: function () {
        this.opionion_sureAlert = false
      }
    },
    created: function () {
      document.title = '采购应付发票'
    },
    components: {
      alertBox
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../less/radio.less';
  .opinion_titleP{
    height:35px;
    line-height:35px;
    font-size:16px;
    padding:0px 10px;
    coclor:#9b9b9b;
  }
  .opinion_contentText{
    width:333px;
    padding:10px;
    margin:0px 10px 20px 10px;
    border:1px solid #e9e9e9;
    border-radius:5px;
    outline:none;
  }
  .opinion_chooseUl{
    width:333px;
    padding:20px 10px;
    margin:0px 10px 20px 10px;
    border:1px solid #e9e9e9;
    border-radius:5px;
    background:white;
  }
  .opinion_chooseUl li:not(:last-child){
    margin-bottom:20px;
  }
  .opionion_span{
    font-size:16px;
    margin-left:10px;
  }
  .opionion_footer{
    width:100%;
    padding:6px 24px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    box-sizing: border-box;
    background-color:#fff;
    z-index:1;
  }
  .opionion_sureBtn{
    width: 100%;
    height: 44px;
    line-height: 44px;
    outline: none;
    border: none;
    background-image: linear-gradient(-180deg, #FFD87E 0%, #FF6039 100%);
    border-radius: 32px;
    font-size: 20px;
    color: #FFFFFF;
    cursor: pointer;
  }
  .opinion_btm{
    margin-bottom: 56px;
  }
</style>

<template>
  <div class="opinion_btm">
    <p class="opinion_titleP">选择下一任务</p>
    <ul class="opinion_chooseUl opinion_btm0">
      <li v-for="(item,index) in checkCells" @click="toggleSelectShow(item)" v-show="index <= 5 ? true : showCells">
        <button :class="item.flag === true ? 'opionion_radioSelect' : 'opionion_radioUnSelect'"></button>
        <span class="opionion_span">{{item.text}}</span>
      </li>
    </ul>
    <div class="workSheet_div" @click="toggleShowCells()"><img :src="showCells === true ? 'src/assets/sq@2x.png' : 'src/assets/zk@2x.png'" class="workSheet_imgSize"/></div>
    <div class="workSheet_btnDiv">
      <button @click="selectAll('1')">全选</button><button @click="selectAll('0')">全不选</button>
    </div>
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
        opionion_sureAlert: false,
        alertContent: {},
        checkCells: [],
        checkKey: '',
        showCells: false,
        num: ''
      }
    },
    methods: {
      toggleSelectShow: function (item) {
        console.log('选择', item)
        item.flag = !item.flag
        this.num = item.key
        console.log('num', item.key)
      },
      opionion_sureFun: function () {
        console.log('this.checkCells', this.checkCells)
        const allData = this.checkCells
        for (let i = 0; i < allData.length; i++) {
          if (allData[i].flag === false) {
            this.alertContent = {'alertImg': 'background:url("./src/assets/oops@2x.png") no-repeat; background-size: 100% 100%;', 'title': '未选择任务', 'content': '无法进行下一步操作', 'btnWord': '确定'}
            this.opionion_sureAlert = true
          }
          if (allData[this.num].flag === true) {
            this.opionion_sureAlert = false
          }
        }
      },
      closeAlert: function () {
        this.opionion_sureAlert = false
      },
      toggleShowCells: function () {
        this.showCells = !this.showCells
      },
      selectAll: function (num) {
        var allData = this.checkCells
        // 全选
        if (num === '1') {
          for (var i = 0; i < allData.length; i++) {
            if (allData[i].flag === false) {
              allData[i].flag = true
            }
          }
        } else {
          for (var j = 0; j < allData.length; j++) {
            if (allData[j].flag === true) {
              allData[j].flag = false
            }
          }
        }
      }
    },
    created: function () {
      document.title = '工作联系单'
      this.checkCells = [{key: '0', text: '复选一', flag: false}, {key: '1', text: '复选二', flag: false}, {key: '2', text: '复选三', flag: false}, {key: '3', text: '复选四', flag: false}, {key: '4', text: '复选五', flag: false}, {key: '5', text: '复选六', flag: false}, {key: '6', text: '复选七', flag: false}]
    },
    components: {
      alertBox
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
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
  .opionion_radioSelect{
    background:url(../../assets/select_sel@2x.png);
    background-size:18px 18px;
    width:18px;
    height:18px;
    outline:none;
    border:none;
  }
  .opionion_radioUnSelect{
    background:url(../../assets/select_def@2x.png);
    background-size:18px 18px;
    width:18px;
    height:18px;
    outline:none;
    border:none;
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
  .workSheet_div{
    text-align:center;
    margin-top:5px;
  }
  .workSheet_imgSize{
    width:16px;
    height:16px;
  }
  .opinion_btm0{
    margin-bottom:0px !important;
  }
  .workSheet_btnDiv{
    width:70%;
    margin:30px 15% 0px 15%;
  }
  .workSheet_btnDiv>button{
    width:45%;
    height:45px;
    line-height:45px;
    text-align:center;
    color:white;
    outline:none;
    border:none;
    background-image: linear-gradient(-180deg, #FFD87E 0%, #FF6039 100%);
    border-radius: 5px;
    font-size:14px;
  }
  .workSheet_btnDiv>button:first-child{
    margin-right:10%;
  }
</style>

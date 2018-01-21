<template>
  <div class="">
    <table class="mobileTable">
      <tbody>
        <tr>
          <td @click="jumpOaNowork()"><img src="../../assets/nav1.png"/><p>OA待办</p></td>
          <td @click="jumpToInnerSite()"><img src="../../assets/nav3.png"/><p>内网门户</p></td>
          <td @click="jumpToOuterSite()"><img src="../../assets/nav4.png"/><p>外网门户</p></td>
        </tr>
        <tr>
          <td @click="jumpItsm()"><img src="../../assets/nav5.png"/><p>ITSM</p></td>
          <td @click="loanList()"><img src="../../assets/nav6.png"/><p>公贷审批</p></td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <div class="titleP">待办</div>
    <div class="handoverListImg">
      <ul class="noWorkUl">
        <li v-for='item in mobileList'>
          <p><em :class="iconImg(item.flag)"></em><span>{{item.name}}</span><i class="date">{{item.date}}</i></p>
          <p class="txt">{{item.txt}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  export default {
    data () {
      return {
        mobileList: []
      }
    },
    methods: {
      iconImg (flag) {
        return 'icon' + (Number(flag) + 1)
      },
      jumpToInnerSite () {
        this.$router.push({path: '/innerSiteInterface'})
      },
      jumpToOuterSite () {
        this.$router.push({path: '/outerSiteInterface'})
      },
      jumpItsm () {
        this.$router.push({path: '/itsm'})
      },
      jumpOaNowork () {
        var userName = '0008062'
        axios.get('/CorpWX/OA10000.do', {
          params: {
            userName: userName
          }
        }).then(response => {
          var data = response.data.body
          if (data.errorCode === '0') {
            this.$router.push({path: '/OaNowork', query: {userId: data.userId}})
          } else {
            alert(data.errorMsg)
          }
        }).catch(function (response) {
          alert(response)
        })
      },
      //  公贷审批
      loanList () {
        this.$router.push({path: '/loanList'})
      }
    },
    created: function () {
      document.title = '移动办公'
      this.mobileList = [{name: '刘瑞希', date: '20171228101000', txt: '苏州银行股份有限公司2017年Q3财务表基本说明', flag: '0'}, {name: '孙磊', date: '20171228101000', txt: '内网登录系统地址表', flag: '1'}, {name: '唐晟', date: '20171228101000', txt: '外网门户地址续租', flag: '2'}]
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../less/handoverListImg.less';
  .mobileTable{
    width:100%;
    background-color:white;
    margin-bottom:6px;
  }
  .mobileTable td{
    text-align:center;
    color: #666;
    font-size:16px;
    border-right:1px solid #ccc;
    border-bottom:1px solid #ccc;
    padding:10px 0px;
  }
  .mobileTable td p{
    margin-top:5px;
  }
  .mobileTable tr td:last-child{
    border-right:0px;
  }
  .mobileTable tr:last-child td{
    border-bottom:0px;
  }
  .mobileTable img{
    width:60px;
    height:60px;
  }
  .titleP{
    padding:10px;
    background-color:white;
    color:black;
    font-size:14px;
  }
</style>

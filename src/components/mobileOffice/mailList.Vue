<template>
  <div>
    调用通讯录
  </div>
</template>

<script type="text/ecmascript-6">
  import wx from 'weixin-js-sdk'
  import axios from 'axios'
  export default{
    data () {
      return {
        url: ''
      }
    },
    created: function () {
      this.wxConfig()
    },
    methods: {
      // 调用微信api获取通讯录列表配置函数
      wxConfig: function () {
        this.url = window.location.href.split('#')[0]
        axios.get('/CorpWX/WX30005.do', {
          params: {
            url: this.url
          }
        }).then(response => {
          response = response.data.body
          if (response.errorCode === '0') {
            wx.config({
              beta: true, // 必须这么写，否则在微信插件有些jsapi会有问题
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: response.appId, // 必填，公众号的唯一标识
              timestamp: response.timestamp, // 必填，生成签名的时间戳
              nonceStr: response.nonceStr, // 必填，生成签名的随机串
              signature: response.signature, // 必填，签名，见附录1
              jsApiList: ['selectEnterpriseContact'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
            var that = this
            wx.ready(function () {
              that.mailListFun()
            })
          }
        }).catch(function (response) {
          console.log(response)
        })
      },
      mailListFun () {
        wx.invoke('selectEnterpriseContact', {
          'fromDepartmentId': -1, // 必填，-1表示打开的通讯录从自己所在部门开始展示, 0表示从最上层开始
          'mode': 'multi', // 必填，选择模式，single表示单选，multi表示多选
          'type': ['department', 'user'] // 必填，选择限制类型，指定department、user中的一个或者多个
        }, function (res) {
          if (res.err_msg === 'selectEnterpriseContact:ok') {
            alert('调用成功！')
            /** if (typeof res.result === 'string') {
              res.result = JSON.parse(res.result) // 由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
            }
            var selectedDepartmentList = res.result.departmentList // 已选的部门列表
            for (var i = 0; i < selectedDepartmentList.length; i++) {
              var department = selectedDepartmentList[i]
              var departmentId = department.id // 已选的单个部门ID
              var departemntName = department.name // 已选的单个部门名称
            }
            var selectedUserList = res.result.userList // 已选的成员列表
            for (var i = 0; i < selectedUserList.length; i++) {
              var user = selectedUserList[i]
              var userId = user.id // 已选的单个成员ID
              var userName = user.name // 已选的单个成员名称
              var userAvatar = user.avatar // 已选的单个成员头像
            } */
          }
        })
      }
    }
  }
</script>
<style>
  .scrollUl li{
    background-color:white;
    border-bottom:2px solid #ccc;
    padding:10px;
  }
  .scrollUl li p:first-child{
    font-size:18px;
    font-weight:bold;
    color:black;
  }
  .scrollUl li p:last-child{
    font-size:14px;
    color:#ccc;
    padding-top:15px;
  }
</style>

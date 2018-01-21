<template>
  <div>
    <errorMsg v-show="errorMsgShow" :errorMsgShow="errorMsgShow" :errorMsgTit="errorMsgTit" :errorMsgInfo="errorMsgInfo" @ievent = "ievent">
  </errorMsg>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import errorMsg from '@/components/popUpBox/errorMsg'

  export default {
    data () {
      return {
        flag: '',
        errorTag: '',
        errorMsgShow: false,
        errorMsgTit: '',
        errorMsgInfo: '',
        getUrl: '',
        meeId: '',
        url: '',
        stateWx: '',    // 企业微信的state
        signShow: false,
        wxsignShow: false
      }
    },
    created: function () {
      this.meeId = window.location.href.split('state=')[1].split('&')[0]
      let userAgent = window.navigator.userAgent.toLowerCase()
      if (userAgent.indexOf('wxwork') > -1 && userAgent.indexOf('wwlocal') > -1) {  // 有wxwork和wwlocal(是本地企业微信用户)
        this.flag = '0'
        axios({
          method: 'post',
          url: '/CorpWX/MEET10003.do',
          params: {
            flag: this.flag,
            meeId: this.meeId
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }
        ).then(response => {
          response = response.data.body
          if (response.errorCode === '0') {
            this.getUrl = response.resultUrl
            let url = this.getUrl.replace(/&amp;/g, '&')
            window.location.replace(url)
          } else {
            this.errorMsgTit = ''
            this.errorMsgInfo = response.errorMsg
            this.errorMsgShow = !this.errorMsgShow
          }
        }).catch(function (response) {
          alert(response.errorMsg)
        })
      } else {
        // 非企业微信
        this.flag = '1'
        axios({
          method: 'post',
          url: '/CorpWX/MEET10003.do',
          params: {
            flag: this.flag,
            meeId: this.meeId
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }
        ).then(response => {
          response = response.data.body
          if (response.errorCode === '0') {
            this.getUrl = response.resultUrl
            window.location.replace(this.getUrl)
          } else {
            this.errorMsgTit = ''
            this.errorMsgInfo = response.errorMsg
            this.errorMsgShow = !this.errorMsgShow
          }
        }).catch(function (response) {
          response = response.data.body
          alert(response.errorMsg)
        })
      }
    },
    components: {
      errorMsg
    },
    methods: {
      ievent (toggleVal) {
        this.errorMsgShow = toggleVal
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
</style>

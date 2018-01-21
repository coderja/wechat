<template>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'

  export default {
    data () {
      return {
        flag: '2'
      }
    },
    created: function () {
      axios({
        method: 'post',
        url: '/CorpWX/MEET10003.do',
        params: {
          flag: this.flag
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
          window.location = url
        } else {
          window.close()
        }
      }).catch(function (response) {
        window.close()
      })
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
</style>

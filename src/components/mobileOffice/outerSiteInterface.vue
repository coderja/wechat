<template>
  <div class="">
    <div class="handoverListImg">
      <ul class="noWorkUl noTop">
        <li v-for='item in mobileList' @click="jumpToProLists()">
          <p><em :class="iconImg(item.flag)"></em><span>{{item.name}}</span><i class="date">{{item.date | formatDateNew}}</i></p>
          <p class="txt">{{item.txt}}</p>
          <checkBtn v-if="ischecked" :sendToCheckBtn="checkInfo"></checkBtn>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable */
  import {formatDateNew} from '@/js/common'
  import checkBtn from '../popUpBox/checkBtn'

  export default {
    data () {
      return {
        className: '',
        mobileList: '',
        checkInfo:'任务退回',
        ischecked:true
      }
    },
    filters: {
      formatDateNew (time) {
        return formatDateNew(time)
      }
    },
    created: function () {
      document.title = 'ITSM'
      this.mobileList = [{name: '刘瑞希', date: '20171228101000', txt: '苏州银行股份有限公司2017年Q3财务表基本说明', flag: '2'}, {name: '孙磊', date: '20171228101000', txt: '内网登录系统地址表', flag: '2'}, {name: '唐晟', date: '20171228101000', txt: '外网门户地址续租', flag: '2'}]
    },
    methods: {
      iconImg (flag) {
        switch (flag) {
          case '0': this.className = ''
            break
          case '1': this.className = 'icon2'
            break
          case '2': this.className = 'icon3'
            break
          case '3': this.className = 'icon4'
            break
          case '4': this.className = 'icon5'
            break
          default: this.className = 'icon6'
        }
        return this.className
      },
       jumpToProLists(){
         this.$router.push('/innerSiteInterfaceProductlist')
       }
    },
    components: {
      checkBtn
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../less/handoverListImg.less';
</style>

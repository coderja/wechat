<template>
  <div class="">
    <div class="tab">
      <ul class="tabUl">
        <li v-for="(item,index) in tabs" :class="{selectTab:index == num}" @click="tab(index)">{{item}}</li>
      </ul>
    </div>
    <div class="tabCon">
      <div v-show="num === 0">
        <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
          <div class="handoverListImg">
            <ul class="noWorkUl">
              <li v-for='item in oagetDbList' @click="documentCirculated(item)">
                <p><em :class="iconImg(0)"></em><span>{{item.drafterName}}</span><i class="date">{{item.strRecDate}}</i></p>
                <p class="txt">{{item.title}}</p>
              </li>
            </ul>
          </div>
        </v-scroll>
      </div>
      <div v-show="num === 1">
        <v-scroll :on-refresh="onRefresh2" :on-infinite="onInfinite2">
          <div class="handoverListImg">
            <ul class="noWorkUl">
              <li v-for='item in oagetYbList' @click="documentCirculated(item)">
                <p><em :class="iconImg(0)"></em><span>{{item.drafterName}}</span><i class="date">{{item.strRecDate}}</i></p>
                <p class="txt">{{item.title}}</p>
              </li>
            </ul>
          </div>
        </v-scroll>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDateNew} from '@/js/common'
  import Scroll from '@/components/commonComponent/scroll'
  import axios from 'axios'
  export default {
    data () {
      return {
        tabs: ['待办事项', '已办事项'],
        num: 0,
        oagetDbList: [],
        oagetYbList: [],
        className: '',
        counter: 1, // 默认已经显示出15条数据 count等于一是让从16条开始加载
        sum: 8,  // 一次显示多少条
        counterTwo: 1, // 默认已经显示出15条数据 count等于一是让从16条开始加载
        sumTwo: 8,  // 一次显示多少条
        userId: '',
        oagetDbListItem: {}
      }
    },
    methods: {
      tab (index) {
        this.num = index
      },
      iconImg (flag) {
        return 'icon' + (Number(flag) + 1)
      },
      getList () {
        let vm = this
        vm.counter = 1
        vm.$el.querySelector('.load-more').style.display = ''
        axios.get('/CorpWX/OA10001.do', {
          params: {
            userId: vm.userId,
            pageCurrent: vm.counter
          }
        }).then(response => {
          var data = response.data.body
          if (data.errorCode === '0') {
            vm.oagetDbList = data.oagetDbList
            if (data.rowCount <= vm.sum) {
              vm.$el.querySelector('.load-more').style.display = 'none'
            }
          } else {
            alert(data.errorMsg)
          }
        }).catch(function (response) {
          alert(response)
        })
      },
      getList2 () {
        let vm = this
        vm.counterTwo = 1
        vm.$el.querySelector('.load-more').style.display = ''
        axios.get('/CorpWX/OA10002.do', {
          params: {
            userId: vm.userId,
            pageCurrent: vm.counterTwo
          }
        }).then(response => {
          var data = response.data.body
          if (data.errorCode === '0') {
            vm.oagetYbList = data.oagetYbList
            if (data.rowCount <= vm.sumTwo) {
              vm.$el.querySelector('.load-more').style.display = 'none'
            }
          } else {
            alert(data.errorMsg)
          }
        }).catch(function (response) {
          alert(response)
        })
      },
      onRefresh (done) {
        this.getList()
        done() // call done
      },
      onRefresh2 (done) {
        this.getList2()
        done() // call done
      },
      onInfinite (done) {
        let vm = this
        vm.counter++
        axios.get('/CorpWX/OA10001.do', {
          params: {
            userId: vm.userId,
            pageCurrent: vm.counter
          }
        }).then(response => {
          var data = response.data.body
          if (data.errorCode === '0') {
            let arr = data.oagetDbList
            done()
            vm.oagetDbList = vm.oagetDbList.concat(arr)
            let length = vm.oagetDbList.length
            if (length === Number(data.rowCount)) {
              vm.$el.querySelector('.load-more').style.display = 'none'
            }
            done() // call done
          } else {
            alert(data.errorMsg)
          }
        }).catch(function (response) {
          alert(response)
        })
      },
      onInfinite2 (done) {
        let vm = this
        vm.counterTwo++
        axios.get('/CorpWX/OA10002.do', {
          params: {
            userId: vm.userId,
            pageCurrent: vm.counterTwo
          }
        }).then(response => {
          var data = response.data.body
          if (data.errorCode === '0') {
            let arr = data.oagetYbList
            done()
            vm.oagetYbList = vm.oagetYbList.concat(arr)
            let length = vm.oagetYbList.length
            if (length === Number(data.rowCount)) {
              vm.$el.querySelector('.load-more').style.display = 'none'
            }
            done() // call done
          } else {
            alert(data.errorMsg)
          }
        }).catch(function (response) {
          alert(response)
        })
      },
      documentCirculated (item) {
        this.oagetDbListItem = item
        // 待办
        if (this.num === 0) {
          this.$router.push({path: '/documentCirculated', query: {oagetDbListItem: this.oagetDbListItem, userId: this.userId, num: this.num, reclyFlag: false}})
        } else if (this.num === 1) {
          // 已办
          axios.get('/CorpWX/OA10016.do', {
            params: {
              userId: this.userId,
              recid: item.workitemId
            }
          }).then(response => {
            var data = response.data.body
            if (data.errorCode === '0') {
              this.$router.push({path: '/documentCirculated', query: {oagetDbListItem: this.oagetDbListItem, userId: this.userId, num: this.num, reclyFlag: (data.canRecTask === 'true')}})
            } else {
              alert(data.errorMsg)
            }
          }).catch(function (response) {
            alert(response)
          })
        }
      }
    },
    mounted: function () {
      document.title = 'OA待办'
      this.userId = this.$route.query.userId || ''
      this.getList()
      this.getList2()
    },
    filters: {
      formatDateNew (time) {
        return formatDateNew(time)
      }
    },
    components: {
      'v-scroll': Scroll
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../less/tab.less';
  @import '../../less/handoverListImg.less';
</style>

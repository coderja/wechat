<template>
  <div class="">
    <div class="tab">
      <ul class="tabUl">
        <li v-for="(item,index) in tabs" :class="{selectTab:index == num}" @click="tab(index)">{{item}}</li>
      </ul>
    </div>
    <div class="tabCon">
      <div v-show="num === 0">
        <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" v-show="GGListInfo.length !== 0">
          <div class="handoverList">
            <ul class="scrollUl">
              <li v-for="item in GGListInfo" @click="infoDetail(item)">
                <p>{{item.title}}</p>
                <p>{{item.releaseDate}}</p>
              </li>
            </ul>
          </div>
        </v-scroll>
        <p class="noCanShow" v-show="GGListInfo.length === 0">暂无符合条件的数据</p>
      </div>
      <div v-show="num === 1">
        <v-scroll :on-refresh="onRefresh2" :on-infinite="onInfinite2" v-show="GGListInfo.length !== 0">
          <div class="handoverList">
            <ul class="scrollUl">
              <li v-for="item in oagetXXList" @click="infoDetail(item)">
                <p>{{item.title}}</p>
                <p>{{item.releaseDate}}</p>
              </li>
            </ul>
          </div>
        </v-scroll>
        <p class="noCanShow" v-show="oagetXXList.length === 0">暂无符合条件的数据</p>
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
        tabs: ['通知公告', '行内信息'],
        num: 0,
        GGListInfo: [],
        oagetXXList: [],
        className: '',
        counter: 1, // 默认已经显示出15条数据 count等于一是让从16条开始加载
        sum: 8,  // 一次显示多少条
        counterTwo: 1, // 默认已经显示出15条数据 count等于一是让从16条开始加载
        sumTwo: 8,  // 一次显示多少条
        userId: '',
        detailItem: {}
      }
    },
    methods: {
      tab (index) {
        this.num = index
      },
      getList () {
        let vm = this
        vm.counter = 1
        vm.$el.querySelector('.load-more').style.display = ''
        axios.get('/CorpWX/OA10014.do', {
          params: {
            userId: vm.userId,
            pageCurrent: vm.counter
          }
        }).then(response => {
          var data = response.data.body
          if (data.errorCode === '0') {
            vm.GGListInfo = data.GGListInfo
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
        axios.get('/CorpWX/OA10008.do', {
          params: {
            userId: vm.userId,
            pageCurrent: vm.counterTwo
          }
        }).then(response => {
          var data = response.data.body
          if (data.errorCode === '0') {
            vm.oagetXXList = data.oagetXXList
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
        axios.get('/CorpWX/OA10014.do', {
          params: {
            userId: vm.userId,
            pageCurrent: vm.counter
          }
        }).then(response => {
          var data = response.data.body
          if (data.errorCode === '0') {
            let arr = data.GGListInfo
            done()
            vm.GGListInfo = vm.GGListInfo.concat(arr)
            let length = vm.GGListInfo.length
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
        axios.get('/CorpWX/OA10008.do', {
          params: {
            userId: vm.userId,
            pageCurrent: vm.counterTwo
          }
        }).then(response => {
          var data = response.data.body
          if (data.errorCode === '0') {
            let arr = data.oagetXXList
            done()
            vm.oagetXXList = vm.oagetXXList.concat(arr)
            let length = vm.oagetXXList.length
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
      infoDetail (item) {
        this.detailItem = item
        this.$router.push({path: '/announceDetail', query: {detailItem: this.detailItem, userId: this.userId, num: this.num}})
      }
    },
    mounted: function () {
      document.title = '公告信息'
      this.userId = '300017/0008062'
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
  @import '../../less/handoverList.less';
  @import '../../less/common.less';
</style>

<template>
  <div>
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
      <ul class="scrollUl">
        <li v-for="(item,index) in downdata" >
          <p>{{item.name}}</p>
          <p>第{{index}}个哈哈</p>
        </li>
      </ul>
    </v-scroll>
  </div>
</template>

<script>
import Scroll from '@/components/commonComponent/scroll'
import axios from 'axios'
export default{
  data () {
    return {
      counter: 1, // 默认已经显示出15条数据 count等于一是让从16条开始加载
      num: 8,  // 一次显示多少条
      downdata: []  // 上拉更多的数据存放数组
    }
  },
  mounted: function () {
    this.getList()
  },
  methods: {
    getList () {
      let vm = this
      vm.counter = 1
      this.$el.querySelector('.load-more').style.display = ''
      this.$el.querySelector('#footerId').style.display = 'none'
      axios.get('/CorpWX/OA10001.do', {
        params: {
          userId: '300017/0008062',
          pageCurrent: vm.counter
        }
      }).then(response => {
        var data = response.data.body
        if (data.errorCode === '0') {
          vm.downdata = data.oagetDbList
          if (data.rowCount <= vm.num) {
            vm.$el.querySelector('.load-more').style.display = 'none'
            vm.$el.querySelector('#footerId').style.display = ''
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
    onInfinite (done) {
      let vm = this
      vm.counter++
      axios.get('/CorpWX/OA10001.do', {
        params: {
          userId: '300017/0008062',
          pageCurrent: vm.counter
        }
      }).then(response => {
        var data = response.data.body
        if (data.errorCode === '0') {
          let arr = data.oagetDbList
          done()
          vm.downdata = vm.downdata.concat(arr)
          let length = vm.downdata.length
          if (length === Number(data.rowCount)) {
            vm.$el.querySelector('.load-more').style.display = 'none'
            vm.$el.querySelector('#footerId').style.display = ''
          }
          done() // call done
        } else {
          alert(data.errorMsg)
        }
      }).catch(function (response) {
        alert(response)
      })
    }
  },
  components: {
    'v-scroll': Scroll
  }
}
</script>
<style>
  .scrollUl li{
    background-color:white;
    border-bottom:2px solid #ccc;
    padding:30px;
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

<template>
  <div>
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
      <ul class="scrollUl">
        <li v-for="(item,index) in listdata" >
          <p>{{item.name}}</p>
          <p>第{{index}}个哈哈</p>
        </li>
        <li v-for="(item,index) in downdata" >
          <p>{{item.name}}</p>
          <p>第{{index}}个哈哈</p>
        </li>
      </ul>
    </v-scroll>
    <wait :showRun="showRun"></wait>
  </div>
</template>

<script>
import Scroll from '@/components/commonComponent/scroll'
import wait from '@/components/popUpBox/wait'
export default{
  data () {
    return {
      counter: 1, // 默认已经显示出15条数据 count等于一是让从16条开始加载
      showRun: false,
      num: 15,  // 一次显示多少条
      pageStart: 0, // 开始页数
      pageEnd: 0, // 结束页数
      listdata: [], // 下拉更新数据存放数组
      downdata: []  // 上拉更多的数据存放数组
    }
  },
  mounted: function () {
    this.getList()
  },
  methods: {
    getList () {
      let vm = this
      this.showRun = true
      vm.$http.get('https://api.github.com/repos/typecho-fans/plugins/contents/').then((response) => {
        this.showRun = false
        vm.listdata = response.data.slice(0, 15)
      }, (response) => {
        this.showRun = false
        console.log('error')
      })
    },
    onRefresh (done) {
      this.getList()
      done() // call done
    },
    onInfinite (done) {
      let vm = this
      this.showRun = true
      vm.$http.get('https://api.github.com/repos/typecho-fans/plugins/contents/').then((response) => {
        this.showRun = false
        vm.counter++
        vm.pageEnd = vm.num * vm.counter
        vm.pageStart = vm.pageEnd - vm.num
        let arr = response.data
        let i = vm.pageStart
        let end = vm.pageEnd
        for (; i < end; i++) {
          let obj = {}
          obj['name'] = arr[i].name
          vm.downdata.push(obj)
          if ((i + 1) >= response.data.length) {
            this.$el.querySelector('.load-more').style.display = 'none'
            return
          }
        }
        done() // call done
      }, (response) => {
        this.showRun = false
        console.log('error')
      })
    }
  },
  components: {
    'v-scroll': Scroll,
    'wait': wait
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

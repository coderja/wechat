<template>
  <div class="">
    <div class="tabCon">
      <div v-for='(itemCon,index) in newsContents' v-show="index == num">
        <div class="handoverList">
          <ul class="scrollUl">
            <li v-for="(itemList,index) in itemCon" @click="infoDetail(itemList)">
              <p>{{itemList.name}}</p>
              <p>{{itemList.time  | formatDateNew}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDateNew} from '@/js/common'
  export default {
    props: {
      newsContents: {
        type: Array
      }
    },
    components: {
    },
    data () {
      return {
//        newsContents: [[{name: '【苏银】 关于组织投票"金理财"微信评选的通知', time: '20171115101127'}, {name: '【苏银】 关于组织投票"金理财"微信评选的通知', time: '20171115101128'}], [{name: '【苏银】 关于组织投票"金理财"微信评选的通知', time: '20171115101129'}, {name: '【苏银】 关于组织投票"金理财"微信评选的通知', time: '20171115101130'}]],
        num: 0,
        id: ''
      }
    },
    methods: {
      infoDetail (itemList) {
        console.log('itemList', itemList)
        this.id = itemList
        this.$emit('getId', this.id)
      }
    },
    created: function () {
      document.title = '公告信息'
    },
    filters: {
      formatDateNew (time) {
        return formatDateNew(time)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../less/handoverList.less';
</style>

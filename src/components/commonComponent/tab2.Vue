<template>
  <div class="tabWrapper">
    <ul class="tabUl">
      <li v-for="(item,index) in tabs" :class="{selectTab:index == num}" @click="tab(index)">{{item}}</li>
    </ul>
    <ul class="tabCon">
      <div v-for='(itemCon,index) in tabContents' v-show="index == num">
        <div class="handoverList">
          <ul class="scrollUl">
            <li v-for="(itemLis,index) in itemCon" @click="infoDetail()">
              <p>{{itemLis.name}}</p>
              <p>{{itemLis.time  | formatDateNew}}</p>
            </li>
          </ul>
        </div>
      </div>
        <li v-for='(itemCon,index) in tabContents' v-show=" index == num">{{itemCon}}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    //    props: {
    //      tabs: {
    //        type: Array
    //      },
    //      tabContents: {
    //        type: Array
    //      }
    //    },
    data () {
      return {
        tabs: ['通知公告', '行内信息'],
        tabContents: [[{name: '【苏银】 关于组织投票"金理财"微信评选的通知', time: '20171115101127'}, {name: '【苏银】 关于组织投票"金理财"微信评选的通知', time: '20171115101128'}], [{name: '【苏银】 关于组织投票"金理财"微信评选的通知', time: '20171115101129'}, {name: '【苏银】 关于组织投票"金理财"微信评选的通知', time: '20171115101130'}]],
        num: 0
      }
    },
    created: {
    },
    methods: {
      tab (index) {
        this.num = index
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .tabWrapper {
    .tabUl{
      width:100%;
      display: -webkit-box;
      display: -moz-box;
      display:box;
      li {
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        box-flex:1;
        text-align:center;
        height:40px;
        line-height:40px;
        color:#ccc;
        font-size:16px;
      }
      li.selectTab{
        border-bottom: 0.08rem solid #4f77aa;
        color: #4f77aa;
      }
    }
    .tabCon li {
      background-color: white;
      padding: 0.266667rem;
      margin-top: 0.133333rem;
    }
  }

</style>

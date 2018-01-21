<template>
  <div>
    <div class="div_search">
      <img src="../../assets/search@2x.png" class="searchImg"/>
      <input type="text" class="searchInput" placeholder="输入姓名/部门/邮箱进行搜索" v-model="search">
    </div>
    <div id="list">
      <p class="letter" v-show="searchResult">搜索结果</p>
      <ul class="list_user" ref="listUser">
        <li v-for="item in userData">
          <p class="letter" v-show="!searchResult">{{item.index === 'now' ? '最近联系人' : item.index}}</p>
          <ul>
            <li v-for="user in item.users">
              <div class="fl">
                <img src="../../assets/select_def@2x.png" class="selectDefImg"/>
                <img src="../../assets/1.jpg" class="txImg"/>
              </div>
              <div class="fl">
                <p class="userTitle">{{user.name}}</p>
                <p class="jobNumber"><span>{{user.number}}</span><span>{{user.job}}</span></p>
                <p>{{user.address}}</p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="list_index" ref="listIndex">
        <li @touchstart="setScroll" v-for="item in userIndex">{{item === 'now' ? '' : item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default{
  data () {
    return {
      search: '',
      products: [],
      searchResult: false
    }
  },
  created: function () {
    document.title = '征求意见'
    this.products = [{'index': 'now', 'users': [{'name': '安小飞', 'number': '0011006', 'job': '员工', 'address': '公司银行总部/吴中区域/行长办公室'}, {'name': '艾小强', 'number': '0011000', 'job': '老板', 'address': '公司银行总部'}, {'name': '爱小飞', 'number': '0011006', 'job': '员工', 'address': '公司银行总部/吴中区域/行长办公室'}]}, {'index': 'A', 'users': [{'name': '安小飞', 'number': '0011006', 'job': '员工', 'address': '公司银行总部/吴中区域/行长办公室'}, {'name': '艾小强', 'number': '0011000', 'job': '老板', 'address': '公司银行总部'}, {'name': '爱小飞', 'number': '0011008', 'job': '员工', 'address': '公司银行总部/吴中区域/行长办公室'}]}, {'index': 'B', 'users': [{'name': '班树', 'number': '0011007', 'job': '领导', 'address': '吴中区域/行长办公室'}, {'name': '班长', 'number': '0011010', 'job': '员工', 'address': '公司银行总部'}, {'name': '班明明', 'number': '0011009', 'job': '员工', 'address': '行长办公室'}]}, {'index': 'C', 'users': [{'name': '班树', 'number': '0011007', 'job': '领导', 'address': '吴中区域/行长办公室'}, {'name': '班长', 'number': '0011010', 'job': '员工', 'address': '公司银行总部'}, {'name': '班明明', 'number': '0011009', 'job': '员工', 'address': '行长办公室'}]}, {'index': 'D', 'users': [{'name': '班树', 'number': '0011007', 'job': '领导', 'address': '吴中区域/行长办公室'}, {'name': '班长', 'number': '0011010', 'job': '员工', 'address': '公司银行总部'}, {'name': '班明明', 'number': '0011009', 'job': '员工', 'address': '行长办公室'}]}, {'index': 'E', 'users': [{'name': '班树', 'number': '0011007', 'job': '领导', 'address': '吴中区域/行长办公室'}, {'name': '班长', 'number': '0011010', 'job': '员工', 'address': '公司银行总部'}, {'name': '班明明', 'number': '0011009', 'job': '员工', 'address': '行长办公室'}]}]
  },
  computed: {
    userIndex: function () {
      return this.filterIndex(this.userData)
    },
    userData: function () {
      var search = this.search
      if (search) {
        this.searchResult = true
        var a = []
        var i = -1
        this.products.filter(function (product) {
          var b = ++i
          a[b] = {}
          a[b].index = product.index
          a[b].users = product.users.filter(function (product) {
            return Object.keys(product).some(function (key) {
              return String(product[key]).toLowerCase().indexOf(search) > -1
            })
          })
        })
        for (var j = 0; j < a.length; j++) {
          if (a[j].users.length === 0) {
            a.splice(j, 1)
            j--
          }
        }
        return a
      } else {
        this.searchResult = false
      }
      return this.products
    }
  },
  methods: {
    filterIndex: function (data) {
      var result = []
      for (var i = 0; i < data.length; i++) {
        if (data[i].index) {
          result.push(data[i].index)
        }
      }
      return result
    },
    setListIndexPos: function () {
      var iH = this.$refs.listIndex.offsetHeight
      this.$refs.listIndex.style.marginTop = -iH / 2 + 'px'
    },
    setScroll: function (ev) {
      var aP = this.$refs.listUser.getElementsByTagName('p')
      for (var i = 0; i < aP.length; i++) {
        if (aP[i].innerHTML === ev.target.innerHTML) {
          // 两种方法都可以
          // document.documentElement.scrollTop = aP[i].offsetTop
          window.scrollTo(0, aP[i].offsetTop)
        }
      }
    }
  },
  mounted: function () {
    this.setListIndexPos()
  }
}
</script>
<style>
  #list{
    position:relative;
    overflow:hidden;
  }
  #list p.letter{
    background:#ccc;
    padding-left:10px;
    height:30px;
    line-height:30px;
    font-size:16px;
  }
  #list .list_user ul li{
    background:white;
    border-bottom:1px solid #ccc;
    overflow:hidden;
    padding:10px;
  }
  #list .list_user ul li div{
    background:white;
  }
  .fl{
    float:left;
  }
  #list .list_index{
    position:fixed;
    right:10px;
    top:50%;
    font-size:20px;
  }
  #list .list_index{
    position:fixed;
    right:10px;
    top:50%;
    font-size:20px;
  }
  #list .list_index li{
    margin:5px 0;
  }
  .div_search{
    margin:10px;
    background:white;
    border-radius: 5px;
  }
  .searchImg{
    width:16px;
    height:16px;
    margin:3px 5px;
    position:relative;
    top:4px;
  }
  .searchInput{
    width:300px;
    padding:5px;
    position:relative;
    top:-3px;
    outline:none;
  }
  .selectDefImg{
    width:18px;
    height:18px;
    margin-right:5px;
    position:relative;
    top:-8px;
  }
  .txImg{
    width:40px;
    height:40px;
    border-radius:50px;
    position:relative;
    top:3px;
    margin-right:5px;
  }
  .userTitle{
    font-weight:bold;
    font-size:16px;
  }
  .jobNumber{
    font-size:12px;
    margin:3px auto;
  }
  .jobNumber span:first-child{
    padding-right:15px;
  }
</style>

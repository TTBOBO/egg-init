<template>
  <div>
    <!-- {{baseData[0].children[0]}} -->
    <Tree ref="Tree" v-if="showTree" :data="baseData" show-checkbox @on-check-change="checkNode"></Tree>
  </div>
</template>
<script>
export default {
  data () {
    return {
      baseData: [],
      checkNodes: [],
      showTree: false
    };
  },
  props: {
    dataList: Array,
    defaultData: Array
  },
  methods: {
    checkNode (res) {
      this.checkNodes = [];
      res.forEach(item => {
        if (item.parent_id && this.checkNodes.indexOf(item.parent_id) == -1) {
          this.checkNodes.push(item.parent_id);
        }
        if (this.checkNodes.indexOf(item.id) == -1) {
          this.checkNodes.push(item.id);
        }
      });
      this.$emit('changeTree', this.checkNodes);
    },
    getTree () {
      //准备数据
      var data = this.dataList;
      var _this = this;
      let treedata = [];
      //查找最顶层
      let len = data.length;
      for (let j = 0; j < len; j++) {
        data[j].expand = false;
        if (data[j].parent_id == 0) {
          treedata.push({
            expand: false,
            title: data[j].title,
            id: data[j].id,
            checked: false
            // checked: this.defaultData ? (this.defaultData.indexOf(data[j].id) != -1 ? true : false) : false
          });
        }
      }
      //找到跟最高层id相关的子子孙孙，并给子孙添加lev
      var treedataLevs = [];
      for (let h = 0, ls = treedata.length; h < ls; h++) {
        treedataLevs.push({
          treedataLev: sonsTree(data, treedata[h].id)
        });
      }
      for (let p = 0, lq = treedataLevs.length; p < lq; p++) {
        var treedataLev = treedataLevs[p].treedataLev;
        //找到最高层的lev
        var maxLev = 0;
        for (let i = 0, lt = treedataLev.length; i < lt; i++) {
          if (parseInt(treedataLev[i].lev) > maxLev) {
            maxLev = parseInt(treedataLev[i].lev);
          } else {
            maxLev = maxLev + 1;
          }
        }
        //比较当前层和上一层的数据，然后做处理
        var needLev = maxLev;
        var maxLevTree = [];
        var maxLevTreePrev = [];
        for (let m = 0; m < maxLev; m++) {
          maxLevTree = getLevArr(treedataLev, needLev);
          maxLevTreePrev = getLevArr(treedataLev, needLev - 1);
          for (var j = 0, lp = maxLevTreePrev.length; j < lp; j++) {
            maxLevTreePrev[j].children = new Array();
            for (var i = 0, lm = maxLevTree; i < lm.length; i++) {
              if (maxLevTree[i].parent_id == maxLevTreePrev[j].id) {
                maxLevTreePrev[j].children.push(maxLevTree[i]);
              }
            }
          }
          needLev--;
        }
        treedata[p].children = maxLevTreePrev;
      }
      /**
       * 防止一级菜单 且没有子菜单时  权限存在不选中的情况
       */
      treedata.forEach((item) => { //defaultData  [1,2,3,4,5]
        if (item.children.length == 0 && this.defaultData ? (this.defaultData.indexOf(item.id) != -
          1 || _this.defaultData == '*' ? true : false) : false) {
          item.checked = true;
        }
      })
      this.baseData = treedata;
      //找出同一级的数据
      function getLevArr (arr, lev) {
        var newarr = [];
        for (let i = 0, la = arr.length; i < la; i++) {
          //这里对arr 的children 做处理
          arr.children = new Array();
          if (parseInt(arr[i].lev) == lev) {
            newarr.push(arr[i]);
          }
        }
        return newarr;
      }
      //给每个数据添加一个lev
      function sonsTree (arr, id) {
        var temp = [],
          lev = 0;
        var forFn = function (arr, id, lev) {
          for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item.parent_id == id) {
              item.lev = lev;
              if (_this.defaultData ? (_this.defaultData.indexOf(item.id) != -1 || _this
                .defaultData == '*' ? true : false) : '') {
                item.checked = true;
              }
              item.expand = true;
              delete item.icon;
              delete item.href;
              delete item.create_at;
              delete item.update_at;
              delete item.type;
              delete item.menu_open;
              delete item.active;
              temp.push(item);
              forFn(arr, item.id, lev + 1);
            }
          }
        };
        forFn(arr, id, lev);
        return temp;
      }
    }
  },
  created () {
    this.getTree();
  },
  mounted () {
    //
  },
  watch: {
    dataList (cur) {
      if (cur.length > 0) {
        this.getTree();
      }
    },
    baseData (cur) {
      if (cur.length > 0) {
        setTimeout(() => {
          this.showTree = true;
        }, 200)
      }
    },
    defaultData (cur) {
      this.checkNodes = cur;
      this.$emit('changeTree', this.checkNodes);
    }
  }
};
</script>

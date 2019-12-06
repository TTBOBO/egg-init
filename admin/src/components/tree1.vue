<template>
  <div>
    <el-tree :data="treeList" ref="tree" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="checkKey"
      @node-click="nodeClick" @check-change="checkChange" @current-change="currentChange">
    </el-tree>
  </div>
</template>

<script>
export default {
  data () {
    return {
      treeList: [],
      checkKey: [],  //设置默认选中的 key

    };
  },
  props: {
    treeData: {
      type: Array,
      default: function () {
        return [];
      }
    },
    defaultKey: {
      type: Array,
      default: function () {
        return [];
      }
    },
    'empty-text': {
      type: String,
      default: '暂无数据'
    }
  },
  methods: {
    nodeClick (data, el_node, el) {
      console.log(data);
      console.log(el_node);
      console.log(el);
    },
    currentChange (currentDatas, currentNodes) {
      console.log(currentDatas);
      console.log(currentNodes);
    },
    checkChange (data, checkStatus, checkChild) {
      console.log(data);
      console.log(checkStatus);
      console.log(checkChild);
      this.$emit('checkchange', {
        checkData: this.getCheckedNodes()
      })
    },
    getCheckedNodes () {
      console.log(this.$refs.tree.getCheckedNodes());
      return this.$refs.tree.getCheckedNodes();
    },
    //设置选中
    setCheckedKeys (keys) {
      this.$refs.tree.setCheckedKeys(keys || [3]);
    },
    //清空选中
    resetChecked () {
      this.$refs.tree.setCheckedKeys([]);
    },
    getTree () {
      //准备数据

      var data = this.treeData;
      let treedata = []; //存储最顶层数据
      //查找最顶层

      data.forEach(item => {
        item.expand = false;
        item.label = item.departmentName;
        if (!item.parentId) {
          treedata.push({
            expand: true,
            label: item.departmentName,
            id: item.id,
            disabled: item.disabled
          });
        }
        //设置默认选中
        if (this.defaultKey.indexOf(item.id) != -1 || (this.defaultKey.length == 1 && this.defaultKey[0] == '*')) {
          this.checkKey.push(item.id);
        }
      });


      //找到跟最高层id相关的子子孙孙，并给子孙添加lev
      var treedataLevs = [];

      treedata.forEach(item => {
        treedataLevs.push({
          treedataLev: this.sonsTree(data, item.id)
        });
      });


      treedataLevs.forEach((item, index) => {
        var maxLev = 0;
        item.treedataLev.forEach(treeLev => {
          if (parseInt(treeLev.lev) > maxLev) {
            maxLev = parseInt(treeLev.lev);
          } else {
            maxLev = maxLev;
          }
        });

        //比较当前层和上一层的数据，然后做处理
        var needLev = maxLev;
        var maxLevTree = [];
        var maxLevTreePrev = [];

        for (let m = 0; m < maxLev; m++) {
          maxLevTree = this.getLevArr(item.treedataLev, needLev);
          maxLevTreePrev = this.getLevArr(
            item.treedataLev,
            needLev - 1
          );
          for (var j = 0, lp = maxLevTreePrev.length; j < lp; j++) {
            maxLevTreePrev[j].children = [];
            for (var i = 0, lm = maxLevTree; i < lm.length; i++) {
              if (
                maxLevTree[i].parentId == maxLevTreePrev[j].id
              ) {
                maxLevTreePrev[j].children.push(maxLevTree[i]);
              }
            }
          }
          needLev--;
        }
        treedata[index].children = maxLevTreePrev;
      });

      this.treeList = treedata;
      //找出同一级的数据

      //给每个数据添加一个lev

    },


    getLevArr (arr, lev) {
      var newarr = [];
      for (let i = 0, la = arr.length; i < la; i++) {
        //这里对arr 的children 做处理
        arr.children = [];
        if (parseInt(arr[i].lev) == lev) {
          newarr.push(arr[i]);
        }
      }
      return newarr;
    },
    sonsTree (arr, id) {
      var temp = [],
        lev = 0;
      var forFn = function (arr, id, lev) {
        arr.forEach(item => {
          if (item.parentId == id) {
            item.lev = lev; //默认第一级
            temp.push(item);
            forFn(arr, item.id, lev + 1); //子集 的 lev相对父级 加1
          }
        });
      };
      forFn(arr, id, lev);
      return temp;
    }
  },
  mounted () {
    setTimeout(() => {
      this.getCheckedNodes();
      this.setCheckedKeys(['594a3910202469941'])
    }, 1000)
  },
  created () {
    this.getTree();
  }
};
</script>

<style>
</style>

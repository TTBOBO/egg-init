<template>
  <div>
    <div class="transfer" :style="{width,height}">
      <div class="transfer-left">
        <h3 class="transfer-title">
          <el-checkbox :indeterminate="from_is_indeterminate" v-model="from_check_all" @change='fromAllBoxChange'></el-checkbox>
          <span>{{this.title[0]}}</span>
        </h3>
        <!-- 内容区 -->
        <div class="transfer-main">
          <!-- <slot name="from"></slot> -->
          <el-input v-if="filter" placeholder="输入关键字进行过滤" v-model="filterFrom" size="small" class="filter-tree">
          </el-input>
          <el-tree ref='from-tree' :data="self_from_data" show-checkbox :node-key="node_key" @check='fromTreeChecked'
            :default-expanded-keys="from_expanded_keys" :props="defaultProps" :filter-node-method="filterNodeFrom" :default-expand-all="openAll"
            :render-content='renderContent' :default-checked-keys="defaultCheckedKeys">
          </el-tree>
        </div>
      </div>

      <!-- 穿梭区 按钮框 -->
      <div class="transfer-center">
        <template v-if='button_text'>
          <p class="transfer-center-item">
            <el-button type="primary" @click="addToAims" :disabled="from_disabled">
              {{fromButton || '添加'}}
              <i class="el-icon-arrow-right"></i>
            </el-button>
          </p>
          <p class="transfer-center-item">
            <el-button type="primary" @click='removeToSource' :disabled="to_disabled" icon="el-icon-arrow-left">{{toButton || '移除'}}</el-button>
          </p>
        </template>
        <template v-else>
          <p class="transfer-center-item">
            <el-button type="primary" @click="addToAims" icon="el-icon-arrow-right" circle :disabled="from_disabled"></el-button>
          </p>
          <p class="transfer-center-item">
            <el-button type="primary" @click='removeToSource' :disabled="to_disabled" icon="el-icon-arrow-left" circle></el-button>
          </p>
        </template>
      </div>
      <!-- 右侧穿梭框 目标框 -->
      <div class="transfer-right">
        <h3 class="transfer-title">
          <el-checkbox :indeterminate="to_is_indeterminate" v-model="to_check_all" @change="toAllBoxChange"></el-checkbox>
          <span>{{this.title[1]}}</span>
        </h3>
        <!-- 内容区 -->
        <div class="transfer-main">
          <!-- <slot name='to'></slot> -->
          <el-input v-if="filter" placeholder="输入关键字进行过滤" v-model="filterTo" size="small" class="filter-tree">
          </el-input>
          <el-tree slot='to' ref='to-tree' :data="self_to_data" show-checkbox :node-key="node_key" @check='toTreeChecked'
            :default-expanded-keys="to_expanded_keys" :props="defaultProps" :filter-node-method="filterNodeTo" :default-expand-all="openAll"
            :render-content='renderContent'>
          </el-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      from_is_indeterminate: false,  //左侧半选状态
      from_check_all: false,  //左侧全选状态
      to_is_indeterminate: false,  //右侧半选状态
      to_check_all: false,  //右侧全选状态
      from_expanded_keys: [], // 源数据展开节点
      to_expanded_keys: [], // 目标数据展开节点

      self_from: [], //子组件左侧选中数据
      self_to: [],  //子组件右侧选中数据

      from_disabled: true,
      to_disabled: true,
      from_check_keys: [], // 源数据选中key数组 以此属性关联穿梭按钮，总全选、半选状态
      to_check_keys: [], // 目标数据选中key数组 以此属性关联穿梭按钮，总全选、半选状态

      filterFrom: '',  //左侧搜索框
      filterTo: '',   //右侧搜索框
    }
  },
  computed: {
    //合并左侧数据和默认数据  并设置第一层的pid为0
    self_from_data () {
      let from_array = [...this.self_from, ...this.from_data];
      from_array.forEach(item => {
        item[this.pid] = 0;
      })
      return from_array;
    },

    // 右侧数据
    self_to_data () {
      let to_array = [...this.to_data, ...this.self_to];
      to_array.forEach(item => {
        item[this.pid] = 0;
      });
      return to_array;
    },
    //上部按钮名称
    fromButton () {
      if (this.button_text == undefined) {
        return;
      }
      return this.button_text[0];
    },
    toButton () {
      if (this.button_text == undefined) {
        return;
      }
      return this.button_text[1];
    }
  },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '320px'
    },
    title: {
      type: Array,
      default: () => ['源列表', '目标列表']
    },
    button_text: Array,
    //源数据
    from_data: {
      type: Array,
      default: () => []
    },
    //目标数据源默认显示的数据
    to_data: {
      type: Array,
      default: () => []
    },
    defaultProps: {
      type: Object,
      default: () => {
        return { label: 'label', children: 'children' };
      }
    },
    //源数据默认选中的数据
    defaultCheckedKeys: {
      type: Array,
      default: () => []
    },
    // el-tree node-key 必须唯一
    node_key: {
      type: String,
      default: 'id'
    },
    // 自定义 pid参数名
    pid: {
      type: String,
      default: 'pid'
    },
    // 是否启用筛选
    filter: {
      type: Boolean,
      default: false
    },
    // 是否展开所有节点
    openAll: {
      type: Boolean,
      default: false
    },
    // 是否只返回叶子节点
    leafOnly: {
      type: Boolean,
      default: false
    },
    // 穿梭后是否展开节点
    transferOpenNode: {
      type: Boolean,
      default: true
    },
    // 自定义树节点
    renderContent: Function,
  },
  methods: {
    fromAllBoxChange (val) {
      if (this.self_from_data.length == 0) {
        return;
      }
      if (val) {
        this.from_check_keys = this.self_from_data;
        this.$refs['from-tree'].setCheckedNodes(this.from_check_keys);
      } else {
        this.from_check_keys = [];
        this.$refs['from-tree'].setCheckedNodes([]);
      }
    },
    toAllBoxChange (val) {
      if (this.self_to_data.length == 0) {
        return;
      }
      if (val) {
        this.to_check_keys = this.self_to_data;
        this.$refs['to-tree'].setCheckedNodes(this.to_check_keys);
      } else {
        this.to_check_keys = [];
        this.$refs['to-tree'].setCheckedNodes([]);
      }
    },
    fromTreeChecked (nodeObj, treeObj) {
      this.from_check_keys = treeObj.checkedNodes;
    },
    toTreeChecked (nodeObj, treeObj) {
      this.to_check_keys = treeObj.checkedNodes;
    },
    addToAims () {
      let keys = this.$refs['from-tree'].getCheckedKeys(this.leafOnly);
      //由半选组成的node数组
      let halfKeys = this.$refs['from-tree'].getHalfCheckedKeys();
      console.log(halfKeys, keys)
      //获取当前选中的数据
      let arrayCheckNodes = this.$refs['from-tree'].getCheckedNodes();
      let nodes = JSON.parse(JSON.stringify(arrayCheckNodes));

      let arrayHalfCheckNodes = this.$refs['from-tree'].getHalfCheckedNodes();

      let halfNodes = JSON.parse(JSON.stringify(arrayHalfCheckNodes));
      let children_ = this.defaultProps.children || 'children';
      let pid_ = this.defaultProps.pid || 'pid';
      let id__ = this['node_key'] || 'id';

      let self_to_data = JSON.stringify(this.self_to_data);

      /**
       * 第一步 把最外层的节点添加到to-tree组件里面
       * 第二步 把子节点有children的添加到to-tree组件里面
       * 第二步 把子节点没有有children的添加到to-tree组件里面
       */
      let skeletonHalfCheckedNodes = JSON.parse(JSON.stringify(arrayHalfCheckNodes)); // 深拷贝数据 - 半选节点
      // 筛选目标树不存在的骨架节点 - 半选内的节点 (第一步)
      let newSkeletonHalfCheckedNodes = [];
      skeletonHalfCheckedNodes.forEach(item => {
        if (!inquireIsExist(item)) {
          newSkeletonHalfCheckedNodes.push(item);
        }
      })

      newSkeletonHalfCheckedNodes.forEach(item => {
        item[children_] = [];
        //如果为0时直接添加，  如果不为0时添加到 pid 下面
        if (item[pid_] == 0) {
          this.$refs['to-tree'].append(item)
        } else {
          this.$refs['to-tree'].append(item, item[pid_])
        }
      })

      // 筛选目标树不存在的骨架节点 - 全选内的节点  (第二步)
      let newSkeletonCheckedNodes = [];
      nodes.forEach(item => {
        if (!inquireIsExist(item)) {
          newSkeletonCheckedNodes.push(item);
        }
      })

      newSkeletonCheckedNodes.forEach(item => {
        if (item[children_] && item[children_].length > 0) {
          item[children_] = [];
          this.$refs['to-tree'].append(item, item[pid_]);
          console.log()
        }
      })

      // 筛选目标树不存在的骨架节点 - 无子节点的节点  (第三步)
      let leafCheckedNodes = arrayCheckNodes.filter(item => {
        return !item[children_] || item[children_].length == 0;
      })
      leafCheckedNodes.forEach(item => {
        if (!inquireIsExist(item)) {
          this.$refs['to-tree'].append(item, item[pid_]);
        }
      })

      //删除右边已选中过的数据
      arrayCheckNodes.forEach(item => {
        this.$refs['from-tree'].remove(item);
      })
      //清空选中的值  这样 按钮就 disabled
      this.from_check_keys = [];
      // 目标数据节点展开
      if (this.transferOpenNode) {
        this.to_expanded_keys = keys;
      }
      //左侧数据  右侧数据  选中的keys 选中的nodes  半选的keys  半选的nodes
      this.$emit('addBtn', this.self_from_data, this.self_to_data, {
        keys,
        nodes,
        halfKeys,
        halfNodes
      })

      // 递归查询data内是否存在item函数
      function inquireIsExist (item, strData = self_to_data) {
        // 将树形数据格式化成一维字符串 然后通过匹配来判断是否已存在
        let strItem =
          typeof item[id__] == 'number'
            ? `"${id__}":${item[id__]},`
            : `"${id__}":"${item[id__]}",`;
        let reg = RegExp(strItem);
        let existed = reg.test(strData);
        return existed;
      }
    },
    removeToSource () {
      let keys = this.$refs['to-tree'].getCheckedKeys(this.leafOnly);
      //由半选组成的node数组
      let halfKeys = this.$refs['to-tree'].getHalfCheckedKeys();
      console.log(halfKeys, keys)
      //获取当前选中的数据
      let arrayCheckNodes = this.$refs['to-tree'].getCheckedNodes();
      let nodes = JSON.parse(JSON.stringify(arrayCheckNodes));

      let arrayHalfCheckNodes = this.$refs['to-tree'].getHalfCheckedNodes();

      let halfNodes = JSON.parse(JSON.stringify(arrayHalfCheckNodes));
      let children_ = this.defaultProps.children || 'children';
      let pid_ = this.defaultProps.pid || 'pid';
      let id__ = this['node_key'] || 'id';

      let self_from_data = JSON.stringify(this.self_from_data);

      /**
       * 第一步 把最外层的节点添加到to-tree组件里面
       * 第二步 把子节点有children的添加到to-tree组件里面
       * 第二步 把子节点没有有children的添加到to-tree组件里面
       */
      let skeletonHalfCheckedNodes = JSON.parse(JSON.stringify(arrayHalfCheckNodes)); // 深拷贝数据 - 半选节点
      // 筛选目标树不存在的骨架节点 - 半选内的节点 (第一步)
      let newSkeletonHalfCheckedNodes = [];
      skeletonHalfCheckedNodes.forEach(item => {
        if (!inquireIsExist(item)) {
          newSkeletonHalfCheckedNodes.push(item);
        }
      })

      newSkeletonHalfCheckedNodes.forEach(item => {
        item[children_] = [];
        //如果为0时直接添加，  如果不为0时添加到 pid 下面
        if (item[pid_] == 0) {
          this.$refs['from-tree'].append(item)
        } else {
          this.$refs['from-tree'].append(item, item[pid_])
        }
      })

      // 筛选目标树不存在的骨架节点 - 全选内的节点  (第二步)
      let newSkeletonCheckedNodes = [];
      nodes.forEach(item => {
        if (!inquireIsExist(item)) {
          newSkeletonCheckedNodes.push(item);
        }
      })

      newSkeletonCheckedNodes.forEach(item => {
        if (item[children_] && item[children_].length > 0) {
          item[children_] = [];
          this.$refs['from-tree'].append(item, item[pid_]);
        }
      })

      // 筛选目标树不存在的骨架节点 - 无子节点的节点  (第三步)
      let leafCheckedNodes = arrayCheckNodes.filter(item => {
        return !item[children_] || item[children_].length == 0;
      })
      leafCheckedNodes.forEach(item => {
        if (!inquireIsExist(item)) {
          this.$refs['from-tree'].append(item, item[pid_]);
        }
      })

      //删除右边已选中过的数据
      arrayCheckNodes.forEach(item => {
        this.$refs['to-tree'].remove(item);
      })
      //清空选中的值  这样 按钮就 disabled
      this.from_check_keys = [];
      // 目标数据节点展开
      if (this.transferOpenNode) {
        this.to_expanded_keys = keys;
      }
      //左侧数据  右侧数据  选中的keys 选中的nodes  半选的keys  半选的nodes
      this.$emit('delBtn', this.self_from_data, this.self_to_data, {
        keys,
        nodes,
        halfKeys,
        halfNodes
      })

      // 递归查询data内是否存在item函数
      function inquireIsExist (item, strData = self_from_data) {
        // 将树形数据格式化成一维字符串 然后通过匹配来判断是否已存在
        let strItem =
          typeof item[id__] == 'number'
            ? `"${id__}":${item[id__]},`
            : `"${id__}":"${item[id__]}",`;
        let reg = RegExp(strItem);
        let existed = reg.test(strData);
        return existed;
      }

    },
    //源数据筛选
    filterNodeFrom (value, data) {
      if (!value) return true;
      return data[this.defaultProps.label].indexOf(value) != -1;
    },
    // 目标数据筛选
    filterNodeTo (value, data) {
      if (!value) return true;
      return data[this.defaultProps.label].indexOf(value) != -1;
    }
  },
  created () {
    this.from_check_keys = this.defaultCheckedKeys;
  },
  watch: {
    from_check_keys (newVal) {
      if (newVal.length > 0) {
        this.from_disabled = false;
        this.from_is_indeterminate = true;

        //判断是否开始总全选
        let allCheck = newVal.filter(item => item[this.pid] == 0);

        if (allCheck.length == this.self_from_data.length) {
          this.from_is_indeterminate = false;
          this.from_check_all = true;
        } else {
          this.from_is_indeterminate = true;
          this.from_check_all = false;
        }
      } else {
        this.from_disabled = true;
        this.from_is_indeterminate = false;
      }
    },
    to_check_keys (newVal) {
      if (newVal.length > 0) {
        this.to_disabled = false;
        this.to_is_indeterminate = true;
        //判断是否开始总全选
        let allCheck = newVal.filter(item => item[this.pid] == 0);
        if (allCheck.length == this.self_to_data.length) {
          this.to_is_indeterminate = false;
          this.to_check_all = true;
        } else {
          this.to_is_indeterminate = true;
          this.to_check_all = false;
        }
      } else {
        this.to_disabled = true;
        this.to_is_indeterminate = false;
      }
    },
    filterFrom (val) {
      this.$refs['from-tree'].filter(val);
    },
    filterTo (val) {
      this.$refs['to-tree'].filter(val);
    }
  }
}
</script>

<style scoped>
.el-tree {
  min-width: 100%;
  display: inline-block !important;
}

.transfer {
  position: relative;
  overflow: hidden;
}

.transfer-left {
  position: absolute;
  top: 0;
  left: 0;
}

.transfer-right {
  position: absolute;
  top: 0;
  right: 0;
}

.transfer-right-item {
  height: calc((100% - 41px) / 2);
}

.transfer-right-small {
  height: 41px;
}

.transfer-main {
  padding: 10px;
  height: calc(100% - 41px);
  box-sizing: border-box;
  overflow: auto;
}

.transfer-left,
.transfer-right {
  border: 1px solid #ebeef5;
  width: 40%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  vertical-align: middle;
}

.transfer-center {
  position: absolute;
  top: 50%;
  left: 40%;
  width: 20%;
  transform: translateY(-50%);
  text-align: center;
}

.transfer-center-item {
  padding: 10px;
  overflow: hidden;
}

.address-list-center {
  height: 100%;
}

.address-list-center > .transfer-center-item {
  height: 50%;
  padding: 70px 10px 0;
  box-sizing: border-box;
  overflow: hidden;
}

.transfer-title {
  border-bottom: 1px solid #ebeef5;
  padding: 0 15px;
  height: 40px;
  line-height: 40px;
  color: #333;
  font-size: 16px;
  background-color: #f5f7fa;
}

.transfer-title .el-checkbox {
  margin-right: 10px;
}

.filter-tree {
  margin-bottom: 10px;
}

.address-list-ul {
  padding-bottom: 20px;
}

.address-list-li {
  position: relative;
  padding: 4px 24px 4px 4px;
  border-radius: 3px;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}

.address-list-li:hover {
  background-color: #f5f7fa;
}

.address-list-li:hover .address-list-del {
  display: block;
}

.address-list-del {
  display: none;
  position: absolute;
  top: 50%;
  right: 2px;
  margin-top: -10px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  text-align: center;
  background-color: #fef0f0;
  color: #f56c6c;
  cursor: pointer;
}

.u-clear {
  float: right;
  color: #67c23a;
  font-size: 14px;
  cursor: pointer;
}

.move_up_img {
  float: right;
  margin-top: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.move_down_img {
  transform: rotate(180deg);
}
h3 {
  margin: 0;
}
</style>

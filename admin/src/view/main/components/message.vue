<template>
  <div class="message-container">
    <div style="height:calc(100% - 50px);overflow:auto;padding:0 10px;">
      <transition-group :css="false"
                        name="list"
                        @before-enter="beforeEnter"
                        @enter="enter"
                        @after-enter="afterEnter">

        <div v-for="(item,index) in messageData"
             :key="index+'1'"
             :data-delay="(index % 20)*100"
             class="message-item">
          <div class="message-header">
            <span class="message-title">{{item.goodsId ? '商品' : '订单'}}</span>
            <span class="cre-time">{{item.createdTime}}</span>
          </div>
          <div class="message-content"
               @click="handleClick(item)">
            {{getStr(item)}}
          </div>
          <div class="message-bottom">
            <el-button v-if="item.type == 'goods'"
                       @click="setGoodsStatus(item,index)"
                       size="mini"
                       type="primary">同意{{item.good.status === 'down' ? '下' : '上'}}架</el-button>
            <el-button v-if="item.type == 'goods'"
                       @click="setFaild(item,index)"
                       size="mini"
                       type="danger">取消{{item.good.status === 'down' ? '下' : '上'}}架</el-button>
            <el-button v-else
                       @click="putOrder(item,index)"
                       size="mini"
                       type="primary">处理订单</el-button>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="page">
      <el-pagination small
                     @current-change="pageChange"
                     layout="prev, pager, next"
                     :total="data_total_num">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      messageData: [],
      page: 1,
      data_total_num: 0
    }
  },
  methods: {
    async handleClick (item) {
      const { type, orderId, goodsId } = item;
      this.$router.push({
        path: type === 'goods' ? '/goods/goodsList' : '/order/orderlist',
        query: {
          id: type === 'goods' ? goodsId : orderId
        }
      });
    },
    async setFaild ({ good: { goodsId, status }, mid }, index) {
      try {
        let { value } = await this.$prompt('请输入反馈信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[\s|\S]{10,}$/,
          inputErrorMessage: '不能为空 十个字以上'
        })
        let { code } = await this.$ajaxPost('changeMessageStatus', { goodsId, status: status === 'up' ? 'down' : 'up', mid });
        await this.$ajaxPost('addVertifyRecord', { goodsId, detail: value, status: '2' });
        this.showMessage(code, index)
      } catch (err) {
        console.log('您取消了');
      }

    },
    async setGoodsStatus ({ good: { goodsId, status }, mid }, index) {
      let { code } = await this.$ajaxPost('changeMessageStatus', { goodsId, status, mid });
      await this.$ajaxPost('addVertifyRecord', { goodsId, status: '1' });
      this.showMessage(code, index)
    },
    showMessage (code, index) {
      if (code === 0) {
        this.messageData.splice(index, 1);
        this.$message.success("操作成功");
        this.$emit('setMessageList');
      } else {
        this.$message.error("操作失败");
      }
    },
    async putOrder ({ orderId, mid }, index) {
      await this.$ajaxPost('changeMessageStatus', { mid });
      this.messageData.splice(index, 1);
      this.$router.push({ path: '/order/orderlist', query: { orderId } })
    },
    async getMessageList () {
      let { result: { data, data_total_num } } = await this.$ajaxGet('getMessageList', { page: this.page });
      this.messageData = data;

      this.data_total_num = data_total_num;
    },
    getStr ({ type, good = {}, order = {} }) {
      if (type == 'goods') {
        var { goodsId, name, status } = good;
      } else {
        var option = { initial: "待处理", audited: "已接单", dispatching: "配送中", completed: "已完成", canceled: "已取消" };
        var { orderId } = order;
      }
      // console.log(item, goodsId)
      return type == 'order' ? `您有新的订单（${orderId}）状态为“${option[order.status]}”需要处理订单` : `商品名称（${name}）、商品号（${goodsId}）申请${status === 'up' ? '上' : '下'}架`
    },
    async pageChange (page) {
      this.page = page;
      this.messageData = [];
      this.$nextTick(async () => await this.getMessageList());
    },
    beforeEnter (dom) {
      dom.classList.add('list-enter', 'list-enter-active');
    },
    enter (dom, done) {
      let delay = dom.dataset.delay;
      setTimeout(function () {
        dom.classList.remove('list-enter');
        dom.classList.add('list-enter-to');
        //监听 transitionend 事件
        var transitionend = window.ontransitionend ? "transitionend" : "webkitTransitionEnd";
        dom.addEventListener(transitionend, function onEnd () {
          dom.removeEventListener(transitionend, onEnd);
          done(); //调用done() 告诉vue动画已完成，以触发 afterEnter 钩子
        });
      }, delay)
    },
    afterEnter (dom) {
      dom.classList.remove('list-enter-to', 'list-enter-active');
    }
  },
  async mounted () {
    await this.getMessageList();
  }
}
</script>

<style lang="less">
.message-container {
  width: 100%;
  height: 100%;
  background: #ececec;
  // margin: 0 20px;
  position: relative;
  .page {
    position: absolute;
    bottom: 20px;
    text-align: center;
    width: 100%;
  }
  .message-item {
    // width: 100%;
    min-height: 50px;
    border-radius: 5px;
    background: #fff;
    margin: 10px 0;
    display: flex;
    flex-flow: column;
    .message-header {
      display: flex;
      justify-content: space-between;
      height: 30px;
      padding: 0 5px;
      font-size: 12px;
      align-items: center;
      .message-title {
        color: #333;
      }
      .cre-time {
        color: #ccc;
      }
    }
    .message-content {
      flex: 1;
      min-height: 60px;
      border: 1px none #ccc;
      border-style: solid none;
      padding: 10px;
      font-size: 14px;
      color: #4e4e4e;
    }
    .message-bottom {
      height: 40px;
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .list-enter {
    opacity: 0;
    transform: translateY(100%);
  }
  .list-enter-active {
    transition: 0.3s;
  }
  /* enter-to其实可以不用写, 没有显性写明，就是默认的opacity: 1;transform: none;  */
  .list-enter-to {
    opacity: 1;
    transform: translateY(0);
  }
  .infinite-list {
    &::-webkit-scrollbar {
      width: 10px;
    }
  }
}
</style>

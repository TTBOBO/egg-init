<template>
  <div class="message-container">
    <div style="height:calc(100% - 50px);overflow:auto;padding:0 10px;">
      <transition-group :css="false"
                        name="list"
                        @before-enter="beforeEnter"
                        @enter="enter"
                        @after-enter="afterEnter">

        <div v-for="(item,index) in messageData"
             :key="index"
             :data-delay="(index % 20)*100"
             class="message-item">
          <div class="header">
            <span class="title">商品</span>
            <span class="cre-time">2019-09-09 17:17:20</span>
          </div>
          <div class="content">
            {{getStr(item)}}
          </div>
          <div class="bottom">
            <template v-if="item.type == 'goods'">
              <el-button size="mini"
                         v-if="item.Good.status === 'dowm'"
                         type="primary">上架</el-button>
              <el-button size="mini"
                         v-else
                         type="danger">下架</el-button>
            </template>
            <template v-else>
              <el-button size="mini"
                         type="primary">处理订单</el-button>
            </template>
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
    async getMessageList () {
      let { result: { data, data_total_num } } = await this.$ajaxGet('getMessageList', { page: this.page });
      this.messageData = data;

      this.data_total_num = data_total_num;
      console.log(this.messageData)
    },
    getStr ({ type, Good = {}, order = {} }) {
      if (type == 'goods') {
        var { goodsId, name, status } = Good;
      } else {
        var { orderId, status } = order;
      }
      console.log(type)
      // console.log(item, goodsId)
      return type == 'order' ? `您有新的订单（${orderId}）状态为${status}需要处理` : `商品名称（${name}）、商品号（${goodsId}）申请${status === 'up' ? '下' : '上'}架`
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
    .header {
      display: flex;
      justify-content: space-between;
      height: 30px;
      padding: 0 5px;
      font-size: 12px;
      align-items: center;
      .title {
        color: #333;
      }
      .cre-time {
        color: #ccc;
      }
    }
    .content {
      flex: 1;
      min-height: 60px;
      border: 1px none #ccc;
      border-style: solid none;
      padding: 10px;
      font-size: 14px;
      color: #4e4e4e;
    }
    .bottom {
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

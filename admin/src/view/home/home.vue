<template>
  <div class="container container-box">
    <div class="card">
      <div class="card-item pointer shadow"
           v-for="(item,index) in cardData"
           :key="index">
        <i :class="item.classStr"></i>
        <div class="info">
          <p>{{item.name}}</p>
          <p>{{item.value}}</p>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="statis">
      <el-col :span="11"
              style="margin:10px;">
        <el-card class="">
          <div slot="header"
               class="clearfix">
            <span>订单数</span>
          </div>
          <div id="order-count"
               class="chart"></div>
        </el-card>
      </el-col>
      <el-col :span="11"
              style="margin:10px;">
        <el-card class="">
          <div slot="header"
               class="clearfix">
            订单金额

          </div>
          <div id="order-count1"
               class="chart"></div>
        </el-card>
      </el-col>
      <el-col :span="11"
              style="margin:10px;">
        <el-card class="">
          <div slot="header"
               class="clearfix">
            订单商品数
          </div>
          <div id="order-count2"
               class="chart"></div>
        </el-card>
      </el-col>
      <el-col :span="11"
              style="margin:10px;">
        <el-card class="">
          <div slot="header"
               class="clearfix">
            收款金额
          </div>
          <div id="order-count3"
               class="chart"></div>
        </el-card>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: true,
      transitionName: "slide-left",
      orderCountChart: null,
      cardData: [{ name: "待付款", value: 0, classStr: "el-icon-s-finance first-color" }, { name: "待发货", value: 0, classStr: "el-icon-s-custom second-color" }, { name: "待收货", value: 0, classStr: "el-icon-s-custom third-color" }, { name: "已完成", value: 0, classStr: "el-icon-s-custom four-color" }]
    }
  },
  methods: {
    async getOrderCount () {
      let { data } = await this.$ajaxGet('order_week_data');
      this.cardData.orderCount = data.values.reduce((cur, item) => cur + item, 0)
      this.initChart(this.getOption(data), 'order-count');
      this.initChart(this.getOption(data), 'order-count1')
      this.initChart(this.getOption(data), 'order-count2')
      this.initChart(this.getOption(data), 'order-count3')
    },
    initChart (option, chartId) {
      this.orderCountChart = echarts.init(document.getElementById(chartId));
      this.orderCountChart.setOption(option);
      // this.myChart.resize();
      window.addEventListener('resize', util.throttle(() => {
        this.orderCountChart && this.orderCountChart.resize();
      }, 200))
    },
    getOption ({ times, values }) {
      return {
        backgroundColor: '#fafafa',
        xAxis: {
          type: 'category',
          name: '日期',
          data: times
        },
        yAxis: {
          name: '订单数',
          type: 'value'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}'
        },
        series: [{
          data: values,
          type: 'line',
          smooth: true,
          lineStyle: {
            normal: {
              color: "#f4516c", // 线条颜色
            },
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#f4516c',
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#eb64fb'
              },
              {
                offset: 1,
                color: '#3fbbff0d'
              }
              ], false),
            }
          }
        }]
      };

    }
  },
  async mounted () {
    await util.createJs('echarts-gl.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.2.1/echarts.min.js');
    await this.getOrderCount();
  },
  async created () {


  },
  components: {
  }
}
</script>

<style lang='less'>
.container {
  .card {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .card-item {
      flex: 1;
      margin: 10px;
      height: 60px;
      padding: 10px;
      border: 1px solid #eaeaea;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 3px;
      transition: 0.3s linear;
      margin-bottom: 20px;
      font-size: 40px;
      .info {
        font-size: 18px;
        line-height: 20px;
        height: 100%;
        display: flex;
        justify-content: space-around;
        flex-flow: column;
        p {
          margin: 0;
          text-align: center;
        }
      }
      .first-color {
        color: #f4516c;
      }
      .second-color {
        color: #5c9acf;
      }
      .third-color {
        color: #1cc09f;
      }
      .four-color {
        color: #666666;
      }
    }
  }
  .statis {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .chart {
      width: 100%;
      height: 400px;
    }
  }
}
</style>

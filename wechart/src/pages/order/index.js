import Taro, { Component } from '@tarojs/taro'
import { Tabs, Scroll, Modal } from '~/components'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import OrderItem from './OrderItem'
import './index.scss'

@connect(modal => ({ ...modal }))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '我的订单',
    navigationBarBackgroundColor: '#000',
    navigationBarTextStyle: 'white'
  }

  state = {
    config: [
      {
        title: '全部订单',
        list: [
          { status: 1 },
          { status: 2 },
          { status: 3 },
          { status: 4 },
          { status: 5 }
        ]
      },
      { title: '待付款', list: [] },
      { title: '已付款', list: [] },
      { title: '待发货', list: [] },
      { title: '待收货', list: [] },
      { title: '待评价', list: [] }
    ],
    current: 0,
    cancelModal: false,
    fhModal: false,
    shModal: false
  }
  Refs = {}
  componentWillMount() {
    this.setState({
      current: parseInt(this.$router.params.type) || 0
    })
  }
  handleClick(e) {
    this.setState({
      current: e
    })
  }
  onScrollToLower(e) {
    console.log(e)
  }
  componentDidMount() {
    // this.props.dispatch({type:'modal/open',payload:'modal1'})
  }
  handleOk() {
    // this.props.dispatch({type:'modal/close',payload:'modal1'})
  }
  handleBtn(item, type) {
    // cancle wl del  buyagain  pay  sh  fh  pl
    switch (type) {
      case 'cancle':
        console.log('取消订单')
        this.setState({ cancelModal: true })
        break
      case 'wl':
        console.log('查看物流')
        break
      case 'del':
        console.log('删除订单')
        break
      case 'buyagain':
        console.log('再次购买')
        break
      case 'pay':
        console.log('支付')
        break
      case 'sh':
        console.log('确认收货')
        break
      case 'fh':
        this.setState({ fhModal: true })
        console.log('提醒发货')
        break
      case 'pj':
        console.log('去评价')
        break

      default:
        break
    }
  }
  handleFh() {
    this.setState({ fhModal: false })
    Taro.showToast({
      title: '提醒发货成功',
      icon: 'success',
      duration: 2000
    })
  }
  render() {
    return (
      <View>
        <Tabs currentIndex={this.state.current} config={this.state.config}>
          {this.state.config.map((_item, index) => {
            return (
              <Scroll index={index} key={index} current={this.state.current}>
                <View className='tab-order-list'>
                  <OrderItem
                    item={_item}
                    onHandleBtn={this.handleBtn.bind(this)}
                  />
                </View>
              </Scroll>
            )
          })}
        </Tabs>
        <Modal
          title=''
          isOpened={this.state.cancelModal}
          onHandleOk={() => {
            this.setState({ cancelModal: false })
          }}
          onHandleCancel={() => {
            this.setState({ cancelModal: false })
          }}
        >
          确认取消订单吗？
        </Modal>
        <Modal
          title=''
          isOpened={this.state.fhModal}
          hcancelBtn
          onHandleOk={() => this.handleFh()}
        >
          正常发货时间为1-5个工作日， 请耐心等待～
        </Modal>
        <Modal
          title=''
          isOpened={this.state.shModal}
          onHandleOk={() => {
            this.setState({ cancelModal: false })
          }}
          onHandleCancel={() => {
            this.setState({ cancelModal: false })
          }}
        >
          确认收货吗？
        </Modal>
      </View>
    )
  }
}

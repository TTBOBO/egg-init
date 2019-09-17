import Taro, { Component, useState, useEffect } from '@tarojs/taro'
import { Tabs, Scroll, Modal } from '~/components'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import OrderItem from './OrderItem'
import './index.scss'

@connect(modal => ({ ...modal }))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '我的订单'
  }
  configList = [
    {
      title: '全部订单',
      status: 'all',
      list: []
    },
    { title: '待付款', list: [], status: 'initial' },
    { title: '待发货', list: [], status: 'audited' },
    { title: '待收货', list: [], status: 'dispatching' },
    { title: '待评价', list: [], status: 'completed' }
  ]
  status = {
    0: '',
    1: 'initial',
    2: 'audited',
    3: 'dispatching',
    4: 'completed'
  }
  onScrollToLower(e) {
    console.log(e)
  }
  handleBtn({ setTipModal, setFhModal, setShModal }, item, type) {
    // cancle wl del  buyagain  pay  sh  fh  pl
    switch (type) {
      case 'cancle':
        console.log('取消订单')
        setTipModal(true)
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
        setShModal(true)
        console.log('确认收货')
        break
      case 'fh':
        setFhModal(true)
        console.log('提醒发货')
        break
      case 'pj':
        console.log('去评价')
        break

      default:
        break
    }
  }
  handleFh(setTipModal) {
    setTipModal(false)
    Taro.showToast({
      title: '提醒发货成功',
      icon: 'success',
      duration: 2000
    })
  }

  render() {
    const [configList, setConfigList] = useState(this.configList)
    const [current, setCurrent] = useState(() => {
      return parseInt(this.$router.params.status) || 0
    })
    useEffect(async () => {
      await getOrderList()
    }, [current])

    const [tipModal, setTipModal] = useState(false)
    const [fhModal, setFhModal] = useState(false)
    const [shModal, setShModal] = useState(false)

    const getOrderList = async (status = true) => {
      const { uuid } = Taro.getStorageSync('userInfo')
      let {
        result: { data }
      } = await Taro.$ajaxGet('orderList', {
        uuid,
        status: this.status[current]
      })
      status
        ? (configList[current].list = data)
        : configList[current].list.push(...data)
      setConfigList(configList)
    }
    return (
      <View>
        <Tabs
          currentIndex={current}
          config={configList}
          onTabsChange={e => setCurrent(e)}
        >
          {configList.map((_item, index) => {
            return (
              <Scroll index={index} key={index} current={index}>
                <View className='tab-order-list'>
                  <OrderItem
                    item={_item}
                    onHandleBtn={this.handleBtn.bind(this, {
                      setTipModal,
                      setFhModal,
                      setShModal
                    })}
                  />
                </View>
              </Scroll>
            )
          })}
        </Tabs>
        <Modal
          title=''
          isOpened={tipModal}
          onHandleOk={() => setTipModal(false)}
          onHandleCancel={() => setTipModal(false)}
        >
          确认取消订单吗？
        </Modal>
        <Modal
          title=''
          isOpened={fhModal}
          hcancelBtn
          onHandleOk={() => this.handleFh(setFhModal)}
        >
          正常发货时间为1-5个工作日， 请耐心等待～
        </Modal>
        <Modal
          title=''
          isOpened={shModal}
          onHandleOk={() => setShModal(false)}
          onHandleCancel={() => setShModal(false)}
        >
          确认收货吗？
        </Modal>
      </View>
    )
  }
}

import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  state = {
    btnStatus: {
      initial: '待付款',
      audited: '待发货',
      dispatching: '待收货',
      completed: '待评价',
      canceled: '已取消'
    }
  }
  defaultProps = {}
  componentWillMount() {}
  componentDidMount() {}
  componentDidShow() {}
  onHandleBtn(item, type) {
    console.log(this.props)
    this.props.onHandleBtn(item, type)
  }
  render() {
    return (
      <View>
        {this.props.item.list.length ? (
          <View>
            {this.props.item.list.map((_item, index) => {
              return (
                <View className='tab-order-item' key={index}>
                  <View className='header'>
                    <Text className='time'>{_item.createdTime}</Text>
                    <Text className='pay-status'>
                      {this.state.btnStatus[_item.status]}
                    </Text>
                  </View>
                  <View className='good-info'>
                    <View className='good-img'>
                      <Image
                        style={{ width: '100%', height: '100%' }}
                        src='http://localhost:7002/public/img/banner.png'
                      />
                    </View>
                    <View className='good-center'>
                      <View className='good-name'>{_item.shopName}</View>
                      {/* <View className='good-des'>白象木 / 现货</View> */}
                    </View>
                    <View className='good-pay-info'>
                      <View className='good-name'>￥{_item.paymentAmount}</View>
                      <View className='good-des'>x 1</View>
                      {_item.status == 'completed' && (
                        <View
                          className='see-good-wl'
                          onClick={() => this.props.onHandleBtn(_item, 'wl')}
                        >
                          查看物流
                        </View>
                      )}
                    </View>
                  </View>
                  <View className='footer'>
                    <View className='info'>
                      <Text>
                        共 2 件商品 实付款：
                        <Text style={{ fontWeight: 600 }}>
                          ¥ {_item.paymentAmount}
                        </Text>
                        （含运费¥ {_item.freightAmount}.00）
                      </Text>
                    </View>
                    <View className='btn-tool'>
                      {(_item.status == 'initial' ||
                        _item.status == 'audited') && (
                        <View
                          className='see-good-wl '
                          onClick={() =>
                            this.props.onHandleBtn(_item, 'cancle')
                          }
                        >
                          取消订单
                        </View>
                      )}
                      {_item.status == 'dispatching' && (
                        <View
                          className='see-good-wl '
                          onClick={() => this.props.onHandleBtn(_item, 'wl')}
                        >
                          查看物流
                        </View>
                      )}
                      {_item.status == 'completed' && (
                        <View
                          className='see-good-wl red-btn'
                          onClick={() =>
                            this.props.onHandleBtn(_item, 'buyagain')
                          }
                        >
                          再次购买
                        </View>
                      )}
                      {_item.status == 'initial' && (
                        <View
                          className='see-good-wl red-btn'
                          onClick={() => this.props.onHandleBtn(_item, 'pay')}
                        >
                          付款
                        </View>
                      )}
                      {_item.status == 'dispatching' && (
                        <View
                          className='see-good-wl red-btn'
                          onClick={() => this.props.onHandleBtn(_item, 'sh')}
                        >
                          确认收货
                        </View>
                      )}
                      {_item.status == 'audited' && (
                        <View
                          className='see-good-wl red-btn'
                          onClick={() => this.props.onHandleBtn(_item, 'fh')}
                        >
                          提醒发货
                        </View>
                      )}
                      {_item.status == 'completed' && (
                        <View
                          className='see-good-wl red-btn'
                          onClick={() => this.props.onHandleBtn(_item, 'pj')}
                        >
                          去评价
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              )
            })}
          </View>
        ) : (
          <View className='no-goods'>还没有任何订单哦 !</View>
        )}
        {/* <Modal /> */}
      </View>
    )
  }
}

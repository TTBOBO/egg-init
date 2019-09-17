import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { ScrollView } from '~/components'
import '../../OrderItem/index.scss'
import '../index.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '退换售后',
    navigationBarBackgroundColor: '#000',
    navigationBarTextStyle: 'white'
  }

  state = {}

  componentWillMount() {}
  componentDidMount() {}
  onScrollToLower(e) {
    console.log(e)
  }
  render() {
    const groupUrl = Taro.baseUrl + '/img/user/group10.png'
    return (
      <View className='salelist-container'>
        <ScrollView
          style={{ height: '100%' }}
          scrollY
          scrollWithAnimation
          scrollTop='0'
          lowerThreshold='20'
          upperThreshold='20'
          onScrollToLower={this.onScrollToLower}
        >
          <View className='tab-order-item'>
            <View className='header'>
              <Text className='time'>2018-07-06</Text>
            </View>
            <View className='good-info'>
              <View className='good-img'>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  src={groupUrl}
                />
              </View>
              <View className='good-center'>
                <View className='good-name'>CU梳妆凳</View>
                <View className='good-des'>白象木 / 现货</View>
              </View>
              <View className='good-pay-info'>
                <View className='good-name'>￥660</View>
                <View className='good-des'>x 1</View>
                {/* {_item.status == 5 && <View className="see-good-wl">查看物流</View> } */}
              </View>
            </View>
            <View className='footer'>
              <View className='btn-tool'>
                <Text>仅退款 退款待处理 还剩2天23时69分</Text>
                <View className='see-good-wl '>取消订单</View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

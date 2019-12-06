import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Map } from '@tarojs/components'
import './index.scss'

const groupUrl = 'http://localhost:7002/public/img/banner.png'
export default class Index extends Component {
  config = {
    navigationBarTitleText: '订单详情'
  }

  state = {}
  details = {
    ProductName: '单餐保姆',
    StartTime: '2019-02-21 18:30:00',
    ServiceMouths: 12,
    ServiceAddr: '厦门思明区百家村路',
    Distance: 1406.0536551385658,
    CreTime: '2019-02-21 18:31:35',
    BillNo: '1902211831350004',
    JobRequirements: ' 2/22经纪人小任）1902211825062484同单',
    JobContent: '',
    SalaryRange: '2000-10000',
    SalaryLow: 2000,
    StartHigh: 10000,
    Longitude: 118.093928,
    Latitude: 24.456894,
    Lng: 118.093928,
    Lat: 24.456894
  }

  markers = [
    {
      iconPath: '../../../assets/img/my.png',
      id: 1,
      latitude: 24.452137427224173,
      longitude: 118.08883814412037,
      width: '50px',
      height: '50px'
    }
  ]

  componentWillMount() {}
  componentDidMount() {}
  componentDidShow() {}
  render() {
    return (
      <View className='order-info-container'>
        <View className='order-state'>交易成功</View>
        <View className='order-goods-con '>
          <View className='good-list mg-b'>
            <View className='good-item'>
              <Image className='good-pic' src={groupUrl} />
              <View className='good-right'>
                <View className='left'>
                  <View className='good-name'>CU梳妆凳</View>
                  <View className='good-des'>白象</View>
                  <View className='good-pri-con'>
                    <Text className='good-pri vip'>¥ 621</Text>
                    <Text className='good-old-pri'>¥ 621</Text>
                  </View>
                </View>
                <View className='right'>
                  <View className='buy-num'>x 1</View>
                  <View className='buy-status'>待付款</View>
                  <View className='sh-btn'>申请售后</View>
                </View>
              </View>
            </View>

            <View className='good-item'>
              <Image className='good-pic' src={groupUrl} />
              <View className='good-right'>
                <View className='left'>
                  <View className='good-name'>CU梳妆凳</View>
                  <View className='good-des'>白象</View>
                  <View className='good-pri-con'>
                    <Text className='good-pri vip'>¥ 621</Text>
                    <Text className='good-old-pri'>¥ 621</Text>
                  </View>
                </View>
                <View className='right'>
                  <View className='buy-num'>x 1</View>
                  <View className='buy-status'>待付款</View>
                  <View className='sh-btn'>申请售后</View>
                </View>
              </View>
            </View>

            <View className='bz'>
              买家留言：我家住在12楼，请帮忙送上来我家住在12楼，请帮忙送上来我家住在12楼，请帮忙送上来我家住在12楼，请帮忙送上来我家住在12楼，请帮忙送上来
            </View>
          </View>

          <View className='pay-info mg-b'>
            <View className='pay-time'>下单时间： 2018-04-12 08:56:03</View>
            <View className='pay-time'>订单编号： 33260074</View>
          </View>
          <View>
            <Map
              id='myMap'
              style='width: 100%; height: 400rpx;'
              latitude={this.details.Lat}
              longitude={this.details.Lng}
              markers={this.markers}
              enable-zoom
              enable-scroll
            ></Map>
            {/* <View>
                        <View>
                            <Text>张三</Text>
                            <Text>178****0834</Text>
                        </View>
                        <View>浙江省杭州市西湖区留下汇丰国际</View>
                    </View>
                    <View>
                        <View><Text>商品价格</Text><Text>¥ 621.00</Text></View>
                        <View><Text>运费</Text><Text>+ ¥ 0.00</Text></View>
                        <View><Text>优惠券</Text><Text>- ¥ 34.5</Text></View>
                        <View><Text>账户余额支付</Text><Text>- ¥ 34.5</Text></View>
                    </View>
                    <View>
                        <View>实付</View>
                        <View>¥ 552.00</View>
                    </View> */}
          </View>
        </View>
      </View>
    )
  }
}

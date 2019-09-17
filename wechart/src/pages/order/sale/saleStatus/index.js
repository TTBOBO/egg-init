import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import {
  AtIcon,
  AtFloatLayout,
  AtInput,
  AtTextarea,
  AtInputNumber
} from 'taro-ui'
import '../index.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '填写售后申请',
    navigationBarBackgroundColor: '#000',
    navigationBarTextStyle: 'white'
  }

  state = {
    openStatus: false,
    openGoodsStaus: false,
    num: 0,
    money: 0,
    getStatus: [{ title: '待发货' }, { title: '待收货' }, { title: '已收货' }],
    reasonList: [
      { title: '快递一直未送达' },
      { title: '快递无跟踪记录' },
      { title: '空包裹' },
      { title: '其他' }
    ]
  }

  componentWillMount() {}
  componentDidMount() {}
  setOpenReason(status) {
    this.setState({
      [status]: !this.state[status]
    })
  }
  handleChange(type, value) {
    this.setState({
      [type]: value
    })
  }
  handleChangetext(e) {
    console.log(e)
  }
  render() {
    const groupUrl = Taro.baseUrl + '/img/user/group10.png'
    const { openStatus, openGoodsStaus, money, num } = this.state
    return (
      <View className='sale-container'>
        <View className='good-item'>
          <Image className='good-pic' src={groupUrl} />
          <View className='good-right'>
            <View className='left'>
              <View className='good-name'>CU梳妆凳</View>
              <View className='good-des'>白象</View>
              <View className='good-pri-con'>
                <Text className='good-pri'>¥ 621</Text>
              </View>
            </View>
            <View className='right'>
              <View className='buy-num'>x 1</View>
            </View>
          </View>
        </View>
        <View className='margin-con'></View>
        <View className='sale-item'>
          <View className='sale-header'>收货状态</View>
          <View className='reason'>
            <Text>请选择收货状态</Text>
            <AtIcon
              onClick={this.setOpenReason.bind(this, 'openGoodsStaus')}
              value={`chevron-${openGoodsStaus ? 'up' : 'down'}`}
              size='22'
            ></AtIcon>
          </View>
        </View>
        <View className='sale-item'>
          <View className='sale-header'>退货原因</View>
          <View className='reason'>
            <Text>请选择退款原因</Text>
            <AtIcon
              onClick={this.setOpenReason.bind(this, 'openStatus')}
              value={`chevron-${openStatus ? 'up' : 'down'}`}
              size='22'
            ></AtIcon>
          </View>
        </View>
        <View className='sale-item'>
          <View className='sale-header'>退货数量</View>
          <AtInputNumber
            min={0}
            max={10}
            step={1}
            value={num}
            onChange={this.handleChange.bind(this, 'num')}
          />
        </View>
        <View className='sale-item'>
          <View className='sale-header money'>
            <View>
              <Text>退款金额</Text>
              <Text className='des'>最多1000元</Text>
            </View>
            <View>
              <Text>退换货规则</Text>
              <AtIcon value='chevron-right' size='22' color=''></AtIcon>
            </View>
          </View>
          <AtInput
            name='value'
            title=''
            type='number'
            placeholder=''
            value={money}
            onChange={this.handleChange.bind(this, 'money')}
          />
        </View>
        <View className='sale-item'>
          <View className='sale-header'>问题描述</View>
          <AtTextarea
            value={this.state.value}
            onChange={this.handleChangetext.bind(this)}
            maxLength={200}
            placeholder='请描述详细问题'
          />
        </View>
        <View className='submit'>提交</View>
        <AtFloatLayout
          isOpened={openStatus}
          onClose={this.setOpenReason.bind(this, 'openStatus')}
        >
          <View className='layout-item center'>退货原因</View>
          {this.state.reasonList.map((item, index) => {
            return (
              <View className='layout-item' key={'item' + index}>
                {item.title}
              </View>
            )
          })}
        </AtFloatLayout>
        <AtFloatLayout
          isOpened={openGoodsStaus}
          onClose={this.setOpenReason.bind(this, 'openGoodsStaus')}
        >
          <View className='layout-item center'>收货状态</View>
          {this.state.getStatus.map((item, index) => {
            return (
              <View className='layout-item' key={'item' + index}>
                {item.title}
              </View>
            )
          })}
        </AtFloatLayout>
      </View>
    )
  }
}

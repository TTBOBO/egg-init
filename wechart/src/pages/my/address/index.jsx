import Taro, {
  Component,
  useState,
  useEffect,
  usePullDownRefresh
} from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon } from 'taro-ui'
import './index.scss'
@connect(user => ({ ...user }))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '地址列表',
    enablePullDownRefresh: true
  }

  componentDidMount() {}
  async getAddress() {
    let {
      result: { data }
    } = await Taro.$ajaxGet('userAddressList', {
      id: this.props.user.userInfo.uuid
    })
    return data
  }

  async check({ id }, address, setAddress) {
    let { code, result } = await Taro.$ajaxPost('setDefaltStatus', {
      id,
      uuid: this.props.user.userInfo.uuid
    })
    if (code === 0 && result.length) {
      setAddress(
        address.map(item => {
          item.isDefault = item.id === id ? 'is' : 'no'
          return item
        })
      )
    }
  }

  async deleteAddress(id, setAddress) {
    let { code } = await Taro.$ajaxPost('deleteAddress', {
      ids: [id]
    })
    if (code === 0) {
      setAddress(await this.getAddress())
    }
  }

  addAddress() {
    this.props.dispatch({
      type: 'router/navigateTo',
      payload: { url: '/pages/my/addAddress/index' }
    })
  }

  async chooseAddress(setAddress) {
    let {
      userName,
      telNumber,
      provinceName,
      mcityName,
      countyName,
      detailInfo
    } = await Taro.chooseAddress()
    await Taro.$ajaxPost('addAddress', {
      linkMan: userName,
      phone: telNumber,
      isDefault: 'no',
      city: [provinceName, mcityName, countyName],
      address: detailInfo
    })
    setAddress(await this.getAddress())
  }

  render() {
    const [address, setAddress] = useState([])

    useEffect(async () => {
      setAddress(await this.getAddress())
    }, [])

    usePullDownRefresh(async () => setAddress(await this.getAddress()))

    return (
      <View className='container'>
        {address.map((item, index) => {
          return (
            <View className='address-item' key={index}>
              <View className='item-con'>
                <View className='item-info'>
                  <Text className='name some'>{item.linkMan}</Text>
                  <Text className='phone'>{item.phone}</Text>
                </View>
                <View className='item-info'>
                  {item.isDefault === 'is' && (
                    <Text className='mr mr-icon'>默认</Text>
                  )}
                  {item.isDefault !== 'is' && <Text className='mr'></Text>}
                  <Text className='some'>{item.address}</Text>
                </View>
              </View>
              <View className='item-bottom'>
                <View className='label'>
                  <View
                    className={`select-icon icon  ${
                      item.isDefault === 'is' ? 'select' : 'select-no'
                    }`}
                    onClick={() => this.check(item, address, setAddress)}
                  ></View>
                  <Text>设为默认地址</Text>
                </View>
                <View className='icon-con'>
                  <View className='delete-icon'>
                    <AtIcon
                      onClick={() => this.deleteAddress(item.id, setAddress)}
                      value='trash'
                      size='15'
                      color='#F00'
                    ></AtIcon>
                  </View>
                  <Text className='delete-icon'></Text>
                </View>
              </View>
            </View>
          )
        })}

        <View className='address-tool'>
          <View
            className='btn import-btn'
            onClick={() => this.chooseAddress(setAddress)}
          >
            导入微信地址
          </View>
          <View className='btn add-btn' onClick={() => this.addAddress()}>
            新增地址
          </View>
        </View>
      </View>
    )
  }
}

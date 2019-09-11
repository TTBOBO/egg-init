import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtModal, AtModalContent, AtModalAction } from 'taro-ui'
import './index.scss'

@connect(user => ({ ...user }))
class Index extends Component {
  state = {}
  config = {
    navigationBarTitleText: '我的'
  }

  componentDidMount() {
    console.log(this.props.user)
  }

  async getUser({ detail }) {
    const { userInfo } = detail
    if (!userInfo) {
      return false
    }

    let loginData = await Taro.login()
    let { code, message, result } = await Taro.$ajaxPost('login', {
      ...userInfo,
      code: loginData.code
    })
    if (code === 0) {
      let { userinfo, token } = result
      Taro.setStorageSync('userInfo', userinfo)
      Taro.setStorageSync('token', token)
      this.props.dispatch({ type: 'user/userInfo', payload: userinfo })
      this.setState({ status: false })
      console.log(this.props)
    } else {
      await Taro.showModal({
        title: '授权登录失败',
        content: message,
        showCancel: false,
        icon: 'none'
      })
    }
  }

  showModal() {
    const { status } = this.state
    return (
      <AtModal isOpened={status}>
        <AtModalContent>
          <View className='model-header'>请先登录再进行操作</View>
          <View className='model-title'>小程序将获取一下授权</View>
          <View className='model-tip'>1、获得您的公开信息（昵称、头像等）</View>
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => this.setState({ status: false })}>取消</Button>
          <Button
            className='base-color'
            onGetUserInfo={this.getUser}
            open-type='getUserInfo'
          >
            确定
          </Button>
        </AtModalAction>
      </AtModal>
    )
  }

  render() {
    const {
      user: { loginStatus, userInfo }
    } = this.props
    console.log(this.props.user)
    return (
      <View className='my-container'>
        <View className='header'>
          <Image className='auth-pic' src='../../assets/img/my.png' />
          {!loginStatus && (
            <Text
              className='nick-name'
              onClick={() => this.setState({ status: true })}
            >
              登录/注册
            </Text>
          )}
          {loginStatus && (
            <Text className='nick-name'>{userInfo.nickName}</Text>
          )}
        </View>
        {this.showModal()}
      </View>
    )
  }
}
export default Index

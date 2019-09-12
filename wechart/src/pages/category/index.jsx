import Taro, { Component, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import styles from './index.scss'

// console.log(styles)
@connect(user => ({ ...user }))
class Index extends Component {
  config = {
    navigationBarTitleText: '分类'
  }

  componentWillMount() {}

  componentDidMount() {
    console.log(this.props.user)
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return <View className='category-container'></View>
  }
}
export default Index

import Taro, { Component, useState, useEffect } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton } from 'taro-ui'
// import styles from './index.scss'

// console.log(styles)
@connect(user => ({ ...user }))
class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() {}

  componentDidMount() {
    console.log(this.props.user)
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  setNum() {
    console.log(1)
  }
  Counter({ initialCount }) {
    const [count, setCount] = useState(initialCount)
    useEffect(() => {
      console.log(count)
    })
    return (
      <View>
        {/* styles.content2 */}
        <Text className=''>Count: {count}</Text>
        <Button onClick={() => setCount(initialCount)}>Reset1</Button>
        <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
        <Button onClick={() => setCount(prevCount => prevCount - 1)}>-</Button>
        <AtButton>点击</AtButton>
      </View>
    )
  }

  render() {
    return (
      <View className='index'>
        {this.Counter({ initialCount: 0 })}
        <Text>Hello world!</Text>
      </View>
    )
  }
}
export default Index

import Taro, { Component, useState, useEffect } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.less'

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
        Count: {count}
        <Button onClick={() => setCount(initialCount)}>Reset</Button>
        <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
        <Button onClick={() => setCount(prevCount => prevCount - 1)}>-</Button>
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

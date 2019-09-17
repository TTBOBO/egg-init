import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs } from 'taro-ui'
import './index.scss'

export default class Index extends Component {
  static defaultProps = {
    config: [],
    currentIndex: 0,
    onTabsChange: () => {},
    scroll: true
  }
  handleClick(e) {
    this.props.onTabsChange(e)
  }

  render() {
    return (
      <View className='order-container'>
        <AtTabs
          className='tabs'
          current={this.props.currentIndex}
          scroll={this.props.scroll}
          tabList={this.props.config}
          onClick={e => this.handleClick(e)}
        >
          {this.props.children}
        </AtTabs>
      </View>
    )
  }
}

import Taro, { Component } from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import { AtTabsPane } from 'taro-ui'
import '../Tabs/index.scss'

export default class Index extends Component {
  state = {}
  static defaultProps = {
    tabScroll: true
  }
  componentDidMount() {}
  onScrollToLower() {
    this.props.onScrollToLower && this.props.onScrollToLower()
  }
  render() {
    return (
      <AtTabsPane
        current={this.props.current}
        index={this.props.index}
        className='test'
      >
        <ScrollView
          className='scroll-con'
          scrollY
          scrollWithAnimation
          scrollTop='0'
          lowerThreshold='20'
          upperThreshold='20'
          onScrollToLower={this.onScrollToLower}
        >
          {this.props.children}
        </ScrollView>
      </AtTabsPane>
    )
  }
}

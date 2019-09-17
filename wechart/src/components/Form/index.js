import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

export default class Index extends Component {
  state = {}
  static defaultProps = {
    onSubmit: () => {},
    loading: false,
    submitText: '确认',
    openType: '',
    onGetUserInfo: () => {}
  }

  componentWillMount() {}
  componentDidMount() {}
  render() {
    const {
      onSubmit,
      loading,
      submitText,
      openType,
      onGetUserInfo
    } = this.props
    return (
      <View className='container'>
        <View className='content'>{this.props.children}</View>
        <View className='submit'>
          {!openType && (
            <AtButton
              size='normal'
              type='primary'
              className='submit-btn'
              onClick={onSubmit.bind(this)}
              loading={loading}
            >
              {submitText}
            </AtButton>
          )}
          {openType && (
            <AtButton
              size='normal'
              type='primary'
              className='submit-btn'
              onGetUserInfo={onGetUserInfo.bind(this)}
              openType={openType}
              loading={loading}
            >
              {submitText}
            </AtButton>
          )}
        </View>
      </View>
    )
  }
}

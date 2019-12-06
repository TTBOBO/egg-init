import Taro, { Component, useState } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import styles from './index.scss'

// console.log(styles)
@connect(user => ({ ...user }))
class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  bannerList = [
    {
      imgUrl: ''
    },
    {
      imgUrl: ''
    },
    {
      imgUrl: ''
    }
  ]

  componentWillMount() {}

  componentDidMount() {
    console.log(this.props.user)
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const [currentIndex, useCurrent] = useState(0)
    return (
      <View className='index-container'>
        <View className='wapper'>
          <Swiper
            className='swiper'
            circular
            autoplay
            previousMargin='20px'
            nextMargin='20px'
            indicatorDots
            indicatorColor='#e8e8e8'
            indicatorActiveColor='#888'
            onChange={({ detail: { current } }) => {
              useCurrent(current)
            }}
          >
            {this.bannerList.map((item, index) => {
              return (
                <SwiperItem className='swiper-item' key={index}>
                  <Image
                    src='http://localhost:7002/public/img/banner.png'
                    className={`swiper-item-container ${
                      currentIndex === index ? 'active' : ''
                    }`}
                  />
                </SwiperItem>
              )
            })}
          </Swiper>
        </View>
      </View>
    )
  }
}
export default Index

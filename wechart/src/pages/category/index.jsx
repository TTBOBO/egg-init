import Taro, { Component, useState, useEffect } from '@tarojs/taro'
import {
  View,
  Swiper,
  SwiperItem,
  ScrollView,
  Input,
  Image
} from '@tarojs/components'
import { AtDivider } from 'taro-ui'
import './index.scss'

const bannerUrl = 'http://localhost:7002/public/img/banner.png'
export default class Index extends Component {
  config = {
    navigationBarTitleText: '分类'
  }

  componentWillMount() {}
  async componentDidMount() {}

  async getCategory() {
    return await Taro.$ajaxGet('categoryList', { hasGoods: true })
  }

  render() {
    // const { config } = this.state
    const [current, useCurrent] = useState(0)
    const [code, useCode] = useState('')
    const [category, useCategory] = useState([])
    useEffect(async () => {
      let {
        result: { data }
      } = await this.getCategory()
      console.log(data)
      useCategory(data)
    }, [])
    console.log(category)
    return (
      <View className='mall-container'>
        <View className='search-bar'>
          <View className='at-icon at-icon-search'></View>
          <Input
            placeholder='搜索商品'
            value={code}
            onInput={e => useCode(e.detail.value)}
            className='search-input'
          />
        </View>
        <View className='mall-tabs adviser-tabs'>
          <View className='item-con'>
            <View className='type-con'>
              {category.length &&
                category.map((typeItem, typeIndex) => {
                  return (
                    <View
                      key={typeIndex}
                      onClick={() => useCurrent(typeIndex)}
                      className={`type-item ${
                        typeIndex == current ? 'active' : ''
                      }`}
                    >
                      {typeItem.categoryName}
                    </View>
                  )
                })}
            </View>
            <Swiper
              className='swiper'
              vertical
              current={current}
              circular
              onChange={e => useCurrent(e.detail.current)}
            >
              {category.length &&
                category.map((typeItem, typeIndex) => {
                  return (
                    <SwiperItem key={typeIndex}>
                      <ScrollView
                        className='scrollview'
                        scrollY
                        scrollTop='0'
                        style='height: 100%;'
                      >
                        {typeItem.Goods ? (
                          typeItem.Goods.map((listItem, listIndex) => {
                            return (
                              <View className='home-con' key={listIndex}>
                                <View className='type-name'>
                                  <AtDivider
                                    content={listItem.typename}
                                    fontColor='#000'
                                    lineColor='#777'
                                  />
                                </View>
                                <View className='home-con-type'>
                                  {listItem.data.map((item, index) => {
                                    return (
                                      <View key={index} className='item-con'>
                                        <Image src={bannerUrl} />
                                        <View>民用家具</View>
                                      </View>
                                    )
                                  })}
                                </View>
                              </View>
                            )
                          })
                        ) : (
                          <View>{typeIndex}</View>
                        )}
                      </ScrollView>
                    </SwiperItem>
                  )
                })}
            </Swiper>
          </View>
        </View>
      </View>
    )
  }
}

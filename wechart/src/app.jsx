import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/index'
import CreatApp from './dva'
import models from './dva/models'
import { ajaxGet, ajaxPost } from './service/fly'
import './app.scss'

const dvaApp = new CreatApp({
  initialState: {},
  models
})
const store = dvaApp.getStore()
Taro.$ajaxGet = ajaxGet
Taro.$ajaxPost = ajaxPost

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: ['pages/my/index', 'pages/index/index'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#bfbfbf',
      selectedColor: '#4842d4',
      backgroundColor: '#fff',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: 'assets/img/index.png',
          selectedIconPath: 'assets/img/index_s.png'
        },
        {
          pagePath: 'pages/index/index',
          text: '分类',
          iconPath: 'assets/img/type.png',
          selectedIconPath: 'assets/img/type_s.png'
        },
        {
          pagePath: 'pages/index/index',
          text: '购物车',
          iconPath: 'assets/img/cart.png',
          selectedIconPath: 'assets/img/cart_s.png'
        },
        {
          pagePath: 'pages/my/index',
          text: '我的',
          iconPath: 'assets/img/my.png',
          selectedIconPath: 'assets/img/my_s.png'
        }
      ]
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

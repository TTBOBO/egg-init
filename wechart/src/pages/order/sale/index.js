import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import { List} from '~/components'
import './index.scss'
export default class Index extends Component {

    config = {
        navigationBarTitleText: '售后服务',
        navigationBarBackgroundColor:"#000",
        navigationBarTextStyle:'white'
    }

    state={
        hederList:[{title:"退货收货",url:"/pages/order/sale/saleStatus/index",custom:false,note:"已收到货，需要退还已收到的货物"},
        {title:"仅退款（包含未签收）",url:"/pages/order/sale/saleStatus/index",custom:false,note:"已收到货，需要退还已收到的货物"}]
    }

    componentWillMount () {}
    componentDidMount () {} 
    componentWillReceiveProps (nextProps,nextContext) {} 
    render() {
        const groupUrl = Taro.baseUrl+"/img/user/group10.png";
        return (
            <View className="sale-container">
                <View className="good-item">
                    <Image className="good-pic" src={groupUrl}/>
                    <View className="good-right">
                        <View className="left">
                            <View className="good-name">CU梳妆凳</View>
                            <View className="good-des">白象</View>
                            <View className="good-pri-con">
                                <Text className="good-pri">¥ 621</Text>
                            </View>
                        </View>
                        <View className="right">
                            <View className="buy-num">x 1</View>
                        </View>
                    </View>
                </View>
                <View className="margin-con"></View>
                <List list={this.state.hederList} ></List>
            </View>
        );
    }
}
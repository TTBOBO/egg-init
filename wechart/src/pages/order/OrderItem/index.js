import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import { Modal} from '~/components'
import './index.scss';
const groupUrl = Taro.baseUrl+"/img/user/group10.png";
export default class Index extends Component {
    state={
        btnStatus:{
            1:"待付款",
            2:"待发货",
            3:"待收货",
            4:"待评价",
            5:"交易成功"
        }
    }
    defaultProps = {}
    componentWillMount () {
    
    }
    componentDidMount () {
       
    } 
    componentWillReceiveProps (nextProps,nextContext) {

    } 
    componentDidShow () {} 
    onHandleBtn(item,type){
        console.log(this.props)
        this.props.onHandleBtn(item,type);
    }
    render() {
        return (
            <View>
                {
                    this.props.item.list.length > 0 ?  <View>
                        {
                           this.props.item.list.map((_item,index) => {
                                return (
                                    <View className="tab-order-item" key={index}>
                                        <View className='header'>
                                            <Text className="time">2018-07-06</Text>
                                            <Text className="pay-status">{this.state.btnStatus[_item.status]}</Text>
                                        </View>
                                        <View className="good-info">
                                            <View className="good-img">
                                                <Image style={{width:'100%',height:'100%'}}  src={groupUrl} />
                                            </View>
                                            <View className="good-center">
                                                <View className="good-name">CU梳妆凳</View>
                                                <View className="good-des">白象木 / 现货</View>
                                            </View>
                                            <View className="good-pay-info">
                                                <View className="good-name">￥660</View>
                                                <View className="good-des">x 1</View>
                                                {_item.status == 5 && <View className="see-good-wl" onClick={() => this.props.onHandleBtn(_item,'wl')}>查看物流</View> }
                                            </View>
                                        </View>
                                        <View className='footer'>
                                            <View className="info">
                                                <Text>共 2 件商品 实付款：<Text style={{fontWeight:600}}>¥ 2220 </Text>（含运费¥ 0.00）</Text>
                                            </View>
                                            <View className="btn-tool"> 
                                                {(_item.status == 1 || _item.status == 2) && <View className="see-good-wl " onClick={() => this.props.onHandleBtn(_item,'cancle')}>取消订单</View>}
                                                {_item.status == 3 && <View className="see-good-wl " onClick={() => this.props.onHandleBtn(_item,'wl')}>查看物流</View>}
                                                {(_item.status == 5 || _item.status == 4) && <View className="see-good-wl" onClick={() => this.props.onHandleBtn(_item,'del')}>删除订单</View>}
                                                {(_item.status == 5 || _item.status == 4) && <View className="see-good-wl red-btn" onClick={() => this.props.onHandleBtn(_item,'buyagain')}>再次购买</View>}
                                                {_item.status == 1 && <View className="see-good-wl red-btn" onClick={() => this.props.onHandleBtn(_item,'pay')}>付款</View>}
                                                {_item.status == 3 && <View className="see-good-wl red-btn" onClick={() => this.props.onHandleBtn(_item,'sh')}>确认收货</View>}
                                                {_item.status == 2 && <View className="see-good-wl red-btn" onClick={() => this.props.onHandleBtn(_item,'fh')}>提醒发货</View> }
                                                {_item.status == 4 && <View className="see-good-wl red-btn" onClick={() => this.props.onHandleBtn(_item,'pj')}>去评价</View>}
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                    :
                    <View className="no-goods">
                        还没有任何订单哦 !
                    </View>
                }
                {/* <Modal /> */}
            </View>
        );
    }
}
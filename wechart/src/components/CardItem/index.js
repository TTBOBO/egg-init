import { View, Text,Image } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { AtBadge } from 'taro-ui'
import './index.scss';
class Index extends Component {

    static defaultProps = {
        list:[],
        num:5
    }
    state={}

    componentWillMount () {}
    componentDidMount () {} 
    componentWillReceiveProps (nextProps,nextContext) {} 
    componentDidShow () {} 
    componentDidHide () {} 
    handleClick(item,index){
        if(item.url){
            let navigateType = {
                1:"switchTab",
                2:"reLaunch",
                3:"redirectTo",
                4:"navigateTo",
                5:"navigateBack"
            }
            Taro[navigateType[item.navigateType || 4]]({
                url:item.url
            })
        }else{
            this.props.handleClick && this.props.handleClick({
                handleIndex:index,
                handleItem:item
            })
        }
        
    }
    render() {
        const { list,num} = this.props;
        return (
            <View className="order-list" >
            {
                list.map((item,index) => {
                    return (
                        <View key={index+'list'} className={`order-item ${num == 5 ? 'item-5' : 'item-4'}`} onClick={() => this.handleClick(item,index)}>
                            <View className="bage-con">
                                {item.bage && <Text className="bage">{item.bage >= 99 ? '99+' : item.bage }</Text>}
                                <Image src={item.icon} className="order-item-img"  />
                            </View>
                            <Text className="order-item-title">{item.title}</Text>
                        </View>
                    )
                })
            }
            </View>
        );
    }
}
export default Index;
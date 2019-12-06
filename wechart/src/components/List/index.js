import Taro, { Component } from '@tarojs/taro'
import { AtList, AtListItem } from "taro-ui"
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import './index.scss';

@connect((user) => ({...user}))
class Index extends Component {
    componentWillReceiveProps (nextProps) {
        // console.log(this.props, nextProps)
    }

    componentWillUnmount () { }

    async componentDidMount () {
        // const data = await Taro.$ajaxGet('test');
    }

    componentDidHide () { 
            
    }
    state = {}
    static defaultProps = {
        
    }

    handleClick(item,index){
        let navigateType = {
            1:"switchTab",
            2:"reLaunch",
            3:"redirectTo",
            4:"navigateTo",
            5:"navigateBack"
        }
        if(item.custom){
            console.log(this.props)
            this.props.handleClick({item,index});
            return false;
        }
        // Taro[navigateType[item.navigateType || 4]]({
        //     url:item.url
        // })
        this.props.dispatch({type:"router/navigateTo",payload:{url:item.url}})
    }

    handleChange(e){
        console.log(e.detail.value);
    }

    render () {
        const { list = [] } = this.props;
        return (
            <View className="list-con">
                <AtList>
                    {list.map((item,index) => {
                        return (
                            !item.isSwitch ? 
                            <AtListItem 
                                title={item.title} 
                                key={index+'list'} 
                                onClick={() => this.handleClick(item,index)}
                                arrow={item.url ? 'right' : 'right'}
                                thumb={item.thumb || ""}
                                note={item.note || ""}
                            />
                            :
                            <AtListItem 
                                title={item.title} 
                                key={index+'list'} 
                                thumb={item.thumb || ""}
                                note={item.note || ""}
                                isSwitch
                                switchColor={item.color}
                                onSwitchChange={(e) => this.handleChange(e)}

                            />
                        )
                    })}
                </AtList>
            </View>
        )
    }
}

export default Index



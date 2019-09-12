import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button ,ScrollView ,Image } from '@tarojs/components';
import { AtTabs } from 'taro-ui'
import './index.scss';
export default class Index extends Component {

    static defaultProps = {
        config:[],
        currentIndex:0,
        onTabsChange:() =>{},
        scroll:true
    }

    componentWillMount () {
        this.setState({
            current:parseInt(this.$router.params.type) || (this.props.currentIndex || 0)
        })
    }
    componentDidMount () {} 
    componentWillReceiveProps (nextProps,nextContext) {} 
    componentDidShow () {} 
    handleClick(e){
        this.setState({
            current:e
        })
        this.props.onTabsChange(e)
    }
    state={
        current:0
    }
    
    render() {
        return (
        <View className="order-container">
            <AtTabs
                className="tabs"
                current={this.state.current}
                scroll={this.props.scroll}
                tabList={this.props.config}
                onClick={(e) => this.handleClick(e)}>
                {
                    this.props.children
                }
                </AtTabs>
        </View>
        );
    }
}
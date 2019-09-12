import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import { AtToast } from "taro-ui"
export default class Index extends Component {
    state={
        opened:false
    }
    static defaultProps = {
        duration:3000
    }
    componentWillReceiveProps(nextProps){
        const { isOpened ,duration } = nextProps
        if(isOpened){
            this.setState({
                opened:isOpened
            },() =>{
                this.timer = setTimeout(() => {
                    this.setState({
                        opened:false
                    },() =>{
                        console.log(this.state.opened)
                        clearTimeout(this.timer)
                    })
                    console.log(1111)
                },duration)
            })
        }
        
    }
    componentWillMount () {}
    componentDidMount () {} 
    componentDidShow () {} 
    render() {
        console.log(this.state.opened)
        const {isOpened,text,icon,image ,duration ,status} = this.props;
        return (
            <AtToast isOpened={this.state.opened} text={text} image={image} status={status}  icon={icon} duration={duration} hasMask={true}></AtToast>
        );
    }
}
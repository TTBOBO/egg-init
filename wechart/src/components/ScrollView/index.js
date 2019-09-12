import Taro , { Component } from '@tarojs/taro';
import { ScrollView } from '@tarojs/components';
import '../../assets/base.scss';
export default class Index extends Component {


    state={
        currentIndex:0
    }
    defaultProps = {
        scrollY:true,
        scrollX:true,
        scrollTop:'0',
        scrollLeft:'0',
        upperThreshold:'50',
        lowerThreshold:'50',
        height:200,
        onScrollToUpper:() => {},
        onScrollToLower:() => {}
    }

    componentWillMount () {}
    componentDidMount () {} 
    componentWillReceiveProps (nextProps,nextContext) {} 
    componentDidShow () {} 
    onScroll(){

    }
    onScrollToUpper(){
        this.props.onScrollToUpper && this.props.onScrollToUpper();
    }
    onScrollToLower(){
        this.setState({
            currentIndex:this.state.currentIndex++
        },() =>{
            this.props.onScrollToLower && this.props.onScrollToLower(this.state.currentIndex);
        })
    }
    reload(){
        this.setState({
            currentIndex:0
        })
    }
    render() {
        const {scrollTop, scrollY, scrollX ,scrollLeft,height,upperThreshold,lowerThreshold} = this.props;
        
        return (
            <ScrollView
                className='scrollview'
                scrollY = {scrollY}
                scrollX = {scrollX}
                scrollWithAnimation
                scrollTop={scrollTop}
                scrollLeft={scrollLeft}
                style={{height:`${height}px`}}
                lowerThreshold={lowerThreshold}
                upperThreshold={upperThreshold}
                onScrollToUpper={() => this.onScrollToUpper()}
                onScrollToLower={() => this.onScrollToLower()}
                onScroll={() => this.onScroll()}>
                {this.props.children}
            </ScrollView>
        );
    }
}
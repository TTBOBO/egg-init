import * as type from '../constant/type';
import util from '../../assets/js/util';


export const infoMutations = {
    //退出登录
    [type.LOGINOUT](state,params){
        console.log(params);
        util.clearLocalStorage();
        //执行 退出登录 操作
    }


}
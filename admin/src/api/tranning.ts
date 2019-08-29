import { Api } from '@/views/modules/api';
import axios from '@/api/axios'
import { TrainingPlatform } from '@/views/modules/task';
import Crs = TrainingPlatform.Crs

const tranning: any = {

    // crs start
    /**
     * 获取Crs资源
     */
    GetCrsResource(p: { set: string }) {
        return axios.get<any>('/v1/crs/resource', {
            params: p,
        })
    },

    /**
       * 获取创建任务示例
       */
    getQuota(p: any) {
        return axios.get<any>('/v1/crs/quota', {
            params: p
        })
    },

    /**
     * 获取crs的set选项
     */
    GetCrsSetOpts() {
        return axios.get('/v1/crs/sets', {
            params: {
                // timestamp: new Date().getTime()
            },
            //   baseURL: '' // 静态文件无需前缀
        })
    },

    GetCrsCephs(p: any) {
        return axios.get('/v1/crs/cephs', {
            params: p
        })
    },

    /**
     * 获取crs ContainerImageOpt
     */
    GetCrsContainerImageOpts() {
        ///static/index/data/crs/containerImage.json
        return axios.get('/v1/crs/images', {
            params: {
                // timestamp: new Date().getTime()
            },
            // baseURL: '' // 静态文件无需前缀
        })
    },

    /**
     * 获取crs ContainerImageOpt
     */
    GetCrsStatusOpts() {
        return axios.get<any>('/static/index/data/crs/status.json', {
            params: {
                timestamp: new Date().getTime()
            },
            baseURL: '' // 静态文件无需前缀
        })
    },


    //qq飞车 start

    /**
     * 获取可用客户端数
     */
    getAvailClientNum(p: { client_version: string }) {
        return axios.get<Crs.GetAvailClientNum>('/v1/qsm/avail_client_num', {
            params: p
        })
    },

    /**
     * 获取QSM的ClientVersion选项
     */
    GetQSMClientVersionOpts() {
        return axios.get<Crs.QsmClientVersionOpt>('/static/index/data/qsm/client_version.json', {
            params: {
                timestamp: new Date().getTime()
            },
            baseURL: '' // 静态文件无需前缀
        })
    },

    /**
    * 获取飞车客户端数信息
    */
    getQsmClientInformation(p: { job_id: string }) {
        return axios.get<any>('/v1/qsm/train/client_information', {
            params: p
        })
    },


    /**
   * 获取可用客户端数
   */
    getppkartAvailClientNum(p: { client_version: string }) {
        return axios.get<Crs.GetAvailClientNum>('/v1/ppkart/avail_client_num', {
            params: p
        })
    },

    /**
   * 获取可用客户端数
   */
    getpubgAvailClientNum(p: { client_version: string }) {
        return axios.get<Crs.GetAvailClientNum>('/v1/pubg/avail_client_num', {
            params: p
        })
    },

    /**
    * 创建任务
    */
    CreateCrsTask(p: Crs.CrsTask) {
        return axios.post<Crs.CreateCrsTask>('/v1/qsm/train/create_job', p)
    },

    /**
   * 批量创建任务
   */
    CreateCrsTasks(p: any) {
        return axios.post('/v1/qsm/train/batch_create_jobs', p)
    },

    /**
     * 获取创建任务示例
     */
    getCrsTaskDemo() {
        return axios.get<any>('/v1/qsm/train/create_job_example')
    },

    /**
     * 获取飞车所有用户名
     */
    getQsmAllUser() {
        return axios.get<any>('/v1/qsm/train/search_user_names')
    },



    /**
   * 获取创建任务示例
   */
    getCrsTaskDemos() {
        return axios.get<any>('/v1/qsm/train/batch_create_jobs_example')
    },


    getCrsTaskList(p: { sort_type: string, sort_by: string, page: number, size: number, status: string }) {
        return axios.get<any>('/v1/qsm/train/jobs_information', {
            params: p
        })
    },


    /**
     * 获取Crs任务列表item
     */
    getCrsTaskView(p: { job_id: string }) {
        return axios.get<any>('/v1/qsm/train/create_job_data', {
            params: p
        })
    },

    getQsmPool() {
        return axios.get<any>('/v1/qsm/client_pool_type', {})
    },

    /**
   * 列表点击事件
   */
    serviceUrl(p: any) {
        return axios.get('/v1/qsm/train/service_url', {
            params: p
        })
    },

    /**
     * 更新任务状态
     */
    updateJobs(p: any) {
        return axios.post('/v1/qsm/train/update_jobs', p)
    },

    deleteJobs(p: any) {
        return axios.post('/v1/qsm/train/delete_jobs', p)
    },

    //创建tensorboard
    createdTensorboard(p: any) {
        return axios.post('/v1/qsm/train/create_tensorboard', p)
    },


    /**
    * 列表点击事件
    */
    getStates(p: any) {
        return axios.get('/v1/qsm/train/kibana', {
            params: p
        })
    },

    //删除tensorboard
    deleteTensorboard(p: any) {
        return axios.post('/v1/qsm/train/delete_tensorboard', p)
    },


    /**
     * 终止Crs任务
     */
    delTask(p: { job_ids: string }) {
        return axios.post<Api.MessageBase>('/v1/qsm/train/kill_jobs', p)
    },

    /**
    * 断开客户端
    */
    decClientTask(p: { job_ids: string }) {
        return axios.post<Api.MessageBase>('/v1/qsm/train/disconnect_clients', p)
    },


    // 火影 start
    /**
     * 获取火影客户端数信息
     */
    getKihanClientInformation(p: { job_id: string }) {
        return axios.get<any>('/v1/kihan/train/client_information', {
            params: p
        })
    },

    /**
     * 获取火影可用客户端数
     */
    getKiHanAvailClientNum(p: { client_version: string }) {
        return axios.get<Crs.GetAvailClientNum>('/v1/kihan/avail_client_num', {
            params: p
        })
    },




    /**
    * 创建火影任务
    */
    CreateKihanTask(p: Crs.CrsTask) {
        return axios.post<any>('/v1/kihan/train/create_job', p)
    },
    /**
    * 批量创建火影任务
    */
    CreateKihanTasks(p: any) {
        return axios.post('/v1/kihan/train/batch_create_jobs', p)
    },



    /**
   * 获取火影所有用户名
   */
    getKiHanAllUser() {
        return axios.get<any>('/v1/kihan/train/search_user_names')
    },


    /**
     * 获取创建任务示例
     */
    getKiHanTaskDemo() {
        return axios.get<any>('/v1/kihan/train/create_job_example')
    },

    /**
   * 获取创建任务示例
   */
    getKiHanTaskDemos() {
        return axios.get<any>('/v1/kihan/train/batch_create_jobs_example')
    },


    getKihanPool() {
        return axios.get<any>('/v1/kihan/client_pool_type', {})
    },




    /**
     * 获取kihan任务列表
     */
    getKiHanTaskList(p: { sort_type: string, sort_by: string, page: number, size: number, self_status: string, op_status: string }) {
        return axios.get<any>('/v1/kihan/train/jobs_information', {
            params: p
        })
    },


    /**
     * 获取kihan任务列表item
     */
    getkihanTaskView(p: { job_id: string }) {
        return axios.get<any>('/v1/kihan/train/create_job_data', {
            params: p
        })
    },

    /**
     * 获取Crs任务列表item
     */
    getKiHanTaskView(p: { job_id: string }) {
        return axios.get<any>('/v1/kihan/train/create_job_data', {
            params: p
        })
    },




    /**
    * kihan列表点击事件
    */
    kihanserviceUrl(p: any) {
        return axios.get('/v1/kihan/train/service_url', {
            params: p
        })
    },



    /**
     * 终止火影任务
     */
    delKiHanTask(p: { job_ids: string }) {
        return axios.post<Api.MessageBase>('/v1/kihan/train/kill_jobs', p)
    },
    //创建tensorboard
    createdKiHanTensorboard(p: any) {
        return axios.post('/v1/kihan/train/create_tensorboard', p)
    },



    /**
     * 断开火影客户端
     */
    decKiHanClientTask(p: { job_ids: string }) {
        return axios.post<Api.MessageBase>('/v1/kihan/train/disconnect_clients', p)
    },



    // 跑跑卡丁车 start
    /**
     * 获取Crs任务列表item
     */
    getppkartCrsTaskView(p: { job_id: string }) {
        return axios.get<any>('/v1/ppkart/train/create_job_data', {
            params: p
        })
    },
    /**
     * 获取创建任务示例
     */
    getppkartCrsTaskDemos() {
        return axios.get<any>('/v1/ppkart/train/batch_create_jobs_example')
    },

    /**
     * 获取创建任务示例
     */
    getppkartCrsTaskDemo() {
        return axios.get<any>('/v1/ppkart/train/create_job_example')
    },

    /**
     * 创建任务
     */
    CreateppkartCrsTask(p: Crs.CrsTask) {
        return axios.post<Crs.CreateCrsTask>('/v1/ppkart/train/create_job', p)
    },

    /**
     * 批量创建任务
     */
    CreateppkartCrsTasks(p: any) {
        return axios.post('/v1/ppkart/train/batch_create_jobs', p)
    },

    getppkartPool() {
        return axios.get<any>('/v1/ppkart/client_pool_type', {})
    },
    //创建tensorboard
    created_ppkart_Tensorboard(p: any) {
        return axios.post('/v1/ppkart/train/create_tensorboard', p)
    },

    // 光鸡射击 start
    /**
     * 获取Crs任务列表item
     */
    getpubgCrsTaskView(p: { job_id: string }) {
        return axios.get<any>('/v1/pubg/train/create_job_data', {
            params: p
        })
    },
    /**
     * 获取创建任务示例
     */
    getpubgCrsTaskDemos() {
        return axios.get<any>('/v1/pubg/train/batch_create_jobs_example')
    },

    /**
     * 获取创建任务示例
     */
    getpubgCrsTaskDemo() {
        return axios.get<any>('/v1/pubg/train/create_job_example')
    },

    /**
     * 创建任务
     */
    CreatepubgCrsTask(p: Crs.CrsTask) {
        return axios.post<Crs.CreateCrsTask>('/v1/pubg/train/create_job', p)
    },

    /**
     * 批量创建任务
     */
    CreatepubgCrsTasks(p: any) {
        return axios.post('/v1/pubg/train/batch_create_jobs', p)
    },

    getpubgPool() {
        return axios.get<any>('/v1/pubg/client_pool_type', {})
    },
    //创建tensorboard
    created_pubg_Tensorboard(p: any) {
        return axios.post('/v1/pubg/train/create_tensorboard', p)
    },

}

export default tranning;

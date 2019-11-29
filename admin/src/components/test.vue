<template>
  <div id="demo">
    <el-dialog title="查看任务"
               :visible.sync="dialogTaskViewVisible"
               width="60vw">
      <!-- <Custom-table ref="customtable" @rowClick="rowClick" @test="test" :optionData="optionData" @info="info">
                <template slot="job_id" slot-scope="props">
                     {{props.row.job_eval_params.eval_episode}}
                </template>
                <template slot="eval_episode" slot-scope="props">
                     {{props.row.job_eval_params.eval_episode}}
                </template>
                <template slot="eval_level_count" slot-scope="props">
                     {{props.row.job_eval_params.eval_level_count}}
                </template>
                <template slot="min_model_prob" slot-scope="props">
                     {{props.row.job_eval_params.min_model_prob}}
                </template>
                <template slot="model_path" slot-scope="props">
                     {{props.row.task_type == 2 ? props.row.model_detail.models[0].model_path: props.row.model_detail.model_path }}
                </template>
                <template slot="work_path" slot-scope="props">
                     {{props.row.tenc_detail.serviceInfo.containers[0].variables[1].value}}
                </template>
                 <template slot="game_client_args" slot-scope="props">
                     {{props.row.job_eval_params.game_client_args}}
                </template>
            </Custom-table> -->
      <!-- <test2></test2> -->
      <!-- <CustomForm ref="form2"  @changeData="changeData" :optionData="addOption">
                    <template slot="face3" slot-scope="props">
                        <el-form-item prop="face3" :rules="props.rule[0]">
                            <el-select v-model="props.data['face3']" placeholder="请选择内容">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </template>
             </CustomForm> -->

      <!-- <Tree :treeData="department" @checkchange="checkchange" :defaultKey="defaultkey"></Tree> -->
      <!-- <Transfer :button_text="button_text" :defaultCheckedKeys="[2]" :title="title" :from_data='fromData' :defaultProps="{label:'name',children:'children'}" :to_data='toData' @addBtn='add' @removeBtn='remove' :mode='mode' height='540px' filter open-all></Transfer> -->
      <Transfers :button_text="button_text"
                 :defaultCheckedKeys="[2]"
                 :title="title"
                 :from_data='fromData'
                 :defaultProps="{label:'name',children:'children'}"
                 :to_data='toData'
                 @addBtn='add'
                 @delBtn='remove'
                 :mode='mode'
                 height='540px'
                 filter
                 open-all>
      </Transfers>
      <!-- <configTable @addColum="addColum"></configTable> -->
      <div id="echart"
           style="width:100%;height:500px;"></div>
      <!-- <div id="echart1" style="width:100%;height:500px;"></div>
            <div id="echart2" style="width:100%;height:500px;"></div>
            <div id="echart3" style="width:100%;height:500px;"></div>
            <div id="echart4" style="width:100%;height:500px;"></div>
            <div id="echart5" style="width:100%;height:500px;"></div>
            <div id="echart6" style="width:100%;height:500px;"></div> -->
    </el-dialog>

  </div>
</template>

<script>
// import data from '../mahjong/test';
// import data1 from '../mahjong/test';
import Transfers from './transfers'
// const data = [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60],["2000-07-25",44],["2000-07-26",127],["2000-07-27",114],["2000-07-28",86],["2000-07-29",73],["2000-07-30",52],["2000-07-31",69],["2000-08-01",86],["2000-08-02",118],["2000-08-03",56],["2000-08-04",91],["2000-08-05",121],["2000-08-06",127],["2000-08-07",78],["2000-08-08",79],["2000-08-09",46],["2000-08-10",108],["2000-08-11",80],["2000-08-12",79],["2000-08-13",69],["2000-08-14",80],["2000-08-15",105],["2000-08-16",119],["2000-08-17",105],["2000-08-18",55],["2000-08-19",74],["2000-08-20",41],["2000-08-21",62],["2000-08-22",104],["2000-08-23",118],["2000-08-24",121],["2000-08-25",126],["2000-08-26",99],["2000-08-27",92],["2000-08-28",75],["2000-08-29",91],["2000-08-30",94],["2000-08-31",69],["2000-09-01",93],["2000-09-02",124],["2000-09-03",120],["2000-09-04",93],["2000-09-05",26],["2000-09-06",32],["2000-09-07",70],["2000-09-08",89],["2000-09-10",117],["2000-09-11",144],["2000-09-12",111],["2000-09-13",120],["2000-09-14",97],["2000-09-15",108],["2000-09-17",74],["2000-09-18",105],["2000-09-19",127],["2000-09-20",143],["2000-09-21",62],["2000-09-22",80],["2000-09-23",136],["2000-09-24",29],["2000-09-25",91],["2000-09-26",93],["2000-09-27",114],["2000-09-28",45],["2000-09-29",102],["2000-09-30",111],["2000-10-01",93],["2000-10-02",117],["2000-10-03",78],["2000-10-04",76],["2000-10-05",100],["2000-10-06",75],["2000-10-07",169],["2000-10-08",59],["2000-10-09",89],["2000-10-10",91],["2000-10-11",75],["2000-10-12",28],["2000-10-13",47],["2000-10-14",92],["2000-10-16",72],["2000-10-17",149],["2000-10-18",86],["2000-10-19",88],["2000-10-20",104],["2000-10-21",91],["2000-10-22",88],["2000-10-23",55],["2000-10-24",63],["2000-10-25",41],["2000-10-26",85],["2000-10-27",99],["2000-10-28",121],["2000-10-29",96],["2000-10-30",90],["2000-11-01",80],["2000-11-02",116],["2000-11-03",207],["2000-11-04",306],["2000-11-05",283],["2000-11-06",200],["2000-11-07",93],["2000-11-08",49],["2000-11-09",78],["2000-11-10",40],["2000-11-11",74],["2000-11-12",67],["2000-11-13",118],["2000-11-14",196],["2000-11-15",101],["2000-11-16",59],["2000-11-17",83],["2000-11-18",83],["2000-11-19",124],["2000-11-20",57],["2000-11-21",78],["2000-11-22",113],["2000-11-23",172],["2000-11-24",129],["2000-11-25",103],["2000-11-26",75],["2000-11-27",125],["2000-11-28",121],["2000-11-29",204],["2000-11-30",141],["2000-12-01",106],["2000-12-02",146],["2000-12-03",95],["2000-12-04",149],["2000-12-05",71],["2000-12-07",157],["2000-12-08",141],["2000-12-09",197],["2000-12-10",43],["2000-12-11",81],["2000-12-12",109],["2000-12-13",118],["2000-12-15",115],["2000-12-16",92],["2000-12-17",123],["2000-12-18",147],["2000-12-19",59],["2000-12-20",103],["2000-12-21",146],["2000-12-22",137],["2000-12-23",74],["2000-12-24",64],["2000-12-25",67],["2000-12-26",107],["2000-12-27",101],["2000-12-28",79],["2000-12-29",137],["2000-12-30",165],["2000-12-31",81],["2001-01-01",100],["2001-01-02",126],["2001-01-03",56],["2001-01-05",108],["2001-01-06",88],["2001-01-07",78],["2001-01-08",105],["2001-01-09",77],["2001-01-10",105],["2001-01-11",93],["2001-01-12",107],["2001-01-13",128],["2001-01-14",53],["2001-01-15",81],["2001-01-16",128],["2001-01-17",179],["2001-01-18",225],["2001-01-19",116],["2001-01-20",153],["2001-01-21",161],["2001-01-22",149],["2001-01-23",115],["2001-01-24",136],["2001-01-25",101],["2001-01-26",109],["2001-01-27",108],["2001-01-28",86],["2001-01-29",101],["2001-01-30",109],["2001-01-31",139],["2001-02-01",110],["2001-02-02",113],["2001-02-03",130],["2001-02-04",62],["2001-02-05",88],["2001-02-06",105],["2001-02-07",87],["2001-02-08",140],["2001-02-09",116],["2001-02-10",100],["2001-02-11",83],["2001-02-12",102],["2001-02-13",106],["2001-02-14",157],["2001-02-15",131],["2001-02-16",77],["2001-02-17",101],["2001-02-18",148],["2001-02-19",227],["2001-02-20",105],["2001-02-21",155],["2001-02-22",293],["2001-02-23",99],["2001-02-24",57],["2001-02-25",97],["2001-02-26",104],["2001-02-27",117],["2001-02-28",125],["2001-03-01",216],["2001-03-02",149],["2001-03-03",256],["2001-03-04",172],["2001-03-05",113],["2001-03-06",338],["2001-03-07",57],["2001-03-08",48],["2001-03-10",111],["2001-03-11",87],["2001-03-12",175],["2001-03-13",186],["2001-03-14",201],["2001-03-15",76],["2001-03-16",131],["2001-03-17",127],["2001-03-18",128],["2001-03-19",152],["2001-03-20",144],["2001-03-21",162],["2001-03-22",500],["2001-03-24",358],["2001-03-25",128],["2001-03-26",54],["2001-03-27",57],["2001-03-28",54],["2001-03-29",80],["2001-03-30",71],["2001-03-31",73],["2001-04-01",139],["2001-04-02",224],["2001-04-03",107],["2001-04-04",150],["2001-04-05",180],["2001-04-06",77],["2001-04-07",95],["2001-04-08",194],["2001-04-09",143],["2001-04-10",205],["2001-04-11",129],["2001-04-12",64],["2001-04-13",61],["2001-04-14",79],["2001-04-15",121],["2001-04-16",130],["2001-04-17",150],["2001-04-18",205],["2001-04-19",154],["2001-04-20",81],["2001-04-21",140],["2001-04-22",119],["2001-04-23",156],["2001-04-24",72],["2001-04-25",108],["2001-04-26",124],["2001-04-27",94],["2001-04-28",157],["2001-04-29",100],["2001-04-30",158],["2001-05-01",277],["2001-05-02",332],["2001-05-03",303],["2001-05-04",238],["2001-05-05",500],["2001-05-06",99],["2001-05-07",93],["2001-05-08",104],["2001-05-09",74],["2001-05-10",68],["2001-05-11",90],["2001-05-12",114],["2001-05-13",142],["2001-05-14",126],["2001-05-15",185],["2001-05-16",402],["2001-05-17",189],["2001-05-17",189],["2001-05-17",189],["2001-05-18",112],["2001-05-19",137],["2001-05-20",158],["2001-05-21",158],["2001-05-22",116],["2001-05-23",132],["2001-05-24",110],["2001-05-25",82],["2001-05-26",56],["2001-05-27",54],["2001-05-28",71],["2001-05-29",101],["2001-05-30",57],["2001-05-31",88],["2001-06-01",99],["2001-06-02",84],["2001-06-03",139],["2001-06-04",132],["2001-06-05",141],["2001-06-07",159],["2001-06-08",131],["2001-06-09",180],["2001-06-10",164],["2001-06-11",134],["2001-06-12",163],["2001-06-13",105],["2001-06-14",74],["2001-06-15",50],["2001-06-16",60],["2001-06-17",82],["2001-06-18",111],["2001-06-19",89],["2001-06-20",81],["2001-06-21",76],["2001-06-22",70],["2001-06-23",74],["2001-06-24",99],["2001-06-25",91],["2001-06-26",113],["2001-06-27",93],["2001-06-28",69],["2001-06-29",74],["2001-06-30",75],["2001-07-01",108],["2001-07-02",115],["2001-07-03",86],["2001-07-04",67],["2001-07-05",68],["2001-07-06",74],["2001-07-07",69],["2001-07-08",95],["2001-07-09",99],["2001-07-10",92],["2001-07-11",84],["2001-07-12",77],["2001-07-13",69],["2001-07-14",62],["2001-07-15",83],["2001-07-16",101],["2001-07-17",98],["2001-07-18",89],["2001-07-19",82],["2001-07-20",105],["2001-07-21",79],["2001-07-22",48],["2001-07-23",119],["2001-07-24",126],["2001-07-25",44],["2001-07-26",42],["2001-07-27",86],["2001-07-28",68],["2001-07-29",93],["2001-07-30",89],["2001-07-31",76],["2001-08-01",54],["2001-08-02",53],["2001-08-03",35],["2001-08-04",65],["2001-08-05",108],["2001-08-06",114],["2001-08-07",90],["2001-08-08",63],["2001-08-09",79],["2001-08-10",102],["2001-08-11",100],["2001-08-12",107],["2001-08-13",81],["2001-08-14",79],["2001-08-15",116],["2001-08-16",98],["2001-08-17",96],["2001-08-18",94],["2001-08-19",63],["2001-08-20",39],["2001-08-21",81],["2001-08-22",73],["2001-08-23",66],["2001-08-24",52],["2001-08-25",64],["2001-08-26",61],["2001-08-27",83],["2001-08-28",85],["2001-08-29",99],["2001-08-30",97],["2001-08-31",93],["2001-09-01",86],["2001-09-02",105],["2001-09-03",98],["2001-09-04",109],["2001-09-05",92],["2001-09-06",68],["2001-09-07",92],["2001-09-08",72],["2001-09-09",64],["2001-09-10",88],["2001-09-11",97],["2001-09-12",102],["2001-09-13",103],["2001-09-14",120],["2001-09-15",94],["2001-09-16",95],["2001-09-17",93],["2001-09-18",56],["2001-09-19",98],["2001-09-20",81],["2001-09-21",100],["2001-09-22",75],["2001-09-23",84],["2001-09-24",91],["2001-09-25",70],["2001-09-26",96],["2001-09-27",128],["2001-09-28",92],["2001-09-29",107],["2001-09-30",95],["2001-10-01",63],["2001-10-02",115],["2001-10-03",69],["2001-10-04",47],["2001-10-05",86],["2001-10-06",122],["2001-10-07",104],["2001-10-08",122],["2001-10-09",49],["2001-10-10",36],["2001-10-11",83],["2001-10-12",107],["2001-10-13",126],["2001-10-14",126],["2001-10-15",78],["2001-10-16",72],["2001-10-17",76],["2001-10-18",87],["2001-10-19",143],["2001-10-20",259],["2001-10-21",183],["2001-10-22",276],["2001-10-23",232],["2001-10-24",167],["2001-10-25",105],["2001-10-26",129],["2001-10-27",140],["2001-10-28",61],["2001-10-29",85],["2001-10-30",155],["2001-11-01",38],["2001-11-02",106],["2001-11-03",134],["2001-11-04",57],["2001-11-05",51],["2001-11-06",68],["2001-11-07",129],["2001-11-08",158],["2001-11-09",85],["2001-11-10",121],["2001-11-11",161],["2001-11-12",94],["2001-11-13",58],["2001-11-14",57],["2001-11-15",71],["2001-11-16",105],["2001-11-17",66],["2001-11-18",117],["2001-11-19",87],["2001-11-20",88],["2001-11-21",131],["2001-11-22",151],["2001-11-23",310],["2001-11-24",161],["2001-11-25",23],["2001-11-26",52],["2001-11-27",82],["2001-11-28",128],["2001-11-29",115],["2001-11-30",63],["2001-12-02",102],["2001-12-03",96],["2001-12-04",107],["2001-12-05",89],["2001-12-06",59]];
export default {
  name: 'Test',
  data () {
    return {
      option: {},
      button_text: [],
      mode: 'transfer',
      fromData: [
        {
          id: 1,
          pid: 0,
          name: '测试左侧',
          children: [
            {
              id: 2,
              pid: 1,
              name: '水电费是打发斯蒂芬斯蒂芬gas噶水电费噶地方死光光',
              children: []
            },
            {
              id: 3,
              pid: 1,
              name: '11-3',
              children: []
            },
            {
              id: 4,
              pid: 1,
              name: '11-4',
              children: [
                {
                  id: 5,
                  pid: 4,
                  name: '11-5',
                  children: [
                    {
                      id: 111,
                      pid: 5,
                      name: '11-111'
                    }
                  ]
                },
                {
                  id: 6,
                  pid: 4,
                  name: '11-6',
                  children: []
                }
              ]
            }
          ]
        }
      ], // 穿梭框 - 源数据 - 树形
      toData: [
        // {
        //     id: 1,
        //     pid: 0,
        //     name: "测试左侧",
        //     children: [
        //         {
        //             id: 2,
        //             pid: 1,
        //             name: "水电费是打发斯蒂芬斯蒂芬gas噶水电费噶地方死光光",
        //             children: []
        //         }
        //     ]
        // }
      ], // 穿梭框 - 目标数据 - 树形
      options: [
        { value: '选项1', label: '双皮奶1' },
        { value: '选项2', label: '双皮奶2' },
        { value: '选项3', label: '双皮奶3' },
        { value: '选项4', label: '双皮奶4' },
        { value: '选项5', label: '双皮奶5' },
      ],
      dialogTaskViewVisible: true,
      optionData: {
        baseUrl: 'jawen',
        border: false,
        tableLoadIcon: true,
        primary: 'job_id',
        toolEventWidth: '200px',
        showhideColumn: true,
        // showhideCol:true,
        // selection: true,
        dbEdit: true,
        search: {
          type: 'desc',   // 排序类型 desc  asc
          sort: 'job_id',  //排序字段
          page: 1,  //页数
          size: 10,  //每页多少条
          user_name: 'loongzhang'
        },
        columns: [
          { lable: '', value: 'job_id', type: 'expand', search: '', tooltip: true, tipAlign: 'right', resizable: true, scoped: true },
          { lable: '评估job名', value: 'job_name', type: '', search: '', tooltip: true, tipAlign: 'right', resizable: true, width: 80, dbclick: true },
          // {value: "user_name",lable: "评估用户名",type: "",search: "",tooltip: true,tipAlign: "right",resizable: true,width:100},
          { value: 'buz_id', lable: '评估任务类型', type: 'select', search: '', tooltip: true, tipAlign: 'right', resizable: true, width: 100, selectOPtion: { 2: 'qqspeed', 3: 'kihan' } },
          { value: 'task_type', lable: '任务类型', type: 'select', search: '', tooltip: true, tipAlign: 'right', resizable: true, width: 80, selectOPtion: { 1: '监控', 2: '一次性', 3: '长期监控' } },
          { value: 'status', lable: '飞象运行状态', type: 'select', search: '', tooltip: true, tipAlign: 'right', resizable: true, width: 130, selectOPtion: { 0: 'NOEXIST', 1: 'WAITING', 2: 'RUNNING', 3: 'TERMINATED' } },
          { value: 'eval_episode', lable: '模型结束episode', type: '', search: '', tooltip: true, tipAlign: 'right', resizable: true, scoped: true },
          { value: 'eval_level_count', lable: '模型等级数', type: '', search: '', tooltip: true, tipAlign: 'right', resizable: true, scoped: true, width: 90 },
          { value: 'min_model_prob', lable: '模型最小概率', type: '', search: '', tooltip: true, tipAlign: 'right', resizable: true, scoped: true, width: 100 },
          { value: 'model_path', lable: '模型所在路径', type: '', search: '', tooltip: true, tipAlign: 'right', resizable: true, scoped: true, width: 100 },
          // {value: "model_version",lable: "评估模型版本号",type: "",search: "",tooltip: true,tipAlign: "right",resizable: true},
          { value: 'work_path', lable: '代码目录', type: '', search: '', tooltip: true, tipAlign: 'right', resizable: true, scoped: true, width: 90 },
          { value: 'game_client_args', lable: '客户端参数', type: '', search: '', tooltip: true, tipAlign: 'right', resizable: true, scoped: true, width: 90, dbclick: true },
        ],
        toolEvent: [
          // { type: "primary", emit: "info", title: "详情"},
          { type: 'danger', emit: 'del', title: '删除' }
        ],
        topBtnGroup: [
          // { name: " 搜索", bgcolor: "primary", url: "", type: "search", icon: "ios-search", hasSel: 1, hasMore: "" },
          { name: '添加', bgcolor: 'primary', url: '/addTest', type: 'add', icon: 'plus', hasSel: 0, hasMore: '' },
          // { name: "批量删除", bgcolor: "warning", url: "/hmapi/api_goods/delete", type: "plDel", icon: "trash-b", hasSel: 1, hasMore: "more" },
        ]
      },
      optionData1: {
        tableLoadIcon: true,
        primary: 'job_id',
        selection: true,
        dbEdit: true,
        search: {
          sort: 'createdAt desc',
          sort_type: 'desc',
          sort_by: 'createdAt',
          status: 'All',
          page: 1,
          size: 5,
          user_name: 'Self'
        },
        columns: [
          { lable: 'job_id', value: 'job_id', type: '', search: 'job_id', tooltip: true, tipAlign: 'right', resizable: true },
          // {
          //     lable: "任务名称",
          //     value: "appModule",
          //     type: "",
          //     sort: true,
          //     dbclick: true
          // },
          // {
          //     lable: "任务名称111",
          //     value: "appModule",
          //     type: "",
          //     sort: true,
          //     search: "time",
          //     hidden: true
          // },
          { lable: '任务类型', value: 'game_type', type: 'img' },
          {
            lable: '创建时间',
            value: 'createdAt',
            search: 'createdAt',
            type: 'time',
            // scoped:true,
            render: (h, params) => {
              return h('div', [
                h(
                  'a',
                  {
                    style: {
                      marginRight: '5px',
                      color: 'red !important'
                    }
                  },
                  params.row[params.column['value']]
                )
              ]);
            }
          },
          // {
          //     lable: "状态",
          //     value: "status1",
          //     type: "select",
          //     search: "status1",
          //     selectOPtion: {
          //         1: "未发布",
          //         2: "已发布",
          //         3: "审核中",
          //         4: "审核失败"
          //     }
          // }
        ],
        toolEvent: [
          { type: 'edit', emit: 'test', title: '已发布', handStatus: { obj: 'status1', title: { 1: '未发布', 2: '已发布', 3: '审核中', 4: '审核失败' }, type: { 1: 'info', 2: 'success', 3: 'warning', 4: 'danger' } } }
        ],
        topBtnGroup: [
          { name: ' 搜索', bgcolor: 'primary', url: '', type: 'search', icon: 'ios-search', hasSel: 1, hasMore: '' },
          { name: '添加', bgcolor: 'primary', url: '/addTest', type: 'add', icon: 'plus', hasSel: 1, hasMore: '' },
          { name: '批量删除', bgcolor: 'warning', url: '/hmapi/api_goods/delete', type: 'plDel', icon: 'trash-b', hasSel: 1, hasMore: 'more' },
          { name: '导出表格', bgcolor: 'warning', url: '', type: 'export', icon: 'forward', hasSel: 1, hasMore: 'more' },
          { name: '导入表格', bgcolor: 'primary', url: '', type: 'import', icon: 'forward' }
        ]
      },
      addOption: {
        formList: [
          { field: 'userid', title: '注册用户名', value: '', validate: 'required', type: 'datetime', slotLabel: false, width: '100%' },
          { field: 'uname', title: '昵称', value: '', validate: 'required', type: 'input' },
          { field: 'sex', title: '性别', value: '', validate: 'required', type: 'select', option: { 0: '男', 1: '女' }, optionUrl: 'image', colKey: '', colName: '' },
          { field: 'rank', title: '等级', value: [], validate: 'required', type: 'datetimerange' },
          { field: 'email', title: '邮箱', value: '', validate: 'email', type: 'input' },
          { field: 'face', title: '头像', value: '', validate: 'required', type: 'checkbox', option: { 0: '男', 1: '女' } },
          { field: 'face1', title: '头像', value: '', validate: 'required', type: 'switch' },
          { field: 'face2', title: '头像2', value: '', validate: [/^[a-z]+$/, '请填写小写英文'], type: 'radio', option: { 0: '男', 1: '女' } },
          { field: 'face3', title: '头像3', value: '1', validate: 'required', type: '', scoped: true }
        ],
        infoUrl: '', //获取详情url
        addEditUrl: '/hmapi/member/api_member/update_or_add',
        validata: {},
        primaryKey: 'mid'
      },
      defaultkey: ['*'],
      department: [
        {
          departmentName: '测试1',
          departmentDesc: '盛达康网络',
          parentId: '',
          id: '594a28fb1c8652a01f0301'
        },
        {
          departmentName: '测试-一级子级',
          parentId: '594a28fb1c8652a01f0301',
          id: '594a3910202469941'
        },
        {
          departmentName: '测试-二级子级',
          parentId: '594a3910202469941',
          id: '594a391020246994asasd1'
        },
        {
          departmentName: '盛达康',
          departmentDesc: '盛达康网络',
          parentId: '',
          id: '594a28fb1c8652a01f030126'
        },
        {
          departmentName: '开发',
          parentId: '594a28fb1c8652a01f030126',
          id: '594a3910202469941c349d7c'
        },
        {
          departmentName: '运营',
          parentId: '594a28fb1c8652a01f030126',
          id: '594a4509202469941c349d7f'
        },
        {
          departmentName: '人事',
          parentId: '594a28fb1c8652a01f030126',
          id: '59522e3ef30415281805d39f'
        }
      ],
      arr: []
    }
  },
  computed: {
    title () {
      if (this.mode == 'transfer') {
        return ['源列表', '目标列表'];
      } else {
        return ['通讯录', '收件人', '抄送人', '密送人'];
      }
    }
  },
  render (h) {
    alert(1)
    return h('a', 123)
  },
  components: {
    Transfers
    // draggable
  },
  props: {
    // option:{
    //     type:Object,
    //     default:function(){
    //         return {
    //             a:1
    //         }
    //     }
    // }
  },
  methods: {

    info (params) {
      console.log(params)
    },
    // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
    changeMode () {
      if (this.mode == 'transfer') {
        this.mode = 'addressList';
      } else {
        this.mode = 'transfer';
      }
    },
    // 添加按钮
    add (fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log('fromData:', fromData);
      console.log('toData:', toData);
      console.log('obj:', obj);
    },
    // 移除按钮
    remove (fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log('fromData:', fromData);
      console.log('toData:', toData);
      console.log('obj:', obj);
    },
    // 自定义节点 仅树形结构支持
    renderContent (h, { node, data }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
                    </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
                    </el-button>
          </span>
        </span>
      );
    },

    rowClick (params) {
      console.log(params);
    },
    test (params) {
      console.log(params);
    },
    checkchange (data) {
      console.log(data);
    },
    changeData (data) {
      console.log(data)
      // this.data = Object.assign(this.data, data);
      // console.log(this.data);
    },
    reload () {
      console.log(this.option)
    },
    addColum (params) {
      let arr = [params];
      console.log(arr)
      this.$refs.customtable.addColumn(arr);
    },
    init () {
      this.option = {
        title: {
          text: 'Beijing AQI',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            // console.log(params)
            return '<div>ep_duration &nbsp;&nbsp;&nbsp;' + params[0].name + '&nbsp;' + params[0].value + '<br />' + '@timestamp pre 5' + '&nbsp;&nbsp;&nbsp;' + 'November 27th 2018' + '<br />' + 'minutes &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 03:10:00.000</div>';
          }
        },
        xAxis: {
          data: data.map(function (item) {
            return item[0];
          }),
          name: 'what emmmm',
          // nameLocation:"right",
          nameTextStyle: {
            align: 'right',
            padding: [0, 0, 0, 0],
            fontWeight: '600'
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          name: 'what emmmm',
          nameLocation: 'middle',
          nameTextStyle: {
            align: 'right',
            padding: [0, 0, 20, 0],
            fontWeight: '600'
          }
        },
        toolbox: {
          left: 'right',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            // restore: {},
            // saveAsImage: {}
          }
        },
        color: ['#ff0000'],
        dataZoom: [{
          // startValue: '2000-06-01',
          // endValue:"2001-08-22"
        }, {
          type: 'inside'
        }],
        series: {
          name: 'Beijing AQI',
          type: 'line',
          data: data.map(function (item) {
            return item[1];
          }),
          symbol: 'circle',
          symbolSize: 10,
          // hoverAnimation:false,
          smooth: true,
          itemStyle: {
            normal: {
              color: '#35a552',
              lineStyle: {
                color: '#35a552'
              },
            }

          }
        }
      }
      this.$nextTick(() => {
        const myChart = echarts.init(document.getElementById('echart'));
        myChart.setOption(this.option)
        this.resize(myChart);
        // setInterval(() =>{
        //     this.arr.push(...data1);
        //     this.option.xAxis.data = this.arr.map(item => item[0] );
        //     this.option.series.data = this.arr.map(item => item[1] );
        //     myChart.setOption(this.option)
        // },5000)
      })
    },
    resize (myChart) {
      var that = this;
      myChart.on('click', function () {
        // console.log(params)\
        if (!that.arr) {
          that.arr = [];
        }

        that.arr.push(...data1);
        that.option.xAxis.data = that.arr.map(item => item[0]);
        that.option.series.data = that.arr.map(item => item[1]);
        myChart.setOption(that.option)
        // console.log(data[startValue])
      })
    }
  },
  mounted () {
    this.init();
    setTimeout(() => {
      // let form1 = this.$refs['form1'];
      // form1.validate();
      // form2.validate();
      // form1.resetFields();
    }, 1000)
    setTimeout(() => {
      // let form1 = this.$refs['form1'];
      // form1.validate();
      // form1.resetFields();
      // form2.resetFields();
    }, 5000)

    // setTimeout(() => {
    //     let arr = [{value: "user_name",lable: "评估用户名111",type: "",search: "user_name",tooltip: true,tipAlign: "right",resizable: true,width:100,dbclick:true},];
    //     this.$refs.customtable.addColumn(arr);
    //     let buttonItem = { name: "批量删除", bgcolor: "warning", url: "/hmapi/api_goods/delete", type: "plDel", icon: "trash-b", hasSel: 0, hasMore: "more" };
    //     this.$refs.customtable.addTopButton(buttonItem);
    //     let toolBut = { type: "primary", emit: "info", title: "详情"};
    //     this.optionData.toolEvent.push(toolBut);
    // },2000)
  },
  created () {
    // console.log(this.$options)
  }
}
</script>

<style>
</style>

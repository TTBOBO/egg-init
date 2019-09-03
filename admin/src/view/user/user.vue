<template>
  <div class="container">
    <CustomTable ref="customTable"
                 :optionData="tableOption"
                 @info="info"></CustomTable>
    <el-dialog title="用户地址"
               :visible.sync="showAddress"
               width="800px">
      <CustomTable ref="addressTable"
                   :optionData="addressOption"
                   v-if="showAddress">
        <template slot-scope="props"
                  slot="isDefault">
          <span class="circular"
                :style="{background:props.row.isDefault === 'is' ?'#409eff':'#909399'}"></span>
          {{props.column.selectOPtion[props.row.isDefault]}}
        </template>
      </CustomTable>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="showAddress = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CustomTable from '@/components/CustomTable';
export default {
  data () {
    return {
      showAddress: false,
      tableOption: {
        baseUrl: "user_list",
        toolEventWidth: "200px",
        initheight: true,
        search: {
          page: 1,  //页数
          size: 10,  //每页多少条
        },
        columns: [
          { lable: "用户id", value: "id", type: "", search: "", tooltip: true, tipAlign: "right", },
          { lable: "创建时间", value: "createdTime", type: "", search: "", tooltip: true, tipAlign: "right", sort: 'custom', sortOrder: 'desc' },
          { lable: "用户名", value: "nickName", type: "", search: "nickName", tooltip: true, tipAlign: "right" },
          { lable: "用户头像", value: "authorPic", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "手机号", value: "phone", type: "", search: "phone", tooltip: true, tipAlign: "right" },
        ],
        toolEvent: [{ type: "primary", emit: "info", title: "地址列表" }],
        topBtnGroup: [
          // { name: "查看任务配置", bgcolor: "primary", emit:"viewTask", icon: "plus", hasSel: 1, hasMore: ''},
          // { name: "复制任务配置", bgcolor: "primary", emit:"cloneTask", icon: "plus", hasSel: 1, hasMore: "",noloading:true },
          // { name: "终止任务", bgcolor: "warning", emit:"delTask", icon: "plus", hasSel: 1, hasMore: 'more'},
          // { name: "断开客户端", bgcolor: "warning", emit:"decClientTask", icon: "plus", hasSel: 1, hasMore: "more",noloading:true },
        ]
      },
      addressOption: {
        baseUrl: "address_list",
        toolEventWidth: "200px",
        initheight: true,
        hiddenPage: true,
        search: {
          page: 1,  //页数
          size: 1000,  //每页多少条
        },
        columns: [
          { lable: "联系电话", value: "phone", type: "", search: "", tooltip: true, tipAlign: "right", },
          { lable: "联系人", value: "linkMan", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "是否默认", value: "isDefault", type: "", search: "", tooltip: true, tipAlign: "right", selectOPtion: { is: "是", no: "否" }, scoped: true },
          { lable: "地址", value: "address", type: "", search: "", tooltip: true, tipAlign: "right" },
          { lable: "性别", value: "sex", type: "select", search: "", tooltip: true, tipAlign: "right", selectOPtion: { man: "男", female: "女" } },
        ],
        toolEvent: [],
        topBtnGroup: []
      }
    }
  },
  components: {
    CustomTable
  },
  methods: {
    info ({ row: { id } }) {
      this.addressOption.search.id = id;
      this.showAddress = true;
    }
  },
  mounted () {

  },
  created () {

  }
}
</script>

<style lang='less'>
.circular {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>

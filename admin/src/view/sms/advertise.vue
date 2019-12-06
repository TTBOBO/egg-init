<template>

  <CustomTable ref="customTable"
               :optionData="advertiseOption"
               @add="add"
               @edit="edit"
               @delete="delItem">
    <template slot-scope="props"
              slot="status">
      <el-switch v-model="props.row.status"
                 :active-value="1"
                 :inactive-value="0"
                 active-text="上线"
                 inactive-text="下线"
                 @change="changeStatus(props.row)">
      </el-switch>
    </template>
    <template slot-scope="props"
              slot="time">
      <div>
        <p>开始时间：{{props.row.start_date}}</p>
        <p>到期时间：{{props.row.end_date}}</p>
      </div>
    </template>
    <template slot-scope="props"
              slot="pic">
      <div style="width: 100px;height: 50px;">
        <el-image v-if="props.row.pic"
                  style="width: 100%;width: 100%;border-radius: 5px;cursor: pointer;"
                  :src="props.row.pic"
                  :preview-src-list="[props.row.pic]">
        </el-image>
      </div>
    </template>
  </CustomTable>
</template>

<script>
import CustomTable from '@/components/CustomTable';
import common from '../../minix/common'
export default {
  mixins: [common],
  data () {
    return {
      advertiseOption: {
        baseUrl: "getAdvList",
        toolEventWidth: "250px",
        initheight: true,
        evalKey: "id",
        search: {
          page: 1,  //页数
          size: 10,  //每页多少条
          type: this.baseType
        },
        columns: [
          { lable: "编号", value: "id", tooltip: true, tipAlign: "right" },
          { lable: "广告名称", value: 'name', tooltip: true, tipAlign: "right", search: "", type: '' },
          { lable: "广告位置", value: 'type', search: "", tooltip: true, tipAlign: "right", type: "select", selectOPtion: { 1: "PC首页轮播", 0: "APP首页轮播" } },
          { lable: "广告图片", value: "pic", type: "", search: "", tooltip: true, tipAlign: "right", scoped: true },
          { lable: "时间", value: "time", type: "", search: "", tooltip: true, tipAlign: "right", scoped: true, width: 200 },
          { lable: "上线/下线", value: "status", type: "", search: "", tooltip: true, tipAlign: "right", scoped: true, width: 200 },
          { lable: "创建时间", value: 'createdTime', search: "", tooltip: true, tipAlign: "right", type: "", width: 150 },
          { lable: "点击次数", value: 'clickCount', tooltip: true, tipAlign: "right", defaultVal: 0 },

        ],
        toolEvent: [
          { type: "primary", emit: "edit", title: "编辑" },
          { type: "danger", emit: "delete", title: "删除" }],
        topBtnGroup: [
          { name: "添加", bgcolor: "primary", emit: "add" }
        ]
      },
    }
  },
  components: {
    CustomTable
  },
  methods: {
    edit ({ row: { id } }) {
      this.$router.push({
        name: 'addAdv',
        query: {
          id
        }
      })
    },
    add () {
      this.$router.push('addAdv')
    },
    async changeStatus (row) {
      console.log(row)
      let res = await this.confirm({ text: '是否要修改上线/下线状态?' });
      if (res) {
        const { id, status } = row
        let { code, message } = await this.$ajaxPost('createdAndUpdateAdv', { id, status });
        if (code !== 0) {
          this.$message.error(message);
          return false;
        } else {
          this.$message.success('修改成功');
        }
      }
      this.$refs.customTable.curReload();

    },
    async delItem ({ row }) {
      let status = await this.confirm({ text: '是否删除当前记录?' });
      if (status) {
        const { id } = row
        let { code, message } = await this.$ajaxPost('delAdv', { id: id + '' });
        if (code !== 0) {
          this.$message.error(message);
          return false;
        } else {
          this.$message.success('删除成功');
        }
      }
      this.$refs.customTable.curReload();
    }
  }
}
</script>

<style>
</style>

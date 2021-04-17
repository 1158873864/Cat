<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      height="88vh"
      fit
      highlight-current-row
    >
      <el-table-column prop="id" label="设备id" align="center">
        <template slot-scope="scope">
          {{ scope.row.id || '——' }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="设备名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name || '——' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align="center"
        :filters="statusFilter"
        :filter-method="filterHandler"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status" type="success">已连接</el-tag>
          <el-tag v-else type="info">未连接</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            plain
            size="small"
            @click="toDetail(scope.row.qrcode)"
          >查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '../../api/device'
import { mapGetters } from 'vuex'
import { statusTypeFilter, statusTextFilter } from '../../utils/filters'

export default {
  filters: {
    statusTypeFilter,
    statusTextFilter
  },
  data() {
    return {
      list: [
        {id: '0001', name: '智能猫砂盆', status: 1},
        {id: '0002', name: '自动开门装置', status: 1},
        {id: '0003', name: '智能猫碗', status: 1},
        {id: '0003', name: '智能猫碗2', status: 0},
      ],
      listLoading: true,
      statusFilter: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response
        this.parkFilter = this.initFilter('park')
        this.departmentFilter = this.initFilter('department')
        this.statusFilter = this.initFilter('status', { ON: '在线', OFF: '离线' })
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false;
      })
    },
    initFilter(colName, textValMap = null) {
      const filter = []
      const colSet = new Set(this.list.map(device => device[colName]))
      for (const val of colSet) {
        filter.push({ text: textValMap ? textValMap[val] : val, value: val })
      }
      return filter
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    toDetail(id) {
      this.$router.push({
        name: 'Detail',
        query: { id: id }
      })
    }
  }
}
</script>

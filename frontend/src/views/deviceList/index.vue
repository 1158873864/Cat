<template>
  <div class="app-container">
    <div v-if="appId === ''" style="margin-top: 28vh; text-align: center">
      <img src="@/assets/not-bind-pic.png" alt="not-bind-pic"/>
      <p class="prompt">您当前尚未绑定AppID, <el-button type="text">
        <router-link to="/appId/bind">去绑定</router-link></el-button></p>
    </div>
    <el-table
      v-else
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      height="88vh"
      fit
      highlight-current-row
    >
      <el-table-column prop="qrcode" align="center" label="ID" width="150">
        <template slot-scope="scope">
          {{ scope.row.qrcode }}
        </template>
      </el-table-column>
      <el-table-column prop="park" label="园区" align="center" :filters="parkFilter" :filter-method="filterHandler">
        <template slot-scope="scope">
          {{ scope.row.park || '——' }}
        </template>
      </el-table-column>
      <el-table-column prop="department" label="区域" align="center" :filters="departmentFilter" :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ scope.row.department || '——' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="room" label="房间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.room || '——' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.number || '——' }}</span>
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
          <el-tag
            :type="scope.row.status | statusTypeFilter">{{ scope.row.status | statusTextFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
        align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
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
  computed: {
    ...mapGetters([
      'appId'
    ])
  },
  filters: {
    statusTypeFilter,
    statusTextFilter
  },
  data() {
    return {
      list: [],
      listLoading: true,
      parkFilter: [],
      departmentFilter: [],
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

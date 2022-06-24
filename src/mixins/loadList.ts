import Pagination from '@/components/Pagination/index.vue'
const listPageQuery = {
  current: 1, // 每页数量
  size: 20 // 当前请求页码
}

export default {
  components: { Pagination },
  data() {
    return {
      listPageQuery,
      listQuery: {},
      listQueryTemp: {},
      listLoading: false,
      listData: [],
      total: 0, // 总页数
      editIndex: '' // 当前编辑项
    }
  },

  /**
   *
   * @param {Sting} type 加载类型
   */
  methods: {
    // 加载列表
    loadList(type = 'load') {
      let pageParams
      this.listLoading = true

      // 搜索列表 重载列表
      if (type !== 'load') {
        this.listPageQuery.current = 1
        this.editIndex = ''
      }
      if (type === 'reload') {
        pageParams = this.listQueryTemp
        this.listQuery = Object.assign({}, pageParams)
      } else {
        pageParams = this.listQuery
      }

      const params = Object.assign({}, pageParams, this.listPageQuery)
      this.getList(params)
        .then((res) => {
          const data = res
          this.listLoading = false
          if (this.beforeLoadList) {
            this.beforeLoadList(data)
          } else {
            this.listData = this.processList
              ? this.processList(data.data)
              : data.data.records
            this.total = parseInt(data.data.total)
          }
          // this.listPageQuery.page = data.current_page || 1
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    // 常规属性过滤
    formatter(row, column, cellValue) {
      const item = this[column.property] || {}
      return item[cellValue] || cellValue
    },

    // 数组值过滤
    formatterArrays(row, column, cellValue) {
      const key = column.property
      const items = this[key] || []
      const values = []
      cellValue.forEach((item) => {
        values.push(items[item])
      })
      return values.toString()
    }
  },
  created() {
    // 缓存页码搜索条件参数
    this.listQueryTemp = Object.assign({}, this.listQuery)
    this.loadList()
  }
}

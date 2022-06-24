import { reactive } from "vue";
const listPageQuery = {
  current: 1, // 每页数量
  size: 20, // 当前请求页码
};

export default function () {
  const listDataRef = reactive({
    listPageQuery,
    listQuery: {} as any,
    listQueryTemp: {},
    listLoading: false,
    listData: [],
    total: 0, // 总页数
    editIndex: "", // 当前编辑项
  });

  // 加载列表
  const loadList = (
    type = "load",
    getList: any,
    beforeLoadList?: any,
    processList?: any
  ) => {
    let pageParams;
    listDataRef.listLoading = true;

    // 搜索列表 重载列表
    if (type !== "load") {
      listDataRef.listPageQuery.current = 1;
      listDataRef.editIndex = "";
    }
    if (type === "reload") {
      pageParams = listDataRef.listQueryTemp;
      listDataRef.listQuery = Object.assign({}, pageParams);
    } else {
      pageParams = listDataRef.listQuery;
    }

    const params = Object.assign({}, pageParams, listDataRef.listPageQuery);
    getList(params)
      .then((res: any) => {
        const data = res;
        listDataRef.listLoading = false;
        if (beforeLoadList) {
          beforeLoadList(data);
        } else {
          listDataRef.listData = processList
            ? processList(data.data)
            : data.data.records;
          listDataRef.total = parseInt(data.data.total);
        }
        // listDataRef.listPageQuery.page = data.current_page || 1
      })
      .catch(() => {
        listDataRef.listLoading = false;
      });
  };

  // 缓存页码搜索条件参数
  listDataRef.listQueryTemp = Object.assign({}, listDataRef.listQuery);
  return {
    listDataRef,
    loadList,
  };
}

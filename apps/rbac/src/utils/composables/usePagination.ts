/**
 * 用于管理分页的可组合函数。
 * @returns 包含分页状态和处理分页的方法的对象。
 */
export default function usePagination() {
  const pagination = ref({
    page: 1,
    size: 10,
    total: 0,
    sizes: [10, 20, 50, 100],
    layout: 'total, sizes, ->, prev, pager, next, jumper',
    sort: null as string | null,
    order: null as string | null,
  });

  /**
   * 获取参数对象
   * @returns 参数对象
   */
  function getParams() {
    return {
      page: pagination.value.page,
      size: pagination.value.size,
      from: (pagination.value.page - 1) * pagination.value.size,
      limit: pagination.value.size,
      ...(
        pagination.value.sort && pagination.value.order && {
          sort: pagination.value.sort,
          order: pagination.value.order,
        }
      ),
    };
  }

  /**
   * 处理分页大小改变的函数
   * @param size 分页大小
   */
  async function onSizeChange(size: number) {
    pagination.value.size = size;
  }

  /**
   * 当前页码改变时的回调函数
   * @param page 当前页码
   */
  async function onCurrentChange(page: number) {
    pagination.value.page = page;
  }

  /**
   * 更新排序方式
   * @param prop - 排序属性
   * @param order - 排序顺序
   */
  async function onSortChange(prop: string, order: string) {
    pagination.value.sort = prop;
    pagination.value.order = order === 'ascending' ? 'asc' : 'desc';
  }

  return {
    pagination,
    getParams,
    onSizeChange,
    onCurrentChange,
    onSortChange,
  };
}

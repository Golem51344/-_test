import { isArray, isString } from 'lodash-es';
import { defineStore } from 'pinia';
import { STORE_NAME } from '@/store/enum';
/**
 * 创建一个用于管理 keep-alive 组件的存储对象。
 *
 * @returns keep-alive 存储对象。
 */
const useKeepAliveStore = defineStore(
  STORE_NAME.KEEP_ALIVE,
  () => {
    const list = ref<string[]>([]);

    /**
     * 添加要缓存的组件名称到列表中
     * @param name - 要添加的组件名称，可以是字符串或字符串数组
     * @returns 如果成功添加了组件名称，则返回true；否则返回false
     */
    function add(name: string | string[]) {
      if (isString(name)) {
        return !list.value.includes(name) && list.value.push(name);
      }
      else if (isArray(name)) {
        name.forEach((_name) => {
          add(_name);
        });
      }
      else {
        useWarn(`KeepAlive 需要接受一个字符串或者字符串数组作为参数, 但是接受到了 ${typeof name} 类型`);
      }
    }

    /**
     * 从需要保持活动状态的组件列表中移除指定的组件名称。
     *
     * @param name - 要移除的组件名称或名称数组。
     */
    function remove(name: string | string[]) {
      if (isString(name)) {
        list.value = list.value.filter((v) => {
          return v !== name;
        });
      }
      else if (isArray(name)) {
        list.value = list.value.filter((v) => {
          return !name.includes(v);
        });
      }
    }

    /**
     * 清空列表
     */
    function clean() {
      list.value = [];
    }

    return {
      list,
      add,
      remove,
      clean,
    };
  },
);

export default useKeepAliveStore;

import { defineStore } from 'pinia';
import { STORE_NAME } from '@/store/enum';

const useNotificationStore = defineStore(
  // 唯一ID
  STORE_NAME.NOTIFICATION,
  () => {
    const message = ref(0);
    const todo = ref(0);
    const total = computed(() => message.value + todo.value);

    function init() {
      getUnreadMessage();
      getUnreadTodo();
    }
    function getUnreadMessage() {
      // 为方便演示，这里直接写死的未读数
      message.value = 9;
    }
    function getUnreadTodo() {
      // 为方便演示，这里直接写死的未读数
      todo.value = 0;
    }

    return {
      message,
      todo,
      total,
      init,
    };
  },
);

export default useNotificationStore;

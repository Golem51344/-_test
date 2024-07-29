import type { MaybeRef } from 'vue';

export function useCountdown(initialTime: MaybeRef<number> = 60) {
  const count = ref(toValue(initialTime));
  const isStart = computed(() => {
    return toValue(count) !== toValue(initialTime);
  });

  function start() {
    count.value--;
    const timer = setInterval(() => {
      count.value--;
      if (count.value === 0) {
        clearInterval(timer);
        count.value = toValue(initialTime);
      }
    }, 1000);
  }
  return {
    count,
    start,
    isStart,
  };
}

<script setup lang="ts">
import useUserStore from '@/store/modules/user';

defineOptions({
  name: 'NotPermission',
});

const router = useRouter();

const userStore = useUserStore();
const data = ref({
  inter: Number.NaN,
  countdown: 5,
});

onUnmounted(() => {
  data.value.inter && window.clearInterval(data.value.inter);
});

onMounted(() => {
  data.value.inter = window.setInterval(() => {
    data.value.countdown--;
    if (data.value.countdown === 0) {
      data.value.inter && window.clearInterval(data.value.inter);
      goBack();
    }
  }, 1000);
});

async function goBack() {
  await userStore.logout();
  router.push({
    name: 'login',
  });
}
</script>

<template>
  <div class="absolute left-[50%] top-[50%] flex flex-col items-center justify-between lg:flex-row -translate-x-50% -translate-y-50% lg:gap-12">
    <!-- <PubSvgIcon name="403" class="text-[300px] lg:text-[400px]" /> -->
    <div class="noPermissionIcon w-300px h-300px lg:w-400px lg:h-400px" />
    <div class="flex flex-col gap-4">
      <h1 class="m-0 text-6xl font-sans dark:text-[#C9D6EF]">
        403
      </h1>
      <div class="desc mx-0 text-xl text-stone-5 dark:text-[#C9D6EF]">
        抱歉,你无权访问系统,请联系管理员
      </div>
      <div>
        <HButton @click="goBack">
          {{ data.countdown }} 秒后，返回登录页
        </HButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.noPermissionIcon {
  background: url("@/assets/icons/403.svg") no-repeat;
  background-size: 100% 100%;
}
[data-theme="dark"] {
  .noPermissionIcon {
    background: url("@/assets/icons/403_dark.svg") no-repeat;
    background-size: 100% 100%;
  }
}
</style>

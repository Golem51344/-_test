<script setup lang="ts">
import { message } from 'ant-design-vue';
import { auth } from '@/utils/auth';
import useUserStore from '@/store/modules/user';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

onMounted(async () => {
  const res = await auth(route.params.type as any);
  if (res?.success) {
    userStore.setToken(res?.data?.accessToken, res?.data?.refreshToken);
    userStore.getUserInfo();
    router.push({ path: '/' });
  }
  else {
    message.error(res?.message);
  }
});
</script>

<template>
  <div />
</template>

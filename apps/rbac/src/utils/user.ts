import useUserStore from '@/store/modules/user';

export function getToken() {
  const userStore = useUserStore();
  return userStore.token;
}

export function getRefreshToken() {
  const userStore = useUserStore();
  return userStore.refreshToken;
}

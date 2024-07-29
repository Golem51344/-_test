import type { Component } from 'vue';
import { useActiveElement } from '@vueuse/core';

interface LoginTabs {
  title: string
  component: Component
}

export function useLoginTabs() {
  const tabs: LoginTabs[] = [
    {
      title: '账号登录',
      component: defineAsyncComponent(() => import('@/views/system/login/components/PasswordLogin/index.vue')),
    },
    {
      title: '手机号登录',
      component: defineAsyncComponent(() => import('@/views/system/login/components/LoginWithPhone/index.vue')),
    },
    {
      title: '浙政钉扫码',
      component: defineAsyncComponent(() => import('@/views/system/login/components/LoginWithQRCode/index.vue')),
    },
    {
      title: '微信扫码',
      component: defineAsyncComponent(() => import('@/views/system/login/components/LoginWithQRCode/index.vue')),
    },
  ];
  const initialTab = ref(0);

  function changeActiveTab(activeTab: number): void {
    initialTab.value = activeTab;
  }
  return {
    tabs,
    initialTab,
    changeActiveTab,
  };
}

export function useCaptchas() {
  const { send, onSuccess } = useRequest(getAuthLoginValidCode({ size: '100x40' }));
  const captcha = ref('');
  const captchaHash = ref('');

  onSuccess(({ data }) => {
    const { key, plaintext } = data.data!;

    const imgUrl = `data:image/png;base64,${plaintext}`;
    captcha.value = imgUrl;
    captchaHash.value = key!;
  });
  return {
    send,
    captcha,
    captchaHash,
  };
}

export function useFocusElement() {
  const activeElement = useActiveElement();
  const focusElementDataId = computed(() =>
    activeElement.value?.dataset?.id || 'null',
  );
  return {
    focusElementDataId,
  };
}

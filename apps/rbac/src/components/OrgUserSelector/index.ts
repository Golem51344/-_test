import { createApp, h } from 'vue';

import type { ModelValue as OrgModelValue, OrgSelectorProps } from './OrgSelector.vue';
import OrgSelector from './OrgSelector.vue';

import type { ModelValue as UserModelValue, UserSelectorProps } from './UserSelector.vue';
import UserSelector from './UserSelector.vue';

export function selectOrg(props: OrgSelectorProps & { modelValue?: OrgModelValue[] }) {
  createAppElement(OrgSelector, props);
}

export function selectUser(props: UserSelectorProps & { modelValue?: UserModelValue[] }) {
  createAppElement(UserSelector, props);
}

function createAppElement(
  component: typeof OrgSelector | typeof UserSelector,
  props: Parameters<typeof selectUser | typeof selectOrg>[0],
) {
  const app = createApp({
    render() {
      return h(component, {
        ...props,
        open: true,
        onSubmit: (...arg) => {
          props.onSubmit?.(...arg);
          close();
        },
        onCancel: () => {
          close();
        },
      });
    },
  });

  const container = document.createElement('div');
  document.body.appendChild(container);
  app.mount(container);

  function close() {
    setTimeout(() => {
      app.unmount();
      document.body.removeChild(container);
    }, 500);
  }
}

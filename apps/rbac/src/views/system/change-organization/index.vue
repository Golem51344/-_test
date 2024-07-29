<script setup lang="ts">
import { message } from 'ant-design-vue';
import useUserStore from '@/store/modules/user';
/* =============================================
=               Vue SFC Options 配置           =
============================================= */
defineOptions({
  name: 'ChangeOrganization',
});
/* =============================================
=                   逻辑代码                   =
============================================= */
const userStore = useUserStore();
const router = useRouter();

// 切断响应式，否则组织清楚后会导致页面闪烁
const rawOrganization = toRaw(userStore.orgList);
const orgList = computed(() => {
  const org = rawOrganization.map((item) => {
    return {
      orgId: item.orgId,
      label: item.orgName!,
      ...item,
    };
  });
  return org;
});

const activeIndex = ref(-1);

function setActive(idx: number) {
  activeIndex.value = idx;
}

function handleBack() {
  router.go(-1);
}

async function changeOrganization() {
  const org = orgList.value[activeIndex.value];
  const orgId = org?.orgId;
  if (orgId) {
    if (orgId === userStore.orgId) {
      message.error('请避免切换到当前已选组织');
    }
    else {
      await userStore.changeOrg(orgId);
      message.success('组织切换成功');
    }
  }
  else {
    message.error('请选择要切换的组织');
  }
}
</script>

<template>
  <div class="change-org">
    <div
      w-full
      h-full
      flex="~"
      justify-center
    >
      <div w-620px pt-20vh>
        <div
          text="30px"
          font="bold"
          mb-40px
          flex="~"
          items="center"
        >
          <PubSvgIcon name="logo" size="42px" mr-15px />
          请选择组织
        </div>
        <div v-for="(item, index) in orgList" :key="index" @click="setActive(index)">
          <div class="org-item" :class="{ active: index === activeIndex }">
            <div flex="~" h-full>
              <PubSvgIcon name="change-org" size="48px" />
              <div
                flex="~ col"
                h-full
                justify-center
                ml="18px"
              >
                <div text="20px black dark:[#86909C]" flex="~" items-center>
                  <span mr-10px>
                    {{ item.label }}
                  </span>
                  <a-tag v-if="userStore.orgId === item.orgId" color="blue">
                    当前使用组织
                  </a-tag>
                  <a-tag v-if="item.main" color="red">
                    主组织
                  </a-tag>
                </div>
              </div>
            </div>
            <div>
              <PubSvgIcon
                class="arrow"
                name="i-iconamoon-arrow-right-6-circle-duotone"
                :color="index === activeIndex ? '#1677ff' : '#8E97A3'"
                size="22px"
              />
            </div>
          </div>
        </div>
        <div>
          <a-button
            type="primary"
            block
            h-40px
            mb-15px
            @click="changeOrganization"
          >
            确定
          </a-button>
          <a-button
            block
            h-40px
            @click="handleBack"
          >
            返回
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.change-org {
  width: 100%;
  height: 100%;
  background: url("@/assets/images/login-small.png") no-repeat 50%;
  background-size: cover;
  .org-item {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 91px;
    padding: 22px 32px;
    margin-bottom: 15px;
    overflow: hidden;
    color: #86909c;
    cursor: pointer;
    background: #fff;
    border: 1px solid #f2f3f5;
    border-radius: 8px;
    &.active {
      background-color: rgba(22, 119, 255, 0.1);
      border-color: #1677ff;
    }
  }
}
[data-theme="dark"] {
  .change-org {
    background: url("@/assets/images/login-small_dark.webp") no-repeat 50%;
    background-size: cover;
  }
  .org-item {
    background: #2c2c2c;
    border: 1px solid #2c2c2c;
    &.active {
      background: rgba(20, 20, 20, 0.6);
      border-color: #1668dc;
    }
  }
}
</style>

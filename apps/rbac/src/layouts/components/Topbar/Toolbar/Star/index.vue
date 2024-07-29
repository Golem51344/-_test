<script setup lang="ts">
import { findIndex } from 'lodash-es';
import useFavoritesStore from '@/store/modules/favorites';
import FluentStar12Filled from '~icons/fluent/star-12-filled';
import FluentStar16Regular from '~icons/fluent/star-16-regular';

defineOptions({
  name: 'Star',
});
const favoritesStore = useFavoritesStore();
const isActive = ref(false);
const router = useRouter();

watchEffect(() => {
  const currentRoute = router.currentRoute.value.fullPath;
  isActive.value = !!~findIndex(favoritesStore.list, ['fullPath', currentRoute]);
});
</script>

<template>
  <div
    flex
    items-center
    justify-center
  >
    <FluentStar12Filled v-if="isActive" text="[#FBC71D] 18px" />
    <FluentStar16Regular v-else text-18px />
  </div>
</template>

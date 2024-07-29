<script setup lang="ts">
import Sortable from 'sortablejs';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import { isUndefined } from 'lodash-es';
import { i18nTitleInjectionKey } from '@/utils/injectionKeys';
import useFavoritesStore from '@/store/modules/favorites';
import FluentStarAdd16Regular from '~icons/fluent/star-add-16-regular';
import FluentStarDismiss16Regular from '~icons/fluent/star-dismiss-16-regular';
import FluentDelete24Filled from '~icons/fluent/delete-24-filled';

defineOptions({
  name: 'Favorites',
});

const route = useRoute();
const router = useRouter();
const favoritesStore = useFavoritesStore();
const { t } = useI18n();
const generateI18nTitle = inject(i18nTitleInjectionKey, Function, true);

const favoritesContainerRef = ref<HTMLElement | null>(null);

let _favoritesSortable: Sortable | null = null;

/**
 * 监听收藏夹容器的变化，并创建可排序的实例
 * @param {Ref} favoritesContainerRef - 收藏夹容器的引用
 */
watch(favoritesContainerRef, (newSortableContainer) => {
  if (newSortableContainer) {
    _favoritesSortable = new Sortable(newSortableContainer, {
      animation: 200,
      ghostClass: 'draggable-ghost',
      draggable: '.draggable-item',
      onUpdate: (e) => {
        if (!isUndefined(e.newIndex) && !isUndefined(e.oldIndex)) {
          favoritesStore.sort(e.newIndex, e.oldIndex);
        }
      },
    });
  }
});
</script>

<template>
  <div class="favorites-container w-80 dark:bg-[var(--g-container-bg)]">
    <div class="flex items-center justify-between px-4 py-3">
      <div class="text-sm font-bold">
        {{ t('app.tabbar.favorites.my-favorites') }}
      </div>
      <template v-if="favoritesStore.canAdd(route.fullPath)">
        <FluentStarAdd16Regular
          v-if="!favoritesStore.isAdd(route.fullPath)"
          text-18px
          class="cursor-pointer"
          @click="favoritesStore.add(route)"
        />
        <FluentStarDismiss16Regular
          v-else
          text-18px
          class="cursor-pointer"
          @click="favoritesStore.remove(route.fullPath)"
        />
      </template>
    </div>
    <OverlayScrollbarsComponent
      :options="{
        scrollbars: {
          autoHide: 'leave',
          autoHideDelay: 300,
        },
      }"
      defer
      class="max-h-220px"
    >
      <div
        v-if="favoritesStore.list.length > 0"
        ref="favoritesContainerRef"
        class="flex flex-wrap items-center justify-between gap-2 px-4 pb-4"
      >
        <div
          v-for="item in favoritesStore.list"
          :key="item.fullPath"
          :title="generateI18nTitle(item.i18n, item.title)"
          class="draggable-item relative w-[calc(50%-0.25rem)] flex cursor-pointer items-center gap-1 rounded px-2 py-2 ring-1 ring-stone-3 ring-inset hover:bg-stone-1 dark:ring-stone-7 dark:hover:bg-dark/50"
          @click="router.push(item.fullPath)"
        >
          <PubSvgIcon v-if="item.icon" :name="item.icon" :size="18" />
          <div class="name flex-1 truncate pe-4">
            {{ generateI18nTitle(item.i18n, item.title) }}
          </div>
          <FluentDelete24Filled
            text-12px
            class="right-1 h-5 w-6 rounded-full text-stone-3 !absolute dark:text-stone-7 hover:text-stone-7 dark:hover:text-stone-3"
            @click.stop="favoritesStore.remove(item.fullPath)"
          />
        </div>
      </div>
      <div
        v-else
        flex="center col"
        py-6
        text-stone-5
      >
        <PubSvgIcon name="favorites" :size="150" />
        <p
          v-show="favoritesStore.canAdd(route.fullPath)"
          m-0
          flex-center
          text-sm
          op-75
        >
          点击右上角
          <FluentStarAdd16Regular
            text-18px mx-1
            text-stone-6
            dark:text-stone-4
          />
          将当前页面添加到收藏夹
        </p>
      </div>
    </OverlayScrollbarsComponent>
  </div>
</template>

<style lang="scss" scoped>
:deep([data-overlayscrollbars-viewport]) {
  overscroll-behavior: contain;
}

.draggable-ghost {
  opacity: 0;
}

.name {
  mask-image: linear-gradient(to right, #000 calc(100% - 80px), transparent);
}
</style>

import useSettingsStore from '@/store/modules/settings';
import useMenuStore from '@/store/modules/menu';

/**
 * 获取指定元素的计算样式属性值
 * @param property - 要获取的样式属性
 * @param root - 根元素，默认为 document.documentElement
 * @returns 样式属性值的整数形式
 */
export function useGetComputedStyle(property: string, root: HTMLElement = document.documentElement) {
  return Number.parseInt(getComputedStyle(root).getPropertyValue(property));
}

type unit = `${string}px`;

/**
 * 根据各种设置和条件计算主侧边栏和子侧边栏的实际宽度。
 * @returns 包含主侧边栏和子侧边栏实际宽度的计算属性对象。
 */
export function useGetSidebarActualWidth() {
  const settingsStore = useSettingsStore();
  const menuStore = useMenuStore();

  const mainSidebarActualWidth = computed<unit>(() => {
    const menuMode = settingsStore.settings.menu.menuMode;
    const isMobile = settingsStore.mode !== 'mobile';
    const isSingle = menuMode === 'single';
    const isHeadAndOnlyHead = ['head', 'only-head'].includes(menuMode);
    if (isSingle || (isHeadAndOnlyHead && isMobile)) {
      return '0px';
    }
    else {
      return `${useGetComputedStyle('--g-main-sidebar-width')}px`;
    }
  });

  /**
   * subSidebarActualWidth 的计算属性，用于获取子侧边栏的实际宽度。
   * 它考虑了各种设置和条件来确定最终的宽度。
   * @returns 子侧边栏的实际宽度（以像素为单位）。
   */
  const subSidebarActualWidth = computed<unit>(() => {
    let actualWidth = useGetComputedStyle('--g-sub-sidebar-width');
    const subSidebarActualWidth = settingsStore.settings.menu.subMenuCollapse;
    const subMenuOnlyOneHide = settingsStore.settings.menu.subMenuOnlyOneHide;
    const menuMode = settingsStore.settings.menu.menuMode;
    const isMobile = settingsStore.mode !== 'mobile';
    const onlySideOrHead = ['only-side', 'only-head'].includes(menuMode);

    if (subSidebarActualWidth && isMobile) {
      actualWidth = useGetComputedStyle('--g-sub-sidebar-collapse-width');
    }

    if (onlySideOrHead && isMobile) {
      actualWidth = 0;
    }
    if (
      subMenuOnlyOneHide
      && menuStore.sidebarMenus.length === 1
      && (
        !menuStore.sidebarMenus[0].children
        || menuStore.sidebarMenus[0]?.children.every(item => item.meta?.sidebar === false)
      )
    ) {
      actualWidth = 0;
    }
    return `${actualWidth}px`;
  });

  return { mainSidebarActualWidth, subSidebarActualWidth };
}

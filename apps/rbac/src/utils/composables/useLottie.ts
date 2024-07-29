import type { MaybeRef } from 'vue';
import { onMounted, onUnmounted } from 'vue';
import type { AnimationItem } from 'lottie-web';
import lottie from 'lottie-web';
import { tryOnMounted } from '@vueuse/core';

interface Path {
  lightAnimationData: any
  darkAnimationData: any
}

export function useLottie(DomRef: MaybeRef<Element | null>, themePath: Path) {
  let anim: AnimationItem | null;

  function create() {
    const { isDark } = useTheme();
    const animationPath = computed(() => {
      return isDark.value ? themePath.darkAnimationData : themePath.lightAnimationData;
    });
    onMounted(() => {
      createLottie(animationPath.value);
      watch(isDark, () => {
        destroy();
        createLottie(animationPath.value);
      });
    });
    onUnmounted(destroy);
  }

  function createLottie(animationPath: string) {
    const container = unref(DomRef)!;
    anim = lottie.loadAnimation({
      path: animationPath,
      container,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      // animationData,
    });
  }

  function play() {
    tryOnMounted(() => {
      anim?.play();
    });
  }

  function stop() {
    tryOnMounted(() => {
      anim?.stop();
    });
  }

  function destroy() {
    if (anim) {
      anim.destroy();
      anim = null;
    }
  }

  create();

  return { play, stop, destroy };
}

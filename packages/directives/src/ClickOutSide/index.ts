import type {
  ComponentPublicInstance,
  DirectiveBinding,
  ObjectDirective,
} from 'vue';
import { isClient } from '@vueuse/core';

type DocumentHandler = <T extends MouseEvent>(mouseup: T, mousedown: T) => void;
type Nullable<T> = T | null;
type FlushList = Map<
  HTMLElement,
  {
    documentHandler: DocumentHandler
    bindingFn: (...args: unknown[]) => unknown
  }
>;

const nodeList: FlushList = new Map();

let startClick: Event;
function on(
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, false);
  }
}
if (isClient) {
  on(document, 'mousedown', e => (startClick = e));
  on(document, 'mouseup', (e) => {
    for (const { documentHandler } of nodeList.values()) {
      documentHandler(e as MouseEvent, startClick as MouseEvent);
    }
  });
}

function createDocumentHandler(el: HTMLElement,
  binding: DirectiveBinding): DocumentHandler {
  let excludes: HTMLElement[] = [];
  if (Array.isArray(binding.arg)) {
    excludes = binding.arg;
  }
  else {
    // 由于当前绑定类型的实现是错误的，因此这里需要进行类型转换
    excludes.push(binding.arg as unknown as HTMLElement);
  }
  return (mouseup, mousedown) => {
    const popperRef = (
      binding.instance as ComponentPublicInstance<{
        popperRef: Nullable<HTMLElement>
      }>
    ).popperRef;
    const mouseUpTarget = mouseup.target as Node;
    const mouseDownTarget = mousedown.target as Node;
    const isBound = !binding || !binding.instance;
    const isTargetExists = !mouseUpTarget || !mouseDownTarget;
    const isContainedByEl
      = el.contains(mouseUpTarget) || el.contains(mouseDownTarget);
    const isSelf = el === mouseUpTarget;

    const isTargetExcluded
      = (excludes.length
      && excludes.some(item => item?.contains(mouseUpTarget)))
      || (excludes.length && excludes.includes(mouseDownTarget as HTMLElement));
    const isContainedByPopper
      = popperRef
      && (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget));
    if (
      isBound
      || isTargetExists
      || isContainedByEl
      || isSelf
      || isTargetExcluded
      || isContainedByPopper
    ) {
      return;
    }
    binding.value();
  };
}

const clickOutside: ObjectDirective = {
  beforeMount(el, binding) {
    nodeList.set(el, {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value,
    });
  },
  updated(el, binding) {
    nodeList.set(el, {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value,
    });
  },
  unmounted(el) {
    nodeList.delete(el);
  },
};

export { clickOutside };

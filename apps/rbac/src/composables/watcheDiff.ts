import type { WatchOptions, WatchSource } from 'vue';
import { watch } from 'vue';
import { cloneDeep, isEmpty, isObject } from 'lodash-es';

function deepDiff(original: Record<string, any>, updated: Record<string, any>) {
  let hasDifferences = false;
  const diff: Record<string, any> = Object.create(null);

  const keys = new Set([...Object.keys(original), ...Object.keys(updated)]);
  keys.forEach((key) => {
    const origValue = original[key];
    const updatedValue = updated[key];

    if (isObject(origValue) && isObject(updatedValue)) {
      const deeperDiff = deepDiff(origValue, updatedValue);
      if (Object.keys(deeperDiff).length > 0) {
        diff[key] = deeperDiff;
        hasDifferences = true;
      }
    }
    else if (origValue !== updatedValue) {
      diff[key] = updatedValue;
      hasDifferences = true;
    }
  });

  return hasDifferences ? diff : {};
}

export function watchDiffObject<
  T extends Record<string, any>, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T> | T,
  cb: (newVal: Record<string, any>, oldVal: Record<string, any>) => void,
  options?: WatchOptions<Immediate>,
) {
  let oldValue: Record<string, any> = options?.immediate
    ? {}
    : cloneDeep(source instanceof Function
      ? source()
      : source,
    );

  return watch(source, (newVal, _) => {
    const diff = deepDiff(oldValue, newVal);
    if (!isEmpty(diff)) {
      cb(diff, oldValue);
    }
    oldValue = cloneDeep(newVal);
  }, {
    ...options,
    deep: true,
  });
}

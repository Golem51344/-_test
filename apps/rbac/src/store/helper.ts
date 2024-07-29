import md5 from 'md5';
import useUserStore from '@/store/modules/user';

const { getHash } = createHashString();

export function getTabbarMemoryKey() {
  return `tabbarMemory${getUserPrefix()}`;
}

export function getfavoritesMemoryKey() {
  return `favoritesData${getUserPrefix()}`;
}

function getUserPrefix() {
  const userStore = useUserStore();
  const userId = userStore.userId;
  const orgId = userStore.orgId;
  return getHash(`${orgId}${userId}`);
}

function createHashString() {
  const hash = new Map<string, string>();
  function getMd5String(combinedStr: string) {
    return md5(combinedStr).substring(0, 8);
  }
  function getHash(str: string) {
    if (hash.has(str)) {
      return hash.get(str);
    }
    const value = getMd5String(str);
    hash.set(str, value);
    return value;
  };
  return {
    getHash,
  };
}

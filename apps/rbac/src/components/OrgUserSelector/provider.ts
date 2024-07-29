import type { OrgProviderProps, UserProviderProps } from '@pubinfo/headlessui';
import { message } from 'ant-design-vue';

interface ExtraApis {
  /** 回显选中项 */
  getSelectedData?: (items: any[]) => Promise<any[]>
  /** 添加到最近常用 */
  addRecentlyUsed?: (items: any[]) => Promise<any>
}

export const orgFieldNames: OrgProviderProps['fieldNames'] = {
  value: 'orgId',
  label: 'orgName',
  favorite: 'collect',
  info: 'fullName',
};

export const userFieldNames: OrgProviderProps['fieldNames'] = {
  value: 'orgUserId',
  label: 'userName',
  favorite: 'collect',
  info: 'fullName',
};

export function joinId(orgId: string = '', userId: string = '') {
  return `${orgId}_${userId}`;
}

export function resolveId(orgUserId: string) {
  const [orgId, userId] = orgUserId?.split('_');
  return {
    orgId,
    userId,
  };
}

function setDataAuth(auth?: string) {
  if (auth) {
    return {
      headers: { 'X-ResourceMark': auth },
    };
  }

  return {};
}

export function useOrgAPIs(auth?: string): OrgProviderProps['apis'] & ExtraApis {
  return {
    // 回显选中项
    async getSelectedData(items: any[]) {
      const res = await postRbacOrgSearchOrgByIds(
        items.map(item => item[orgFieldNames.value]),
        setDataAuth(auth),
      );
      return res?.data?.map((e) => {
        return {
          ...e,
          [orgFieldNames.value]: e.id,
          [orgFieldNames.label]: e.name,
          [orgFieldNames.info]: e.fullName,
        };
      }) ?? [];
    },

    // 添加到最近常用
    async addRecentlyUsed(items: any[]) {
      await postRbacUsedAddBatch(items.map((item) => {
        return {
          type: '1',
          orgId: item[orgFieldNames.value],
          orgName: item[orgFieldNames.label],
        };
      }), setDataAuth(auth));
    },

    // 最近常用
    async recentlyUsed({ search, current }) {
      const res = await postRbacUsedFindPage({
        type: '1',
        orgName: search,
        currentPage: current,
        pageSize: 20,
        showIsCollect: true,
      }, setDataAuth(auth));
      return {
        total: 20,
        data: res.data?.records?.map((e) => {
          return {
            ...e,
            [orgFieldNames.value]: e.orgId,
            [orgFieldNames.label]: e.orgName,
            [orgFieldNames.info]: e.fullOrgName,
          };
        }) ?? [],
      };
    },

    // 收藏
    async favorites({ search, current, pageSize }) {
      const res = await postRbacCollectFindPage({
        type: '1',
        orgName: search,
        currentPage: current,
        pageSize,
      }, setDataAuth(auth));
      return {
        total: res.data?.total ?? 0,
        data: res.data?.records?.map((e) => {
          return {
            ...e,
            [orgFieldNames.value]: e.orgId,
            [orgFieldNames.label]: e.orgName,
            [orgFieldNames.info]: e.fullOrgName,
          };
        }) ?? [],
      };
    },

    // 添加取消收藏
    async favoriteToggle({ favorite, record }) {
      const request = favorite ? postRbacCollectAdd : postRbacCollectRemoveCollect;
      const res = await request({ type: '1', orgId: record?.[orgFieldNames.value] }, setDataAuth(auth));
      if (res.success) {
        message.success(favorite ? '收藏成功' : '取消收藏成功');
      }
    },

    // 群组列表
    async groups({ search, current, pageSize }) {
      const res = await postGroupFindPage({
        type: '1',
        name: search,
        currentPage: current,
        pageSize,
      });
      return {
        total: res.data?.total ?? 0,
        data: res.data?.records?.map((e) => {
          return {
            ...e,
            [orgFieldNames.value]: e.id,
            [orgFieldNames.label]: e.name,
          };
        }) ?? [],
      };
    },

    // 群组数据
    async groupData({ node }) {
      const res = await getGroupDetailById({ id: node?.id, showIsCollect: true }, setDataAuth(auth));
      return res.data?.pubGroupMemberList?.map((e) => {
        return {
          ...e,
          [orgFieldNames.value]: e.orgId,
          [orgFieldNames.label]: e.orgName,
          [orgFieldNames.info]: e.fullOrgName,
          isLeaf: true,
        };
      }) ?? [];
    },

    // 组织树
    async orgTree({ node }) {
      const res = await getRbacOrgOrgListByParentId({
        parentId: node?.orgId,
        enable: true,
        showFullName: true,
        showIsCollect: true,
      }, setDataAuth(auth));
      return res.data?.map((e) => {
        return {
          ...e,
          [orgFieldNames.value]: e.id,
          [orgFieldNames.label]: e.name,
          [orgFieldNames.info]: e.fullName,
          isLeaf: e.leaf,
        };
      }) ?? [];
    },

    // 组织的所有子节点
    async orgChildren({ node }) {
      const res = await getRbacOrgSearchSubOrgById({ parentId: node?.orgId }, setDataAuth(auth));
      return res.data?.map((e) => {
        return {
          ...e,
          [orgFieldNames.value]: e.id,
          [orgFieldNames.label]: e.name,
          [orgFieldNames.info]: e.fullName,
          isLeaf: e.leaf,
        };
      }) ?? [];
    },

    // 组织列表
    async orgList({ search, current, pageSize }) {
      const res = await postRbacOrgSearch({
        keyWord: search,
        currentPage: current,
        pageSize,
        showIsCollect: true,
      }, setDataAuth(auth));
      return {
        total: res.data?.total ?? 0,
        data: res.data?.records?.map((e) => {
          return {
            ...e,
            [orgFieldNames.value]: e.id,
            [orgFieldNames.label]: e.simpleName,
            [orgFieldNames.info]: e.fullName,
          };
        }) ?? [],
      };
    },
  };
}

export function useUserAPIs(auth?: string): UserProviderProps['apis'] & ExtraApis {
  return {
  // 回显选中项
    async getSelectedData(items: any[]) {
      const res = await postRbacUserUserAndOrgList(items.map((item) => {
        return {
          orgId: item.orgId,
          userId: item.userId,
        };
      }), setDataAuth(auth));
      return res?.data?.map((e) => {
        return {
          ...e,
          [userFieldNames.value]: joinId(e?.orgId, e.id),
          [userFieldNames.label]: e.realName,
          [userFieldNames.info]: e.fullOrgName,
        };
      }) ?? [];
    },

    // 添加到最近常用
    async addRecentlyUsed(items: any[]) {
      await postRbacUsedAddBatch(items.map((item) => {
        const ids = resolveId(item[userFieldNames.value]);
        return {
          type: '2',
          orgId: ids.orgId,
          userId: ids.userId,
          userName: item[userFieldNames.label],
        };
      }), setDataAuth(auth));
    },

    // 最近常用
    async recentlyUsed({ search, current }) {
      const res = await postRbacUsedFindPage({
        type: '2',
        userName: search,
        currentPage: current,
        pageSize: 20,
        showIsCollect: true,
      }, setDataAuth(auth));
      return {
        total: 20,
        data: res.data?.records?.map((e) => {
          return {
            ...e,
            [userFieldNames.value]: joinId(e.orgId, e.userId),
            [userFieldNames.label]: e.userName,
            [userFieldNames.info]: e.fullOrgName,
          };
        }) ?? [],
      };
    },

    // 收藏
    async favorites({ search, current, pageSize }) {
      const res = await postRbacCollectFindPage({
        type: '2',
        userName: search,
        currentPage: current,
        pageSize,
      }, setDataAuth(auth));
      return {
        total: res.data?.total ?? 0,
        data: res.data?.records?.map((e) => {
          return {
            ...e,
            [userFieldNames.value]: joinId(e.orgId, e.userId),
            [userFieldNames.label]: e.userName,
            [userFieldNames.info]: e.fullOrgName,
          };
        }) ?? [],
      };
    },

    // 添加取消收藏
    async favoriteToggle({ favorite, record }) {
      const request = favorite ? postRbacCollectAdd : postRbacCollectRemoveCollect;
      const ids = resolveId(record?.[userFieldNames.value]);
      const res = await request({
        type: '2',
        orgId: ids.orgId,
        userId: ids.userId,
      }, setDataAuth(auth));
      if (res.success) {
        message.success(favorite ? '收藏成功' : '取消收藏成功');
      }
    },

    // 群组列表
    async groups({ search, current, pageSize }) {
      const res = await postGroupFindPage({
        type: '2',
        name: search,
        currentPage: current,
        pageSize,
      }, setDataAuth(auth));
      return {
        total: res.data?.total ?? 0,
        data: res.data?.records?.map((e) => {
          return {
            ...e,
            [userFieldNames.value]: e.id,
            [userFieldNames.label]: e.name,
          };
        }) ?? [],
      };
    },

    // 群组数据
    async groupData({ node }) {
      const res = await getGroupDetailById({ id: node?.id, showIsCollect: true }, setDataAuth(auth));
      return res.data?.pubGroupMemberList?.map((e) => {
        return {
          ...e,
          [userFieldNames.value]: joinId(e.orgId, e.userId),
          [userFieldNames.label]: e.userName,
          [userFieldNames.info]: e.fullOrgName,
          isLeaf: true,
        };
      }) ?? [];
    },

    // 用户列表
    async userList({ orgId, search, current, pageSize }) {
      const res = await postRbacUserUserForMultiOrgPage({
        orgId,
        realName: search,
        currentPage: current,
        pageSize,
        enable: true,
        showIsCollect: true,
      }, setDataAuth(auth));
      return {
        total: res.data?.total ?? 0,
        data: res.data?.records?.map((e) => {
          return {
            ...e,
            [userFieldNames.value]: joinId(e.orgId, e.userId),
            [userFieldNames.label]: e.userName,
            [userFieldNames.info]: e.fullOrgName,
          };
        }) ?? [],
      };
    },
  };
}

import type { AxiosRequestHeaders } from 'axios';
import type { LocationQueryValue } from 'vue-router';
import { find } from 'lodash-es';
import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';
import useSettingsStore from './settings';
import useTabbarStore from './tabbar';
import useRouteStore from './route';
import useMenuStore from './menu';
import { STORE_NAME } from '@/store/enum';
import router from '@/router';
import { getEncryptedData } from '@/utils/crypto';
import { getSysconfigGetSysThemeStyleConfig, getSysconfigGetUserThemeStyleConfig, postSysconfigResetUserThemeStyleConfig } from '@/api/modules/configData/xitongpeizhifuwu';

const useUserStore = defineStore(
  // 唯一ID
  STORE_NAME.USER,
  () => {
    const settingsStore = useSettingsStore();
    const tabbarStore = useTabbarStore();
    const routeStore = useRouteStore();
    const menuStore = useMenuStore();

    const user = reactive<User>({
      account: '',
      userId: '',
      token: '',
      avatar: '',
      refreshToken: '',
      orgList: [],
      orgId: '',
      permissions: [],
      department: '',
    });

    /**
     * @description
     * 判断用户是否已登录
     * @returns {boolean} 返回一个布尔值，表示用户是否已登录
     */
    const isLogin = computed(() => !!user.token);

    /**
     * 计算属性，返回用户的组织名称。
     * 如果用户有 orgId，则在 orgList 中找到对应的 orgName。
     * 如果用户没有 orgId，则找到 orgList 中主要组织的 orgName。
     * 如果找不到 orgName，则返回空字符串。
     */
    const userOrgName = computed(() => {
      let orgName: string | undefined;
      if (user.orgId) {
        const check = find(user.orgList, ['orgId', user.orgId]);
        orgName = check?.orgName;
      }
      else {
        const main = find(user.orgList, ['main', true]);
        orgName = main?.orgName;
      }
      return orgName || '';
    });

    /**
     * 用户登录函数
     * @param data 登录所需的数据
     * @param data.account 账号
     * @param data.password 密码
     * @param data.captchas 验证码
     * @param data.captchaHash 验证码哈希值
     * @param data.loginType 登录类型，默认为 'password'
     * @returns {Promise<void>}
     */
    async function login(data: {
      account: string
      password: string
      captchas: string
      captchaHash: string
      loginType?: 'password'
    }) {
      const {
        account: loginName,
        password,
        captchaHash: codeHash,
        captchas: code,
        loginType = 'password',
      } = data;
      const loginPwd = await getEncryptedData(password);
      const result = await postAuthLogin({
        loginType,
        loginName,
        loginPwd,
        codeHash,
        code,
      });
      const { accessToken, refreshToken: refreshTokenData } = result.data as Required<API.LoginTokenVo>;
      await setToken(accessToken, refreshTokenData);
      await getUserInfo();
    }

    /**
     * 执行用户注销操作，并跳转到登录页面。
     * @param _redirect - 注销后的重定向路径，默认为当前页面的完整路径。
     * @returns {Promise<void>}
     */
    async function logout(_redirect = router.currentRoute.value.fullPath) {
      await clean();
      router.push({
        name: 'login',
      });
    }

    /**
     * 清空用户信息和相关状态。
     * TODO: 也许应该实现一个更加通用的清理函数，用于清理所有状态。
     */
    async function clean() {
      user.account = '';
      user.userId = '';
      user.token = '';
      user.refreshToken = '';
      user.avatar = '';
      user.permissions = [];
      user.orgId = '';
      user.orgList = [];
      tabbarStore.clean();
      routeStore.removeRoutes();
      menuStore.setActived(0);
    }

    /**
     * 获取用户信息
     * @returns {Promise<void>} 一个 Promise，表示异步操作的结果
     */
    async function getUserInfo() {
      const res = await getRbacUserUserEntireInfo();
      const userData = res.data as Required<API.PubUserBo>;
      user.account = userData.realName || userData.loginName;
      user.avatar = userData.userPic;
      user.userId = userData.id;
    }

    /**
     * 修改用户密码
     * @param form - 包含要修改的密码和令牌的表单数据
     * @returns 修改密码的结果
     */
    async function changeUserPassword(form: API.putRbacUserChangePasswordParams & { token?: LocationQueryValue | LocationQueryValue[] }) {
      const headers = {} as AxiosRequestHeaders;
      if (form.token) {
        headers.authorization = form.token;
      }
      const encryptedOldpassword = await getEncryptedData(form.oldPassword);
      const encryptedNewpassword = await getEncryptedData(form.newPassword);
      const res = await putRbacUserChangePassword({
        oldPassword: encryptedOldpassword,
        newPassword: encryptedNewpassword,
      }, {
        headers,
      });
      return res;
    }

    /**
     * 设置令牌
     * @param accessToken 访问令牌
     * @param refreshTokenData 刷新令牌数据
     */
    async function setToken(accessToken: string, refreshTokenData: string) {
      user.token = accessToken;
      user.refreshToken = refreshTokenData;
    }

    /**
     * 获取用户权限列表
     * @returns 用户权限列表
     */
    async function getPermissions() {
      const res = await getRbacResourceGrantedResources();
      user.permissions = res.data!;
      return user.permissions;
    }

    async function getUserPreferences() {
      const res = await getSysconfigGetUserThemeStyleConfig();
      const content = res?.data?.content;
      if (content) {
        settingsStore.updateUserSettings(JSON.parse(content || '{}'));
      }
    }

    /**
     * 设置个人偏好设置
     */
    async function setPreferencesSetting(content: Settings.all) {
      await postSysconfigAddOrEditUserThemeStyleConfig({
        content: JSON.stringify(content),
      });
      settingsStore.updateUserSettings(content);
    }

    /**
     * 获取系统和个人合并后的偏好设置
     * @returns {Promise<void>}
     */
    async function getPreferences() {
      const res = await getSysconfigGetThemeStyleConfig();
      const content = res?.data?.content;
      if (content) {
        settingsStore.updateSettings(JSON.parse(content || '{}'), true);
      }
    }

    /**
     * 获取系统全局偏好设置
     */
    async function getPreferencesGlobalSettings() {
      const res = await getSysconfigGetSysThemeStyleConfig();
      const content = res?.data?.content;
      if (content) {
        settingsStore.updateGlobalSettings(JSON.parse(content || '{}'));
      }
    }

    /**
     * 并发获取个人偏好设置和系统全局偏好设置
     * @returns {Promise<void>}
     */
    async function getPreferencesAll() {
      await Promise.all([
        getPreferences(),
        getPreferencesGlobalSettings(),
        getUserPreferences(),
      ]);
      await settingsStore.setGlobaleSettingsFlag(true);
    }

    /**
     * 重置用户个人偏好设置为系统设置
     */
    async function resetSettings() {
      await postSysconfigResetUserThemeStyleConfig();
      await getPreferences();
      await getUserPreferences();
      message.success('已还原系统设置');
    }

    /**
     * 编辑密码
     * @param data - 包含密码和新密码的对象
     * @param data.password - 当前密码
     * @param data.newpassword - 新密码
     * @returns {Promise<void>}
     */
    async function editPassword(data: {
      password: string
      newpassword: string
    }) {
      await GetAPIPasswordEdit(data);
    }

    /**
     * 获取组织列表
     * @returns {Promise<void>}
     */
    async function getOrgList() {
      const res = await getRbacUserUserEntireInfo();
      const userOrgList = res.data?.userOrgList;
      user.orgList = userOrgList!;
      if (userOrgList?.length && !user.orgId) {
        user.orgId = find(userOrgList, ['main', true])!.orgId!;
      }
    }

    /**
     * 更改组织
     * @param changeOrgId - 要更改的组织ID
     * @returns {Promise<void>}
     */
    async function changeOrg(changeOrgId: string) {
      const res = await postAuthChangeLoginOrg({ orgId: changeOrgId });
      const { accessToken, refreshToken: refreshTokenData } = res.data as Required<API.LoginTokenVo>;
      await clean();
      await setToken(accessToken, refreshTokenData);
      await getUserInfo();
      user.orgId = changeOrgId;
      router.push({
        path: '/',
      });
    }

    return {
      user,
      isLogin,
      login,
      logout,
      getPermissions,
      getPreferences,
      editPassword,
      changeUserPassword,
      getOrgList,
      userOrgName,
      changeOrg,
      resetSettings,
      setPreferencesSetting,
      getPreferencesGlobalSettings,
      getPreferencesAll,
      setToken,
      getUserInfo,
      clean,
      ...toRefs(user),
    };
  },
  {
    persist: true,
  },
);

export default useUserStore;

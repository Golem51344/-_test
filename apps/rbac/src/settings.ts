/**
 * ========================================================================
 * @author         :  weiyafei
 * @email          :  2553241022@qq.com
 * @createdOn      :  2023-11-15 13:01
 * @description    :  请在此处编写或粘贴配置代码
 *========================================================================*
 */
import { defaultsDeep } from 'lodash-es';
import type { RequiredDeep } from 'type-fest';
import settingsDefault from '@/settings.default';

const globalSettings: Settings.all = {
  // 请在此处编写或粘贴配置代码
};

export default defaultsDeep(globalSettings, settingsDefault) as RequiredDeep<Settings.all>;

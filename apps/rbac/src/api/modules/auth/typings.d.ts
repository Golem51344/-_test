/* eslint-disable */
// @ts-nocheck
declare namespace API {
  interface getAuthLoginValidCodeParams {
    /** 尺寸(长x宽)，例：150x50表示长为150宽为50，不填默认150x50 */
    size?: string;
    /** 验证码长度，不填默认4位 */
    length?: number;
  }

  interface IResponseCode {
    code?: number;
    msg?: string;
    hint?: string;
  }

  interface LoginByPwdDto {
    /** 登录类型 */
    loginType: string;
    /** 登录名 */
    loginName: string;
    /** 密码 */
    loginPwd: string;
    /** 验证码hash */
    codeHash: string;
    /** 验证码 */
    code: string;
  }

  interface LoginTokenVo {
    /** 刷新令牌 */
    refreshToken?: string;
    /** 访问令牌 */
    accessToken?: string;
    loginResponse?: IResponseCode;
  }

  interface postAuthChangeLoginOrgParams {
    /** 新组织id */
    orgId: string;
  }

  interface postAuthTokenRefreshParams {
    /** 刷新令牌 */
    refreshToken: string;
  }

  interface ResponseDataLoginTokenVo {
    code?: number;
    msg?: string;
    hint?: string;
    data?: LoginTokenVo;
    success?: boolean;
  }

  interface ResponseDataString {
    code?: number;
    msg?: string;
    hint?: string;
    data?: string;
    success?: boolean;
  }

  interface ResponseDataValidCodeVo {
    code?: number;
    msg?: string;
    hint?: string;
    data?: ValidCodeVo;
    success?: boolean;
  }

  interface ValidCodeVo {
    /** 验证码key */
    key?: string;
    /** 验证码图片base64 */
    plaintext?: string;
  }
}

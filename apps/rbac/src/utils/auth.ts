/** 第三方类型 */
type ThirdParty = '4A';

/**
 * 跳转第三方登录
 */
export async function signIn(type: ThirdParty) {
  if (type === '4A') {
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_AUTH_4A_CLIENT_ID,
      response_type: 'code',
      redirect_uri: import.meta.env.VITE_AUTH_4A_REDIRECT_URI || `${window.location.origin}/#/auth/4A`,
    }).toString();

    const URL = `http://134.108.76.137:7001/index?${params}`;
    window.location.replace(URL);
  }
}

/**
 * 登录获取token
 */
export async function auth(type: ThirdParty) {
  const query = getUrlQuery();

  if (type === '4A') {
    const params = new URLSearchParams({ code: query.code }).toString();
    const response = await fetch(`${import.meta.env.VITE_APP_API_BASEURL}/bs/loginBy4a?${params}`);
    const res = await response.json();
    return {
      success: res?.success,
      message: res?.message,
      data: {
        accessToken: res?.data?.accessToken,
        refreshToken: res?.data?.refreshToken,
      },
    };
  }
}

function getUrlQuery() {
  const url = window.location.href;
  const qs = url.split('?')[1] ?? '';
  const params = new URLSearchParams(qs);

  const query: any = {};
  for (const [key, value] of params.entries()) {
    query[key] = value;
  }
  return query;
}

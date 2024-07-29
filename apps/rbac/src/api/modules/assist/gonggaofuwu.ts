import { basic as request } from '@/api/request';

/**
 * @description 删除公告服务
 * @url /notice/deleteNotice
 * @method GET
 * @author @pubinfo/openapi
 */
export function getNoticeDeleteNotice<R = API.ResponseData, T = API.ResponseData>(
  params: API.getNoticeDeleteNoticeParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  return request.Get<R, T>('/notice/deleteNotice', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 删除公告推送基本信息
 * @url /notice/deleteNoticeSend
 * @method GET
 * @author @pubinfo/openapi
 */
export function getNoticeDeleteNoticeSend<R = API.ResponseData, T = API.ResponseData>(
  params: API.getNoticeDeleteNoticeSendParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  return request.Get<R, T>('/notice/deleteNoticeSend', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 公告服务详情
 * @url /notice/detailNotice
 * @method GET
 * @author @pubinfo/openapi
 */
export function getNoticeDetailNotice<R = API.ResponseData, T = API.ResponseData>(
  params: API.getNoticeDetailNoticeParams,
  options?: Parameters<typeof request.Get<R, T>>[1],
) {
  return request.Get<R, T>('/notice/detailNotice', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @description 公告分页查询
 * @url /notice/pageNotice
 * @method POST
 * @author @pubinfo/openapi
 */
export function postNoticePageNotice<
  R = API.ResponseDataPageDataPubNotice,
  T = API.ResponseDataPageDataPubNotice,
>(body: API.PubNoticePageDto, options?: Parameters<typeof request.Post<R, T>>[2]) {
  return request.Post<R, T>('/notice/pageNotice', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 新增或编辑公告服务
 * @url /notice/saveOrUpdateNotice
 * @method POST
 * @author @pubinfo/openapi
 */
export function postNoticeSaveOrUpdateNotice<R = API.ResponseData, T = API.ResponseData>(
  body: API.PubNoticeDto,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/notice/saveOrUpdateNotice', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * @description 新增或编辑公告推送基本信息
 * @url /notice/saveOrUpdateNoticeSend
 * @method POST
 * @author @pubinfo/openapi
 */
export function postNoticeSaveOrUpdateNoticeSend<R = API.ResponseData, T = API.ResponseData>(
  body: API.PubNoticeSendDto,
  options?: Parameters<typeof request.Post<R, T>>[2],
) {
  return request.Post<R, T>('/notice/saveOrUpdateNoticeSend', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

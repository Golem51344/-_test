import type { RESPONSE_CODE } from '@/api/enum/code';

interface HttpError {
  code: RESPONSE_CODE
  data: any
  hint: string
  msg: string
  success: boolean
}

export function isHttpError(error: unknown): error is HttpError {
  return (error as HttpError).code !== undefined;
}

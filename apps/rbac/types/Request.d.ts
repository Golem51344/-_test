export interface RequestResult<T = any> {
  code: CODE
  msg: string
  hint: string
  data: T
  success: boolean
}

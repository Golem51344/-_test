declare module '@alova/adapter-axios' {
  import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from 'axios';
  import type { AlovaRequestAdapter } from 'alova';

  type AlovaAxiosRequestConfig =
    Omit<AxiosRequestConfig,
    | 'url'
    | 'method'
    | 'params'
    | 'data'
    | 'timeout'
    | 'cancelToken'
    | 'signal'
    | 'onUploadProgress'
    | 'onDownloadProgress'
    >;
  type AxiosRequestAdapter =
    AlovaRequestAdapter<
      any,
      any,
      AlovaAxiosRequestConfig,
      AxiosResponse,
      AxiosResponseHeaders
    >;

  interface AdapterCreateOptions {
    axios?: AxiosInstance
  }
  export declare function axiosRequestAdapter(options?: AdapterCreateOptions): AxiosRequestAdapter;
}

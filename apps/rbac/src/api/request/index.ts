import { createRequest } from '@/api/factory';

const basic = createRequest(import.meta.env.VITE_APP_API_BASEURL);

export {
  basic,
};

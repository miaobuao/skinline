import { Configuration, UserApi } from '@skinline/api';

const apiConfig = new Configuration({
  basePath: '/api',
});
const userApi = new UserApi(apiConfig);

export { userApi, apiConfig };

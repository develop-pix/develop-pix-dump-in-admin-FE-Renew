import axios from 'axios';
import { IMultipleUserManage } from '../interface';
import { isApiError, toErrorWithMessage } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const getMultipleUserMutation = (query: {
  page: number;
  perPage: number;
}): Promise<IMultipleUserManage> => {
  return axios
    .get(`/api/user?page=${query.page}&perPage=${query.perPage}`)
    .then((response) => response.data)
    .catch((error) => {
      if (isApiError(error)) {
        reportError(error.message);
      } else {
        reportError(toErrorWithMessage(error).message);
      }
      return Promise.reject(error.response);
    });
};

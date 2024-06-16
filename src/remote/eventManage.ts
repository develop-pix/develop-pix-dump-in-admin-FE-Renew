import axios from 'axios';
import { IMultipleEvent } from '../interface';
import { isApiError, toErrorWithMessage } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const getMultipleEventMutation = (query: {
  page: number;
  perPage: number;
}): Promise<IMultipleEvent> => {
  return axios
    .get(`/api/event?page=${query.page}&perPage=${query.perPage}`)
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

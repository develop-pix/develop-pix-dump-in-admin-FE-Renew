/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { IMultipleDashboard } from '../interface';
import { isApiError, toErrorWithMessage } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const getDashboardQuery = (): Promise<IMultipleDashboard> => {
  return axios
    .get('/api/dashboard')
    .then((response) => response.data)
    .catch((error) => {
      if (isApiError(error)) {
        const { data } = error.error;
        reportError(data.message);
      } else {
        reportError(toErrorWithMessage(error).message);
      }
      return Promise.reject(error);
    });
};

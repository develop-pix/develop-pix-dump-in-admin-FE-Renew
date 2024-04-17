/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { IUser } from '../interface';
import { isApiError, toErrorWithMessage } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const userAuthenticatedMutation = (body: {
  username: string;
  password: string;
}): Promise<IUser[]> => {
  return axios
    .post('/api/auth/login', body, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => {
      if (isApiError(error)) {
        reportError(error.message);
      } else {
        reportError(toErrorWithMessage(error).message);
      }
      return Promise.reject(error);
    });
};

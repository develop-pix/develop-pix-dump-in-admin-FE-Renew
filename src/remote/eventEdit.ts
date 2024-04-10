import axios from 'axios';
import { ISingleEvent } from '../interface';
import { isApiError, toErrorWithMessage } from '../utils';

export const getSingleEventQuery = (id: string): Promise<ISingleEvent> => {
  return axios
    .get(`/api/event/${id}`)
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

export const updateSingleEventMutation = (body: {
  title: string;
  content: string;
  mainThumbnailUrl: string;
  brandName: string;
  isPublic: boolean;
  startDate: Date;
  endDate: Date;
  hashtags: string[];
  images: string[];
  id: number;
}): Promise<null> => {
  return axios
    .patch(`api/event/${body.id}`, body)
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

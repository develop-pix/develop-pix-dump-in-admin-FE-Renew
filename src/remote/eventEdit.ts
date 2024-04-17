import axios from 'axios';
import { ISingleEvent } from '../interface';
import { isApiError, toErrorWithMessage } from '../utils';

export const getSingleEventQuery = (id: string): Promise<ISingleEvent> => {
  return axios
    .get(`/api/event/${id}`)
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

export const updateSingleEventMutation = ({
  body,
  id,
}: MutationParams): Promise<null> => {
  return axios
    .patch(`/api/event/${id}`, body)
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

interface EventEditData {
  title: string;
  content: string;
  mainThumbnailUrl: string;
  brandName: string;
  isPublic: boolean;
  startDate: string;
  endDate: string;
  hashtags: string[];
  images: string[];
}

interface MutationParams {
  body: EventEditData;
  id: number;
}

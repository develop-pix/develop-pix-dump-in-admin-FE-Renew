/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';
import { ISingleEvent } from '../../interface';

export type EventsState = {
  page: number;
  data: ISingleEvent[];
};

export const eventManageState = atom<EventsState[]>({
  key: 'eventManage',
  default: [],
});

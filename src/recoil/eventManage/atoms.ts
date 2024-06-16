/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';
import { IMutipleEventResult } from '../../interface';

export type EventsState = {
  page: number;
  data: IMutipleEventResult[];
};

export const eventManageState = atom<EventsState[]>({
  key: 'eventManage',
  default: [],
});

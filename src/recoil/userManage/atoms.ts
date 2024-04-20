/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';
import { IMultipleUserManageResult } from '../../interface';

export type UsersState = {
  page: number;
  data: IMultipleUserManageResult[];
};

export const userManageState = atom<UsersState[]>({
  key: 'userManage',
  default: [],
});

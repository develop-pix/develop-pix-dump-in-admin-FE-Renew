/* eslint-disable import/no-cycle */
import { SetterOrUpdater } from 'recoil';
import { UsersState } from '.';
import { IMultipleUserManage } from '../../interface';

// eslint-disable-next-line import/prefer-default-export
export const useUpdateUserManage = (
  recoilPage: number,
  fetchedData: IMultipleUserManage,
  setUserManageState: SetterOrUpdater<UsersState[]>
) => {
  setUserManageState((oldState) => {
    const payloadData = {
      page: recoilPage - 1,
      data: fetchedData.data.results,
    };
    const existEventIndex = oldState.findIndex(
      (event) => event.page === payloadData.page
    );

    if (existEventIndex !== -1) {
      const newState = [...oldState];
      newState[existEventIndex] = payloadData;
      return newState;
    }
    return [...oldState, payloadData];
  });
};

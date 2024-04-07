/* eslint-disable import/no-cycle */
import { SetterOrUpdater } from 'recoil';
import { IMultipleEvent } from '../../interface';
import { EventsState } from '.';

// eslint-disable-next-line import/prefer-default-export
export const useUpdateEventManage = (
  recoilPage: number,
  fetchedData: IMultipleEvent,
  setEventManageState: SetterOrUpdater<EventsState[]>
) => {
  setEventManageState((oldState) => {
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

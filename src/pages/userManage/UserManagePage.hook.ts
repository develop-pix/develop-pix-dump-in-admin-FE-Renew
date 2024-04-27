/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { getMultipleUserMutation } from '../../remote';
import { useUpdateUserManage, userManageState } from '../../recoil';
import {
  IMultipleUserManage,
  IMultipleUserManageResult,
} from '../../interface';
import {
  useDataAfterSearch,
  useDebounceSearch,
  useMutateDataBasedOnPageValue,
  useSlicePage,
} from '../../hooks';

const useUserManage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const setUserManageState = useSetRecoilState(userManageState);
  const userManage = useRecoilValue(userManageState);
  const { search, handleSearchInput } = useDebounceSearch();
  const tableHeaders = [
    '닉네임',
    '제목',
    '가입일 ',
    '리뷰 / 지점 / 이벤트',
    '탈퇴일',
  ];

  const mutation = useMutation({
    mutationFn: getMultipleUserMutation,
    onSuccess: (fetchedData, variables) => {
      useUpdateUserManage(variables.page, fetchedData, setUserManageState);
    },
  });

  const mergedData = useMemo(
    () =>
      [...userManage].reduce(
        (accumulator: IMultipleUserManageResult[], currentValue) => {
          return accumulator.concat(currentValue.data);
        },
        [] as IMultipleUserManageResult[]
      ),
    [userManage]
  );

  const dataSearchCondition = (
    testQuery: (words: string) => boolean,
    data: IMultipleUserManageResult
  ) => {
    // 유저 이름 먼저 찾는다
    if (testQuery(data.username)) {
      return true;
    }
    if (testQuery(data.email)) {
      return true;
    }
    if (testQuery(data.nickname)) {
      return true;
    }
    if (testQuery(data.deletedAt)) {
      return true;
    }
    if (testQuery(data.createdAt)) {
      return true;
    }
    if (testQuery(`${data.review}`)) {
      return true;
    }

    return false;
  };
  /** Search 타이핑 후 바뀐 데이터 */
  const dataAfterSearch = useDataAfterSearch<IMultipleUserManageResult>(
    mergedData,
    search,
    dataSearchCondition
  );

  /** 10개 단위로 자른 데이터  */
  const sliceTenPages = useSlicePage<IMultipleUserManageResult>(
    dataAfterSearch,
    page
  );

  /** 페이지 변경 핸들러 */
  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    event?.preventDefault();
    setPage(newPage);
  };

  const goToAlarmPage = () => {
    navigate('/alarm');
  };

  useMutateDataBasedOnPageValue<
    IMultipleUserManage,
    IMultipleUserManageResult[]
  >(mutation.mutate, page, userManage);

  return {
    state: { page, tableHeaders, sliceTenPages, mergedData },
    action: { handlePageChange, handleSearchInput, goToAlarmPage },
  };
};

export default useUserManage;

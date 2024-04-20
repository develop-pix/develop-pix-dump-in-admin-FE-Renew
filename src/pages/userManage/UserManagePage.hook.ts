/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getMultipleUserMutation } from '../../remote';
import { useUpdateUserManage, userManageState } from '../../recoil';
import { IMultipleUserManageResult } from '../../interface';
import { useDebounce } from '../../hooks';

const useUserManage = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const setUserManageState = useSetRecoilState(userManageState);
  const userManage = useRecoilValue(userManageState);
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

  /** 달라진 page 값이 Redux page 프로퍼티 값과 일치하는지 확인 */
  const hasPageValue = useMemo(
    () => userManage.findIndex((x) => x.page === page),
    [userManage, page]
  );

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

  /** Search 타이핑 후 바뀐 데이터 */
  const dataAfterSearch = useMemo(() => {
    return [...mergedData].filter((data) => {
      const query = new RegExp(search, 'i');
      const testQuery = (words: string) => query.test(words);

      // 메인썸내일 먼저 찾는다
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
    });
  }, [mergedData, search]);

  const debounceSearch = useDebounce((term) => {
    setSearch(term);
  }, 500);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value as string;
    debounceSearch(input);
  };

  /** 자를 페이지 단위 */
  const pageUnit = 10;

  /** 10개 단위로 자른 데이터  */
  const sliceTenPages =
    dataAfterSearch &&
    [...dataAfterSearch]?.slice(page * pageUnit, page * pageUnit + pageUnit);

  /** 페이지 변경 핸들러 */
  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    event?.preventDefault();
    setPage(newPage);
  };

  // 만약 달라진 page 값이 Redux 안에 없을시 API를 Call함
  useEffect(() => {
    let ignore = false;
    if (!ignore && hasPageValue === -1)
      mutation.mutate({
        page: page + 1,
        perPage: 10,
      });

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPageValue, page]);

  return {
    state: { page, tableHeaders, sliceTenPages, mergedData },
    action: { handlePageChange, handleSearchInput },
  };
};

export default useUserManage;

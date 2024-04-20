import { UseMutateFunction } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

/**
 *
 * usePageManage hook은 EventManagePage, UserManagePage와 같은 관리 페이지에 자주 사용되는 로직을 묶은 파일입니다,
 *
 * 자주 사용되는 로직은 이렇습니다:
 *
 * 1. pagination 값에 따라 새 페이지에 상응하는 데이터를 불러옵니다
 * 2. 합친 데이터들을 10개씩 자릅니다
 * 3. search input과 input condition의 의존성을 주입받아 필터링 된 데이터를 리턴합니다.
 *
 * */

interface IMutation<T> {
  mutate: UseMutateFunction<
    T,
    Error,
    { page: number; perPage: number },
    unknown
  >;
}

interface IPageData<T> {
  page: number;
  data: T;
}

export const useMutateDataBasedOnPageValue = <T, U>(
  mutate: IMutation<T>['mutate'],
  page: number,
  data: Array<IPageData<U>>
) => {
  /** 달라진 page 값이 Redux page 프로퍼티 값과 일치하는지 확인 */
  const hasPageValue = useMemo(
    () => data.findIndex((x) => x.page === page),
    [data, page]
  );

  // 만약 달라진 page 값이 Redux 안에 없을시 API를 Call함
  useEffect(() => {
    let ignore = false;
    if (!ignore && hasPageValue === -1)
      mutate({
        page: page + 1,
        perPage: 10,
      });

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPageValue, page]);
};

export const useSlicePage = <T>(data: Array<T>, page: number) => {
  const pageUnit = 10;

  /** 10개 단위로 자른 데이터  */
  const sliceTenPages =
    data && [...data]?.slice(page * pageUnit, page * pageUnit + pageUnit);

  return sliceTenPages;
};

export const useDataAfterSearch = <T>(
  mergedData: Array<T>,
  search: string,
  dataSearchCondition: (
    testQuery: (words: string) => boolean,
    data: T
  ) => boolean
) => {
  return [...mergedData].filter((data) => {
    const query = new RegExp(search, 'i');
    const testQuery = (words: string) => query.test(words);

    return dataSearchCondition(testQuery, data);
  });
};
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { eventManageState, useUpdateEventManage } from '../../recoil';
import { getMultipleEventMutation } from '../../remote';
import { IMultipleEvent, IMutipleEventResult } from '../../interface';
import {
  useDataAfterSearch,
  useDebounceSearch,
  useMutateDataBasedOnPageValue,
  useSlicePage,
} from '../../hooks';

const useEventManage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [checkedSort, setCheckedSort] = useState(false);
  const [checkedDeadline, setCheckedDeadline] = useState(false);
  const setEventManageState = useSetRecoilState(eventManageState);
  const eventManage = useRecoilValue(eventManageState);
  const { search, handleSearchInput } = useDebounceSearch();

  const mutation = useMutation({
    mutationFn: getMultipleEventMutation,
    onSuccess: (fetchedData, variables) => {
      useUpdateEventManage(variables.page, fetchedData, setEventManageState);
    },
  });

  const mergedData = useMemo(
    () =>
      eventManage.reduce((accumulator: IMutipleEventResult[], currentValue) => {
        return accumulator.concat(currentValue.data);
      }, [] as IMutipleEventResult[]),
    [eventManage]
  );

  /** 기간 올림차순, 내림차순 핸들러 */
  const handleSortByDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedSort(event.target.checked);
  };

  /** 마감순(가장 마감 기한이 적게 남은 것이 상단)으로 정렬 */
  const handleSortByDeadline = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedDeadline(event.target.checked);
  };

  /** 페이지 변경 핸들러 */
  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    event?.preventDefault();
    setPage(newPage);
  };

  const addNewEvent = () => {
    navigate('./new');
  };

  const dataSearchCondition = (
    testQuery: (words: string) => boolean,
    data: IMutipleEventResult
  ) => {
    // 메인썸내일 먼저 찾는다
    if (testQuery(data.mainThumbnailUrl)) {
      return true;
    }
    if (testQuery(data.brandName)) {
      return true;
    }
    if (testQuery(data.content)) {
      return true;
    }
    if (testQuery(data.startDate)) {
      return true;
    }
    if (testQuery(data.endDate)) {
      return true;
    }
    if (testQuery(data.title)) {
      return true;
    }
    if (testQuery(data.hashtags.join(', '))) {
      return true;
    }

    return false;
  };

  /** Search 타이핑 후 바뀐 데이터 */
  const dataAfterSearch = useDataAfterSearch<IMutipleEventResult>(
    mergedData,
    search,
    dataSearchCondition
  );

  /** 10개 단위로 자른 데이터  */
  const sliceTenPages = useSlicePage(dataAfterSearch, page);

  const tableHeaders = [
    '대표사진',
    '포토부스명',
    '제목',
    '설명',
    '기간',
    '해시태그',
    '편집',
  ];

  useMutateDataBasedOnPageValue<IMultipleEvent, IMutipleEventResult[]>(
    mutation.mutate,
    page,
    eventManage
  );

  // 체크 여부에 따라 기간 등록순(내림차순, 오름차순)으로 정렬
  useEffect(() => {
    if (checkedSort) {
      dataAfterSearch.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateA - dateB;
      });
    } else {
      dataAfterSearch.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateB - dateA;
      });
    }
  }, [checkedSort, dataAfterSearch]);

  // 체크 여부에 따라 마감순(가장 마감 기한이 적게 남은 것이 상단)으로 정렬
  useEffect(() => {
    if (checkedDeadline) {
      dataAfterSearch.sort((a, b) => {
        const dateA =
          new Date(a.endDate).getTime() - new Date(a.startDate).getTime();
        const dateB =
          new Date(b.endDate).getTime() - new Date(b.startDate).getTime();
        return dateB - dateA;
      });
    } else {
      dataAfterSearch.sort((a, b) => {
        const dateA =
          new Date(a.endDate).getTime() - new Date(a.startDate).getTime();
        const dateB =
          new Date(b.endDate).getTime() - new Date(b.startDate).getTime();

        return dateA - dateB;
      });
    }
  }, [checkedDeadline, dataAfterSearch]);

  return {
    state: {
      page,
      sliceTenPages,
      checkedSort,
      tableHeaders,
      checkedDeadline,
    },
    action: {
      handlePageChange,
      handleSearchInput,
      handleSortByDate,
      handleSortByDeadline,
      addNewEvent,
    },
  };
};

export default useEventManage;

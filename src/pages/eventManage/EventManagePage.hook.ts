/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { eventManageState, useUpdateEventManage } from '../../recoil';
import { getMultipleEventMutation } from '../../remote';
import { IMutipleEventResult } from '../../interface';
import { useDebounce } from '../../hooks';

/* eslint-disable import/prefer-default-export */
export const useEventManage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [checkedSort, setCheckedSort] = useState(false);
  const [checkedDeadline, setCheckedDeadline] = useState(false);
  const setEventManageState = useSetRecoilState(eventManageState);
  const eventManage = useRecoilValue(eventManageState);

  const mutation = useMutation({
    mutationFn: getMultipleEventMutation,
    onSuccess: (fetchedData, variables) => {
      useUpdateEventManage(variables.page, fetchedData, setEventManageState);
    },
  });

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

  /** 달라진 page 값이 Redux page 프로퍼티 값과 일치하는지 확인 */
  const hasPageValue = useMemo(
    () => eventManage.findIndex((x) => x.page === page),
    [eventManage, page]
  );

  const mergedData = useMemo(
    () =>
      eventManage.reduce((accumulator: IMutipleEventResult[], currentValue) => {
        return accumulator.concat(currentValue.data);
      }, [] as IMutipleEventResult[]),
    [eventManage]
  );
  const debounceSearch = useDebounce((term) => {
    setSearch(term);
  }, 500);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value as string;
    debounceSearch(input);
  };

  const addNewEvent = () => {
    navigate('./new');
  };

  /** Search 타이핑 후 바뀐 데이터 */
  const dataAfterSearch = useMemo(() => {
    return [...mergedData].filter((data) => {
      const query = new RegExp(search, 'i');
      const testQuery = (words: string) => query.test(words);

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
    });
  }, [mergedData, search]);

  /** 자를 페이지 단위 */
  const pageUnit = 10;

  /** 10개 단위로 자른 데이터  */
  const sliceTenPages =
    dataAfterSearch &&
    [...dataAfterSearch]?.slice(page * pageUnit, page * pageUnit + pageUnit);

  const tableHeaders = [
    '대표사진',
    '포토부스명',
    '제목',
    '설명',
    '기간',
    '해시태그',
    '편집',
  ];

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

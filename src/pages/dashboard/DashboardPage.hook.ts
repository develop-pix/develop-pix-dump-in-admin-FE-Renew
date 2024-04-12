import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getDashboardQuery } from '../../remote';

const useDashboardPage = () => {
  const { data: dashboardData } = useQuery({
    queryKey: ['/api/dashboard'],
    queryFn: getDashboardQuery,
  });

  const data = dashboardData?.data;

  const weekData = useMemo(
    () => data && [...data].slice(data.length - 7, data.length),
    [data]
  );
  /** 주 회원가입자 수 */
  const weekUsers = useMemo(
    () =>
      weekData?.reduce(
        (accumulator, currentValue) => accumulator + currentValue.user,
        0
      ),
    [weekData]
  );

  /** 주 리뷰 수 */
  const weekReviews = useMemo(
    () =>
      weekData?.reduce(
        (accumulator, currentValue) => accumulator + currentValue.review,
        0
      ),
    [weekData]
  );

  /** 달 리뷰 수, 회원 가입자 수  */
  const monthData = useMemo(
    () => data && [...data].slice(data.length - 28, data.length),
    [data]
  );

  /** 달 회원 가입자 수 */
  const monthUsers = useMemo(
    () =>
      monthData?.reduce(
        (accumulator, currentValue) => accumulator + currentValue.user,
        0
      ),
    [monthData]
  );
  /** 달 리뷰 수 */
  const monthReviews = useMemo(
    () =>
      monthData?.reduce(
        (accumulator, currentValue) => accumulator + currentValue.review,
        0
      ),
    [monthData]
  );

  /** 월간 합계 데이터 */
  const thisMonthData = {
    date: '이번 달 합계',
    user: monthUsers ?? 0,
    review: monthReviews ?? 0,
  };

  /** 주간 합계 데이터 */
  const thisWeekData = {
    date: '최근 7일 합계',
    user: weekUsers ?? 0,
    review: weekReviews ?? 0,
  };

  return {
    state: {
      data: data ?? [],
      thisWeekData,
      thisMonthData,
    },
  };
};

export default useDashboardPage;

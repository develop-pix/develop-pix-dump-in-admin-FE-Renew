import React from 'react';

const useAlarmPage = () => {
  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      description: { value: string };
      screenInfo: { value: string };
      isAlarm: { checked: boolean };
      alarmDate: { value: string };
    };
    const title = target.title.value;
    const description = target.description.value;
    const screenInfo = target.screenInfo.value;
    const isAlarm = target.isAlarm.checked;
    const alarmDate = target.alarmDate.value;

    // TODO
    // API 연동
    console.log(title, description, screenInfo, isAlarm, alarmDate);
  };

  return {
    state: {},
    action: {
      onSubmitHandler,
    },
  };
};

export default useAlarmPage;

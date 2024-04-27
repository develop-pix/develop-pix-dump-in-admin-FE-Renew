/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable consistent-return */
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface IProps {
  hashtag: string[];
  setHashtag: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function HashTagInput({ hashtag, setHashtag }: IProps) {
  /* Event Hashtag는 5개 고정 */
  const hashtagInfo = [
    { id: 0, tag: '캐릭터', value: '캐릭터' },
    { id: 1, tag: '콜라보', value: '콜라보' },
    { id: 2, tag: '연예인', value: '연예인' },
    { id: 3, tag: '계절', value: '계절' },
    { id: 4, tag: '이달의 프레임', value: '이달의 프레임' },
  ];

  return (
    <Box sx={{ display: 'flex', gap: '15px' }}>
      {hashtagInfo.map((data) => {
        return (
          <HashTagCheckbox
            hashtagData={data}
            hashtag={hashtag}
            setHashtag={setHashtag}
            key={data.id}
          />
        );
      })}
    </Box>
  );
}

interface HashTagCheckboxProps {
  hashtagData: { id: number; tag: string; value: string };
  hashtag: string[];
  setHashtag: React.Dispatch<React.SetStateAction<string[]>>;
}

function HashTagCheckbox({
  hashtagData,
  hashtag,
  setHashtag,
}: HashTagCheckboxProps) {
  const [check, setCheck] = useState(false);

  /* 초기값 설정 */
  useEffect(() => {
    const checkInitialValue =
      hashtag.filter((item) => item === hashtagData.tag).length === 1;
    if (checkInitialValue) {
      setCheck(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashtag]);

  /* HashTag 배열에 추가 or 삭제, 3개이상 선택시 Alert */
  const onCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (hashtag.length >= 3) {
        return alert('해시태그는 3개까지 선택 가능합니다.');
      }
      setCheck(e.target.checked);
      setHashtag((prev) => [...prev, hashtagData.tag]);
    }

    if (!e.target.checked && hashtag.includes(hashtagData.tag)) {
      setCheck(!check);
      setHashtag(hashtag.filter((item) => item !== hashtagData.tag));
    }
  };

  return (
    <FormControlLabel
      label={hashtagData.value}
      control={<Checkbox checked={check} onChange={onCheckHandler} />}
    />
  );
}

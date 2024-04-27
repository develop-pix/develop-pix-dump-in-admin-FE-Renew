import { Box, TextField } from '@mui/material';
import { useState } from 'react';

interface IProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export default function TitleInput({ input, setInput }: IProps) {
  const [error, setError] = useState(false);

  const titleInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 30) {
      setError(true);
    } else {
      setError(false);
      setInput(e.currentTarget.value);
    }
  };
  return (
    <Box>
      {error ? (
        <TextField
          sx={{ width: '40vw' }}
          size="small"
          value={input}
          onChange={titleInputHandler}
          name="title"
          error
          helperText="최대 30글자 까지 입력 가능합니다."
        />
      ) : (
        <TextField
          sx={{ width: '40vw' }}
          size="small"
          name="title"
          value={input}
          onChange={titleInputHandler}
        />
      )}
    </Box>
  );
}

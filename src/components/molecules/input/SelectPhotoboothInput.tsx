import { Box, MenuItem, TextField } from '@mui/material';

interface IProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectPhotoboothInput({ input, setInput }: IProps) {
  const photoboothData = [
    { photoboothId: 0, value: '포토그레이' },
    { photoboothId: 1, value: '하루필름' },
  ];

  const photoboothInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <Box>
      <TextField
        sx={{ width: '15vw' }}
        select
        size="small"
        name="photoboothName"
        onChange={photoboothInputHandler}
        value={input === '' ? photoboothData[0].value : input}
      >
        {photoboothData.map((option) => {
          return (
            <MenuItem key={option.photoboothId} value={option.value}>
              {option.value}
            </MenuItem>
          );
        })}
      </TextField>
    </Box>
  );
}

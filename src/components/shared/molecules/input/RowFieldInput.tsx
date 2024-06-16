import { Box, Typography, TextField } from '@mui/material';

interface IProps {
  label: string;
  width: string;
  row: number;
  maxLength: number | null;
  name: string;
}
export default function RowFieldInput({
  label,
  width,
  row,
  maxLength,
  name,
}: IProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography
        sx={{ width: '130px' }}
        fontSize={18}
        fontWeight={600}
        display="flex"
        alignItems="center"
      >
        {label}
      </Typography>
      <TextField
        sx={{ width: { width } }}
        variant="outlined"
        label={label}
        name={name}
        multiline
        rows={row}
        inputProps={{ maxLength }}
      />
    </Box>
  );
}

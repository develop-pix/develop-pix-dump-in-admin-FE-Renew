/* eslint-disable import/no-extraneous-dependencies */
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

interface IProps {
  date: Date;
  name: string;
  title: string;
}
export default function DatePickerInput({ date, name, title }: IProps) {
  const formatDate = dayjs(date);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        format="YYYY-MM-DD"
        label={title}
        value={formatDate}
        name={name}
      />
    </LocalizationProvider>
  );
}

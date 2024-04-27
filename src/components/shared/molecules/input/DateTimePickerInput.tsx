/* eslint-disable import/no-extraneous-dependencies */
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

interface IProps {
  date: Date;
  name: string;
  title: string;
}
export default function DateTimePickerInput({ date, name, title }: IProps) {
  const formatDate = dayjs(date);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker label={title} value={formatDate} name={name} />
    </LocalizationProvider>
  );
}

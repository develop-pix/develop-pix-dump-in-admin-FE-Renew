import { TableCell, TableRow as Row } from '@mui/material';

interface IProps {
  nickname: string;
  email: string;
  join_date: string;
  review: number;
  withdrawal_date: string;
}

export default function TableRowV2({
  nickname,
  email,
  join_date,
  review,
  withdrawal_date,
}: IProps) {
  return (
    <Row hover role="checkbox" tabIndex={-1}>
      <TableCell sx={{ fontSize: '16px', minWidth: 120 }}>{nickname}</TableCell>
      <TableCell sx={{ fontSize: '16px', minWidth: 150 }}>{email}</TableCell>
      <TableCell sx={{ fontSize: '16px' }}>{join_date}</TableCell>
      <TableCell sx={{ fontSize: '16px', minWidth: 120 }}>{review}</TableCell>
      <TableCell sx={{ fontSize: '16px', minWidth: 130 }}>
        {withdrawal_date}
      </TableCell>
    </Row>
  );
}

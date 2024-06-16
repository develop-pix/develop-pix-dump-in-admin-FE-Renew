import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ChartContainer } from '../shared/atom';
import { IMultipleDashboard } from '../../interface';

interface IProps {
  data: IMultipleDashboard['data'];
  thisWeekData: {
    date: string;
    user: number;
    review: number;
  };
  thisMonthData: {
    date: string;
    user: number;
    review: number;
  };
}
export default function DashboardTable({
  data,
  thisWeekData,
  thisMonthData,
}: IProps) {
  return (
    <ChartContainer title="회원가입 현황">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>일자</TableCell>
              <TableCell>가입자</TableCell>
              <TableCell>리뷰</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.date}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.user}</TableCell>
                <TableCell>{item.review}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell>{thisWeekData.date}</TableCell>
              <TableCell>{thisWeekData.user}</TableCell>
              <TableCell>{thisWeekData.review}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{thisMonthData.date}</TableCell>
              <TableCell>{thisMonthData.user}</TableCell>
              <TableCell>{thisMonthData.review}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </ChartContainer>
  );
}

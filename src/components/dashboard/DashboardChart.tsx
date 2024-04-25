// eslint-disable-next-line import/no-extraneous-dependencies
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer } from '../atom';
import { IMultipleDashboard } from '../../interface';
import { customColors } from '../../styles';

interface IProps {
  data: IMultipleDashboard['data'];
}
export default function DashboardChart({ data }: IProps) {
  return (
    <ChartContainer title="회원가입 현황">
      <ResponsiveContainer width="100%" aspect={1.8}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(date) => date.substring(5)} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="linear"
            dataKey="user"
            stroke={customColors.main_blue}
            name="회원가입 수"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

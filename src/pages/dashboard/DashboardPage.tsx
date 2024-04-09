/* eslint-disable import/no-cycle */
import { Box } from '@mui/material';
import { useDashboardPage } from './DashboardPage.hook';
import { DashboardChart, DashboardTable, Sidebar } from '../../components';

export default function DashboardPage() {
  const { state } = useDashboardPage();

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ display: 'flex' }}>
        <DashboardChart data={state.data} />
        <DashboardTable
          data={state.data}
          thisWeekData={state.thisWeekData}
          thisMonthData={state.thisMonthData}
        />
      </Box>
    </Box>
  );
}

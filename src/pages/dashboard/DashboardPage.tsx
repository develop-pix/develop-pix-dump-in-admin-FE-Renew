import { Dashboard, SidebarLayout } from '../../components';
import useDashboardPage from './DashboardPage.hook';

export default function DashboardPage() {
  const { state } = useDashboardPage();

  return (
    <SidebarLayout>
      <Dashboard.Chart data={state.data} />
      <Dashboard.Table
        data={state.data}
        thisWeekData={state.thisWeekData}
        thisMonthData={state.thisMonthData}
      />
    </SidebarLayout>
  );
}

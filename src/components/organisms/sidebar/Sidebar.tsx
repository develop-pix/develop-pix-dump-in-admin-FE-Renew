import { Drawer, List } from '@mui/material';
import { customColors } from '../../../styles';
import { SidebarItem } from '../..';

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 200,
          backgroundColor: customColors.main_pink,
          color: customColors.white,
        },
      }}
    >
      <List sx={{ marginTop: '100px' }}>
        <SidebarItem url="/dashboard" title="대시보드" />
        <SidebarItem url="/event" title="이벤트관리" />
        <SidebarItem url="/branch" title="보토부스 관리" />
        <SidebarItem url="/review" title="리뷰 관리" />
        <SidebarItem url="/user" title="사용자 관리" />
      </List>
    </Drawer>
  );
}
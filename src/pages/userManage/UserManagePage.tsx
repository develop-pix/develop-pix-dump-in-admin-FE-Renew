import {
  Box,
  IconButton,
  InputBase,
  Paper,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import { PaperContainer, SidebarLayout, TableHeader } from '../../components';
import { customColors } from '../../styles';
import useUserManage from './UserManagePage.hook';
import { IMultipleUserManageResult } from '../../interface';
import TableRowV2 from '../../components/shared/molecules/table/TableRowV2';

export default function UserManagePage() {
  const { state, action } = useUserManage();

  return (
    <SidebarLayout>
      <PaperContainer
        title="사용자 관리"
        top={
          <>
            <Box
              onClick={action.goToAlarmPage}
              sx={{
                fontWeight: '600',
                padding: '13px 10px 5px 10px',
                borderRadius: '10px 10px 0 0',
                border: `2px solid ${customColors.sub_pink}`,
                borderBottom: 'none',
                backgroundColor: `${customColors.white}`,
                fontSize: '18px',
                cursor: 'pointer',
              }}
            >
              알림 전송
            </Box>
            <Box sx={{ display: 'flex', gap: '50px' }}>
              <Paper
                component="form"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: 300,
                  margin: '0px 0px 5px 0px',
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="검색하기"
                  inputProps={{ 'aria-label': '검색' }}
                  onChange={action.handleSearchInput}
                />
                <IconButton
                  type="button"
                  sx={{ p: '10px' }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Box>
          </>
        }
        down={
          <>
            <Box
              sx={{
                width: 'auto',
                display: 'inline-block',
                overflow: 'hidden',
                border: '2px solid',
                borderColor: `${customColors.sub_pink}`,
                borderRadius: '0px 10px 10px 10px',
              }}
            >
              <TableContainer>
                <TableHeader headers={state.tableHeaders} />
                <TableBody>
                  {state.sliceTenPages &&
                    state.sliceTenPages.map(
                      (item: IMultipleUserManageResult) => (
                        <TableRowV2
                          key={item.id}
                          nickname={item.nickname}
                          email={item.email}
                          review={item.review}
                          join_date={dayjs(item.createdAt).toString()}
                          withdrawal_date={
                            item.deletedAt
                              ? dayjs(item.deletedAt).toString()
                              : '없음'
                          }
                        />
                      )
                    )}
                </TableBody>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={10}
                rowsPerPage={9}
                page={state.page}
                onPageChange={action.handlePageChange}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                margin: '50px 40px 0 40px',
                border: '2px solid',
                borderColor: `${customColors.sub_pink}`,
                borderRadius: '10px',
                padding: '10px',
                alignItems: 'center',
                height: '40px',
                fontSize: '18px',
              }}
            >
              <Box>총 회원가입자 수 : {state.mergedData.length}</Box>
            </Box>
          </>
        }
      />
    </SidebarLayout>
  );
}

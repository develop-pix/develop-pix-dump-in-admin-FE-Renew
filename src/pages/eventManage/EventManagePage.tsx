/* eslint-disable import/no-cycle */
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  InputBase,
  Paper,
  Switch,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  PaperContainer,
  SidebarLayout,
  TableHeader,
  TableRow,
} from '../../components';
import { customColors } from '../../styles';
import { IMutipleEventResult } from '../../interface';
import useEventManage from './EventManagePage.hook';

export default function EventManagePage() {
  const { state, action } = useEventManage();

  return (
    <SidebarLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <PaperContainer
          title="이벤트 관리"
          top={
            <>
              <Box sx={{ display: 'flex' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={state.checkedSort}
                      onChange={action.handleSortByDate}
                    />
                  }
                  label="최신등록순"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={state.checkedDeadline}
                      onChange={action.handleSortByDeadline}
                    />
                  }
                  label="마감순"
                />
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
                <Button
                  sx={{ margin: '0px 10px 5px 0px' }}
                  color="primary"
                  variant="contained"
                  type="button"
                  onClick={action.addNewEvent}
                >
                  추가
                </Button>
              </Box>
            </>
          }
          down={
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
                    state.sliceTenPages.map((item: IMutipleEventResult) => (
                      <TableRow
                        key={item.id}
                        id={item.id}
                        src={item.mainThumbnailUrl}
                        name={item.brandName}
                        title={item.title}
                        description={item.content}
                        term={`${item.startDate} ~ ${item.endDate}`}
                        hashtag={item.hashtags.join(',')}
                      />
                    ))}
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
          }
        />
      </Box>
    </SidebarLayout>
  );
}

import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  DateTimePickerInput,
  PaperContainer,
  RowFieldInput,
  SidebarLayout,
} from '../../components';
import { customColors } from '../../styles';
import useAlarmPage from './AlarmPage.hook';

export default function AlarmPage() {
  const { action } = useAlarmPage();
  return (
    <SidebarLayout>
      <PaperContainer
        component="form"
        title="알림전송"
        onSubmit={action.onSubmitHandler}
        topContent={
          <>
            <Box
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
              사용자 관리
            </Box>
            <Button
              sx={{ margin: '0px 10px' }}
              color="primary"
              variant="contained"
              type="submit"
            >
              전송
            </Button>
          </>
        }
        bottomContent={
          <Box
            sx={{
              width: 'auto',
              display: 'inline-block',
              overflow: 'hidden',
              border: `2px solid ${customColors.sub_pink}`,
              borderRadius: '0px 10px 10px 10px',
              minWidth: '50vw',
            }}
          >
            <Box
              sx={{
                margin: '50px 20px 50px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '70px',
              }}
            >
              <Box
                sx={{ display: 'flex', gap: '20px', flexDirection: 'column' }}
              >
                <RowFieldInput
                  label="제목"
                  name="title"
                  width="90%"
                  row={3}
                  maxLength={100}
                />
                <RowFieldInput
                  name="description"
                  label="내용"
                  width="90%"
                  row={6}
                  maxLength={300}
                />
                <RowFieldInput
                  label="스크린정보"
                  name="screenInfo"
                  width="70%"
                  row={2}
                  maxLength={null}
                />
                <FormControlLabel
                  label="예약발송"
                  control={<Checkbox name="isAlarm" />}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePickerInput
                    name="alarmDate"
                    title="예약 발송일"
                    date={new Date()}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          </Box>
        }
      />
    </SidebarLayout>
  );
}

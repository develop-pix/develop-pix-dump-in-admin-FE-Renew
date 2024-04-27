import { Box, Button } from '@mui/material';
import { PropsWithChildren } from 'react';
import { customColors } from '../../styles';

interface IProps extends PropsWithChildren {
  onSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  goPrevRoute: () => void;
}
export default function EventEditForm({
  children,
  goPrevRoute,
  onSubmitHandler,
}: IProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        margin: '40px 0px 40px 0px',
        minWidth: '20vw',
      }}
      component="form"
      onSubmit={onSubmitHandler}
    >
      <Box sx={{ width: '95%' }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              fontWeight: '600',
              borderColor: `${customColors.color_border_gray}`,
              borderBottom: 'none',
              padding: '13px 10px 5px 10px',
              borderRadius: '10px 10px 0 0',
              backgroundColor: `${customColors.sub_pink}`,
              fontSize: '18px',
            }}
          >
            이벤트 관리
          </Box>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Button
              sx={{ margin: '0px 10px 5px 0px' }}
              size="small"
              variant="contained"
              color="error"
              onClick={goPrevRoute}
            >
              취소
            </Button>
            <Button
              sx={{ margin: '0px 10px 5px 0px' }}
              color="primary"
              variant="contained"
              type="submit"
            >
              수정
            </Button>
          </Box>
        </Box>
        {children}
      </Box>
    </Box>
  );
}

/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, TextField } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { customColors } from '../../styles';
import { LoginInput } from '../../pages';

interface IProps {
  onSubmitHandler: (data: LoginInput) => void;
  register: UseFormReturn<LoginInput>['register'];
  handleSubmit: UseFormReturn<LoginInput>['handleSubmit'];
  inputErrors: UseFormReturn<LoginInput>['formState']['errors'];
  loginError: Error | null;
}

export default function LoginForm({
  onSubmitHandler,
  register,
  handleSubmit,
  inputErrors,
  loginError,
}: IProps) {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 500,
        }}
      >
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div>
            <TextField
              {...register('username')}
              label="ID"
              type="text"
              id="username"
              name="username"
              placeholder="ID를 입력해주세요"
              autoComplete="email"
              margin="dense"
              fullWidth
            />
          </div>
          {inputErrors?.username && (
            <Box marginTop="10px" color={customColors.color_invalid}>
              {inputErrors?.username.message}
            </Box>
          )}

          <div>
            <TextField
              {...register('password')}
              label="Password"
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              autoComplete="current-password"
              margin="dense"
              fullWidth
            />

            {inputErrors?.password && (
              <Box marginTop="10px" color={customColors.color_invalid}>
                {inputErrors?.password.message}
              </Box>
            )}
          </div>
          <Button variant="contained" fullWidth type="submit">
            로그인
          </Button>
          {loginError && 'data' in loginError && (
            <Box marginTop="10px" color={customColors.color_invalid}>
              {(loginError as { data: { message: string } }).data.message}
            </Box>
          )}
        </form>
      </Box>
    </Box>
  );
}

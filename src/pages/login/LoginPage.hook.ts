/* eslint-disable import/no-extraneous-dependencies */
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { requiredLogin } from '../../hooks';
import { userAuthenticatedMutation } from '../../remote';

export interface LoginInput {
  username: string;
  password: string;
}

export const useLoginPage = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: userAuthenticatedMutation,
    onSuccess() {
      navigate('/dashboard');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors: inputErrors },
  } = useForm<LoginInput>({
    mode: 'onChange',
    resolver: zodResolver(requiredLogin),
  });

  /** 로그인 Form을 위한 Submit Handler  */
  const onSubmitHandler: SubmitHandler<LoginInput> = async (
    data: LoginInput
  ) => {
    const body = { username: data.username, password: data.password };
    mutation.mutate(body);
  };

  return {
    state: {
      onSubmitHandler,
      register,
      inputErrors,
      loginError: mutation.error,
    },
    action: {
      handleSubmit,
    },
  };
};

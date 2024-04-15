// eslint-disable-next-line import/no-cycle
import { LoginForm } from '../../components';
import useLoginPage from './LoginPage.hook';

export default function LoginPage() {
  const { state, action } = useLoginPage();

  return (
    <LoginForm
      onSubmitHandler={state.onSubmitHandler}
      register={state.register}
      handleSubmit={action.handleSubmit}
      inputErrors={state.inputErrors}
      loginError={state.loginError}
    />
  );
}

import { Login } from '../../components';
import useLoginPage from './LoginPage.hook';

export default function LoginPage() {
  const { state, action } = useLoginPage();

  return (
    <Login.Form
      onSubmitHandler={state.onSubmitHandler}
      register={state.register}
      handleSubmit={action.handleSubmit}
      inputErrors={state.inputErrors}
      loginError={state.loginError}
    />
  );
}

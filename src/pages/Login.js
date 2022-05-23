import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
state = {
  inputName: '',
  isSendButtonDisabled: true,
  loading: false,
  redirect: false,
};

  onInputChange = (event) => {
    this.setState({ inputName: event.target.value }, () => this.verificaQuantNameInput());
  }

   saveName = async () => {
     const { inputName } = this.state;
     this.setState({ loading: true });
     await createUser({ name: inputName }); // esperando a criação
     this.setState({ loading: false, redirect: true });
   }

  verificaQuantNameInput = () => {
    const { inputName } = this.state;
    const numCaracMin = 3;
    if (inputName.length >= numCaracMin) {
      this.setState({ isSendButtonDisabled: false });
    } else {
      this.setState({ isSendButtonDisabled: true });
    }
  };

  render() {
    const { inputName, isSendButtonDisabled, loading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        { loading
          ? <Loading />
          : <form>
            <label htmlFor="name-input">
              Nome:
              <input
                value={ inputName }
                onChange={ this.onInputChange }
                type="text"
                data-testid="login-name-input"
              />
            </label>
            <button
              type="button"
              disabled={ isSendButtonDisabled }
              onClick={ this.saveName }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </form> }
        {/* Sempre que for TRUE, faz o comando */}
        { redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;

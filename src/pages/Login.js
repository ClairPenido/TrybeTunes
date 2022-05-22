import React from 'react';
// import { Redirect } from 'react-router-dom';

class Login extends React.Component {
state = {
  nameInput: '',
  isSendButtonDisabled: true,
};

  onInputChange = (event) => {
    this.setState({ nameInput: event.target.value }, () => this.verificaQuantNameInput());
  }

  verificaQuantNameInput = () => {
    const { nameInput } = this.state;
    const numCaracMin = 3;
    if (nameInput.length >= numCaracMin) {
      this.setState({ isSendButtonDisabled: false });
    } else {
      this.setState({ isSendButtonDisabled: true });
    }
  };

  render() {
    const { nameInput, isSendButtonDisabled } = this.state;
    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        <form>
          <label htmlFor="name-input">
            Nome:
            <input
              value={ nameInput }
              onChange={ this.onInputChange }
              type="text"
              data-testid="login-name-input"
            />
          </label>
          <button
            type="button"
            disabled={ isSendButtonDisabled }
            data-testid="login-submit-button"
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

export default Login;

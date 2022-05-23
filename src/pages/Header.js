import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    inputName: '',
    loading: false,
  };

  componentDidMount() { // chamar a função depois do render
    this.getName();
  }

  getName = async () => {
    this.setState({ loading: true });
    const getNameLocalS = await getUser(); // esperando a criação
    this.setState({ loading: false, inputName: getNameLocalS.name });
  }

  render() {
    const { loading, inputName } = this.state;
    return (
      <header data-testid="header-component">
        <h1> Header </h1>
        <h2 data-testid="header-user-name">
          { loading ? <Loading /> : inputName }
        </h2>
      </header>
    );
  }
}

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
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
        <h2 data-testid="header-user-name">
          { loading ? <Loading /> : inputName }
        </h2>
        <ul>
          <li>
            <Link to="/search" data-testid="link-to-search">Search</Link>
          </li>
          <li>
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          </li>
          <li>
            <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;

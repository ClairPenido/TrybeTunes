import { React, Component } from 'react';
import Header from './Header';

class profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <h2>profile</h2>
      </div>
    );
  }
}

export default profile;

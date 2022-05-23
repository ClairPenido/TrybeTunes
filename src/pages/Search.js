import { React, Component } from 'react';
import Header from './Header';

class Search extends Component {
  state = {
    inputArtistBand: '',
    searchButtonDisabled: true,
  };

  onInputChange = (event) => {
    this.setState({ inputArtistBand: event.target.value },
      () => this.verificaQuantNameInput());
  }

  verificaQuantNameInput = () => {
    const { inputArtistBand } = this.state;
    const numCaracMin = 2;
    if (inputArtistBand.length >= numCaracMin) {
      this.setState({ searchButtonDisabled: false });
    } else {
      this.setState({ searchButtonDisabled: true });
    }
  };

  render() {
    const { inputArtistBand, searchButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h2>Search</h2>
        <form>
          <label htmlFor="search-artist-input">
            Digite o nome do artista ou banda que deseja:
            <input
              type="text"
              data-testid="search-artist-input"
              value={ inputArtistBand }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ searchButtonDisabled }
            // onClick={ searchButton }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

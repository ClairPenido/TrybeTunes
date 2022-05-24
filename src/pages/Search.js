import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  state = {
    inputArtistBand: '',
    searchButtonDisabled: true,
    artistaPesquisado: '',
    loading: false,
    arrayAlbum: [],
    hasAlbum: false,
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

  searchArtist = async () => {
    const { inputArtistBand } = this.state;
    this.setState({ loading: true });
    const getArtistBand = await searchAlbumsAPI(inputArtistBand); // esperando a criação
    this.setState({ loading: false, arrayAlbum: getArtistBand });
    this.setState({ artistaPesquisado: inputArtistBand });
    this.setState({ inputArtistBand: '', hasAlbum: true });
  }

  render() {
    const { inputArtistBand, searchButtonDisabled, loading,
      arrayAlbum, artistaPesquisado, hasAlbum } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading />
          : (
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
                onClick={ this.searchArtist }
              >
                Pesquisar
              </button>
            </form>
          )}
        { arrayAlbum.length !== 0
          ? (<h2>{`Resultado de álbuns de: ${artistaPesquisado}`}</h2>)
          : (<h2>Nenhum álbum foi encontrado</h2>)}
        { hasAlbum && arrayAlbum.map((album) => ( // o map é feito aqui pois tem que mostrar todos os albums
          <div key={ album.collectionId }>
            <p>{ album.collectionId }</p>
            <img src={ album.artworkUrl100 } alt={ album.collectionName } />
            <Link
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              {album.collectionName}
            </Link>
          </div>))}
      </div>
    );
  }
}

export default Search;

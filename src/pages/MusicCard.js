import { React, Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    isChecked: false,
  };

  componentDidMount() {
    this.confirmaFavoritas();
  }

  confirmaFavoritas = async () => {
    const { musica } = this.props;
    const returnFavoritas = await getFavoriteSongs();
    if (returnFavoritas.some((favorita) => favorita.trackId === musica.trackId)) { // avalia se a musica mostrada é igual a musica que está favoritada
      return this.setState({ isChecked: true });
    }
  }

  adicionaMusicaFavorita = async () => {
    const { musica } = this.props;
    this.setState({ loading: true });
    await addSong(musica);
    this.setState({ loading: false, isChecked: true });
  };

  render() {
    const { musica } = this.props;
    const { loading, isChecked } = this.state;
    return (
      <div>
        { loading ? (<Loading />) : (
          <div>
            <p>
              { musica.trackName }
            </p>
            <p>
              <audio data-testid="audio-component" src={ musica.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
            </p>
            <div>
              <label htmlFor={ musica.trackId }>
                Favorita
                <input
                  id={ musica.trackId }
                  data-testid={ `checkbox-music-${musica.trackId}` }
                  type="checkbox"
                  checked={ isChecked }
                  onChange={ this.adicionaMusicaFavorita }
                />
              </label>
            </div>
          </div>
        ) }

      </div>
    );
  }
}
MusicCard.propTypes = {
  musica: PropTypes.string.isRequired,

};

export default MusicCard;

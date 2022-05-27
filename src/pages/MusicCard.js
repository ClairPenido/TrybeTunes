import { React, Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    isChecked: false,
  };

  adicionaMusicaFavorita = async () => {
    const { musicas } = this.props;
    this.setState({ loading: true });
    await addSong(musicas);
    this.setState({ loading: false, isChecked: true });
  };

  render() {
    const { musicas } = this.props;
    const { loading, isChecked } = this.state;
    return (
      <div>
        { loading ? (<Loading />) : (
          <div>
            <p>
              { musicas.trackName }
            </p>
            <p>
              <audio data-testid="audio-component" src={ musicas.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
            </p>
            <div>
              <label htmlFor={ musicas.trackId }>
                Favorita
                <input
                  id={ musicas.trackId }
                  data-testid={ `checkbox-music-${musicas.trackId}` }
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
  musicas: PropTypes.string.isRequired,
};

export default MusicCard;

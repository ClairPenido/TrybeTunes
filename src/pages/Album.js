import { React, Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';

class Album extends Component { //* primeiro elemento do array é diferente, usar filter ou slice
  state = {
    arrayMusics: [],
    arrayMusicsCerto: [],
    hasMusics: false,
    artistName: '',
    collectionName: '',
  };

  componentDidMount() {
    this.getMusicsFromAlbum();
  }

getMusicsFromAlbum = async () => {
  const { match: { params: { id } } } = this.props;
  const returnMusicsAPI = await getMusics(id);
  this.setState({ arrayMusics: returnMusicsAPI, hasMusics: true });
  this.arrayMusicsFiltrado();
};

arrayMusicsFiltrado = () => {
  const { arrayMusics } = this.state;
  this.setState({
    artistName: arrayMusics[0].artistName,
    collectionName: arrayMusics[0].collectionName,
    arrayMusicsCerto: arrayMusics
      .slice(1) });
}

render() {
  const { hasMusics, artistName, collectionName,
    arrayMusicsCerto } = this.state;
  if (arrayMusicsCerto.length === 0) {
    return <Loading />;
  }
  return (
    <div>
      <Header />
      <div data-testid="page-album">
        <p data-testid="artist-name">{ artistName }</p>
        <p data-testid="album-name">{ collectionName }</p>
        { hasMusics && (arrayMusicsCerto.map((musica) => (
          <div key={ musica.trackId }>
            <MusicCard musica={ musica } />
          </div>
        ))) }
      </div>
    </div>
  );
}
}
Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Album;

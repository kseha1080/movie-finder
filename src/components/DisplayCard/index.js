import React, { PureComponent } from 'react';
import { Card } from 'reactstrap';
import { limitContent } from '../../utils';
import moment from 'moment';
import PropTypes from 'prop-types';

const styles = {
  imgPrimeStyle: {
    height: '38rem',
  },
  nonPrimeStyle: {
    height: '30rem',
    maxWidth: '20rem',
  },
};

class DisplayCard extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    idx: PropTypes.string.isRequired,
  };

  state = {
    showInfo: false,
  };

  posterHover = () => {
    const { showInfo } = this.state;
    this.setState({
      showInfo: !showInfo,
    });
  };

  render() {
    const { data, idx } = this.props;
    const { showInfo } = this.state;
    const {
      title,
      popularity,
      overview,
      release_date,
      vote_average,
      poster_path,
    } = data;
    const primeStyle = idx === 0 ? styles.imgPrimeStyle : styles.nonPrimeStyle;
    const posterPath = poster_path || '';
    const posterUrl = posterPath
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : require('../../img/not-available.jpg');
    const infoClass = showInfo ? 'info-show' : 'info-hide';
    const movieTitle = title || '';
    const moviePop = popularity || '';
    const movieDesc = overview || '';
    const movieReleaseDate = release_date || '';
    const movieVote = vote_average || '';
    return (
      <div className='display-card'>
        <figure
          className='display-card__poster'
          onMouseEnter={this.posterHover}
          onMouseLeave={this.posterHover}
        >
          <div className={infoClass}>
            <h4>{movieTitle}</h4>
            <p>Popularity: {moviePop}</p>
          </div>
          <img src={posterUrl} alt='poster' style={primeStyle} />
        </figure>
        <Card className='display-card__info'>
          <h4>{movieTitle}</h4>
          <p className='display-card__info__desc'>
            {limitContent(movieDesc, 400)}
          </p>
          <div className='display-card__info__bottom'>
            <p className='display-card__info__desc'>
              {`Release Date: ${moment(movieReleaseDate).format('LL')}`}
            </p>
            <p className='display-card__info__desc'>{`Vote Average: ${movieVote}`}</p>
          </div>
        </Card>
      </div>
    );
  }
}

export default DisplayCard;

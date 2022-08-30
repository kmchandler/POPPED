import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function ShuffleCard({ watchObj }) {
  console.warn(watchObj);
  return (
    <>
      <Card className="ShuffleCardDiv" style={{ width: '25rem', margin: '10px', height: '45rem' }}>
        <Card.Img className="cardImage" variant="top" src={watchObj.imageUrl} alt={watchObj.title} style={{ height: '300px' }} />
        <Card.Body className="cardBody">
          <Card.Title className="watchTitle">{watchObj.title}</Card.Title>
          <hr />
          <p className="watchCardGenre">{watchObj.genres.length > 0 ? 'Genres: ' : ''}{watchObj.genres ? watchObj.genres.map((genre, index) => (index ? ', ' : '') + genre.genreName) : ''}</p>
          <p className="playerCardJobs">{watchObj.moods.length > 0 ? 'Moods: ' : ''}{watchObj.moods ? watchObj.moods.map((mood, index) => (index ? ', ' : '') + mood.moodsName) : ''}</p>
          <p className="watchCardCastCrew">{watchObj.castCrew ? 'Cast/Crew: ' : ''}{watchObj.castCrew ? watchObj.castCrew : ''}</p>
          <p className="watchCardRecommendedBy">{watchObj.recommendedBy ? 'Recommended By: ' : ''}{watchObj.recommendedBy ? watchObj.recommendedBy : ''}</p>
          <p className="watchCardWatched">{watchObj.watched ? 'Watched' : ''}</p>
          <p className="watchCardFavorite">{watchObj.favorite ? 'Favorite' : ''}</p>
          <p className="watchCardWatched">{watchObj.watched}</p>
          <p className="watchCardFavorite">{watchObj.favorite}</p>
        </Card.Body>
      </Card>
    </>
  );
}

ShuffleCard.propTypes = {
  watchObj: PropTypes.shape({
    watch: PropTypes.string,
    watchsFirebaseKey: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    moods: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    castCrew: PropTypes.string,
    recommendedBy: PropTypes.string,
    watched: PropTypes.bool,
    favorite: PropTypes.bool,
    imageUrl: PropTypes.string,
    rating: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default ShuffleCard;

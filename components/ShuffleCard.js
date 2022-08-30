import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function ShuffleCard({ watchObj }) {
  console.warn(watchObj);
  return (
    <>
      <Card className="ShuffleCardDiv" style={{ width: '18rem', margin: '10px' }}>
        <Card.Img className="cardImage" variant="top" src={watchObj.imageUrl} alt={watchObj.title} style={{ height: '400px' }} />
        <Card.Body className="cardBody">
          <Card.Title className="watchTitle">{watchObj.title}</Card.Title>
          <br />
          <hr />
          <p className="watchCardType">Type: {watchObj.type}</p>
          <p className="watchCardGenre">Genre: {watchObj?.genres?.map((genre) => genre.genreName)}</p>
          <p className="playerCardJobs">Moods: {watchObj?.moods?.map((mood) => mood.moodsName)}</p>
          <p className="watchCardCastCrew">Cast and Crew: {watchObj.castCrew}</p>
          <p className="watchCardGenre">Recommended By: {watchObj.recommendedBy}</p>
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

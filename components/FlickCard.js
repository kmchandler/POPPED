import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleFlick } from '../api/flicksData';

function FlickCard({
  flickObj, onUpdate,
}) {
  const deleteThisFlick = () => {
    if (window.confirm(`Delete ${flickObj.title}?`)) {
      deleteSingleFlick(flickObj.flicksFirebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card className="flickCardDiv" style={{ width: '25rem', margin: '10px', height: '45rem' }}>
        <Card.Img className="cardImage" variant="top" src={flickObj.imageUrl} alt={flickObj.title} style={{ height: '300px' }} />
        <Card.Body className="cardBody flickCardBody">
          <Card.Title className="flickTitle">{flickObj.title}</Card.Title>
          <hr />
          <p className="flickCardType">Type: {flickObj.type}</p>
          <p className="flickCardGenre">{flickObj.genres.length > 0 ? 'Genres: ' : ''}{flickObj.genres ? flickObj.genres.map((genre, index) => (index ? ', ' : '') + genre.genreName) : ''}</p>
          <p className="playerCardJobs">{flickObj.moods.length > 0 ? 'Moods: ' : ''}{flickObj.moods ? flickObj.moods.map((mood, index) => (index ? ', ' : '') + mood.moodsName) : ''}</p>
          <p className="flickCardCastCrew">{flickObj.castCrew ? 'Cast/Crew: ' : ''}{flickObj.castCrew ? flickObj.castCrew : null}</p>
          <p className="flickCardRecommendedBy">{flickObj.recommendedBy ? 'Recommended By: ' : ''}{flickObj.recommendedBy ? flickObj.recommendedBy : ''}</p>
          <p className="flickCardflicked">{flickObj.watched ? 'Watched' : null}</p>
          <p className="flickCardFavorite">{flickObj.favorite ? 'Favorite' : null}</p>
          <div className="flickCardBtns">
            <Link href={`/flicks/edit/${flickObj.flicksFirebaseKey}`} passHref>
              <Button className="editButton">EDIT</Button>
            </Link>
            <Button className="deleteButton m-2" onClick={deleteThisFlick}>
              DELETE
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

FlickCard.propTypes = {
  flickObj: PropTypes.shape({
    flick: PropTypes.string,
    flicksFirebaseKey: PropTypes.string,
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
  onUpdate: PropTypes.func.isRequired,
};

export default FlickCard;

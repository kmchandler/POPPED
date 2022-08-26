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
      <Card className="flickCardDiv" style={{ width: '18rem', margin: '10px' }}>
        <Card.Img className="cardImage" variant="top" src={flickObj.imageUrl} alt={flickObj.title} style={{ height: '400px' }} />
        <Card.Body className="cardBody">
          <Card.Title className="flickTitle">{flickObj.title}</Card.Title>
          <br />
          <hr />
          <p className="flickCardType">Type: {flickObj.type}</p>
          <p className="flickCardGenre">Genre: {flickObj.genres.map((genre) => genre.genreName)}</p>
          <p className="playerCardJobs">Moods: {flickObj.moods.map((mood) => mood.moodsName)}</p>
          <p className="flickCardCastCrew">Cast and Crew: {flickObj.castCrew}</p>
          <p className="flickCardGenre">Recommended By: {flickObj.recommendedBy}</p>
          <p className="flickCardWatched">{flickObj.watched}</p>
          <p className="flickCardFavorite">{flickObj.favorite}</p>
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

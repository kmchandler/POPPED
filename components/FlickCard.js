import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleFlick } from '../api/flicksData';

function FlicksCard({ flickObj, onUpdate }) {
  const deleteThisFlick = () => {
    if (window.confirm(`Delete ${flickObj.title}?`)) {
      deleteSingleFlick(flickObj.flickFirebaseKey).then(() => onUpdate());
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
          <p className="flickCardGenre">Type: {flickObj.genre}</p>
          <p className="playerCardJobs">Moods: {flickObj?.moods?.join(', ')}</p>
          <p className="flickCardCastCrew">Cast and Crew: {flickObj.castCrew}</p>
          <p className="flickCardGenre">Recommended By: {flickObj.recommendedBy}</p>
          <p className="flickCardWatched">Watched: {flickObj.watched}</p>
          <p className="flickCardFavorite">Favorite: {flickObj.favorite}</p>
          <div className="flickCardBtns">
            <Link href={`/flicks/edit/${flickObj.flickFirebaseKey}`} passHref>
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

FlicksCard.propTypes = {
  flickObj: PropTypes.shape({
    flickFirebaseKey: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    genre: PropTypes.string,
    moods: PropTypes.string,
    castCrew: PropTypes.string,
    recommendedBy: PropTypes.string,
    watched: PropTypes.string,
    favorite: PropTypes.string,
    imageUrl: PropTypes.string,
    rating: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default FlicksCard;

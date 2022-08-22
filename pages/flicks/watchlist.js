/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import Search from '../../components/Search';
import FlicksCard from '../../components/FlickCard';
import { getFlicksByUid } from '../../api/flicksData';

export default function Watchlist() {
  const [flicks, setFlicks] = useState([]);
  const [filteredFlicks, setFilteredFlicks] = useState([]);
  const { user } = useAuth();

  const getAllTheFlicks = () => {
    getFlicksByUid(user.uid).then((flick) => {
      setFlicks(flick);
      setFilteredFlicks(flick);
    });
  };

  useEffect(() => {
    getAllTheFlicks();
  }, [user]);

  return (
    <>
      <div className="text-center my-4 teamCardsDiv">
        <h1 className="teamName">Watchlist</h1>
        <div className="teamHeaderDiv">
          <Search flicks={flicks} setFilteredFlicks={setFilteredFlicks} />
          <Link href="/flicks/new" passHref>
            <Button className="FlickButton">Add A Flick</Button>
          </Link>
        </div>
        <div className="d-flex flex-wrap cardContainer">
          {filteredFlicks.map((flix) => (
            <FlicksCard key={flix.flickFirebaseKey} playerObj={flix} onUpdate={getAllTheFlicks} />
          ))}
        </div>
      </div>
    </>
  );
}

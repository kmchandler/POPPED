/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import FlickCard from '../components/FlickCard';
import { getFlicksByUid } from '../api/flicksData';

export default function Recommendations() {
  const [flicks, setFlicks] = useState([]);
  const { user } = useAuth();

  const getRecommendedFlicks = async () => {
    const flicksWithMetaData = await getFlicksByUid(user.uid);
    const recommendedFlicks = [];

    flicksWithMetaData.map((rec) => {
      if (rec.recommendedBy !== '') {
        recommendedFlicks.push(rec);
      }
    });
    return recommendedFlicks;
  };

  useEffect(() => {
    getRecommendedFlicks().then(setFlicks);
  }, [user]);

  if (flicks.length <= 0) {
    return (
      <>
        <h1>recommendations</h1>
        <h3>No recommendations found.</h3>
      </>
    );
  } return (
    <>
      <h1>recommendations</h1>
      <div className="d-flex flex-wrap cardContainer">
        {flicks?.map((flix) => <FlickCard key={flix.flicksFirebaseKey} flickObj={flix} onUpdate={getRecommendedFlicks} />)}
      </div>
    </>
  );
}

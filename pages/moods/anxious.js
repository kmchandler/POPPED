/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import FlickCard from '../../components/FlickCard';
import { getFlicksByUidWithMetaData } from '../../api/mergedData';

export default function Watchlist() {
  const [flicks, setFlicks] = useState([]);
  const { user } = useAuth();

  const getAnxiousFlicks = async () => {
    const flicksWithMetaData = await getFlicksByUidWithMetaData(user.uid);
    console.warn(flicksWithMetaData);
    const flicksByMood = flicksWithMetaData.filter((flk) => flk.moods.moodsName.includes('anxios'));
    setFlicks(flicksByMood);
  };

  useEffect(() => {
    getAnxiousFlicks();
  }, [user]);

  return (
    <>
      <div className="d-flex flex-wrap cardContainer">
        {flicks.map((flix) => <FlickCard key={flix.flicksFirebaseKey} flickObj={flix} onUpdate={getAnxiousFlicks} />)}
      </div>
    </>
  );
}

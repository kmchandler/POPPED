/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import FlickCard from '../../components/FlickCard';
import { getFlicksByUidWithMetaData } from '../../api/mergedData';

export default function Anxious() {
  const [flicks, setFlicks] = useState([]);
  const { user } = useAuth();

  const getAnxiousFlicks = async () => {
    const flicksWithMetaData = await getFlicksByUidWithMetaData(user.uid);
    const flickMoods = [];
    flicksWithMetaData.map((md) => md.moods.filter((mood) => {
      if (mood.moodsName.includes('Anxious')) {
        console.warn(md);
        flickMoods.push(md);
      }
    }));
    return flickMoods;
  };

  useEffect(() => {
    getAnxiousFlicks().then(setFlicks);
  }, [user]);

  return (
    <>
      <div className="d-flex flex-wrap cardContainer">
        {flicks?.map((flix) => <FlickCard key={flix.flicksFirebaseKey} flickObj={flix} onUpdate={getAnxiousFlicks} />)}
      </div>
    </>
  );
}

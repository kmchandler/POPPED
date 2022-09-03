/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import FlickCard from '../../components/FlickCard';
import { getFlicksByUidWithMetaData } from '../../api/mergedData';

export default function Chill() {
  const [flicks, setFlicks] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const getChillFlicks = async () => {
    const flicksWithMetaData = await getFlicksByUidWithMetaData(user.uid);
    const flickMoods = [];
    flicksWithMetaData.map((md) => md.moods.filter((mood) => {
      if (mood.moodsName.includes('Chill')) {
        flickMoods.push(md);
      }
    }));
    return flickMoods;
  };

  useEffect(() => {
    getChillFlicks().then(setFlicks);
  }, [user]);

  const onClick = () => router.push('/moods/moods');

  if (flicks.length <= 0) {
    return (
      <>
        <h3>No flicks found matching this mood.</h3>
        <button type="button" onClick={onClick} className="backToMoodsBtn">previous page</button>
      </>
    );
  } return (
    <>
      <button type="button" onClick={onClick} className="backToMoodsBtn">previous page</button>
      <div className="d-flex flex-wrap cardContainer">
        {flicks?.map((flix) => <FlickCard key={flix.flicksFirebaseKey} flickObj={flix} onUpdate={getChillFlicks} />)}
      </div>
    </>
  );
}

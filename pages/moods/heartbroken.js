/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import FlickCard from '../../components/FlickCard';
import { getFlicksByUidWithMetaData } from '../../api/mergedData';

export default function Heartbroken() {
  const [flicks, setFlicks] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const getHeartbrokenFlicks = async () => {
    const flicksWithMetaData = await getFlicksByUidWithMetaData(user.uid);
    const flickMoods = [];
    flicksWithMetaData.map((md) => md.moods.filter((mood) => {
      if (mood.moodsName.includes('Heartbroken')) {
        flickMoods.push(md);
      }
    }));
    return flickMoods;
  };

  useEffect(() => {
    getHeartbrokenFlicks().then(setFlicks);
  }, [user]);

  const onClick = () => router.push('/moods/moods');

  if (flicks.length <= 0) {
    return (
      <>
        <button type="button" onClick={onClick} className="backToMoodsBtn">previous page</button>
        <h3>No flicks found matching this mood.</h3>
      </>
    );
  } return (
    <>
      <button type="button" onClick={onClick} className="backToMoodsBtn">previous page</button>
      <div className="d-flex flex-wrap cardContainer">
        {flicks?.map((flix) => <FlickCard key={flix.flicksFirebaseKey} flickObj={flix} onUpdate={getHeartbrokenFlicks} />)}
      </div>
    </>
  );
}

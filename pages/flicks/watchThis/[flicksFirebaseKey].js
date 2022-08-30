import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getSingleFlickWithMetaData } from '../../../api/mergedData';

import ShuffleCard from '../../../components/ShuffleCard';

export default function WatchThis() {
  const [result, setResult] = useState({});
  const router = useRouter();
  const { flicksFirebaseKey } = router.query;

  const onClick = () => router.push('/shuffle');

  useEffect(() => {
    getSingleFlickWithMetaData(flicksFirebaseKey).then(setResult);
  }, [flicksFirebaseKey]);

  if (!result.flicksFirebaseKey) {
    return null;
  }
  return (
    <div>
      <button type="button" onClick={onClick}>try again</button>
      <ShuffleCard watchObj={result} />
    </div>
  );
}

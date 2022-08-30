import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getSingleFlickWithMetaData } from '../../../api/mergedData';

import ShuffleCard from '../../../components/ShuffleCard';

export default function WatchThis() {
  const [result, setResult] = useState({});
  const router = useRouter();
  const { flicksFirebaseKey } = router.query;

  useEffect(() => {
    getSingleFlickWithMetaData(flicksFirebaseKey).then(setResult);
  }, []);

  if (!result.flicksFirebaseKey) {
    return null;
  }
  return (<ShuffleCard watchObj={result} />);
}

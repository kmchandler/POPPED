import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { getSingleFlickWithMetaData } from '../../../api/mergedData';
import FlickForm from '../../../components/FlickForm';

  <Head>
    <title>POPPED:edit flick</title>
    <meta name="description" content="Meta description for the team page" />
  </Head>;

export default function EditFlick() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { flicksFirebaseKey } = router.query;

  useEffect(() => {
    getSingleFlickWithMetaData(flicksFirebaseKey).then(setEditItem);
  }, [flicksFirebaseKey]);

  if (!editItem.flicksFirebaseKey) return null;

  return (<FlickForm obj={editItem} />);
}

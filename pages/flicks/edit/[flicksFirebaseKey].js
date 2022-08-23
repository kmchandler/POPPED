import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getSingleFlick } from '../../../api/flicksData';
import FlickForm from '../new';

export default function EditFlick() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { flicksFirebaseKey } = router.query;

  useEffect(() => {
    getSingleFlick(flicksFirebaseKey).then(setEditItem);
  }, [flicksFirebaseKey]);
  return (<FlickForm obj={editItem} />);
}

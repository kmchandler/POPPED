import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getUserByUidWithMetaData } from '../../../api/mergedData';
import CreateUserForm from '../new';

export default function EditUser() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { userFirebaseKey } = router.query;

  useEffect(() => {
    getUserByUidWithMetaData(userFirebaseKey).then(setEditItem);
  }, [userFirebaseKey]);

  return (<CreateUserForm obj={editItem} />);
}

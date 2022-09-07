import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getSingleUserWithMetaData } from '../../../api/mergedData';
import CreateUserForm from '../../../components/CreateUserForm';

export default function EditUser() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { userFirebaseKey } = router.query;

  useEffect(() => {
    getSingleUserWithMetaData(userFirebaseKey).then(setEditItem);
  }, [userFirebaseKey]);

  return (<CreateUserForm obj={editItem} />);
}

import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getFlicksByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/flicks.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createFlick = (flickObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/flicks.json?`, flickObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/users/${response.data.name}.json`, payload).then(() => {
        getFlicksByUid(flickObj.uid).then((flickArray) => resolve(flickArray));
      });
    }).catch((error) => reject(error));
});

const getSingleFlick = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/flicks/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const deleteSingleFlick = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/flicks/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateFlick = (flickObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/flicks/${flickObj.firebaseKey}.json`, flickObj)
    .then(() => getFlicksByUid(flickObj.uid)).then(resolve)
    .catch(reject);
});

export {
  getFlicksByUid,
  createFlick,
  getSingleFlick,
  deleteSingleFlick,
  updateFlick,
};

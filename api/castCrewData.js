import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getCastCrewByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/castCrew.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createCastCrew = (castCrewObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/castCrew.json?`, castCrewObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/castCrew/${response.data.name}.json`, payload).then(() => {
        getCastCrewByUid(castCrewObj.uid).then((castCrewArray) => resolve(castCrewArray));
      });
    }).catch((error) => reject(error));
});

const getSingleCastCrew = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/castCrew/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const deleteSingleCastCrew = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/castCrew/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateCastCrew = (castCrewObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/users/${castCrewObj.firebaseKey}.json`, castCrewObj)
    .then(() => getCastCrewByUid(castCrewObj.uid)).then(resolve)
    .catch(reject);
});

export {
  getCastCrewByUid,
  createCastCrew,
  getSingleCastCrew,
  deleteSingleCastCrew,
  updateCastCrew,
};

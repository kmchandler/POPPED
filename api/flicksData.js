import axios from 'axios';
import { clientCredentials } from '../utils/client';
import { getGenres } from './genresData';
import { getMoods } from './moodsData';

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

const getFlicksByUidWithMetaData = async (uid) => {
  const flicks = await getFlicksByUid(uid);
  return flicks.map(async (flick) => {
    const genres = await getGenres(flick.flicksFirebaseKey);
    const moods = await getMoods(flick.flicksFirebaseKey);
    return { flick, genres, moods };
  });
};

const getFlicksByUidObj = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/flicks.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(response.data);
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getSingleFlick = (flicksFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/flicks/${flicksFirebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createFlick = (flickObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/flicks.json`, flickObj)
    .then((response) => {
      const payload = { flicksFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/flicks/${response.data.name}.json`, payload).then(() => {
        getSingleFlick(payload.flicksFirebaseKey).then(resolve);
      });
    }).catch((error) => reject(error));
});

const deleteSingleFlick = (flicksFirebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/flicks/${flicksFirebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateFlick = (flickObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/flicks/${flickObj.flicksFirebaseKey}.json`, flickObj)
    .then(() => getFlicksByUid(flickObj.uid)).then(resolve)
    .catch(reject);
});

export {
  getFlicksByUid,
  getFlicksByUidObj,
  createFlick,
  getSingleFlick,
  deleteSingleFlick,
  updateFlick,
  getFlicksByUidWithMetaData,
};

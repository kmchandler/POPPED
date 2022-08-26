import axios from 'axios';
import { clientCredentials } from '../utils/client';
import { getGenresByGenreFirebaseKey } from './genresData';
import { getMoods } from './moodsData';
import { getFlickGenresForFlick } from './mergedData';

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

// get genres for flick
const getGenresForFlick = async (flickFirebaseKey) => {
  const flickGenres = await getFlickGenresForFlick(flickFirebaseKey);
  const promises = flickGenres.map((flickGenre) => getGenresByGenreFirebaseKey(flickGenre.genreFirebaseKey));
  return Promise.all(promises);
};

// get all the flick_genres for flick, use mergedData
// result will be a list of flick_genres
// for each flick_genre, hit the genre talbe with the genreFirebaseKey

const getFlicksByUidWithMetaData = async (uid) => {
  const flicks = await getFlicksByUid(uid);
  const promises = flicks.map(async (flick) => {
    const genres = await getGenresForFlick(flick.flicksFirebaseKey);
    const moods = await getMoods(flick.flicksFirebaseKey);
    return {
      ...flick,
      genres,
      moods,
    };
  });

  return Promise.all(promises);
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

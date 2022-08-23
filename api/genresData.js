import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getGenresByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/genres.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createGenre = (genreObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/genres.json?`, genreObj)
    .then((response) => {
      const payload = { genreFirebaseKey: response.data.genreFirebaseKey };
      axios.patch(`${dbUrl}/genres/${response.data.name}.json`, payload).then(() => {
        getGenresByUid(genreObj.uid).then((genreArray) => resolve(genreArray));
      });
    }).catch((error) => reject(error));
});

const getSingleGenre = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/genres/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const deleteSingleGenre = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/genres/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateGenre = (genreObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/genres/${genreObj.firebaseKey}.json`, genreObj)
    .then(() => getGenresByUid(genreObj.uid)).then(resolve)
    .catch(reject);
});

export {
  getGenresByUid,
  createGenre,
  getSingleGenre,
  deleteSingleGenre,
  updateGenre,
};

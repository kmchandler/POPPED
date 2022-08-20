import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getMoodsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/moods.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createMood = (moodObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/moods.json?`, moodObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/moods/${response.data.name}.json`, payload).then(() => {
        getMoodsByUid(moodObj.uid).then((userArray) => resolve(userArray));
      });
    }).catch((error) => reject(error));
});

const getSingleMood = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/moods/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const deleteSingleMood = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/moods/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateMood = (moodObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/moods/${moodObj.firebaseKey}.json`, moodObj)
    .then(() => getMoodsByUid(moodObj.uid)).then(resolve)
    .catch(reject);
});

export {
  getMoodsByUid,
  createMood,
  getSingleMood,
  deleteSingleMood,
  updateMood,
};

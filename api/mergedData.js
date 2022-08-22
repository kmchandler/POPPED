import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// user_genres
const getUserGenresByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/user_genres.json?orderBy="userId"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getUserGenres = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/user_genres.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createUserGenres = (newUserGenreObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/user_genres.json`, newUserGenreObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/user_genres/${response.data.name}.json`, body)
        .then(() => {
          getUserGenres(newUserGenreObj).then(resolve);
        });
    })
    .catch(reject);
});

const updateUserGenres = (userGenreObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/user_genres/${userGenreObj.firebaseKey}.json`, userGenreObj)
    .then(() => getUserGenres(userGenreObj.uid).then(resolve))
    .catch(reject);
});

const deleteUserGenres = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/user_genres/${firebaseKey}.json`)
    .then(resolve)
    .catch(reject);
});

// flick_genres
const getFlickGenresByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/flick_genres.json?orderBy="userId"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getFlickGenres = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/flick_genres.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createFlickGenres = (newFlickGenreObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/flick_genres.json`, newFlickGenreObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/flick_genres/${response.data.name}.json`, body)
        .then(() => {
          getFlickGenres(newFlickGenreObj).then(resolve);
        });
    })
    .catch(reject);
});

const updateFlickGenres = (flickGenreObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/flick_genres/${flickGenreObj.firebaseKey}.json`, flickGenreObj)
    .then(() => getFlickGenres(flickGenreObj.uid).then(resolve))
    .catch(reject);
});

const deleteFlickGenres = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/flick_genres/${firebaseKey}.json`)
    .then(resolve)
    .catch(reject);
});

// flick_moods
const getFlickMoodsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/flick_moods.json?orderBy="userId"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getFlickMoods = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/flick_moods`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createFlickMoods = (newFlickMoodsObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/flick_moods.json`, newFlickMoodsObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/flick_moods/${response.data.name}.json`, body)
        .then(() => {
          getFlickMoods(newFlickMoodsObj).then(resolve);
        });
    })
    .catch(reject);
});

const updateFlickMoods = (flickMoodsObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/flick_moods/${flickMoodsObj.firebaseKey}.json`, flickMoodsObj)
    .then(() => getFlickMoods(flickMoodsObj.uid).then(resolve))
    .catch(reject);
});

const deleteFlickMoods = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/flick_moods/${firebaseKey}.json`)
    .then(resolve)
    .catch(reject);
});

// flicks_castCrew
const getFlicksCastCrewByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/flicks_castCrew.json?orderBy="userId"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getFlicksCastCrew = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/flicks_castCrew.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createFlicksCastCrew = (newFlicksCastCrewObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/flicks_castCrew.json`, newFlicksCastCrewObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/flicks_castCrew/${response.data.name}.json`, body)
        .then(() => {
          getFlicksCastCrew(newFlicksCastCrewObj).then(resolve);
        });
    })
    .catch(reject);
});

const updateFlicksCastCrew = (flicksCastCrewObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/flicks_castCrew/${flicksCastCrewObj.firebaseKey}.json`, flicksCastCrewObj)
    .then(() => getFlicksCastCrew(flicksCastCrewObj.uid).then(resolve))
    .catch(reject);
});

const deleteFlicksCastCrew = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/flicks_castCrew/${firebaseKey}.json`)
    .then(resolve)
    .catch(reject);
});

export {
  getUserGenres, createUserGenres, updateUserGenres, deleteUserGenres, getFlickGenres, createFlickGenres, updateFlickGenres, deleteFlickGenres, getFlickMoods, createFlickMoods, updateFlickMoods, deleteFlickMoods, getFlicksCastCrew, createFlicksCastCrew, updateFlicksCastCrew, deleteFlicksCastCrew, getFlickGenresByUid, getFlickMoodsByUid, getFlicksCastCrewByUid, getUserGenresByUid,
};

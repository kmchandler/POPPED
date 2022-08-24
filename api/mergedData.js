import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// // user_genres
// const getUserGenresByUid = (uid) => new Promise((resolve, reject) => {
//   axios.get(`${dbUrl}/user_genres.json?orderBy="userId"&equalTo="${uid}"`)
//     .then((response) => {
//       if (response.data) {
//         resolve(Object.values(response.data));
//       } else {
//         resolve([]);
//       }
//     })
//     .catch(reject);
// });

// const getUserGenres = () => new Promise((resolve, reject) => {
//   axios.get(`${dbUrl}/user_genres.json`)
//     .then((response) => {
//       if (response.data) {
//         resolve(Object.values(response.data));
//       } else {
//         resolve([]);
//       }
//     })
//     .catch(reject);
// });

// const createUserGenres = (newUserGenreObj) => new Promise((resolve, reject) => {
//   axios.post(`${dbUrl}/user_genres.json`, newUserGenreObj)
//     .then((response) => {
//       const body = { userFirebaseKey: response.data.userFirebaseKey, genreFirebaseKey: response.data.genreFirebaseKey };
//       axios.patch(`${dbUrl}/user_genres/${response.data.name}.json`, body)
//         .then(() => {
//           getUserGenres(newUserGenreObj).then(resolve);
//         });
//     })
//     .catch(reject);
// });

// const updateUserGenres = (userGenreObj) => new Promise((resolve, reject) => {
//   axios.patch(`${dbUrl}/user_genres/${userGenreObj.name}.json`, userGenreObj)
//     .then(() => getUserGenres(userGenreObj.uid).then(resolve))
//     .catch(reject);
// });

// const deleteUserGenres = (firebaseKey) => new Promise((resolve, reject) => {
//   axios.delete(`${dbUrl}/user_genres/${firebaseKey}.json`)
//     .then(resolve)
//     .catch(reject);
// });

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

const createFlickGenres = (flickGenreObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/flick_genres.json`, flickGenreObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/flick_genres/${response.data.name}.json`, body)
        .then(resolve)
        .catch(reject);
    });
});

const updateFlickGenres = (flickGenreObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/flick_genres/${flickGenreObj.flickFirebaseKey}.json`, flickGenreObj)
    .then(() => getFlickGenres(flickGenreObj.uid).then(resolve))
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

const createFlickMoods = (flickMoodsObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/flick_moods.json`, flickMoodsObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/flick_moods/${response.data.name}.json`, body)
        .then(resolve)
        .catch(reject);
    });
});

const updateFlickMoods = (flickMoodsObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/flick_moods/${flickMoodsObj.name}.json`, flickMoodsObj)
    .then(() => getFlickMoods(flickMoodsObj.uid).then(resolve))
    .catch(reject);
});

// // flicks_castCrew
// const getFlicksCastCrewByUid = (uid) => new Promise((resolve, reject) => {
//   axios.get(`${dbUrl}/flicks_castCrew.json?orderBy="userId"&equalTo="${uid}"`)
//     .then((response) => {
//       if (response.data) {
//         resolve(Object.values(response.data));
//       } else {
//         resolve([]);
//       }
//     })
//     .catch(reject);
// });

// const getFlicksCastCrew = () => new Promise((resolve, reject) => {
//   axios.get(`${dbUrl}/flicks_castCrew.json`)
//     .then((response) => {
//       if (response.data) {
//         resolve(Object.values(response.data));
//       } else {
//         resolve([]);
//       }
//     })
//     .catch(reject);
// });

// const createFlicksCastCrew = (newFlicksCastCrewObj) => new Promise((resolve, reject) => {
//   axios.post(`${dbUrl}/flicks_castCrew.json`, newFlicksCastCrewObj)
//     .then((response) => {
//       const body = { flickFirebaseKey: response.data.flickFirebaseKey, castCrewFirebaseKey: response.data.castCrewFirebaseKey };
//       axios.patch(`${dbUrl}/flicks_castCrew/${response.data.name}.json`, body)
//         .then(() => {
//           getFlicksCastCrew(newFlicksCastCrewObj).then(resolve);
//         });
//     })
//     .catch(reject);
// });

// const updateFlicksCastCrew = (flicksCastCrewObj) => new Promise((resolve, reject) => {
//   axios.patch(`${dbUrl}/flicks_castCrew/${flicksCastCrewObj.name}.json`, flicksCastCrewObj)
//     .then(() => getFlicksCastCrew(flicksCastCrewObj.uid).then(resolve))
//     .catch(reject);
// });

// const deleteFlicksCastCrew = (firebaseKey) => new Promise((resolve, reject) => {
//   axios.delete(`${dbUrl}/flicks_castCrew/${firebaseKey}.json`)
//     .then(resolve)
//     .catch(reject);
// });

export {
  getFlickGenres, createFlickGenres, updateFlickGenres, getFlickMoods, createFlickMoods, updateFlickMoods, getFlickGenresByUid, getFlickMoodsByUid,
};

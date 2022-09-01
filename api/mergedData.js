import axios from 'axios';
import { clientCredentials } from '../utils/client';
import { getFlicksByUid, getSingleFlick } from './flicksData';
import { getGenresByGenreFirebaseKey, getSingleGenreByName } from './genresData';
import { getMoodsByMoodFirebaseKey } from './moodsData';

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

const getFlickGenresByUidObj = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/flick_genres.json?orderBy="userId"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(response.data);
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

const getFlickGenresForFlick = async (flickFirebaseKey) => {
  const response = await axios.get(`${dbUrl}/flick_genres.json?orderBy="flickFirebaseKey"&equalTo="${flickFirebaseKey}"`);
  return JSON.stringify(response.data) === '{}' ? [] : Object.values(response.data);
};

const getGenresForFlick = async (flickFirebaseKey) => {
  const flickGenres = await getFlickGenresForFlick(flickFirebaseKey);
  const promises = flickGenres.map((flickGenre) => getGenresByGenreFirebaseKey(flickGenre.genreFirebaseKey));
  return Promise.all(promises);
};

const getFlickMoodsForFlick = async (flickFirebaseKey) => {
  const response = await axios.get(`${dbUrl}/flick_moods.json?orderBy="flickFirebaseKey"&equalTo="${flickFirebaseKey}"`);
  return JSON.stringify(response.data) === '{}' ? [] : Object.values(response.data);
};

const getMoodsForFlick = async (flickFirebaseKey) => {
  const flickMoods = await getFlickMoodsForFlick(flickFirebaseKey);
  const promises = flickMoods.map((flickMood) => getMoodsByMoodFirebaseKey(flickMood.moodFirebaseKey));
  return Promise.all(promises);
};

const createFlickGenre = (flickGenreObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/flick_genres.json`, flickGenreObj)
    .then((response) => {
      const body = { flickFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/flick_genres/${response.data.name}.json`, body)
        .then(resolve)
        .catch(reject);
    });
});

const deleteFlickGenre = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/flick_genres/${firebaseKey}.json`)
    .then(resolve)
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

const createFlickMood = (flickMoodsObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/flick_moods.json`, flickMoodsObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/flick_moods/${response.data.name}.json`, body)
        .then(() => {
          getFlickMoods(flickMoodsObj).then(resolve);
        });
    })
    .catch(reject);
});

const deleteFlickMood = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/flick_moods/${firebaseKey}.json`)
    .then(resolve)
    .catch(reject);
});

const updateFlickGenres = async (flick, checkedGenre) => {
  const genres = await getGenresForFlick(flick.flicksFirebaseKey);
  const oneGenre = genres.map((og) => og);
  const promises = checkedGenre.map(async (genre) => {
    let promise;
    if (!genres.includes(genre.genreName)) {
      const flickGenre = { flickFirebaseKey: flick.flicksFirebaseKey, genreFirebaseKey: genre.genreFirebaseKey };
      promise = createFlickGenre(flickGenre);
    } else if (!checkedGenre.includes(oneGenre)) {
      const flickGenres = await getSingleGenreByName(flick.flickFirebaseKey);
      const flickToDelete = flickGenres.find((flickGenre) => flickGenre.genreFirebaseKey === genre.genreFirebaseKey);
      promise = deleteFlickGenre(flickToDelete.firebaseKey);
    }
    return promise;
  });
  return Promise.all(promises);
};

const updateFlickMoods = async (flick, checkedMood) => {
  const moods = await getMoodsForFlick(flick.flicksFirebaseKey);
  const oneMood = moods.map((om) => om);
  const promises = checkedMood.map(async (mood) => {
    let promise;
    debugger;
    if (!moods.map((flickMood) => flickMood.moodName).includes(mood.moodsName)) {
      const flickMood = { flickFirebaseKey: flick.flicksFirebaseKey, moodFirebaseKey: mood.moodFirebaseKey };
      promise = createFlickMood(flickMood);
    } else if (!checkedMood.includes(oneMood)) {
      // TODO: FIX THIS ^
      const flickMoods = await getFlickMoodsForFlick(flick.flickFirebaseKey);
      const flickToDelete = flickMoods.find((flickMood) => flickMood.moodFirebaseKey === mood.moodFirebaseKey);
      promise = deleteFlickMood(flickToDelete.firebaseKey);
    }
    return promise;
  });
  return Promise.all(promises);
};

const getFlicksByUidWithMetaData = async (uid) => {
  const flicks = await getFlicksByUid(uid);
  const promises = flicks.map(async (flick) => {
    const genres = await getGenresForFlick(flick.flicksFirebaseKey);
    const moods = await getMoodsForFlick(flick.flicksFirebaseKey);
    return {
      ...flick,
      genres,
      moods,
    };
  });
  return Promise.all(promises);
};

const getSingleFlickWithMetaData = async (flicksFirebaseKey) => {
  const flick = await getSingleFlick(flicksFirebaseKey);
  const genres = await getGenresForFlick(flick.flicksFirebaseKey);
  const moods = await getMoodsForFlick(flick.flicksFirebaseKey);
  return {
    ...flick,
    genres,
    moods,
  };
};

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

export {
  getFlickGenres, updateFlickGenres, getFlickMoods, updateFlickMoods, getFlickGenresByUid, getFlickGenresByUidObj, getFlickMoodsByUid, getFlickGenresForFlick, getGenresForFlick, getFlicksByUidWithMetaData, getSingleFlickWithMetaData, createFlickGenre, createFlickMood, deleteFlickGenre, deleteFlickMood,
};

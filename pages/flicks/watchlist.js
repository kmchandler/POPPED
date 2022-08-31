/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import Search from '../../components/Search';
import FlickCard from '../../components/FlickCard';
import { getFlicksByUidWithMetaData } from '../../api/mergedData';
import { getGenres } from '../../api/genresData';

export default function Watchlist() {
  const [formInput, setFormInput] = useState([]);
  const [flicks, setFlicks] = useState([]);
  const [filteredFlicks, setFilteredFlicks] = useState([]);
  const [genres, setGenres] = useState([]);
  const { user } = useAuth();

  const getAllTheFlicks = async () => {
    const flicksWithMetaData = await getFlicksByUidWithMetaData(user.uid);
    setFlicks(flicksWithMetaData);
    setFilteredFlicks(flicksWithMetaData);
  };

  useEffect(() => {
    getGenres().then(setGenres);
    getAllTheFlicks();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // if value is "none" setFilteredFlicks to be all teh flicks you want to show.
    if (value === 'none') {
      setFilteredFlicks(flicks);
    } else {
      const filteredResults = flicks.filter((flick) => flick.genres.some((genre) => genre.genreName === value));
      setFilteredFlicks(filteredResults);
    }
  };

  // const handleClick = (e) => {
  //   const filterText = e.target.id;
  //   const filteredResults = flicks.filter((flick) => flick.genres.genreName.includes(filterText));
  //   return filteredResults;
  // };

  return (
    <>
      <div className="text-center my-4 flickCardsDiv">
        <h1 className="flickName">Watchlist</h1>
        <div className="flickHeaderDiv">
          <Search flicks={flicks} setFilteredFlicks={setFilteredFlicks} />
          <Link href="/flicks/new" passHref>
            <Button className="flickButton">Add A Flick</Button>
          </Link>
        </div>
        <form className="filterGenre" onSubmit={(e) => e.preventDefault()}>
          <Form.Select
            aria-label="Filter by Genre"
            name="genre"
            onChange={handleChange}
            className="mb-3"
            value={formInput.genre}
          >
            <option value="">Filter By Genre</option>
            <option value="none">All Genres</option>
            {
            genres.map((genre) => (
              <option
                key={genre.genreFirebaseKey}
                value={genre.genreName}
                id={genre.genreName}
              >
                {genre.genreName}
              </option>
            ))
          }
          </Form.Select>
          {/* <button type="button" onClick={handleClick}>Filter</button> */}
        </form>
        <div className="d-flex flex-wrap cardContainer">
          {filteredFlicks.map((flix) => <FlickCard key={flix.flicksFirebaseKey} flickObj={flix} onUpdate={getAllTheFlicks} />)}
        </div>
      </div>
    </>
  );
}

import { React, useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Search({ setFilteredFlicks, flicks }) {
  const [input, setInput] = useState('');

  const flickObj = flicks;

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
    const results = flickObj.filter((flick) => flick?.title?.toLowerCase().includes(value.toLowerCase()) || flick?.genres?.genreName?.toString().toLowerCase().includes(value.toLowerCase()));
    setFilteredFlicks({ flicks: results });
  };
  return (
    <Form className="searchBar">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={input}
        name="playerSearch"
        onChange={handleChange}
      />
    </Form>
  );
}

Search.propTypes = {
  flicks: PropTypes.arrayOf(PropTypes.shape(
    {
      title: PropTypes.string,
      genre: PropTypes.string,
    },
  )).isRequired,
  setFilteredFlicks: PropTypes.func.isRequired,
};

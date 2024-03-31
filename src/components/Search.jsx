import React, { useState } from 'react';

function Search(props) {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    if (inputValue.trim() !== '') {
      props.trigger(inputValue);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.trigger(searchInput.trim()); 
    setSearchInput('');
  };

  return (
    <form className="example" style={{ margin: 'auto', maxWidth: '1000px' }} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search doctor name/Specialisation"
        name="search2"
        value={searchInput}
        autoComplete='off'
        onChange={handleInputChange}
      />
      <button type="submit">
        <i className="fa fa-search"></i>
      </button>
    </form>
  );
}

export default Search;


import React from 'react'

// controller component
export const Search = ({ searchTerm, onSearch }) => {

  // we can return multiple elements without top level element by returning array but each element should have key prop.
  // return [
  //   <label key="label" htmlFor="search">Search : </label>,
  //   <input
  //     key="search-input"
  //     type="text"
  //     id="search"
  //     value={searchTerm}
  //     onChange={(e) => onSearch(e)}
  //   />,
  // ];

  return (
    // React fragment doesn't render in DOM
    <React.Fragment>
      <label htmlFor="search">Search : </label>
      {/* controlled element : controlled by react state */}
      <input type="text" id="search" value={searchTerm} onChange={(e) => onSearch(e)} />
    </React.Fragment>
  );
};

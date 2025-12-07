// controller component
export const Search = ({ searchTerm, onSearch }) => {

  return (
    <React.Fragment>
      <label htmlFor="search">Search : </label>
      <input type="text" id="search" value={searchTerm} onChange={(e) => onSearch(e)} />
    </React.Fragment>
  );
};

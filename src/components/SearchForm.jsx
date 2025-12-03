import { Search } from "./Search";

export const SearchForm = ({storyEndpoint, searchTerm, handleSearch, setUrl}) => {
  return (
    <form className="search-form" onSubmit={(event) => {
            setUrl(`${storyEndpoint}${searchTerm}`);
            event.preventDefault();
          }}>
            <Search searchTerm={searchTerm} onSearch={handleSearch} />
            <button
              className="button button_large"
              type='submit'
              disabled={!searchTerm}
            >
              Search
            </button>
          </form>
  )
}

import { Search } from "./Search";

export const SearchForm = ({storyEndpoint, searchTerm, handleSearch, setUrl}) => {
  return (
    <form onSubmit={(event) => {
            setUrl(`${storyEndpoint}${searchTerm}`);
            event.preventDefault();
          }}>
            <Search searchTerm={searchTerm} onSearch={handleSearch} />
            <button
              style={{
                borderRadius: "2rem",
                backgroundColor: "grey",
                width: "6rem",
                height: "2rem",
                padding: "0.10rem",
                margin: "0.25rem",
              }}
              type='submit'
              disabled={!searchTerm}
            >
              Search
            </button>
          </form>
  )
}

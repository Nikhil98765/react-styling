import clsx from 'clsx';

import styles from '../App.module.css';
import { Search } from "./Search";

export const SearchForm = ({storyEndpoint, searchTerm, handleSearch, setUrl}) => {
  return (
    <form className="search-form" onSubmit={(event) => {
            setUrl(`${storyEndpoint}${searchTerm}`);
            event.preventDefault();
          }}>
            <Search searchTerm={searchTerm} onSearch={handleSearch} />
            <button
        className={clsx(styles.button, { [styles.buttonLarge]:  true})}
              type='submit'
              disabled={!searchTerm}
            >
              Search
            </button>
          </form>
  )
}

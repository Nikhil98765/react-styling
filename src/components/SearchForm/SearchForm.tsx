import { ChangeEvent, memo } from 'react';

import { StyledButtonLarge, StyledSearchForm } from "./Styles";
import { Search } from "../Search";

type SearchFormProps = {
  storyEndpoint: string;
  searchTerm: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  setUrl: (value: string) => void;
  setRecentSearches: any;
};

export const SearchForm = ({
  storyEndpoint,
  searchTerm,
  handleSearch,
  setUrl,
  setRecentSearches,
}: SearchFormProps) => {
  return (
    <StyledSearchForm
      onSubmit={(event) => {
        setUrl(`${storyEndpoint}${searchTerm}`);
        setRecentSearches((prevState: string[]) => {
          // check if prevState already has the searchTerm
          const searchTermIndex = prevState.indexOf(searchTerm);
          if (searchTermIndex !== -1) {
            prevState.splice(searchTermIndex, 1);
          } 
          const newArr = [...prevState];
          newArr.unshift(searchTerm);
          return newArr;
        })
        event.preventDefault();
      }}
    >
      <Search searchTerm={searchTerm} onSearch={handleSearch} />
      <StyledButtonLarge disabled={!searchTerm} $invalid={false}>
        Search:
      </StyledButtonLarge>
    </StyledSearchForm>
  );
};

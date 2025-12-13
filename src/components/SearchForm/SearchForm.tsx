import { ChangeEvent, memo } from 'react';

import { StyledButtonLarge, StyledSearchForm } from "./Styles";
import { Search } from "../Search";

type SearchFormProps = {
  storyEndpoint: string;
  searchTerm: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  setUrl: (value: string) => void;
};

export const SearchForm = ({ storyEndpoint, searchTerm, handleSearch, setUrl }: SearchFormProps) => {

  return (
    <StyledSearchForm
      onSubmit={(event) => {
        setUrl(`${storyEndpoint}${searchTerm}`);
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

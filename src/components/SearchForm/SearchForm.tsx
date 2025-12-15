import { ChangeEvent } from "react";

import { StyledButtonLarge, StyledSearchForm } from "./Styles";
import { Search } from "../Search";

type SearchFormProps = {
  searchTerm: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  setUrls: any;
};

export const SearchForm = ({
  searchTerm,
  handleSearch,
  setUrls,
}: SearchFormProps) => {
  return (
    <StyledSearchForm
      onSubmit={(event) => {
        setUrls((prevState: string[]) => {
          const searchTermIndex = prevState.indexOf(searchTerm);
          if (searchTermIndex !== -1) {
            prevState.splice(searchTermIndex, 1);
          }
          return [searchTerm, ...prevState];
        });
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

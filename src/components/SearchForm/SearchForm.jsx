import { memo } from 'react';

import * as S from './Styles';
import { Search } from "../Search";

export const SearchForm = memo(({ storyEndpoint, searchTerm, handleSearch, setUrl }) => {

  return (
    <S.StyledSearchForm
      onSubmit={(event) => {
        setUrl(`${storyEndpoint}${searchTerm}`);
        event.preventDefault();
      }}
    >
      <Search searchTerm={searchTerm} onSearch={handleSearch} />
      <S.StyledButtonLarge disabled={!searchTerm} $invalid={true}>
        Search
      </S.StyledButtonLarge>
    </S.StyledSearchForm>
  );
});

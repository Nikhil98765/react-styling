import * as S from './Styles';
// import cs from 'classnames';
import { Search } from "../Search";
import { memo } from 'react';

export const SearchForm = memo(({ storyEndpoint, searchTerm, handleSearch, setUrl }) => {
  console.log("🚀 ~ SearchForm");

  return (
    <S.StyledSearchForm
      onSubmit={(event) => {
        setUrl(`${storyEndpoint}${searchTerm}`);
        event.preventDefault();
      }}
    >
      <Search searchTerm={searchTerm} onSearch={handleSearch} />
      {/* Through classnames function, more savvy to css developers */}
      {/* <S.StyledButtonLarge disabled={!searchTerm} className={cs({invalid: true})}>Search</S.StyledButtonLarge> */}

      {/* Through props , more savvy to js developers */}
      {/* Best Practice: Mark the props consumed by styled component to start with $ */}
      <S.StyledButtonLarge disabled={!searchTerm} $invalid={true}>
        Search
      </S.StyledButtonLarge>
    </S.StyledSearchForm>
  );
});

import * as S from './Styles';
import cs from 'classnames';
import { Search } from "../Search";

export const SearchForm = ({ storyEndpoint, searchTerm, handleSearch, setUrl }) => {

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
      <S.StyledButtonLarge disabled={!searchTerm} invalid={true}>
        Search
      </S.StyledButtonLarge>
    </S.StyledSearchForm>
  );
}

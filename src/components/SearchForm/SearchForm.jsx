import * as S from './Styles';
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
      <S.StyledButtonLarge disabled={!searchTerm}>Search</S.StyledButtonLarge>
    </S.StyledSearchForm>
  );
}

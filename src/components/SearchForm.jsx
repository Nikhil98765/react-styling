import styled from 'styled-components';
// import styles from '../App.module.css';
import { Search } from "./Search";

export const SearchForm = ({ storyEndpoint, searchTerm, handleSearch, setUrl }) => {
  
  const StyledSearchForm = styled.form`
    padding: 10px 0 20px 0;
    display: flex;
    align-items: baseline;
  `;

  const StyledButton = styled.button`
    background: transparent;
    border: 1px solid #171212;
    padding: 5px;
    cursor: pointer;
    transition: all 0.1s ease-in;

    &:hover {
      background: #171212;
      color: #ffffff;
    }
  `;

  const StyledButtonLarge = styled(StyledButton)`
    padding: 10px;
  `;

  return (
    <StyledSearchForm onSubmit={(event) => {
            setUrl(`${storyEndpoint}${searchTerm}`);
            event.preventDefault();
          }}>
            <Search searchTerm={searchTerm} onSearch={handleSearch} />
            <StyledButtonLarge
              disabled={!searchTerm}
            >
              Search
            </StyledButtonLarge>
          </StyledSearchForm>
  )
}

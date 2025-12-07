import { ChangeEvent } from "react";

type SearchProps = {
  searchTerm: string,
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

// controller component
export const Search = ({ searchTerm, onSearch }: SearchProps) => {

  return (
    <>
      <label htmlFor="search">Search : </label>
      <input type="text" id="search" value={searchTerm} onChange={(e) => onSearch(e)} />
    </>
  );
};

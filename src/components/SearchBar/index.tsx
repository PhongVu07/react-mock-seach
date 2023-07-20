import React, { useState } from 'react';
import { SearchContainer } from './styles';

interface IProps {
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<IProps> = ({ setSearchString }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchString(searchValue);
  };

  return (
    <SearchContainer onSubmit={handleSearch}>
      <input
        type="search"
        value={searchValue}
        placeholder="Search keywords on title"
        onChange={(e) => handleOnChange(e)}
      />
      <button type="submit" />
    </SearchContainer>
  );
};
export default SearchBar;

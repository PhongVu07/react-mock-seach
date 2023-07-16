import React from 'react';
import { SearchContainer } from './styles';

interface IProps {}

const SearchBar: React.FC<IProps> = () => {
  return (
    <SearchContainer>
      <input type="search" placeholder="Search keywords on title" />
      <button type="submit" />
    </SearchContainer>
  );
};
export default SearchBar;

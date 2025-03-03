import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../assets/searchicon.png';

function Top({ title, onSearch, width, searchQuery }) {
  const [searchTerm, setSearchTerm] = useState(searchQuery || ''); 

  useEffect(() => {
    setSearchTerm(searchQuery || '');
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <Frame width={width}>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <SearchContainer>
        <SearchImage src={SearchIcon} />
        <Search
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </SearchContainer>
    </Frame>
  );
}

export default Top;

const Frame = styled.div`
  display: flex;
  align-items: flex-end;
  width: ${(props) => props.width || '100%'};
  margin: 10px auto;
  margin-top: 40px;
  justify-content: space-between;
`

const TitleContainer = styled.div`
  width: 70%;
  flex-direction: column;
  border-bottom: 1px solid #ddd;
`

const Title = styled.div`
  width: 100%;
  font-size: 32px;
  margin-bottom: 30px;
  font-weight: 350;
  font-family: "Noto Sans KR", sans-serif;
`

const SearchContainer = styled.div`
  display: flex;
  flex: 1;
  width: 40%;
  justify-content: center;
  margin-left: 10px;
  position: relative;
`

const Search = styled.input`
  width: 100%;
  height: 30px;
  padding: 0 10px 0 40px; 
  border: 2px solid #aaa;
  border-radius: 10px;
  outline: none;
`

const SearchImage = styled.img`
  position: absolute;
  left: 10px; 
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
`
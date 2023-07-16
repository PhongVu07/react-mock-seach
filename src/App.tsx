import React, { useState } from 'react';
import Modal from 'react-modal';

import ResultTable from './components/ResultTable';
import SearchBar from './components/SearchBar';
import { AppContainer, modalStyle, PhotoDisplay, SelectWrapper } from './styles';
import { IPhoto } from './types';

const MOCK_DATA = [
  {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952',
  },
  {
    albumId: 1,
    id: 2,
    title: 'reprehenderit est deserunt velit ipsam',
    url: 'https://via.placeholder.com/600/771796',
    thumbnailUrl: 'https://via.placeholder.com/150/771796',
  },
  {
    albumId: 1,
    id: 3,
    title: 'officia porro iure quia iusto qui ipsa ut modi',
    url: 'https://via.placeholder.com/600/24f355',
    thumbnailUrl: 'https://via.placeholder.com/150/24f355',
  },
];

const TABLE_HEADERS = [
  {
    name: 'ID',
    value: 'id',
    width: 100,
  },
  {
    name: 'Title',
    value: 'title',
  },
  {
    name: 'Thumbnail',
    value: 'thumbnailUrl',
  },
];

function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<IPhoto>();

  const renderCellValue = (header: string, photo: IPhoto) => {
    const value = photo[header as keyof IPhoto] as string;
    if (header === 'thumbnailUrl') {
      return (
        <SelectWrapper onClick={() => setSelectedPhoto(photo)}>
          <img src={value} alt="photo thumbnail" />
        </SelectWrapper>
      );
    }
    if (header === 'id') {
      return (
        <SelectWrapper onClick={() => setSelectedPhoto(photo)}>
          {value}
        </SelectWrapper>
      );
    }
    return <>{value}</>;
  };

  return (
    <AppContainer>
      <SearchBar />
      <ResultTable
        headers={TABLE_HEADERS}
        data={MOCK_DATA}
        renderCellValue={renderCellValue}
      />
      <Modal
        isOpen={!!selectedPhoto}
        style={modalStyle}
        onRequestClose={() => setSelectedPhoto(undefined)}
      >
        <PhotoDisplay src={selectedPhoto?.url} alt="photo"/>
      </Modal>
    </AppContainer>
  );
}

export default App;

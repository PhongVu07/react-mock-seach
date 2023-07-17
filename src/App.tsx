import React, { useState } from 'react';
import Modal from 'react-modal';
import { useQuery } from '@apollo/client';

import ResultTable from './components/ResultTable';
import SearchBar from './components/SearchBar';
import {
  AppContainer,
  modalStyle,
  PhotoDisplay,
  SelectWrapper,
} from './styles';
import { IPhoto } from './types';
import { GET_PHOTOS } from './graphql';

const PAGE_LIMIT = 4;
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
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_PHOTOS, {
    variables: {
      options: {
        paginate: {
          page: page,
          limit: PAGE_LIMIT,
        },
      },
    },
  });
  console.log("Log ~ App ~ data:", data)

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

  if (loading) return <div>'Loading...'</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <AppContainer id="app">
      <SearchBar />
      <ResultTable
        headers={TABLE_HEADERS}
        data={data.photos.data}
        page={page}
        setPage={setPage}
        pageCount={data.photos.meta.totalCount / PAGE_LIMIT}
        renderCellValue={renderCellValue}
      />
      <Modal
        appElement={document.getElementById('app') as HTMLElement}
        isOpen={!!selectedPhoto}
        style={modalStyle}
        onRequestClose={() => setSelectedPhoto(undefined)}
      >
        <PhotoDisplay src={selectedPhoto?.url} alt="photo" />
      </Modal>
    </AppContainer>
  );
}

export default App;

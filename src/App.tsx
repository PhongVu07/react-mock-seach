import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { useQuery } from '@apollo/client';

import ResultTable from './components/ResultTable';
import SearchBar from './components/SearchBar';
import {
  AppContainer,
  modalStyle,
  PhotoDisplay,
  ResultSummary,
  SelectWrapper,
} from './styles';
import { IPagination, IPhoto } from './types';
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
    width: 200,
  },
];

function App() {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [searchString, setSearchString] = useState<string>('');
  const [selectedPhoto, setSelectedPhoto] = useState<IPhoto>();
  // Since mock server does not support search by title, we handle pagination and search on UI side
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageCount: 0,
    pageLimit: PAGE_LIMIT,
  });

  const { page, pageLimit } = pagination;
  const { loading, error, data } = useQuery(GET_PHOTOS);

  const renderCellValue = useCallback((header: string, photo: IPhoto) => {
    const value = photo[header as keyof IPhoto] as string;
    if (header === 'thumbnailUrl') {
      return (
        <SelectWrapper onClick={() => setSelectedPhoto(photo)}>
          <img src={value} alt="photo thumbnail" width={150} height={150}/>
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
  }, []);

  useEffect(() => {
    const allPhotos = data?.photos?.data || [];
    if (searchString) {
      const filteredPhotos = allPhotos.filter((photo: IPhoto) =>
        photo.title.includes(searchString.trim()),
      );
      setPhotos(filteredPhotos);
    } else {
      setPhotos(allPhotos);
    }
  }, [data, searchString]);

  useEffect(() => {
    const pageCount =
      photos && photos.length ? Math.ceil(photos.length / pageLimit) : 0;
    setPagination({
      ...pagination,
      page: 1,
      pageCount,
    });
  }, [photos]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! ${error.message}</div>;

  return (
    <AppContainer id="app">
      <SearchBar setSearchString={setSearchString} />
      <ResultSummary>
        <li>Page: {page}</li>
        <li>{photos.length} result</li>
      </ResultSummary>
      <ResultTable
        headers={TABLE_HEADERS}
        data={photos.slice(page * pageLimit - pageLimit, page * pageLimit)}
        pagination={pagination}
        setPagination={setPagination}
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

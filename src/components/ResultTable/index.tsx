import React from 'react';
import { IPhoto } from '../../types';
import { Header, Pagination, StyledTable } from './styles';

interface IHeader {
  name: string;
  value: string;
  width?: number;
}

interface IProps {
  headers: IHeader[];
  data: IPhoto[];
  page: number;
  pageCount: number;
  setPage: (page: number) => void
  renderCellValue: (header: string, photo: IPhoto) => React.JSX.Element;
}

const ResultTable: React.FC<IProps> = ({
  headers = [],
  data = [],
  page,
  pageCount,
  setPage,
  renderCellValue,
}) => {
  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            {headers.map(({ name, value, width }) => (
              <Header key={value} width={width}>
                {name}
              </Header>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((photo) => {
            return (
              <tr key={photo.id}>
                {headers.map(({ value }) => (
                  <td key={value}>{renderCellValue(value, photo)}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      <Pagination>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <button disabled={page === pageCount} onClick={() => setPage(page + 1)}>Next</button>
      </Pagination>
    </div>
  );
};

export default ResultTable;

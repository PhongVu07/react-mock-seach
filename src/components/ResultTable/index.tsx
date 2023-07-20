import React from 'react';
import { IPagination, IPhoto } from '../../types';
import { Header, Pagination, StyledTable } from './styles';

interface IHeader {
  name: string;
  value: string;
  width?: number;
}

interface IProps {
  headers: IHeader[];
  data: IPhoto[];
  pagination: IPagination;
  setPagination: React.Dispatch<React.SetStateAction<IPagination>>;
  renderCellValue: (header: string, photo: IPhoto) => React.JSX.Element;
}

const ResultTable: React.FC<IProps> = ({
  headers = [],
  data = [],
  pagination,
  setPagination,
  renderCellValue,
}) => {
  const { page, pageCount } = pagination;

  const handleChangePage = (page: number) => {
    setPagination((prevPagination: IPagination) => ({
      ...prevPagination,
      page,
    }));
  };

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
              <tr key={photo.id} data-testid="data-row">
                {headers.map(({ value }) => (
                  <td key={value}>{renderCellValue(value, photo)}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      <Pagination>
        <button
          disabled={page === 1}
          onClick={() => handleChangePage(page - 1)}
        >
          Prev
        </button>
        <button
          disabled={page >= pageCount}
          onClick={() => handleChangePage(page + 1)}
        >
          Next
        </button>
      </Pagination>
    </div>
  );
};

export default ResultTable;

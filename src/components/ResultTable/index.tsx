import React from 'react';
import { IPhoto } from '../../types';
import { Header, StyledTable } from './styles';

interface IHeader {
  name: string;
  value: string;
  width?: number;
}

interface IProps {
  headers: IHeader[];
  data: IPhoto[];
  renderCellValue: (header: string, photo: IPhoto) => React.JSX.Element;
}

const ResultTable: React.FC<IProps> = ({
  headers = [],
  data = [],
  renderCellValue,
}) => {
  return (
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
  );
};

export default ResultTable;

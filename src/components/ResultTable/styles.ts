import styled, { css } from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
  border: 1px solid #a7c941;

  thead {
    background-color: #a7c941;
  }

  tr:nth-child(even) {
    background-color: #e9f3d3;
  }

  td {
    padding: 12px 18px;
  }
`;

interface IHeaderStyleProps {
  width?: number;
}
export const Header = styled.th<IHeaderStyleProps>`
  text-align: left;
  padding: 18px 18px;

  ${(props) => css`
    width: ${props.width}px;
  `}
`;

import styled from 'styled-components';

export const AppContainer = styled.div`
  padding: 8px;
`;

export const SelectWrapper = styled.div`
  cursor: pointer;
`;

export const PhotoDisplay = styled.img`
  max-width: 100%;
`

export const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
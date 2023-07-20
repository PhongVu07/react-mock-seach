import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider, wait } from '@apollo/client/testing';

import App from './App';
import { GET_PHOTOS } from './graphql';

it('Should render photos', async () => {
  const mocks = [
    {
      request: {
        query: GET_PHOTOS,
      },
      result: {
        data: {
          photos: {
            data: [
              {
                id: 1,
                title: 'accusamus beatae ad facilis cum similique qui sunt',
                url: 'https://via.placeholder.com/600/92c952',
                thumbnailUrl: 'https://via.placeholder.com/150/92c952',
              },
              {
                id: 2,
                title: 'reprehenderit est deserunt velit ipsam',
                url: 'https://via.placeholder.com/600/771796',
                thumbnailUrl: 'https://via.placeholder.com/150/771796',
              },
              {
                id: 3,
                title: 'officia porro iure quia iusto qui ipsa ut modi',
                url: 'https://via.placeholder.com/600/24f355',
                thumbnailUrl: 'https://via.placeholder.com/150/24f355',
              },
            ],
          },
        },
      },
    },
  ];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
  );
  expect(await screen.findByText('Loading...')).toBeInTheDocument();

  const dataRows = await screen.findAllByTestId('data-row');
  expect(dataRows).toHaveLength(3);
});

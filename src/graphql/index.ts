import { gql } from '@apollo/client';

export const GET_PHOTOS = gql`
  query {
    photos {
      data {
        id
        title
        url
        thumbnailUrl
      }
    }
  }
`;

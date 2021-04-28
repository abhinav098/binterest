import { gql } from "@apollo/client";

const GET_UNSPLASH = gql`
  query Images($pageNum: Int!) {
    unsplashImages(pageNum: $pageNum) {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;

const GET_BINNED = gql`
  query {
    binnedImages {
      id
      binned
      description
      posterName
      url
    }
  }
`;

const GET_MY_POSTS = gql`
  query {
    userPostedImages {
      id
      description
      posterName
      binned
      url
    }
  }
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  GET_UNSPLASH,
  GET_BINNED,
  GET_MY_POSTS,
};

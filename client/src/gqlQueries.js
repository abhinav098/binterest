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
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;

const GET_MY_POSTS = gql`
  query {
    userPostedImages {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;

const GET_POPULAR = gql`
  query {
    getTopTenBinnedPosts {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;

const CREATE_POST = gql`
  mutation create($url: String!, $description: String, $posterName: String) {
    uploadImage(url: $url, description: $description, posterName: $posterName) {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;

const UPDATE_POST = gql`
  mutation update(
    $id: ID!
    $url: String
    $posterName: String
    $description: String
    $userPosted: Boolean
    $binned: Boolean
  ) {
    updateImage(
      id: $id
      url: $url
      posterName: $posterName
      description: $description
      userPosted: $userPosted
      binned: $binned
    ) {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;

const DELETE_POST = gql`
  mutation delete($id: ID!) {
    deleteImage(id: $id) {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  GET_UNSPLASH,
  GET_BINNED,
  GET_MY_POSTS,
  GET_POPULAR,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
};

const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    unsplashImages(pageNum: Int): [ImagePost]
    binnedImages: [ImagePost]
    userPostedImages: [ImagePost]
  }

  type ImagePost {
    id: ID
    url: String
    posterName: String
    description: String
    userPosted: Boolean
    binned: Boolean
  }

  type Mutation {
    uploadImage(
      url: String!
      description: String
      posterName: String
    ): ImagePost

    updateImage(
      id: ID!
      url: String
      posterName: String
      description: String
      userPosted: Boolean
      binned: Boolean
    ): ImagePost

    deleteImage(id: ID!): ImagePost
  }
`;

module.exports = {
  typeDefs,
};

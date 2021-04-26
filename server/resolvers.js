const imagesData = require("./data/images");

module.exports = {
  resolvers: {
    Query: {
      unsplashImages: (_, args) => await imagesData.getUnsplashImages(args.pageNum),
      binnedImages: () => await imagesData.getBinnedImages(),
      userPostedImages: () => await imagesData.userPostedImages,
    },

    Mutation: {
      uploadImage: (_, args) => {
        return await imagesData.uploadImage(args);
      },
      updateImage: (_, args) => {
        return await imagesData.updateImage(args);
      },
      deleteImage: (_, args) => {
        return await imagesData.deleteImage(args.id);
      },
    }
  },
};

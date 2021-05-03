const { RESTDataSource } = require("apollo-datasource-rest");
const { UserInputError } = require("apollo-server");
const imagesData = require("../data/images");
const UNSPLASH_API_KEY = "faGf8Qvphii5AO-4cmXEPILfr5uuAI_Kg4jMwoihLFs";
const redis = require("redis");
const client = redis.createClient();
class PhotosApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `https://api.unsplash.com/`;
  }

  willSendRequest(request) {
    request.headers.set("Authorization", this.context.accessKey);
  }

  async getImages(pageNum) {
    let data = await this.get(`photos`, { page: pageNum });
    let imagePosts = data.map((image) => this.imagePostObj(image));
    return imagePosts;
  }

  async imagePostObj(image) {
    const binnedIds = await client.smembersAsync("binnedPostsIds");
    const binned = binnedIds.includes(image.id) ? true : false;

    return {
      id: image.id,
      url: image.urls.regular,
      posterName: image.user && (image.user.name || image.username),
      description: image.description || image.alt_description,
      userPosted: false,
      binned: binned,
    };
  }
}

const resolvers = {
  Query: {
    unsplashImages: async (_, args, { dataSources }) => {
      return dataSources.photosApi.getImages(args.pageNum);
    },
    binnedImages: async () => {
      return await imagesData.getBinnedImages();
    },
    userPostedImages: async () => {
      return await imagesData.getUserImages();
    },
  },

  Mutation: {
    uploadImage: async (_, args) => {
      try {
        return await imagesData.uploadImage(args);
      } catch (e) {
        throw new UserInputError(e.message);
      }
    },
    updateImage: async (_, args) => {
      return await imagesData.updateImage(args);
    },
    deleteImage: async (_, args) => {
      return await imagesData.deleteImage(args.id);
    },
  },
};

const dataSources = () => {
  return {
    photosApi: new PhotosApi(),
  };
};
const context = () => {
  return {
    accessKey: `Client-ID ${UNSPLASH_API_KEY}`,
  };
};

module.exports = {
  resolvers,
  dataSources,
  context,
};

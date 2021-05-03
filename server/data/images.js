const redis = require("redis");
const client = redis.createClient();
const bluebird = require("bluebird");
const uuid = require("uuid");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = {
  async getBinnedImages() {
    let imageIds = await client.smembersAsync("binnedPostsIds");
    if (imageIds.length) {
      const imagePostsRedis = await client.mgetAsync(imageIds);
      return imagePostsRedis.map((r) => JSON.parse(r));
    }
  },

  async getUserImages() {
    let imageIds = await client.smembersAsync("userPostedIds");
    if (imageIds.length) {
      const imagePostsRedis = await client.mgetAsync(imageIds);
      return imagePostsRedis.map((r) => JSON.parse(r));
    }
  },

  async uploadImage(args) {
    const errors = [];
    const { url, description, posterName } = args;
    const binned = false;
    const userPosted = true;

    [url, description, posterName].forEach((attr) => {
      if (!(attr && typeof attr == "string" && attr.trim().length)) {
        errors.push(
          "Invalid input. URL, description and poster name must be a string"
        );
      }
    });

    if (errors.length) {
      throw new Error(errors[0]);
    } else {
      let id = uuid.v4();
      const imagePost = {
        id,
        url,
        description,
        posterName,
        binned,
        userPosted,
      };
      await client.saddAsync("userPostedIds", imagePost.id);
      await client.setAsync(`${imagePost.id}`, JSON.stringify(imagePost));
      return imagePost;
    }
  },

  async updateImage(args) {
    const imageObjRedis = await client.getAsync(args.id);
    if (!imageObjRedis) {
      const { id, url, description, posterName, binned, userPosted } = args;
      const imagePost = {
        id,
        url,
        description,
        posterName,
        binned,
        userPosted,
      };
      await client.saddAsync("binnedPostsIds", id);
      await client.setAsync(id, JSON.stringify(imagePost));
      return imagePost;
    } else {
      const image = JSON.parse(imageObjRedis);
      const { id, url, description, posterName, binned, userPosted } = args;

      try {
        if (image.userPosted) {
          const updatedImage = {
            id,
            url: url || image.url,
            description: description || image.description,
            posterName: posterName || image.posterName,
            binned: binned,
            userPosted: userPosted || image.userPosted,
          };
          await client.setAsync(id, JSON.stringify(updatedImage));

          if (binned) {
            await client.saddAsync("binnedPostsIds", id);
          } else {
            await client.sremAsync("binnedPostsIds", id);
          }
        } else {
          await client.sremAsync("binnedPostsIds", id);
          await client.delAsync(id);
        }
      } catch (e) {
        console.log(e);
      }
    }
  },

  async deleteImage(id) {
    const imageObjRedis = await client.getAsync(id);
    await client.sremAsync("binnedPostsIds", id);
    await client.sremAsync("userPostedIds", id);
    await client.delAsync(id);
    return JSON.parse(imageObjRedis);
  },
};

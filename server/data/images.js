const client = redis.createClient();
const uuid = require("uuid");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = {
  async getUnsplashImages(pageNum) {
    return [];
  },
  async getBinnedImages() {
    return [];
  },
};

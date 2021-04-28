const redis = require("redis");
const client = redis.createClient();
const bluebird = require("bluebird");
const uuid = require("uuid");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = {
  async getBinnedImages() {
    return [
      {
        id: "ssKZHiHOtxA",
        url:
          "https://images.unsplash.com/photo-1612392061981-9d086fe894ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjY0NjB8MXwxfGFsbHwxfHx8fHx8Mnx8MTYxOTU1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Ball Park Brand",
        description: "hotdog sandwich with mustard and ketchup",
        userPosted: false,
        binned: true,
      },
      {
        id: "idD9ofMGTK4",
        url:
          "https://images.unsplash.com/photo-1619546316434-264f95edec05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjY0NjB8MHwxfGFsbHwyfHx8fHx8Mnx8MTYxOTU1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Mak Flex",
        description:
          "man in blue denim jacket holding hands with woman in black jacket",
        userPosted: false,
        binned: true,
      },
      {
        id: "fLxvz8EjCoQ",
        url:
          "https://images.unsplash.com/photo-1619545307432-9fc73f8135ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjY0NjB8MHwxfGFsbHwzfHx8fHx8Mnx8MTYxOTU1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Muhammad Ruqi Yaddin",
        description: "woman in beige hijab standing",
        userPosted: false,
        binned: true,
      },
      {
        id: "gd-vnAOreKc",
        url:
          "https://images.unsplash.com/photo-1619439443549-3b38b4611adc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjY0NjB8MHwxfGFsbHw0fHx8fHx8Mnx8MTYxOTU1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Rodrigo Sümmer",
        description: "cars on bridge near high rise buildings during daytime",
        userPosted: false,
        binned: true,
      },
      {
        id: "CbvwhzzSPTY",
        url:
          "https://images.unsplash.com/photo-1619544173941-6113b3b23898?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjY0NjB8MHwxfGFsbHw1fHx8fHx8Mnx8MTYxOTU1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Ryunosuke Kikuno",
        description: "black and white ferris wheel",
        userPosted: false,
        binned: true,
      },
    ];
  },

  async getUserImages() {
    return [
      {
        id: "ssKZHiHOtxA",
        url:
          "https://images.unsplash.com/photo-1612392061981-9d086fe894ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjY0NjB8MXwxfGFsbHwxfHx8fHx8Mnx8MTYxOTU1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Ball Park Brand",
        description: "hotdog sandwich with mustard and ketchup",
        userPosted: true,
        binned: false,
      },
      {
        id: "idD9ofMGTK4",
        url:
          "https://images.unsplash.com/photo-1619546316434-264f95edec05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjY0NjB8MHwxfGFsbHwyfHx8fHx8Mnx8MTYxOTU1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Mak Flex",
        description:
          "man in blue denim jacket holding hands with woman in black jacket",
        userPosted: true,
        binned: false,
      },
      {
        id: "fLxvz8EjCoQ",
        url:
          "https://images.unsplash.com/photo-1619545307432-9fc73f8135ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjY0NjB8MHwxfGFsbHwzfHx8fHx8Mnx8MTYxOTU1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Muhammad Ruqi Yaddin",
        description: "woman in beige hijab standing",
        userPosted: true,
        binned: false,
      },
      {
        id: "gd-vnAOreKc",
        url:
          "https://images.unsplash.com/photo-1619439443549-3b38b4611adc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjY0NjB8MHwxfGFsbHw0fHx8fHx8Mnx8MTYxOTU1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Rodrigo Sümmer",
        description: "cars on bridge near high rise buildings during daytime",
        userPosted: true,
        binned: false,
      },
      {
        id: "CbvwhzzSPTY",
        url:
          "https://images.unsplash.com/photo-1619544173941-6113b3b23898?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjY0NjB8MHwxfGFsbHw1fHx8fHx8Mnx8MTYxOTU1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Ryunosuke Kikuno",
        description: "black and white ferris wheel",
        userPosted: true,
        binned: false,
      },
    ];
  },

  async uploadImage(args) {
    return {
      id: "fLxvz8EjCoQ",
      url:
        "https://images.unsplash.com/photo-1619545307432-9fc73f8135ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjY0NjB8MHwxfGFsbHwzfHx8fHx8Mnx8MTYxOTU1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080",
      posterName: "Muhammad Ruqi Yaddin",
      description: "woman in beige hijab standing",
      userPosted: true,
      binned: false,
    };
  },
  async updateImage(args) {
    return {
      id: "idD9ofMGTK4",
      url:
        "https://images.unsplash.com/photo-1619546316434-264f95edec05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjY0NjB8MHwxfGFsbHwyfHx8fHx8Mnx8MTYxOTU1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080",
      posterName: "Mak Flex",
      description:
        "man in blue denim jacket holding hands with woman in black jacket",
      userPosted: true,
      binned: true,
    };
  },
  async deleteImage(id) {
    return {
      id: "ssKZHiHOtxA",
      url:
        "https://images.unsplash.com/photo-1612392061981-9d086fe894ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjY0NjB8MXwxfGFsbHwxfHx8fHx8Mnx8MTYxOTU1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080",
      posterName: "Ball Park Brand",
      description: "hotdog sandwich with mustard and ketchup",
      userPosted: false,
      binned: false,
    };
  },
};

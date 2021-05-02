const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./queries/typeDef");
const { resolvers, dataSources, context } = require("./queries/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});

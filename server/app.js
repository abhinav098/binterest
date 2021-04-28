const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./apollo/typeDef");
const { resolvers, dataSources, context } = require("./apollo/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});

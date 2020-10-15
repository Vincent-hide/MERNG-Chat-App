import { ApolloServer, gql } from "apollo-server-express"; // import enabled by babel from esm
import typeDefs from "./typeDefs";
import mongoose from "mongoose";
import resolvers from "./resolvers";
import express from "express";
import { APP_PORT, NODE_ENV, IN_PROD } from "./config";


(async () => {
  try {

  } catch (e) {
    console.log(e);
  }
  await mongoose.connect(
    'mongodb://localhost:27017/MERNG_CHAT',
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  );

  const app = express();

  app.disable('x-powered-by');

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: !IN_PROD
  });

  server.applyMiddleware({ app })

// The `listen` method launches a web server.
  app.listen({ port: APP_PORT }, () => {
    console.log(`🚀  http://localhost:${APP_PORT}${server.graphqlPath}`);
  });
})();


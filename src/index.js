import { ApolloServer, gql } from "apollo-server-express"; // import enabled by babel from esm
import typeDefs from "./typeDefs";
import mongoose from "mongoose";
import session from "express-session";
import connectRedis from "connect-redis";
import resolvers from "./resolvers";
import express from "express";
import { APP_PORT, NODE_ENV, SESS_NAME, SESS_SECRET, SESS_LIFETIME, IN_PROD, REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from "./config";


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

  // const RedisStore = connectRedis(session);

  // const store = new RedisStore({
  //   host: REDIS_HOST,
  //   post: REDIS_PORT,
  //   password: REDIS_PASSWORD
  // })
  //
  app.use(session({
    // store,
    name: SESS_NAME,
    secret: SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: IN_PROD
    }
  }))

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: !IN_PROD,
    context: ({ req, res }) =>  ({ req, res })
  });

  server.applyMiddleware({ app })

// The `listen` method launches a web server.
  app.listen({ port: APP_PORT }, () => {
    console.log(`🚀  http://localhost:${APP_PORT}${server.graphqlPath}`);
  });
})();


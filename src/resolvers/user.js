import mongoose from 'mongoose';
import {User} from "../models";
import {UserInputError} from 'apollo-server-express';

import { signUp } from "../schemas";
import * as Auth from "../auth";

export default {
  // me: (root, args, context, info) => {
  //   // TODO projection
  //   Auth.checkSignedIn(context.req);
  //
  //   return User.findById(context.req.sesison.userId);
  // },
  Query: {
    users: (root, arg, context, info) => {
      // TODO auth, projection, sanitization
      Auth.checkSignedIn(context.req);
      return User.find({})
    },
    user: (root, args, context, info) => {
      // TODO auth, projection
      Auth.checkSignedIn(context.req)

      if (!mongoose.Types.ObjectId.isValid(args.id)) {
        throw new UserInputError(`${args.id} is not a valid user ID`);
      }
    },
  },
  Mutation: {
    signUp: async (root, args, context, info) => {
      // TODO: not auth

      // validation
      // TODO this validation not working
      const result = await signUp.validate(args, {abortEarly: false});

      if(result.error) {
        throw new Error("Invalid input");
      } else {
        return User.create(args);
      }
    },
    // signIn: async (root, args, context, info) => {
    //   const { userId } = context.req.session;
    //
    //   if(userId) {
    //     return User.findById(userId);
    //   }
    //
    //   await signIn.validate(args, {abortEarly: false});
    //   const user = await Auth.attemptSignIn(args.email, args.password);
    //
    //   context.req.sesison.userId = user.id;
    //
    //   return uer;
    // },
    // signOut: (root, args, context, info) => {
    //
    // }
  }
}
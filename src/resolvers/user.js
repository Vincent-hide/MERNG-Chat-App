import mongoose from 'mongoose';
import { User } from "../models";
import { UserInputError } from 'apollo-server-express';

import { SignUp } from "../schemas";

export default {
  Query: {
    users: (root, arg, context, info) => {
      // TODO auth, projection, sanitization

      return User.find({})
    },
    user: (root, args, context, info) => {
      // TODO auth, projection
      if(!mongoose.Types.ObjectId.isValid(args.id)) {
        throw new UserInputError(`${args.id} is not a valid user ID`);
      }
    },
  },
  Mutation: {
    signUp: async (root, args, context, info) => {
      // TODO: not auth

      // validation
      // TODO this validation not working
      await SignUp.validate(args, { abortEarly: false });

      return User.create(args);
      // create() fires save() hooks
    }
  }
}
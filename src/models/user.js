import mongoose, { Schema } from 'mongoose';
import { hash, compare } from 'bcryptjs';
import Chat from "../models/chat"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    // required: true,
    // unique: true,
    validator: email => User.doesExist({ email }), // if the count of the same email in db is 0 or not
    message: ({ value }) => `Email ${value} has already been taken`,
  },
  username: {
    type: String,
    // required: true,
    // unique: true,
    validator: username => User.doesExist({ username }), // if the count of the same email in db is 0 or not
    message: ({ value }) => `Username ${value} has already been taken`,
  },
  name: {
    type: String,
    // required: true
  },
  password: {
    type: String,
    // required: true
  },
  chats: [{
    type: Schema.Types.ObjectId,
    ref: Chat
  }],
}, { timestamps: true });

// .pre() gets executed before executing save()
userSchema.pre('save', async function(next) { // this cannot be arrow function, as this keyword will be undefined. https://youtu.be/TIAfjBXsY2E?list=PLcCp4mjO-z9_y8lByvIfNgA_F18l-soQv
  console.log("THIS", this);
  if(this.isModified('password')) {
    try {
      this.password = await hash(this.password, +10);
    } catch (e) {
      next(e);
    }
  }
  next();
});

// a method attached to a class
userSchema.statics.doesExist = async function(option) {
  return await this.where(options).countDocuments() === 0
}

// a method attached to an object
// userSchema.methods.matchesPassword = function(password) {
//   return compare(password, this.password);
// }

const User = mongoose.model('User', userSchema);

export default User;
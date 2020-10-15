import mongoose from 'mongoose';
import { hash } from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true }
}, { timestamps: true });

// .pre() gets executed before executing save()
userSchema.pre('save', async function(next) { // this cannot be arrow function, as this keyword will be undefined. https://youtu.be/TIAfjBXsY2E?list=PLcCp4mjO-z9_y8lByvIfNgA_F18l-soQv
  console.log("THIS", this);
  if(this.isModified('password')) {
    try {
      this.password = await hash(this.password, 10);
    } catch (e) {
      next(e);
    }
  }
  next();
});

export default mongoose.model('User', userSchema);
import { Schema } from 'mongoose';
import sha256 from 'sha256';

const userSchema = new Schema({
  uuid: { type: String },
  name: { type: String },
  email: { type: String },
  avatar: { type: String },
});

export default userSchema;

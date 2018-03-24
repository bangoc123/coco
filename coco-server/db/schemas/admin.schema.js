import { Schema } from 'mongoose';
import sha256 from 'sha256';

const adminSchema = new Schema({
  username: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String },
});


/**
 * @param {*} password
 */
adminSchema.methods.comparePassword = function comparePassword(password) {
  return this.hashedPassword === sha256(password);
};

export default adminSchema;

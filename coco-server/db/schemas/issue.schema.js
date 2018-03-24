import mongoose, { Schema } from 'mongoose';
import sha256 from 'sha256';

const issueSchema = new Schema({
  _id: Schema.Types.ObjectId,
  issue_type: { type: Number, default: 1 },
  lat: { type: Number },
  lng: { type: Number },
  email: { type: String },
  avatar: { type: String },
  user: { type: String, ref: 'User', required: true },
  image: { type: String },
  content: [{
    color: String,
    smelling: String,
  }]
});

export default issueSchema;

import { Schema } from 'mongoose';

const roomSchema = new Schema({
  name: { type: String, required: true },
  issues: [{ type: String, ref: 'Issue' }],
  content: { type: String},
  area: {
    center: {
      lat: Number,
      lng: Number,
    },
    radius: Number,
  }
}, {
  timestamps: true
});

export default roomSchema;
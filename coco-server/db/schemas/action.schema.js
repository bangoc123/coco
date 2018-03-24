import { Schema } from 'mongoose';

const roomSchema = new Schema({
  name: { type: String, required: true },
  issues: [{ type: String, ref: 'Issue' }],
  content: { type: String},
  
});

export default roomSchema;
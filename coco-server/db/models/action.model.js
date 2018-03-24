import mongoose from 'mongoose';
import actionSchema from '../schemas/action.schema';

const action = mongoose.model('Action', actionSchema);
export default action;
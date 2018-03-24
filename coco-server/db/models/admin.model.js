import mongoose from 'mongoose';
import adminSchema from '../schemas/admin.schema';

const admin = mongoose.model('Admin', adminSchema);
export default admin;

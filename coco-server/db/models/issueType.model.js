import mongoose from 'mongoose';
import issueTypeSchema from '../schemas/user.schema';

const issueType = mongoose.model('IssueType', issueTypeSchema);
export default issueType;

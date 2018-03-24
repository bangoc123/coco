import mongoose from 'mongoose';
import issueSchema from '../schemas/issue.schema';

const issue = mongoose.model('Issue', issueSchema);
export default issue;

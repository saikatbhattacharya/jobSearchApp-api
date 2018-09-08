import mongoose from 'mongoose';
import schema from './schema.json';

const jobSchema = new mongoose.Schema(schema['jobs']);
const jobModel = mongoose.model('job', jobSchema);

export default {
  jobModel
}

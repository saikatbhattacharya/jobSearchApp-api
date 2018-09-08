import mongoose from 'mongoose';
import schema from './schema.json';

const jobSchema = new mongoose.Schema(schema['jobs']);
jobSchema.index({
  title: 'text',
  companyName: 'text',
  location: 'text',
  jobDesc: 'text'
}, {
  weights: {
    title: 5,
    companyName: 3,
    location: 1,
    jobDesc: 4
  }
});

const jobModel = mongoose.model('job', jobSchema);

export default {
  jobModel
}

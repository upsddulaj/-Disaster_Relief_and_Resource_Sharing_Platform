import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['incident', 'resource'], required: true },
    title: { type: String, required: true },
    description: { type: String },
    disaster: { type: mongoose.Schema.Types.ObjectId, ref: 'Disaster' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    data: { type: mongoose.Schema.Types.Mixed }
  },
  { timestamps: true }
);

reportSchema.index({ type: 1, createdAt: -1 });

const Report = mongoose.model('Report', reportSchema);
export default Report;

import mongoose from 'mongoose';

const resourceRequestSchema = new mongoose.Schema(
  {
    resourceType: { type: String, enum: ['food', 'shelter', 'medical', 'transport', 'other'], required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    status: { type: String, enum: ['open', 'matched', 'fulfilled'], default: 'open' },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    disaster: { type: mongoose.Schema.Types.ObjectId, ref: 'Disaster' },
    matchedResource: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }
  },
  { timestamps: true }
);

resourceRequestSchema.index({ status: 1, resourceType: 1 });

const ResourceRequest = mongoose.model('ResourceRequest', resourceRequestSchema);
export default ResourceRequest;

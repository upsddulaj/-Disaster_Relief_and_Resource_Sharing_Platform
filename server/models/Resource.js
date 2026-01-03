import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ['food', 'shelter', 'medical', 'transport', 'other'], required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    unit: { type: String, default: 'units' },
    location: {
      address: { type: String },
      coordinates: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], index: '2dsphere' }
      }
    },
    status: { type: String, enum: ['available', 'allocated', 'delivered'], default: 'available' },
    images: [{ type: String }],
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;

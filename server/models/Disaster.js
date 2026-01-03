import mongoose from 'mongoose';

const disasterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], required: true },
    status: { type: String, enum: ['active', 'contained', 'resolved'], default: 'active' },
    description: { type: String },
    location: {
      address: { type: String },
      coordinates: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], index: '2dsphere' }
      }
    },
    timeline: [
      {
        message: { type: String },
        createdAt: { type: Date, default: Date.now }
      }
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

const Disaster = mongoose.model('Disaster', disasterSchema);
export default Disaster;

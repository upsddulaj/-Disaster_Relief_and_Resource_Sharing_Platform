import mongoose from 'mongoose';

const volunteerProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    skills: [{ type: String }],
    availabilityStatus: { type: String, enum: ['available', 'busy', 'offline'], default: 'available' },
    assignedDisasters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Disaster' }],
    certifications: [{ type: String }]
  },
  { timestamps: true }
);

const VolunteerProfile = mongoose.model('VolunteerProfile', volunteerProfileSchema);
export default VolunteerProfile;

import VolunteerProfile from '../models/VolunteerProfile.js';

export const createOrUpdateProfile = async (req, res, next) => {
  try {
    const profile = await VolunteerProfile.findOneAndUpdate(
      { user: req.user._id },
      { ...req.body, user: req.user._id },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const listVolunteers = async (req, res, next) => {
  try {
    const volunteers = await VolunteerProfile.find().populate('user', 'name role');
    res.json(volunteers);
  } catch (error) {
    next(error);
  }
};

export const assignVolunteer = async (req, res, next) => {
  try {
    const profile = await VolunteerProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    profile.assignedDisasters = Array.from(
      new Set([...(profile.assignedDisasters || []), req.body.disasterId])
    );
    profile.availabilityStatus = 'busy';
    await profile.save();
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

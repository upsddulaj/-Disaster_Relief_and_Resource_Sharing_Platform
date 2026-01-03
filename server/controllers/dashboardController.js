import Disaster from '../models/Disaster.js';
import Resource from '../models/Resource.js';
import ResourceRequest from '../models/ResourceRequest.js';
import VolunteerProfile from '../models/VolunteerProfile.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const [activeDisasters, resourceCount, requestCount, volunteerCount] = await Promise.all([
      Disaster.countDocuments({ status: 'active' }),
      Resource.countDocuments(),
      ResourceRequest.countDocuments(),
      VolunteerProfile.countDocuments()
    ]);

    res.json({
      activeDisasters,
      resourceCount,
      requestCount,
      volunteerCount
    });
  } catch (error) {
    next(error);
  }
};

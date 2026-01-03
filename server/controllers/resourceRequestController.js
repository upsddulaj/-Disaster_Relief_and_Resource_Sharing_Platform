import ResourceRequest from '../models/ResourceRequest.js';
import Resource from '../models/Resource.js';

export const createResourceRequest = async (req, res, next) => {
  try {
    const request = await ResourceRequest.create({
      ...req.body,
      requestedBy: req.user._id
    });
    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
};

export const getResourceRequests = async (req, res, next) => {
  try {
    const requests = await ResourceRequest.find()
      .populate('requestedBy', 'name role')
      .populate('matchedResource');
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

export const matchResourceRequest = async (req, res, next) => {
  try {
    const request = await ResourceRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    const resource = await Resource.findById(req.body.resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    request.matchedResource = resource._id;
    request.status = 'matched';
    await request.save();

    resource.status = 'allocated';
    await resource.save();

    res.json(request);
  } catch (error) {
    next(error);
  }
};

import Resource from '../models/Resource.js';

export const createResource = async (req, res, next) => {
  try {
    const images = (req.files || []).map((file) => file.path);
    const resource = await Resource.create({
      ...req.body,
      images,
      provider: req.user._id
    });
    res.status(201).json(resource);
  } catch (error) {
    next(error);
  }
};

export const getResources = async (req, res, next) => {
  try {
    const resources = await Resource.find().populate('provider', 'name role');
    res.json(resources);
  } catch (error) {
    next(error);
  }
};

export const updateResourceStatus = async (req, res, next) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    next(error);
  }
};

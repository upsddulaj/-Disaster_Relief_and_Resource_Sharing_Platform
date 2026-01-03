import Disaster from '../models/Disaster.js';

export const createDisaster = async (req, res, next) => {
  try {
    const disaster = await Disaster.create({
      ...req.body,
      createdBy: req.user._id
    });
    res.status(201).json(disaster);
  } catch (error) {
    next(error);
  }
};

export const getDisasters = async (req, res, next) => {
  try {
    const disasters = await Disaster.find().populate('createdBy', 'name role');
    res.json(disasters);
  } catch (error) {
    next(error);
  }
};

export const getDisasterById = async (req, res, next) => {
  try {
    const disaster = await Disaster.findById(req.params.id).populate('createdBy', 'name role');
    if (!disaster) {
      return res.status(404).json({ message: 'Disaster not found' });
    }
    res.json(disaster);
  } catch (error) {
    next(error);
  }
};

export const updateDisaster = async (req, res, next) => {
  try {
    const disaster = await Disaster.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!disaster) {
      return res.status(404).json({ message: 'Disaster not found' });
    }
    res.json(disaster);
  } catch (error) {
    next(error);
  }
};

export const addTimelineUpdate = async (req, res, next) => {
  try {
    const disaster = await Disaster.findById(req.params.id);
    if (!disaster) {
      return res.status(404).json({ message: 'Disaster not found' });
    }
    disaster.timeline.push({ message: req.body.message });
    await disaster.save();
    res.json(disaster);
  } catch (error) {
    next(error);
  }
};

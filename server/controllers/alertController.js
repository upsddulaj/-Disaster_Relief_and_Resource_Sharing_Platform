import Alert from '../models/Alert.js';

export const createAlert = async (req, res, next) => {
  try {
    const alert = await Alert.create({
      ...req.body,
      createdBy: req.user._id
    });

    const io = req.app.get('io');
    if (io) {
      io.emit('alert:new', alert);
    }

    res.status(201).json(alert);
  } catch (error) {
    next(error);
  }
};

export const getAlerts = async (req, res, next) => {
  try {
    const alerts = await Alert.find().populate('createdBy', 'name role');
    res.json(alerts);
  } catch (error) {
    next(error);
  }
};

import Report from '../models/Report.js';

export const createReport = async (req, res, next) => {
  try {
    const report = await Report.create({
      ...req.body,
      createdBy: req.user._id
    });
    res.status(201).json(report);
  } catch (error) {
    next(error);
  }
};

export const getReports = async (req, res, next) => {
  try {
    const reports = await Report.find()
      .populate('createdBy', 'name role')
      .populate('disaster', 'title status');
    res.json(reports);
  } catch (error) {
    next(error);
  }
};

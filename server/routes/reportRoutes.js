import express from 'express';
import Joi from 'joi';
import { createReport, getReports } from '../controllers/reportController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';

const router = express.Router();

const reportSchema = Joi.object({
  body: Joi.object({
    type: Joi.string().valid('incident', 'resource').required(),
    title: Joi.string().required(),
    description: Joi.string().optional(),
    disaster: Joi.string().optional(),
    data: Joi.object().optional()
  })
});

router.get('/', protect, authorizeRoles('admin', 'organization'), getReports);
router.post('/', protect, authorizeRoles('admin', 'organization'), validateRequest(reportSchema), createReport);

export default router;

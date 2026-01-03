import express from 'express';
import Joi from 'joi';
import { createAlert, getAlerts } from '../controllers/alertController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';

const router = express.Router();

const alertSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().required(),
    message: Joi.string().required(),
    severity: Joi.string().valid('info', 'warning', 'critical').optional(),
    isBroadcast: Joi.boolean().optional(),
    disaster: Joi.string().optional()
  })
});

router.get('/', protect, getAlerts);
router.post('/', protect, authorizeRoles('admin', 'organization'), validateRequest(alertSchema), createAlert);

export default router;

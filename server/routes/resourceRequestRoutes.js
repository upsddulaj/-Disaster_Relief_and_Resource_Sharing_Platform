import express from 'express';
import Joi from 'joi';
import { createResourceRequest, getResourceRequests, matchResourceRequest } from '../controllers/resourceRequestController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';

const router = express.Router();

const requestSchema = Joi.object({
  body: Joi.object({
    resourceType: Joi.string().valid('food', 'shelter', 'medical', 'transport', 'other').required(),
    description: Joi.string().optional(),
    quantity: Joi.number().required(),
    disaster: Joi.string().optional()
  })
});

const matchSchema = Joi.object({
  body: Joi.object({
    resourceId: Joi.string().required()
  })
});

router.get('/', protect, getResourceRequests);
router.post('/', protect, authorizeRoles('citizen', 'organization', 'admin'), validateRequest(requestSchema), createResourceRequest);
router.post('/:id/match', protect, authorizeRoles('admin', 'organization'), validateRequest(matchSchema), matchResourceRequest);

export default router;

import express from 'express';
import Joi from 'joi';
import { createDisaster, getDisasters, getDisasterById, updateDisaster, addTimelineUpdate } from '../controllers/disasterController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';

const router = express.Router();

const disasterSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().required(),
    type: Joi.string().required(),
    severity: Joi.string().valid('low', 'medium', 'high', 'critical').required(),
    status: Joi.string().valid('active', 'contained', 'resolved').optional(),
    description: Joi.string().optional(),
    location: Joi.object({
      address: Joi.string().optional(),
      coordinates: Joi.object({
        type: Joi.string().valid('Point').optional(),
        coordinates: Joi.array().items(Joi.number()).length(2).optional()
      }).optional()
    }).optional()
  })
});

const timelineSchema = Joi.object({
  body: Joi.object({
    message: Joi.string().required()
  })
});

router.get('/', protect, getDisasters);
router.post('/', protect, authorizeRoles('admin', 'organization'), validateRequest(disasterSchema), createDisaster);
router.get('/:id', protect, getDisasterById);
router.put('/:id', protect, authorizeRoles('admin', 'organization'), updateDisaster);
router.post('/:id/timeline', protect, authorizeRoles('admin', 'organization'), validateRequest(timelineSchema), addTimelineUpdate);

export default router;

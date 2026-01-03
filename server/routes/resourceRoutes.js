import express from 'express';
import Joi from 'joi';
import { createResource, getResources, updateResourceStatus } from '../controllers/resourceController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

const resourceSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().required(),
    type: Joi.string().valid('food', 'shelter', 'medical', 'transport', 'other').required(),
    description: Joi.string().optional(),
    quantity: Joi.number().required(),
    unit: Joi.string().optional(),
    location: Joi.object({
      address: Joi.string().optional(),
      coordinates: Joi.object({
        type: Joi.string().valid('Point').optional(),
        coordinates: Joi.array().items(Joi.number()).length(2).optional()
      }).optional()
    }).optional(),
    status: Joi.string().valid('available', 'allocated', 'delivered').optional()
  })
});

router.get('/', protect, getResources);
router.post(
  '/',
  protect,
  authorizeRoles('admin', 'organization'),
  upload.array('images', 5),
  validateRequest(resourceSchema),
  createResource
);
router.put('/:id', protect, authorizeRoles('admin', 'organization'), updateResourceStatus);

export default router;

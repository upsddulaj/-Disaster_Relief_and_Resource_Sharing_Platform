import express from 'express';
import Joi from 'joi';
import { createOrUpdateProfile, listVolunteers, assignVolunteer } from '../controllers/volunteerController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';

const router = express.Router();

const profileSchema = Joi.object({
  body: Joi.object({
    skills: Joi.array().items(Joi.string()).optional(),
    availabilityStatus: Joi.string().valid('available', 'busy', 'offline').optional(),
    certifications: Joi.array().items(Joi.string()).optional()
  })
});

const assignSchema = Joi.object({
  body: Joi.object({
    disasterId: Joi.string().required()
  })
});

router.get('/', protect, authorizeRoles('admin', 'organization'), listVolunteers);
router.post('/profile', protect, authorizeRoles('volunteer', 'admin'), validateRequest(profileSchema), createOrUpdateProfile);
router.post('/:id/assign', protect, authorizeRoles('admin', 'organization'), validateRequest(assignSchema), assignVolunteer);

export default router;

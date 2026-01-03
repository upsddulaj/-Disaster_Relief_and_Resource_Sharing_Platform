import express from 'express';
import Joi from 'joi';
import { registerUser, loginUser, verifyEmail, requestPasswordReset, resetPassword } from '../controllers/authController.js';
import { validateRequest } from '../middleware/validate.js';

const router = express.Router();

const registerSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'organization', 'volunteer', 'citizen').optional(),
    phone: Joi.string().optional()
  })
});

const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
});

const emailSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required()
  })
});

const resetSchema = Joi.object({
  body: Joi.object({
    password: Joi.string().min(6).required()
  }),
  query: Joi.object({
    token: Joi.string().required()
  })
});

router.post('/register', validateRequest(registerSchema), registerUser);
router.post('/login', validateRequest(loginSchema), loginUser);
router.get('/verify-email', verifyEmail);
router.post('/password-reset', validateRequest(emailSchema), requestPasswordReset);
router.post('/reset-password', validateRequest(resetSchema), resetPassword);

export default router;

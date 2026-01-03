import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', protect, authorizeRoles('admin', 'organization'), getDashboardStats);

export default router;

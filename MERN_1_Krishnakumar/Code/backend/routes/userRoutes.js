import express from 'express';
import {
  getUserProfile,
  getAllUsers,
  getPublicContent,
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route
router.get('/public', getPublicContent);

// Private route - only for logged-in users (any role)
router.get(
  '/profile',
  protect,
  getUserProfile
);

// Private route - only for 'admin' role
router.get(
  '/all',
  protect,
  authorize('admin'),
  getAllUsers
);

export default router;
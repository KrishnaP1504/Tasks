import User from '../models/User.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private (User or Admin)
export const getUserProfile = (req, res) => {
    // req.user is available thanks to the 'protect' middleware
    res.status(200).json({
      message: "Welcome to your profile!",
      user: req.user
    });
  };
  
  // @desc    Get all users (Admin only)
  // @route   GET /api/users/all
  // @access  Private (Admin)
  export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}).select('-password');
      res.status(200).json({
        message: "Welcome to the admin dashboard. Here are all the users.",
        count: users.length,
        users: users
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // @desc    Get public content
  // @route   GET /api/users/public
  // @access  Public
  export const getPublicContent = (req, res) => {
    res.status(200).json({ message: "This is public content. Anyone can see this!" });
  };
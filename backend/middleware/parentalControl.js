const User = require('../models/User');
const Module = require('../models/Module');

// @desc    Check parental controls
const parentalControl = async (req, res, next) => {
  try {
    // For public routes, check if user is making request with auth token
    let user = null;
    let token = null;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecretKey');
        user = await User.findById(decoded.userId).select('-password');
      } catch (error) {
        // Token is invalid, continue as unauthenticated user
      }
    }
    
    // If user is authenticated, check parental controls
    if (user) {
      // Check if it's a module request
      if (req.params.id) {
        const module = await Module.findOne({ id: req.params.id });
        
        if (module) {
          // Check age group compatibility
          if (!user.canAccessContent(module.ageGroup)) {
            return res.status(403).json({
              success: false,
              error: `Content not suitable for age ${user.age || 'unknown'}. Required age group: ${module.ageGroup}`
            });
          }
          
          // Check difficulty level
          if (user.preferences?.maxDifficulty === 'easy' && module.difficulty !== 'easy') {
            return res.status(403).json({
              success: false,
              error: `Content difficulty too high. Current setting: ${user.preferences.maxDifficulty}`
            });
          }
          
          if (user.preferences?.maxDifficulty === 'medium' && module.difficulty === 'hard') {
            return res.status(403).json({
              success: false,
              error: `Content difficulty too high. Current setting: ${user.preferences.maxDifficulty}`
            });
          }
          
          // Check time restrictions
          const now = new Date();
          const currentHour = now.getHours();
          const currentMinute = now.getMinutes();
          const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
          
          const { start, end } = user.preferences?.allowedHours || { start: '08:00', end: '20:00' };
          
          // Convert time strings to minutes for comparison
          const timeToMinutes = (timeStr) => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            return hours * 60 + minutes;
          };
          
          const startMinutes = timeToMinutes(start);
          const endMinutes = timeToMinutes(end);
          const currentMinutes = timeToMinutes(currentTime);
          
          // Handle overnight restrictions (e.g., 22:00 to 08:00)
          if (startMinutes > endMinutes) {
            if (currentMinutes > startMinutes || currentMinutes < endMinutes) {
              // Within restricted time
              return res.status(403).json({
                success: false,
                error: `Access restricted to allowed hours: ${start} - ${end}`
              });
            }
          } else {
            if (currentMinutes < startMinutes || currentMinutes > endMinutes) {
              // Outside allowed hours
              return res.status(403).json({
                success: false,
                error: `Access restricted to allowed hours: ${start} - ${end}`
              });
            }
          }
        }
      }
    }
    
    next();
  } catch (error) {
    console.error('Parental control error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error in parental control check'
    });
  }
};

module.exports = parentalControl;
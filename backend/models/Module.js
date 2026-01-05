const mongoose = require('mongoose');

const quizQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    text: String,
    isCorrect: Boolean
  }],
  type: {
    type: String,
    enum: ['multiple-choice', 'true-false'],
    default: 'multiple-choice'
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  }
});

const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '🏆'
  },
  earnedAt: {
    type: Date,
    default: Date.now
  }
});

const moduleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ageRange: {
    type: String,
    enum: ['5-7', '8-10', '11-12'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    default: '/videos/placeholder.mp4' // Placeholder for now
  },
  thumbnailUrl: {
    type: String,
    default: '/images/module-thumbnail.jpg'
  },
  phase: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true
  },
  seasonId: {
    type: String,
    required: true
  },
  quizzes: [quizQuestionSchema],
  badges: [badgeSchema],
  skills: [{
    type: String
  }],
  tags: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Module', moduleSchema);
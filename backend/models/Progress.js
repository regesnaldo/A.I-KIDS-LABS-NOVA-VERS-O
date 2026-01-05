const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
  moduleId: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: [{
    questionId: String,
    selectedOption: String,
    isCorrect: Boolean
  }],
  score: {
    type: Number,
    min: 0,
    max: 100
  },
  starsEarned: {
    type: Number,
    min: 0,
    max: 3,
    default: 0
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
});

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  moduleId: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  videoWatched: {
    type: Boolean,
    default: false
  },
  quizAttempt: quizAttemptSchema,
  progressPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  badgesEarned: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Progress', progressSchema);
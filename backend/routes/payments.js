const express = require('express');
const router = express.Router();
const { 
  createSubscriptionPlan, 
  createSubscription, 
  handlePagSeguroNotification, 
  getUserSubscription, 
  cancelSubscription,
  processWebhook,
  getSubscriptionDetails
} = require('../controllers/paymentController');
const auth = require('../middleware/auth');

// @route   POST api/payments/plan
// @desc    Create a subscription plan
// @access  Private (Admin only for plan creation, but this could be public for standard plans)
router.post('/plan', auth, createSubscriptionPlan);

// @route   POST api/payments/subscribe
// @desc    Create a subscription for a user
// @access  Private
router.post('/subscribe', auth, createSubscription);

// @route   GET api/payments/subscription
// @desc    Get user subscription status
// @access  Private
router.get('/subscription', auth, getUserSubscription);

// @route   DELETE api/payments/subscription
// @desc    Cancel user subscription
// @access  Private
router.delete('/subscription', auth, cancelSubscription);

// @route   POST api/payments/webhook
// @desc    Handle PagSeguro webhook notifications
// @access  Public (PagSeguro will call this endpoint)
router.post('/webhook', processWebhook);

// @route   POST api/payments/notification
// @desc    Handle PagSeguro notifications (alternative endpoint)
// @access  Public
router.post('/notification', handlePagSeguroNotification);

// @route   GET api/payments/subscription/:subscriptionId
// @desc    Get subscription details from PagSeguro
// @access  Private
router.get('/subscription/:subscriptionId', auth, getSubscriptionDetails);

module.exports = router;
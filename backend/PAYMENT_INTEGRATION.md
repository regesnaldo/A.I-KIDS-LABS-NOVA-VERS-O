# A.I. KIDS LABS - PagSeguro Payment Integration

## Overview
This document explains the PagSeguro payment integration for the A.I. KIDS LABS platform. The system implements a subscription-based model with monthly and annual plans.

## Payment Flow

### 1. Creating a Subscription Plan
- Admin creates a subscription plan using `/api/payments/plan`
- The system communicates with PagSeguro API to set up the plan
- Returns a payment link that users can use to subscribe

### 2. User Subscription Process
- User selects a plan and provides payment information
- System creates a subscription request via `/api/payments/subscribe`
- User is redirected to PagSeguro for payment processing
- PagSeguro sends notifications via webhook to update subscription status

### 3. Subscription Management
- Check subscription status: `GET /api/payments/subscription`
- Cancel subscription: `DELETE /api/payments/subscription`
- Get subscription details: `GET /api/payments/subscription/:subscriptionId`

## API Endpoints

### POST /api/payments/plan
Creates a new subscription plan in PagSeguro
- **Authentication**: Required (Admin)
- **Request Body**:
  ```json
  {
    "userId": "user_id",
    "planType": "monthly" // or "annual"
  }
  ```

### POST /api/payments/subscribe
Creates a subscription for a user
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "userId": "user_id",
    "planId": "plan_id",
    "paymentMethod": {
      "type": "CREDIT_CARD",
      "token": "card_token",
      "holderName": "Card Holder Name",
      "birthDate": "1990-01-01",
      "documents": [{"type": "CPF", "value": "12345678900"}],
      "phone": {"areaCode": "11", "number": "999999999"}
    },
    "customerData": {
      "email": "user@example.com",
      "name": "User Name",
      "address": {},
      "documents": []
    }
  }
  ```

### GET /api/payments/subscription
Gets the current user's subscription status
- **Authentication**: Required

### DELETE /api/payments/subscription
Cancels the current user's subscription
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "cancellationReason": "USER_REQUESTED" // optional
  }
  ```

### GET /api/payments/subscription/:subscriptionId
Gets detailed information about a specific subscription
- **Authentication**: Required

### POST /api/payments/webhook
Webhook endpoint for PagSeguro notifications (called by PagSeguro)
- **Authentication**: Not required (called by PagSeguro)

### POST /api/payments/notification
Alternative webhook endpoint for PagSeguro notifications
- **Authentication**: Not required (called by PagSeguro)

## Environment Variables

The following environment variables need to be configured in `.env`:

```
# PagSeguro Configuration
PAGSEGURO_TOKEN=your_pagseguro_token_here
PAGSEGURO_EMAIL=your_pagseguro_email_here
PAGSEGURO_ENV=sandbox  # Use 'production' for live environment

# URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
```

## Configuration for PagSeguro Sandbox

1. Sign up for a PagSeguro account
2. Access the sandbox environment
3. Generate a sandbox token
4. Update your `.env` file with the sandbox credentials
5. Set `PAGSEGURO_ENV=sandbox`

## Configuration for Production

1. When ready for production, change `PAGSEGURO_ENV=production`
2. Update your `.env` file with production credentials
3. Ensure your webhook URLs are accessible from the internet
4. Test the complete payment flow

## Webhook Configuration

PagSeguro will send notifications to:
- `POST /api/payments/webhook`
- `POST /api/payments/notification`

These endpoints handle subscription status changes and payment confirmations automatically.

## Security Considerations

1. Never expose your PagSeguro token in client-side code
2. Validate all webhook requests to ensure they come from PagSeguro
3. Use HTTPS in production
4. Implement proper user authentication for subscription endpoints
5. Store sensitive payment information securely

## Error Handling

The system handles various payment-related errors:
- Invalid payment information
- Insufficient funds
- Payment processing failures
- Subscription cancellation
- Webhook validation failures

## Testing

For testing purposes:
1. Use PagSeguro sandbox environment
2. Use test credit card numbers provided by PagSeguro
3. Test all subscription lifecycle events
4. Verify webhook notifications are processed correctly

## Troubleshooting

### Common Issues:
- Webhook URLs not accessible from internet
- Incorrect PagSeguro token
- Missing environment variables
- User authentication failures

### Debugging:
- Check server logs for error messages
- Verify PagSeguro dashboard for webhook delivery status
- Ensure all required fields are provided in API requests
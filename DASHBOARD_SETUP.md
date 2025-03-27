# Dashboard and Subscription Testing Guide

This guide explains how to test the dashboard functionality, particularly the subscription and billing features, without requiring a full Stripe integration.

## Test Endpoints

We've created several test endpoints to simulate the subscription and billing data:

1. **Create Test Subscription**
   - Endpoint: `/api/test/create-subscription`
   - Method: GET
   - Query parameters: `userId` (optional, defaults to 1)
   - Example: `http://localhost:3000/api/test/create-subscription?userId=1`
   - This creates or updates a subscription for the specified user

2. **Fetch Subscription Data**
   - Endpoint: `/api/test/fetch-subscription`
   - Method: GET
   - Query parameters: `userId` (required)
   - Example: `http://localhost:3000/api/test/fetch-subscription?userId=1`
   - Returns subscription details for the specified user

3. **Fetch Mock Invoices**
   - Endpoint: `/api/test/fetch-invoices`
   - Method: GET
   - Query parameters: `userId` (required)
   - Example: `http://localhost:3000/api/test/fetch-invoices?userId=1`
   - Generates mock invoices based on the user's subscription

## Testing Steps

1. **Set up a test subscription**
   ```bash
   curl http://localhost:3000/api/test/create-subscription
   ```
   This will create a default subscription for user ID 1.

2. **Verify the subscription data**
   ```bash
   curl http://localhost:3000/api/test/fetch-subscription?userId=1
   ```
   This should return the subscription details.

3. **Verify the invoices data**
   ```bash
   curl http://localhost:3000/api/test/fetch-invoices?userId=1
   ```
   This should return mock invoices for the subscription.

4. **Visit the dashboard**
   Open your browser and go to `http://localhost:3000/dashboard`
   
   You should see:
   - The subscription details in the "Current Subscription" card
   - The invoice history in the "Recent Invoices" section

## Troubleshooting

If data isn't appearing in the dashboard:

1. **Check browser console for errors**
   - Open Developer Tools (F12) and look for any error messages

2. **Verify user authentication**
   - Make sure you're logged in as a user
   - The dashboard needs an authenticated user to fetch data

3. **Test the endpoints directly**
   - Use the curl commands above to verify the endpoints are working
   - Check if the returned data has the expected structure

4. **Restart the development server**
   ```bash
   npm run dev
   ```
   Sometimes a server restart can resolve issues with data not being properly loaded. 
import fetch from 'node-fetch';

/**
 * Simple script to create a test subscription for a user
 * This is for development purposes only
 */
async function testSubscription() {
    try {
        // Get the server base URL from env var or default to localhost:3000
        const SERVER_BASE_URL = process.env.SERVER_BASE_URL || 'http://localhost:3000';
        
        // Get user ID from command line args if provided
        const userId = process.argv[2];
        if (!userId) {
            console.error('Please provide a user ID as the first argument');
            console.error('Usage: node test-subscription.js USER_ID');
            process.exit(1);
        }
        
        console.log(`Creating test subscription for user ID: ${userId}`);
        
        // Create a test subscription for this user
        const subscriptionResponse = await fetch(`${SERVER_BASE_URL}/api/test/create-subscription?userId=${userId}`);
        
        if (!subscriptionResponse.ok) {
            const errorText = await subscriptionResponse.text();
            throw new Error(`Failed to create subscription: ${subscriptionResponse.status} ${errorText}`);
        }
        
        const subscriptionData = await subscriptionResponse.json();
        console.log('Subscription created successfully:');
        console.log(JSON.stringify(subscriptionData, null, 2));
        
        console.log('\nTest completed successfully. You should now see subscription data in your dashboard.');
    } catch (error) {
        console.error('Error during test:', error.message);
        process.exit(1);
    }
}

testSubscription(); 
// Test script to verify shortlink endpoint
// Run with: node test-shortlink.js

const API_URL = 'http://localhost:3000';
const EMAIL = 'test@example.com';
const PASSWORD = 'password123';

async function login() {
  try {
    console.log('Logging in to get JWT token...');
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: EMAIL,
        password: PASSWORD,
      }),
    });
    
    const data = await response.json();
    
    if (data.jwt) {
      console.log('Login success! JWT received.');
      return data.jwt;
    } else {
      console.log('Login failed:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

async function createShortlink(jwt) {
  try {
    console.log('Testing shortlink creation endpoint...');
    const response = await fetch(`${API_URL}/api/shortlink`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({
        url: 'https://example.com/very/long/url/that/needs/shortening',
        preserveParams: true
      }),
    });
    
    const data = await response.json();
    console.log('Shortlink creation response:', data);
    
    if (data.shortId) {
      console.log(`Shortlink created successfully! Short ID: ${data.shortId}`);
      console.log(`Full URL was: ${data.url}`);
      return data;
    } else {
      console.log('Shortlink creation failed:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Shortlink creation error:', error);
    return null;
  }
}

async function main() {
  // First login to get JWT
  const jwt = await login();
  
  if (!jwt) {
    console.log('Cannot proceed with tests as login failed');
    return;
  }
  
  // Test shortlink creation
  const shortlink = await createShortlink(jwt);
  
  if (shortlink) {
    console.log('Shortlink test completed successfully!');
  } else {
    console.log('Shortlink test failed.');
  }
}

main(); 
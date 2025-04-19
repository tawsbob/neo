// Simple test script to verify auth endpoints
// Run with: node test-auth.js

const API_URL = 'http://localhost:3000';
const EMAIL = 'test@example.com';
const PASSWORD = 'password123';

async function register() {
  try {
    console.log('Testing register endpoint...');
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: EMAIL,
        password: PASSWORD,
        name: 'Test',
        lastName: 'User',
      }),
    });
    
    const data = await response.json();
    console.log('Register response:', data);
    
    if (data.jwt) {
      console.log('Register success! JWT received.');
      return data.jwt;
    } else {
      console.log('Register failed.');
      return null;
    }
  } catch (error) {
    console.error('Register error:', error);
    return null;
  }
}

async function login() {
  try {
    console.log('Testing login endpoint...');
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
    console.log('Login response:', data);
    
    if (data.jwt) {
      console.log('Login success! JWT received.');
      return data.jwt;
    } else {
      console.log('Login failed.');
      return null;
    }
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

async function main() {
  // First try to register
  const registerToken = await register();
  
  // Then try to login
  const loginToken = await login();
  
  if (loginToken) {
    console.log('Authentication flow works correctly!');
  } else {
    console.log('Authentication flow has issues.');
  }
}

main(); 
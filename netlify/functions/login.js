// netlify/functions/login.js
exports.handler = async function(event, context) {
  // Dodaj nagłówki CORS aby działało z przeglądarką
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Obsłuż żądanie OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Tylko POST jest dozwolone
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  // DANE LOGOWANIA - ZMIEŃ TE WARTOŚCI NA SWOJE!
  const valid_username = "admin";
  const valid_password = "Vixonek2011@1";

  try {
    // Parsuj dane z body
    let username, password;
    
    if (event.headers['content-type'] === 'application/json') {
      const body = JSON.parse(event.body);
      username = body.username;
      password = body.password;
    } else {
      // Dla form data (jeśli potrzebujesz)
      const params = new URLSearchParams(event.body);
      username = params.get('username');
      password = params.get('password');
    }

    // Sprawdź czy dane są kompletne
    if (!username || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          status: 'ERROR', 
          message: 'Missing username or password' 
        })
      };
    }

    console.log('Login attempt for user:', username); // Log dla debugowania

    // Sprawdź credentials
    if (username === valid_username && password === valid_password) {
      console.log('Login SUCCESS for user:', username);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          status: 'SUCCESS',
          message: 'Login successful'
        })
      };
    } else {
      console.log('Login FAILED for user:', username);
      
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ 
          status: 'ERROR',
          message: 'Invalid username or password'
        })
      };
    }

  } catch (error) {
    console.error('Login error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        status: 'ERROR', 
        message: 'Internal server error' 
      })
    };
  }
};

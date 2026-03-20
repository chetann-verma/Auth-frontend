# Backend Implementation Guide

This guide helps you understand what your backend needs to implement for this frontend to work.

## Backend Requirements

The frontend expects a backend API server running on `http://localhost:5000` with the following endpoints:

### 1. User Registration
- **Endpoint:** POST `/register`
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "integer or string",
      "name": "string",
      "email": "string"
    }
  }
  ```
- **Response (400 Bad Request):**
  ```json
  {
    "message": "Email already exists" // or other error
  }
  ```

### 2. User Login
- **Endpoint:** POST `/login`
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Login successful",
    "token": "JWT_TOKEN_STRING"
  }
  ```
- **Response (401 Unauthorized):**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### 3. Get User Profile
- **Endpoint:** GET `/profile`
- **Headers Required:**
  ```
  Authorization: Bearer JWT_TOKEN_STRING
  ```
- **Response (200 OK):**
  ```json
  {
    "id": "integer or string",
    "name": "string",
    "email": "string"
  }
  ```
- **Response (401 Unauthorized):**
  ```json
  {
    "message": "Token is invalid or expired"
  }
  ```

## Simple Node.js/Express Backend Example

Here's a minimal backend implementation using Node.js and Express:

```javascript
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = 'your_secret_key_here';

// Simple in-memory user storage (use database in production)
const users = [];

// Helper function to find user by email
function findUserByEmail(email) {
  return users.find(u => u.email === email);
}

// Helper function to generate JWT
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Token is invalid or expired' });
    }
    req.user = user;
    next();
  });
}

// Register Route
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if email already exists
  if (findUserByEmail(email)) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password // In production, hash this with bcrypt!
  };

  users.push(newUser);

  res.json({
    message: 'User registered successfully',
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  });
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  // Find user
  const user = findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Check password (in production, use bcrypt.compare())
  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate token
  const token = generateToken(user);

  res.json({
    message: 'Login successful',
    token
  });
});

// Profile Route (Protected)
app.get('/profile', verifyToken, (req, res) => {
  // Find user by ID from token
  const user = users.find(u => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## Setup Backend

1. **Initialize Node.js project:**
   ```bash
   npm init -y
   ```

2. **Install dependencies:**
   ```bash
   npm install express cors jsonwebtoken
   ```

3. **Create `server.js` file and paste the code above**

4. **Run the server:**
   ```bash
   node server.js
   ```

5. **The server will start on `http://localhost:5000`**

## Important Notes for Production

1. **Password Hashing:** Use `bcrypt` to hash passwords, never store plain text passwords
2. **Database:** Use a real database (MongoDB, PostgreSQL, MySQL) instead of in-memory array
3. **JWT Secret:** Use a strong secret, never hardcode it - use environment variables
4. **CORS:** Configure CORS properly for your frontend URL
5. **Input Validation:** Validate and sanitize all inputs
6. **Rate Limiting:** Add rate limiting to prevent brute force attacks
7. **HTTPS:** Always use HTTPS in production

## Testing the Backend

You can test the API using tools like:
- **Postman** - GUI tool for API testing
- **cURL** - Command line tool
- **Thunder Client** - VS Code extension
- **REST Client** - VS Code extension

### Test Requests (cURL)

**Register:**
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"pass123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'
```

**Get Profile (replace TOKEN with actual token from login):**
```bash
curl -X GET http://localhost:5000/profile \
  -H "Authorization: Bearer TOKEN"
```

## Troubleshooting

- **CORS Errors:** Make sure `cors()` is enabled on the backend
- **Token Issues:** Verify the JWT_SECRET matches between generation and verification
- **401 Errors:** Check if the token is valid and not expired
- **Connection Refused:** Ensure backend is running on port 5000

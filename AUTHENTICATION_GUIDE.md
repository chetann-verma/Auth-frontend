# JWT Authentication Frontend

A simple React frontend for a JWT-based authentication system built with Vite, React Router, and Axios.

## Features

- **User Registration** - Create new user accounts with name, email, and password
- **User Login** - Authenticate with email and password, receive JWT token
- **Protected Profile Page** - View user profile data (requires valid JWT token)
- **Token Management** - Automatically store JWT in localStorage and send in API requests
- **Route Protection** - Redirect unauthenticated users to login page
- **Clean UI** - Simple, beginner-friendly interface with gradient design

## Project Structure

```
src/
├── components/
│   ├── Register.jsx       # Registration form component
│   ├── Login.jsx          # Login form component
│   ├── Profile.jsx        # Protected profile page
│   ├── ProtectedRoute.jsx # Route guard component
│   ├── Auth.css           # Styles for auth pages
│   └── Profile.css        # Styles for profile page
├── App.jsx                # Main app with routing
├── main.jsx               # Entry point
├── App.css                # Global styles
└── index.css              # Reset styles
```

## How It Works

### 1. Register Page (`/register`)
- User enters: name, email, password
- Sends POST request to `/register`
- On success, redirects to login page
- Backend should return user data or success message

### 2. Login Page (`/login`)
- User enters: email, password
- Sends POST request to `/login`
- Backend returns JWT token
- Token is stored in `localStorage` with key `'token'`
- User is redirected to profile page

### 3. Profile Page (`/profile`)
- Protected route - only accessible with valid token
- On load, fetches user profile data
- Sends GET request to `/profile` with `Authorization: Bearer {token}` header
- Displays user name and email
- Has logout button that clears token and redirects to login

### 4. ProtectedRoute Component
- Checks if JWT token exists in localStorage
- If token exists: renders the page
- If no token: redirects to `/login`

## API Endpoints Expected

### POST /register
**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Response (success):**
```json
{
  "message": "User registered successfully",
  "user": { "name": "John Doe", "email": "john@example.com" }
}
```

### POST /login
**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response (success):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### GET /profile
**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
**Response (success):**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Update API base URL:**
   - Open `src/components/Register.jsx`, `Login.jsx`, and `Profile.jsx`
   - Replace `http://localhost:5000` with your actual backend URL

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Testing the App

1. Go to `http://localhost:5173/register` (or the URL shown in terminal)
2. Create a new account with test data
3. You'll be redirected to login page
4. Log in with your credentials
5. View your profile data on the profile page
6. Click "Logout" to clear token and return to login

## Error Handling

- Network errors and validation errors are displayed to the user
- Errors are also logged to browser console for debugging
- Invalid token or expired token redirects to login page

## Code Style

- Functional components with React Hooks
- Readable variable names and clear logic flow
- Comments/documentation for clarity
- No unnecessary abstraction - straightforward code
- Beginner-friendly and easy to understand

## Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling

## Notes for Interview

- Token is stored in `localStorage` under key `'token'`
- Token is sent in Authorization header as `Bearer {token}`
- ProtectedRoute component prevents unauthorized access
- Clean separation of concerns: components, routing, API calls
- Beginner-friendly code structure suitable for junior developers

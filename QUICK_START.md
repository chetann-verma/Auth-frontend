# Quick Start Guide

## Running the Frontend

### 1. Install Dependencies
```bash
npm install
```

All required dependencies are already listed in `package.json`:
- `react` - UI library
- `react-dom` - React rendering
- `react-router-dom` - Routing
- `axios` - HTTP client
- `vite` - Build tool

### 2. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

### 3. Open in Browser
Navigate to `http://localhost:5173`

You'll be automatically redirected to the login page.

---

## Running the Backend

Before testing the frontend, you need a backend server running.

### Option A: Use the Provided Example Backend

1. **Create a new directory for the backend:**
   ```bash
   mkdir auth-backend
   cd auth-backend
   ```

2. **Initialize Node.js project:**
   ```bash
   npm init -y
   ```

3. **Install dependencies:**
   ```bash
   npm install express cors jsonwebtoken
   ```

4. **Create `server.js` file:**
   - Copy the code from `BACKEND_GUIDE.md`
   - Paste it into `server.js`

5. **Start the server:**
   ```bash
   node server.js
   ```

The backend will run on `http://localhost:5000`.

### Option B: Use Your Own Backend

Make sure your backend has these three endpoints:
- `POST /register` - Create new user
- `POST /login` - Authenticate and return JWT token
- `GET /profile` - Get user profile (protected by JWT)

See `BACKEND_GUIDE.md` for detailed requirements.

---

## Testing the Application

### Step 1: Register a New User
1. Open `http://localhost:5173/register`
2. Enter:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
3. Click "Register"
4. You'll be redirected to the login page

### Step 2: Login
1. You're now on the login page
2. Enter:
   - Email: john@example.com
   - Password: password123
3. Click "Login"
4. You'll be redirected to the profile page

### Step 3: View Profile
1. You should see your name and email displayed
2. The JWT token is stored in `localStorage` (check browser DevTools)
3. Click "Logout" to clear the token and return to login

### Step 4: Test Protected Route
1. After logging out, try to access `http://localhost:5173/profile` directly
2. You'll be automatically redirected to login page (because no token)

---

## Troubleshooting

### Error: "Registration failed. Please try again."
- Check that the backend is running on `http://localhost:5000`
- Check browser console for detailed error message
- Verify the backend is listening on port 5000

### Error: "Login failed. Please try again."
- Verify you entered the correct email and password
- Check that the backend `/login` endpoint is working
- Check browser console for detailed error message

### Error: "Failed to fetch profile"
- Ensure you're logged in and have a valid token
- Check that the backend `/profile` endpoint requires `Authorization` header
- Verify the token format is `Bearer {token}`

### Can't access the app at localhost:5173
- The development server might be on a different port
- Check the terminal output from `npm run dev` for the actual URL
- Frontend port can be 5174, 5175, etc. if 5173 is in use

### CORS Error
- Ensure the backend has CORS enabled
- If using the example backend, `cors()` is already added
- Frontend URL should be allowed in backend CORS configuration

---

## Project Files Overview

### Main Files
- `src/App.jsx` - Main app with routing setup
- `src/main.jsx` - Entry point
- `src/App.css` - Global styles
- `src/index.css` - Reset styles

### Components
- `src/components/Register.jsx` - Registration form
- `src/components/Login.jsx` - Login form
- `src/components/Profile.jsx` - User profile page (protected)
- `src/components/ProtectedRoute.jsx` - Route guard component
- `src/components/Auth.css` - Auth pages styling
- `src/components/Profile.css` - Profile page styling

### Documentation
- `AUTHENTICATION_GUIDE.md` - How auth works
- `BACKEND_GUIDE.md` - Backend implementation guide
- `QUICK_START_GUIDE.md` - This file

---

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint (check code quality)
npm run lint
```

---

## Browser DevTools Inspection

### Check Stored Token
1. Open browser DevTools (F12 or Ctrl+Shift+I)
2. Go to "Application" or "Storage" tab
3. Click "Local Storage"
4. Click on `http://localhost:5173` (or your URL)
5. You should see `token` key with the JWT value

### Check Network Requests
1. In DevTools, go to "Network" tab
2. Perform login
3. Click on the login request to see details
4. Response should contain `token` field
5. Click on profile request to see the Authorization header

### Check Console for Errors
1. In DevTools, go to "Console" tab
2. You'll see logs when API calls are made
3. Any errors will also be displayed here

---

## Next Steps

1. ✅ Frontend is ready to use
2. ✅ Backend example code is provided in `BACKEND_GUIDE.md`
3. Deploy to production when ready

For production:
- Use a real database instead of in-memory storage
- Hash passwords with bcrypt
- Use environment variables for sensitive data
- Enable HTTPS
- Add more validation and error handling

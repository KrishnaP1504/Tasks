# MERN Stack Authentication with Redux

A complete MERN (MongoDB, Express, React, Node.js) stack application with Redux for state management and JWT-based authentication.

## Project Structure

```
.
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── Register.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── store/
│   │   │   ├── actions/
│   │   │   │   ├── authActions.js
│   │   │   │   └── types.js
│   │   │   ├── reducers/
│   │   │   │   ├── authReducer.js
│   │   │   │   └── index.js
│   │   │   └── store.js
│   │   ├── utils/
│   │   │   └── setAuthToken.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── .env.example
│   └── package.json
└── README.md
```

## Features

- User Registration
- User Login
- JWT-based Authentication
- Protected Routes
- Redux State Management
- Password Hashing with bcrypt
- Token-based Authorization

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern_auth
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

4. Make sure MongoDB is running on your system.

5. Start the server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication Routes

- `POST /api/auth/register` - Register a new user
  - Body: `{ name, email, password }`
  
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  
- `GET /api/auth/me` - Get current user (Protected)
  - Headers: `Authorization: Bearer <token>`

## Redux Store Structure

```javascript
{
  auth: {
    token: string | null,
    isAuthenticated: boolean,
    loading: boolean,
    user: object | null,
    error: string | null
  }
}
```

## Redux Actions

- `register(formData)` - Register a new user
- `login(formData)` - Login user
- `logout()` - Logout user
- `loadUser()` - Load current user from token
- `clearErrors()` - Clear authentication errors

## Components

- **Login** - Login form component
- **Register** - Registration form component
- **Dashboard** - Protected dashboard component
- **ProtectedRoute** - Route wrapper for protected routes

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- CORS

### Frontend
- React
- Redux
- React-Redux
- Redux-Thunk
- React Router DOM
- Axios

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- Token stored in localStorage
- Automatic token validation

## Notes

- Make sure to change the `JWT_SECRET` in production
- Use a strong MongoDB connection string in production
- Implement proper error handling for production use
- Add input validation and sanitization as needed


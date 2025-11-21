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

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

## Downloading Only This Folder

1. Open this folder on GitHub and copy its URL, for example `https://github.com/KrishnaP1504/Tasks/tree/main/MERN_4_Krishnakumar/Code`.
2. Go to https://download-directory.github.io/.
3. Paste the folder URL and press Enter to download a ZIP that contains only this folder.
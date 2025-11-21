# Role based access - MERN Stack

Role-based authentication example using a MERN stack (MongoDB, Express, React, Node).

This repository contains a minimal RBAC-style example split into `backend` and `frontend` folders.

## Folder structure

```
mern-rbac/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   └── ProtectedRoute.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── AdminPage.js
    │   │   ├── HomePage.js
    │   │   ├── LoginPage.js
    │   │   ├── ProfilePage.js
    │   │   └── RegisterPage.js
    │   ├── services/
    │   │   ├── api.js
    │   │   ├── authService.js
    │   │   └── userService.js
    │   ├── App.js
    │   ├── index.css
    │   └── index.js
    ├── .env
    └── package.json
```

## Downloading Only This Folder

1. Open this folder on GitHub and copy its URL, for example `https://github.com/KrishnaP1504/Tasks/tree/main/MERN_1_Krishnakumar/Code`.
2. Go to https://download-directory.github.io/.
3. Paste the folder URL and press Enter to download a ZIP that contains only this folder.
# Quick Start Guide

## To Fix the Connection Error

The error `ERR_CONNECTION_REFUSED` means the backend server is not running. Follow these steps:

### 1. Start the Backend Server

Open a new terminal and run:

```bash
cd backend
npm install
npm run dev
```

Make sure:
- MongoDB is running on your system
- The `.env` file exists in the `backend` folder with correct configuration
- The server starts on `http://localhost:5000`

### 2. Start the Frontend (if not already running)

In another terminal:

```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`

## What I Fixed

1. ✅ **React Router Warnings**: Added future flags to suppress deprecation warnings
2. ✅ **Connection Error Handling**: Improved error handling to gracefully handle when backend is not running
3. ✅ **Token Management**: Only attempts to load user if token exists

## Troubleshooting

- **MongoDB not running**: Install and start MongoDB service
- **Port already in use**: Change PORT in backend/.env
- **Module not found**: Run `npm install` in both backend and frontend folders


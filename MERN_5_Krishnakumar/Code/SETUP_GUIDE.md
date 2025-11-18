# Setup Guide - Quotes Generator

## Quick Start

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Setup Environment Variables
Create a `.env` file in the `backend` folder with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quotes_db
```

### Step 3: Start MongoDB
Make sure MongoDB is running on your system:
- **Windows**: Start MongoDB service or run `mongod`
- **Mac/Linux**: Run `sudo systemctl start mongod` or `brew services start mongodb-community`

### Step 4: Start Backend Server
```bash
cd backend
npm start
```
You should see: `Server is running on port 5000`

### Step 5: Install Frontend Dependencies
Open a new terminal:
```bash
cd frontend
npm install
```

### Step 6: Start Frontend
```bash
npm start
```
The app will open at `http://localhost:3000`

## Troubleshooting

### Error: "Failed to fetch random quote"

**Possible Causes:**

1. **Backend server is not running**
   - Solution: Make sure the backend server is running on port 5000
   - Check: Open `http://localhost:5000` in browser - should show `{"message":"Quotes API is running"}`

2. **Port conflict**
   - Solution: Check if port 5000 is already in use
   - Windows: `netstat -ano | findstr :5000`
   - Mac/Linux: `lsof -i :5000`

3. **CORS issues**
   - Solution: The backend already has CORS enabled, but if issues persist, check the CORS configuration in `backend/server.js`

4. **Internet connection**
   - Solution: The app needs internet to fetch quotes from Quotable API. Check your connection.

5. **Proxy not working**
   - Solution: The frontend uses a proxy. If issues persist, you can set `REACT_APP_API_URL=http://localhost:5000/api/quotes` in a `.env` file in the frontend folder.

### Error: "Database not connected"

**Solution:**
- Make sure MongoDB is installed and running
- Check the MongoDB connection string in `backend/.env`
- The app will still work for fetching quotes even if MongoDB is not connected (you just won't be able to save posts)

### Testing the Backend API Directly

You can test if the backend is working by opening these URLs in your browser:

1. Health check: `http://localhost:5000/`
2. Random quote: `http://localhost:5000/api/quotes/random`

If these work, the backend is running correctly.

## Common Issues

### "Cannot connect to server"
- Backend is not running - start it with `npm start` in the backend folder
- Wrong port - check if backend is running on port 5000

### "Network Error"
- Backend server is not accessible
- Check firewall settings
- Verify the backend is running

### MongoDB Connection Issues
- MongoDB service not started
- Wrong connection string in `.env`
- MongoDB not installed

## Verification Steps

1. ✅ Backend dependencies installed (`cd backend && npm install`)
2. ✅ Backend `.env` file created with correct values
3. ✅ MongoDB is running
4. ✅ Backend server started (`npm start` in backend folder)
5. ✅ Frontend dependencies installed (`cd frontend && npm install`)
6. ✅ Frontend server started (`npm start` in frontend folder)
7. ✅ Browser opens to `http://localhost:3000`

If all steps are completed, the app should work correctly!


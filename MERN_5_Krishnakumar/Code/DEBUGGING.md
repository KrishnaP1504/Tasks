# Debugging Guide - 500 Internal Server Error

## Quick Debug Steps

### 1. Check Backend Console Logs
The most important step is to check your backend server console. When you click "Get Random Quote", you should see detailed error logs in the terminal where you ran `npm start` in the backend folder.

Look for lines like:
- `Error fetching random quote - Full error:`
- `Error message:`
- `Error code:`
- `Error response:`

### 2. Test the API Directly
Open your browser and go to:
```
http://localhost:5000/api/quotes/random
```

This will show you the exact error response from the backend.

### 3. Test Quotable API Directly
Test if the external API is working:
```
https://api.quotable.io/random
```

You should see a JSON response with `content`, `author`, and `tags`.

### 4. Common Issues and Solutions

#### Issue: "Cannot connect to quotes API"
**Solution:** Check your internet connection. The backend needs internet to fetch quotes.

#### Issue: "Invalid response structure"
**Solution:** The Quotable API might have changed. Check the API response format.

#### Issue: MongoDB Connection Error
**Solution:** This shouldn't affect quote fetching, but if you see MongoDB errors, make sure MongoDB is running or ignore them (quotes will still work).

#### Issue: Port Already in Use
**Solution:** 
- Windows: `netstat -ano | findstr :5000` to find the process
- Mac/Linux: `lsof -i :5000` to find the process
- Kill the process or change the PORT in `.env`

### 5. Check Backend Server Status
Make sure your backend server is running and shows:
```
Server is running on port 5000
```

If you see MongoDB connection errors, that's okay - the server will still work for fetching quotes.

### 6. Restart Both Servers
Sometimes a simple restart fixes issues:
1. Stop the backend server (Ctrl+C)
2. Stop the frontend server (Ctrl+C)
3. Restart backend: `cd backend && npm start`
4. Restart frontend: `cd frontend && npm start`

### 7. Check Network Tab in Browser
Open browser DevTools (F12) → Network tab → Click "Get Random Quote" → Check the request to `/api/quotes/random` → Look at the Response tab to see the exact error message.

## Expected Backend Console Output

When working correctly, you should see:
```
Server is running on port 5000
MongoDB Connected: localhost (or connection error if MongoDB not running)
```

When clicking "Get Random Quote", you should NOT see any error messages in the console.

## Still Having Issues?

1. Copy the exact error message from the backend console
2. Copy the error response from the browser Network tab
3. Check if `https://api.quotable.io/random` works in your browser
4. Verify your backend server is actually running on port 5000


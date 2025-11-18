# How to Check Backend Logs for Errors

## The Problem

You're seeing a 500 Internal Server Error in the browser console. This means your backend server is encountering an error, but we need to see the **backend console logs** to know what's actually wrong.

## How to See Backend Logs

### Step 1: Find Your Backend Terminal
Look for the terminal/command prompt window where you ran:
```bash
cd backend
npm start
```

This is where the backend server logs will appear.

### Step 2: Check for Error Messages
When you click "Get Random Quote" in the frontend, you should see error messages in the backend terminal like:

```
Error fetching random quote - Full error: [error object]
Error message: [specific error message]
Error code: [error code like ENOTFOUND, EAI_AGAIN, etc.]
Error response: [response data if any]
```

### Step 3: Common Error Messages

**If you see `ENOTFOUND` or `EAI_AGAIN`:**
- This is a DNS/network issue
- Your server cannot resolve `api.quotable.io`
- See `NETWORK_TROUBLESHOOTING.md` for solutions

**If you see `ECONNREFUSED`:**
- Connection is being blocked
- Check firewall/VPN settings

**If you see `ECONNABORTED`:**
- Request timed out
- Check internet connection speed

**If you see a different error:**
- Copy the full error message
- Check what the error code and message say

## What to Do

1. **Open the backend terminal** (where `npm start` is running)
2. **Click "Get Random Quote"** in your browser
3. **Look at the backend terminal** - you should see detailed error logs
4. **Copy the error message** and share it

## If You Don't See Backend Logs

If the backend terminal isn't showing errors:
1. Make sure the backend server is actually running
2. Check if you have multiple terminal windows open
3. Restart the backend server:
   ```bash
   # Stop with Ctrl+C, then:
   cd backend
   npm start
   ```

## Quick Test

To verify your backend is running and logging:
1. Visit `http://localhost:5000/` in your browser
2. You should see: `{"message":"Quotes API is running"}`
3. Check the backend terminal - you should see the request logged

The backend console logs will tell us exactly what's going wrong!


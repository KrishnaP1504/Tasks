# Network Troubleshooting Guide

## ⚠️ Important: Code vs Network Issue

**Your code is working correctly.** The improved error handling will help you diagnose the problem, but it **will NOT fix** the underlying network issue.

The errors you're seeing (`ENOTFOUND`, `EAI_AGAIN`) indicate a **network-level DNS problem** on the machine running your backend server. You must fix the network issue on your machine - the code cannot fix this for you.

## Understanding the Error

If you're seeing errors like:
- `ENOTFOUND api.quotable.io`
- `EAI_AGAIN`
- `DNS resolution failed`

This means your **backend server cannot resolve the DNS** for the Quotable API. This is a **network connectivity issue**, not a code problem.

## Quick Diagnosis

### 1. Test DNS Resolution
Open a terminal/command prompt and run:
```bash
ping api.quotable.io
```

**If this fails:**
- You have a DNS/network problem on your machine
- The issue is not with your code

**If this works:**
- The problem might be specific to Node.js
- Check firewall/VPN settings

### 2. Test API Directly in Browser
Open this URL in your browser:
```
https://api.quotable.io/random
```

**If this works:**
- Your internet connection is fine
- The issue is likely with Node.js network configuration

**If this fails:**
- You have a general internet/network problem
- Check your internet connection

### 3. Use the Connectivity Test Endpoint
After starting your backend server, visit:
```
http://localhost:5000/api/quotes/test-connectivity
```

This will show you detailed information about the connection issue.

## Common Solutions

### Solution 1: Check Internet Connection
- Make sure your computer is connected to the internet
- Try opening any website in your browser
- Restart your router if needed

### Solution 2: Disable VPN/Proxy
- Temporarily disable any VPN software
- Disable proxy settings
- Try again

### Solution 3: Check Firewall
- Windows: Check Windows Defender Firewall
- Allow Node.js through the firewall
- Corporate firewalls might block outbound connections

### Solution 4: Change DNS Server
If DNS resolution is the problem:

**Windows:**
1. Open Network Settings
2. Change DNS to: `8.8.8.8` and `8.8.4.4` (Google DNS)
3. Or: `1.1.1.1` and `1.0.0.1` (Cloudflare DNS)

**Mac/Linux:**
```bash
# Edit /etc/resolv.conf or use network manager
# Add: nameserver 8.8.8.8
```

### Solution 5: Corporate Network
If you're on a corporate network:
- They might be blocking external API calls
- Contact IT department
- Use a personal network/mobile hotspot to test

### Solution 6: Check Node.js Network Settings
If you're behind a proxy, configure Node.js:
```bash
# Set proxy environment variables
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080
```

## Testing Your Fix

After trying a solution:

1. **Restart your backend server**
2. **Test connectivity:**
   ```bash
   curl http://localhost:5000/api/quotes/test-connectivity
   ```
   Or visit in browser: `http://localhost:5000/api/quotes/test-connectivity`

3. **Try fetching a quote** in your frontend

## Still Not Working?

If none of these solutions work:

1. **Check backend console logs** - They will show the exact error code
2. **Try from a different network** (e.g., mobile hotspot) to isolate the issue
3. **Check if other Node.js apps can make HTTP requests** to external APIs
4. **Verify your Node.js installation** is not corrupted

## Understanding Error Codes

- **ENOTFOUND**: DNS lookup failed - cannot find the hostname
- **EAI_AGAIN**: DNS lookup timed out - temporary DNS issue
- **ECONNREFUSED**: Connection refused - firewall/proxy blocking
- **ECONNABORTED**: Connection timeout - network too slow or API down

The improved error handling in your code will now show these specific error codes and provide targeted troubleshooting advice.


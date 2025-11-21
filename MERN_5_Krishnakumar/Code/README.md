# Quotes Generator - MERN Stack Application

A full-stack MERN (MongoDB, Express, React, Node.js) application that fetches random quotes from an external API and allows users to save them as posts.

## Project Structure

```
Code/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── quoteController.js # Business logic
│   ├── models/
│   │   └── Quote.js           # Quote schema
│   ├── routes/
│   │   └── quoteRoutes.js     # API routes
│   ├── .env                   # Environment variables
│   ├── server.js              # Express server
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── QuoteDisplay.js
│   │   │   ├── PostList.js
│   │   │   └── PostItem.js
│   │   ├── services/
│   │   │   └── api.js         # API service functions
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Downloading Only This Folder

1. Open this folder on GitHub and copy its URL, for example `https://github.com/KrishnaP1504/Tasks/tree/main/MERN_5_Krishnakumar/Code`.
2. Go to https://download-directory.github.io/.
3. Paste the folder URL and press Enter to download a ZIP that contains only this folder.
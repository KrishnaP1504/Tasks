# Quotes Generator - MERN Stack Application

A full-stack MERN (MongoDB, Express, React, Node.js) application that fetches random quotes from an external API and allows users to save them as posts.

## Features

- 🎲 Fetch random quotes from Quotable API
- 💾 Save quotes as posts to MongoDB
- 📋 View all saved posts
- 🗑️ Delete posts
- 🎨 Modern and responsive UI

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

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory (already created, but update if needed):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quotes_db
```

4. Make sure MongoDB is running on your system.

5. Start the backend server:
```bash
npm start
```
For development with auto-reload:
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

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Get Random Quote
- **GET** `/api/quotes/random`
- Fetches a random quote from Quotable API

### Create Post
- **POST** `/api/quotes/posts`
- Body: `{ content, author, tags }`
- Creates a new post in the database

### Get All Posts
- **GET** `/api/quotes/posts`
- Returns all saved posts

### Get Post by ID
- **GET** `/api/quotes/posts/:id`
- Returns a specific post

### Delete Post
- **DELETE** `/api/quotes/posts/:id`
- Deletes a post from the database

## Usage

1. Start MongoDB (if running locally)
2. Start the backend server
3. Start the frontend server
4. Open `http://localhost:3000` in your browser
5. Click "Get Random Quote" to fetch a quote
6. Click "Create Post" to save the quote
7. View all saved posts in the right panel
8. Delete posts using the delete button

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Axios (for external API calls)
- CORS
- dotenv

### Frontend
- React
- Axios
- CSS3 (with modern styling)

## External API

This application uses the [Quotable API](https://quotable.io/) to fetch random quotes.

## License

ISC


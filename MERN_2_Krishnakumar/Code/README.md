# Chess Board Game - MERN Stack

A chess board game built with MERN stack (MongoDB, Express, React, Node.js) and Redux for state management.

## Features

- 8x8 Chess board with alternating white and black squares
- Click on white squares to change them to yellow
- Click on black squares to change them to red
- Click again to revert to original color
- Redux for state management
- MongoDB for persistent storage

## Project Structure

```
chess-board-mern/
├── server/                 # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── controllers/
│   │   └── gameController.js
│   ├── models/
│   │   └── GameState.js
│   ├── routes/
│   │   └── gameRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── client/                 # Frontend (React + Redux)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChessBoard.js
│   │   │   └── ChessBoard.css
│   │   ├── redux/
│   │   │   ├── actions/
│   │   │   │   ├── gameActions.js
│   │   │   │   └── types.js
│   │   │   ├── reducers/
│   │   │   │   ├── gameReducer.js
│   │   │   │   └── index.js
│   │   │   └── store.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── package.json
└── README.md
```

## Installation

1. Install all dependencies:
```bash
npm run install-all
```

Or install separately:
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

## Configuration

1. Make sure MongoDB is installed and running on your system
2. Update the MongoDB connection string in `server/.env` if needed:
```
MONGODB_URI=mongodb://localhost:27017/chess-game
```

## Running the Application

### Development Mode (runs both server and client)
```bash
npm run dev
```

### Run separately:

**Backend Server:**
```bash
npm run server
```
Server will run on http://localhost:5000

**Frontend Client:**
```bash
npm run client
```
Client will run on http://localhost:3000

## API Endpoints

- `GET /api/game/state` - Get current game state
- `POST /api/game/square` - Update square color (body: { row, col })
- `POST /api/game/reset` - Reset game to initial state

## Technologies Used

- **Frontend:**
  - React 18
  - Redux (with Redux Thunk)
  - Axios
  - CSS3

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - CORS

## How It Works

1. The chess board is initialized with 8x8 squares (alternating white and black)
2. When you click on a square:
   - White squares change to yellow
   - Black squares change to red
3. Clicking again reverts the square to its original color
4. All state changes are managed through Redux and persisted in MongoDB

## License

ISC


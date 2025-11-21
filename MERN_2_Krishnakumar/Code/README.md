# Chess Board Game - MERN Stack

A chess board game built with MERN stack (MongoDB, Express, React, Node.js) and Redux for state management.

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

## Downloading Only This Folder

1. Open this folder on GitHub and copy its URL, for example `https://github.com/KrishnaP1504/Tasks/tree/main/MERN_2_Krishnakumar/Code`.
2. Go to https://download-directory.github.io/.
3. Paste the folder URL and press Enter to download a ZIP that contains only this folder.
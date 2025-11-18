# Shopping Cart Application - MERN Stack

A full-stack shopping cart application built with MongoDB, Express, React, and Node.js.

## Features

- ✅ Add items to cart
- ✅ Remove items from cart
- ✅ Update item quantities
- ✅ View cart total
- ✅ Clear entire cart
- ✅ Product listing with images
- ✅ Stock management

## Project Structure

```
Code/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── cartController.js
│   │   └── productController.js
│   ├── models/
│   │   ├── Cart.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── cartRoutes.js
│   │   └── productRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductList.js
│   │   │   ├── ProductList.css
│   │   │   ├── ShoppingCart.js
│   │   │   └── ShoppingCart.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
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

3. Update the `.env` file with your MongoDB connection string:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shopping_cart
NODE_ENV=development
```

4. Start the backend server:
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

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create a product

### Cart
- `GET /api/cart?userId=guest` - Get cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:itemId` - Update item quantity
- `DELETE /api/cart/remove/:itemId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

## Seeding Sample Data

To add sample products, you can use the following API call or create a seed script:

```javascript
// Example: Add a product via API
POST http://localhost:5000/api/products
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "image": "https://via.placeholder.com/300",
  "stock": 10
}
```

## Usage

1. Start MongoDB (if running locally)
2. Start the backend server
3. Start the frontend server
4. Open `http://localhost:3000` in your browser
5. Browse products and add them to your cart
6. Update quantities or remove items as needed

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

- **Frontend:**
  - React
  - CSS3
  - Fetch API

## License

MIT

